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
 * ดึง/คำนวณข้อมูลที่ UI ใช้บ่อยจากโครง user
 * - roleName/roles: อ้างจาก user.role (และรองรับกรณีเดิม ๆ ที่อาจมี user.roles เป็นอาเรย์)
 * - department: ย้ายมาอ่านจาก user.primaryUserDept.department
 * - positionLevel/positionName: จาก primaryUserDept
 * - primaryUserDeptId: เก็บไว้ใช้ตรวจเทียบฝั่ง UI อื่น ๆ
 */
function normalizeFromUser(u) {
  const roleName = (u?.role?.name || "").toLowerCase();
  const roles =
    Array.isArray(u?.roles) && u.roles.length
      ? u.roles.map((x) => String(x).toLowerCase())
      : roleName
      ? [roleName]
      : [];

  const primaryUserDept = u?.primaryUserDept ?? null;
  const department = primaryUserDept?.department ?? null;
  const positionLevel = primaryUserDept?.positionLevel ?? null;
  const positionName = primaryUserDept?.positionName ?? null;
  const primaryUserDeptId = u?.primaryUserDeptId ?? primaryUserDept?.id ?? null;

  return {
    roleName,
    roles,
    department,
    positionLevel,
    positionName,
    primaryUserDeptId,
  };
}

/** throttle ง่ายๆ สำหรับ revalidate on focus/online */
function throttle(fn, wait = 3000) {
  let last = 0;
  let timer = null;
  return (...args) => {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      last = now;
      return fn(...args);
    }
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        last = Date.now();
        fn(...args);
      }, remaining);
    }
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const once = useRef(false);

  const load = useCallback(async () => {
    try {
      const r = await apiFetch("/auth/me");
      if (r?.isAuthenticated && r?.user) {
        const extras = normalizeFromUser(r.user);
        setUser({ ...r.user, ...extras });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (once.current) return;
    once.current = true;
    load();

    const onFocus = throttle(load, 3000);
    const onOnline = throttle(load, 3000);
    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onOnline);
    };
  }, [load]);

  // helper action (optional): ให้หน้า Login เรียกใช้ได้สะดวก
  const login = useCallback(async (email, password, remember = false) => {
    await apiFetch("/auth/login", { method: "POST", body: { email, password, remember } });
    await load();
  }, [load]);

  const logout = useCallback(async () => {
    // ถ้ามี endpoint /auth/logout ก็เรียก; ถ้าไม่มี แค่ล้าง state ก็พอ
    try { await apiFetch("/auth/logout", { method: "POST" }); } catch {}
    setUser(null);
  }, []);

  const value = useMemo(() => {
    const isAdmin = user?.role?.name?.toLowerCase() === "admin";
    const isMD = user?.positionLevel === "MD";
    return {
      user,
      loading,
      reload: load,
      login,
      logout,
      // สิทธิ์ “เทียบเท่าแอดมิน” ถ้าเป็น MD
      isAdmin: isAdmin,
      isMD: isMD,
      isAdminOrMD: isAdmin || isMD,
    };
  }, [user, loading, load, login, logout]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}

/** ตรวจว่า user มี role ตามที่ระบุ (เช็คชื่อเป็น lower-case) */
export function hasRole(user, ...names) {
  if (!user) return false;
  const roleName = (user.role?.name || "").toLowerCase();
  const set = new Set(
    (Array.isArray(user.roles) ? user.roles : [roleName])
      .filter(Boolean)
      .map((s) => String(s).toLowerCase())
  );
  return names.some((n) => set.has(String(n).toLowerCase()));
}

// ให้รองรับ import ชื่อเดิมในโปรเจกต์: isRole === hasRole
export const isRole = hasRole;

/**
 * ตรวจว่า user อยู่ในแผนกที่ระบุ (รับได้ทั้ง code หรือ id)
 * อ่านจาก primaryUserDept.department (ถ้าไม่มีจะพยายาม fallback ไป user.department เพื่อความเข้ากันได้)
 */
export function inDepartment(user, ...codesOrIds) {
  const dept = user?.primaryUserDept?.department ?? user?.department ?? null;
  if (!dept) return false;
  const code = String(dept.code || "").toLowerCase();
  const id = Number(dept.id);
  return codesOrIds.some((k) =>
    typeof k === "number" ? id === Number(k) : code === String(k).toLowerCase()
  );
}
