"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { apiUrl, apiFetch } from "../lib/api";

// ----- helpers (export ชื่อพวกนี้ไว้ให้ component อื่นใช้) -----
export function hasRole(userOrRoleName, roleNameMaybe) {
  const ctx = typeof userOrRoleName === "string" ? useAuth() : null;
  const user = typeof userOrRoleName === "string" ? ctx.user : userOrRoleName;
  const role = (user?.role?.name || user?.roleName || "").toLowerCase();
  const target = (
    typeof userOrRoleName === "string" ? userOrRoleName : roleNameMaybe || ""
  ).toLowerCase();
  return role === target;
}
export function inDepartment(user, deptCode) {
  const code = (
    user?.primaryUserDept?.department?.code ||
    user?.deptCode ||
    ""
  ).toUpperCase();
  return code === String(deptCode || "").toUpperCase();
}

// ----- Context -----
const AuthCtx = createContext(null);
export function useAuth() {
  const v = useContext(AuthCtx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider/>");
  return v;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const accessTokenRef = useRef(null);

  // normalize /auth/me response
  function normalizeMe(payload) {
    // แบบเก่า: { ok, data }
    if (payload && typeof payload === "object" && "data" in payload) {
      return { ok: !!payload.ok, isAuthenticated: true, user: payload.data };
    }
    // แบบใหม่: { ok, isAuthenticated, user }
    if (payload && typeof payload === "object" && "isAuthenticated" in payload) {
      return payload;
    }
    return { ok: false, isAuthenticated: false, user: null };
  }

  // โหลด me ตอน mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await apiFetch("/auth/me");
        const j = normalizeMe(raw);
        if (!cancelled) {
          setIsAuthenticated(!!j.isAuthenticated);
          setUser(j.user || null);
        }
      } catch {
        if (!cancelled) {
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function refresh() {
    try {
      const j = await apiFetch("/auth/refresh", { method: "POST" });
      if (j?.ok && j.accessToken) {
        accessTokenRef.current = j.accessToken;
        if (j.user) {
          setUser(j.user);
          setIsAuthenticated(true);
        }
        return true;
      }
    } catch {}
    accessTokenRef.current = null;
    return false;
  }

  async function signIn(email, password, { remember = true } = {}) {
    try {
      const j = await apiFetch("/auth/login", {
        method: "POST",
        body: { email, password, remember },
      });
      if (!j?.ok) throw new Error(j?.error || "Login failed");
      accessTokenRef.current = j.accessToken || null;

      // ถ้า backend ส่ง user มากับ login ใช้เลย
      if (j.user) {
        setUser(j.user);
        setIsAuthenticated(true);
        return true;
      }

      // fallback: ดึง me
      const meRaw = await apiFetch("/auth/me");
      const me = normalizeMe(meRaw);
      setUser(me.user || null);
      setIsAuthenticated(!!me.isAuthenticated);
      return true;
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  }

  async function signOut() {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {}
    accessTokenRef.current = null;
    setIsAuthenticated(false);
    setUser(null);
  }

  /** authedFetch: แนบ Bearer + retry เมื่อ 401 ด้วย /auth/refresh */
  async function authedFetch(pathOrUrl, init = {}) {
    const isAbsolute = /^https?:\/\//i.test(pathOrUrl);
    return apiFetch(
      isAbsolute ? pathOrUrl : pathOrUrl,
      init,
      {
        absoluteUrl: isAbsolute,
        getAccessToken: () => accessTokenRef.current,
        onUnauthorized: refresh,
      }
    );
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      signIn,
      signOut,
      refresh,
      authedFetch,
      apiUrl,
      hasRole: (role) => hasRole(user, role),
      inDepartment: (code) => inDepartment(user, code),
      getAccessToken: () => accessTokenRef.current,
    }),
    [user, isAuthenticated, loading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}