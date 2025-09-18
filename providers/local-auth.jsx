"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { apiFetch } from "@/lib/api";

const AuthCtx = createContext(null);

/**
 * สรุป role / department จาก payload ที่ฝั่ง API ส่งมา
 * รองรับทั้ง user.role.name เดี่ยว และ user.roles เป็น array (ถ้ามี)
 */
function normalizeFromUser(u) {
  const roleName = (u?.role?.name || "").toLowerCase();
  const roles =
    Array.isArray(u?.roles) && u.roles.length
      ? u.roles.map(String)
      : roleName
      ? [roleName]
      : [];
  const department = u?.department ?? null;
  return { roleName, roles, department };
}

/**
 * throttle ง่ายๆ ใช้กับ revalidate on focus/online
 */
function throttle(fn, wait = 3000) {
  let last = 0;
  let timer = null;
  return () => {
    const now = Date.now();
    const remain = wait - (now - last);
    if (remain <= 0) {
      last = now;
      fn();
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = Date.now();
        fn();
      }, remain);
    }
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, name, role?, roles[], department? }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ----- กัน race: ใช้ request version + AbortController -----
  const reqVerRef = useRef(0); // เวอร์ชันของคำขอล่าสุด
  const inFlightAC = useRef(null); // AbortController ของคำขอที่กำลังวิ่ง

  const bumpReqVer = () => ++reqVerRef.current;

  const cancelInFlight = () => {
    try {
      inFlightAC.current?.abort?.();
    } catch {}
    inFlightAC.current = null;
  };

  /**
   * โหลดสถานะปัจจุบันของผู้ใช้จาก /auth/me
   * - ยกเลิกรีเควสต์ก่อนหน้า (กันค่าเก่าทับใหม่)
   * - ถ้าไม่ใช่คำตอบล่าสุด (ver ไม่ตรง) จะทิ้ง ไม่ setState
   */
  const loadMe = useCallback(async (signalOverride) => {
    const myVer = bumpReqVer();
    setError("");

    cancelInFlight();
    const ac = new AbortController();
    inFlightAC.current = ac;

    const signal = signalOverride || ac.signal;

    try {
      const data = await apiFetch("/auth/me", { signal, cache: "no-store" });
      if (myVer !== reqVerRef.current) return; // คำตอบเก่า
      const norm = normalizeFromUser(data?.user);
      setUser(data?.user ? { ...data.user, ...norm } : null);
    } catch (e) {
      if (e?.name === "AbortError") return;
      if (myVer !== reqVerRef.current) return; // คำตอบเก่า
      setUser(null);
      setError(e?.message || "");
    } finally {
      if (myVer === reqVerRef.current) setLoading(false);
    }
  }, []);

  // โหลดครั้งแรกตอน mount
  useEffect(() => {
    const ac = new AbortController();
    loadMe(ac.signal);
    return () => ac.abort();
  }, [loadMe]);

  /**
   * ล็อกอิน:
   * 1) ใช้ผลลัพธ์จาก /auth/login setUser ทันที → UI เด้งไว
   * 2) แล้วค่อย loadMe() ยืนยัน snapshot อีกที (กันคุกกี้/เซสชันเพิ่งตั้ง)
   */
  const signIn = useCallback(
    async ({ email, password, remember = true }) => {
      setError("");
      bumpReqVer();
      cancelInFlight();

      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: { email, password, remember },
      });

      const norm = normalizeFromUser(data?.user);
      setUser({ ...data.user, ...norm });
      setLoading(false);

      // รอหนึ่ง microtask แล้วค่อย confirm snapshot (ให้เบราว์เซอร์ติดคุกกี้เรียบร้อย)
      setTimeout(() => loadMe(), 0);

      // แจ้งแท็บอื่น (ถ้ามี) ให้รีเฟรชสถานะ
      try {
        new BroadcastChannel("auth").postMessage("changed");
      } catch {}

      return data;
    },
    [loadMe]
  );

  const signOut = useCallback(async () => {
    setError("");
    bumpReqVer();
    cancelInFlight();
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {}
    setUser(null);
    setLoading(false);

    try {
      new BroadcastChannel("auth").postMessage("changed");
    } catch {}
  }, []);

  /**
   * Revalidate แบบเบา ๆ:
   * - เมื่อกลับมาโฟกัสแท็บ
   * - เมื่อกลับมาออนไลน์
   * ทั้งหมดหุ้มด้วย throttle กันเด้งถี่เกินไป
   */
  useEffect(() => {
    const safeReload = throttle(() => {
      if (!user) return; // ยังไม่ล็อกอิน ไม่ต้องโหลด
      const ac = new AbortController();
      loadMe(ac.signal);
      return () => ac.abort();
    }, 3000);

    const onVis = () => {
      if (document.visibilityState === "visible") safeReload();
    };
    const onOnline = () => {
      if (navigator.onLine) safeReload();
    };

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("online", onOnline);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("online", onOnline);
    };
  }, [user, loadMe]);

  /**
   * ซิงก์ข้ามแท็บ/วินโดว์:
   * ถ้าแท็บหนึ่งล็อกอิน/ออก แท็บอื่นจะ loadMe() อัตโนมัติ
   */
  useEffect(() => {
    let bc;
    try {
      bc = new BroadcastChannel("auth");
      bc.onmessage = (ev) => {
        if (ev?.data === "changed") {
          const ac = new AbortController();
          loadMe(ac.signal);
          return () => ac.abort();
        }
      };
    } catch {}
    return () => {
      try {
        bc?.close();
      } catch {}
    };
  }, [loadMe]);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated: !!user,
      signIn,
      signOut,
      reload: () => loadMe(),
    }),
    [user, loading, error, signIn, signOut, loadMe]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

/* ===========================
   Helpers: role / department
   =========================== */

/**
 * เช็ก role ของ user แบบ case-insensitive
 * ใช้ได้ทั้ง user.role.name และ user.roles[]
 * ตัวอย่าง:
 *   isRole(user, "admin")
 *   isRole(user, "hr.manager", "hr.admin")
 */
export function isRole(user, ...names) {
  if (!user) return false;
  const list = Array.isArray(user.roles) ? user.roles : [];
  const roleName = (user.role?.name || "").toLowerCase();
  return (names || []).some((n) => {
    const patt = new RegExp(`^${String(n)}$`, "i");
    return patt.test(roleName) || list.some((r) => patt.test(String(r)));
  });
}

/** alias เพื่อความเข้ากันของของเดิม */
export function isAnyRole(user, names = []) {
  return isRole(user, ...(names || []));
}

/**
 * เช็ก department ด้วย code (string) หรือ id (number)
 * ตัวอย่าง:
 *   inDepartment(user, "HR")
 *   inDepartment(user, 2)
 *   inDepartment(user, "HR", "ACC", 5)
 */
export function inDepartment(user, ...codesOrIds) {
  if (!user?.department) return false;
  const code = String(user.department.code || "").toLowerCase();
  const id = Number(user.department.id);
  return (codesOrIds || []).some((v) => {
    if (typeof v === "number") return id === v;
    if (typeof v === "string") return code === v.toLowerCase();
    return false;
  });
}

/** aliases สำหรับโค้ดเก่าที่อาจ import ชื่อเดิม */
export const hasRole = isRole;
export const hasAnyRole = (user, names = []) => isRole(user, ...(names || []));
