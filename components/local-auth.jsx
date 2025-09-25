"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { apiFetch, configureApiAuth } from "@/lib/api";
import { findRule, isAdmin, userDeptCodes, userRank, LEVEL_RANK } from "@/access/rules";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setReady] = useState(false);
  const accessTokenRef = useRef(null);

  const refresh = useCallback(async () => {
    try {
      const data = await apiFetch("/auth/refresh", { method: "POST" });
      accessTokenRef.current = data?.accessToken || null;
      setUser(data?.user || null);
      return true;
    } catch {
      accessTokenRef.current = null;
      setUser(null);
      return false;
    }
  }, []);

  const fetchMe = useCallback(async () => {
    try {
      const data = await apiFetch("/auth/me");
      setUser(data?.user || null);
      return !!data?.user;
    } catch {
      return false;
    }
  }, []);

  // 👉 ลงทะเบียน token getter + handler ให้ apiFetch ใช้ทั่วแอป
  useEffect(() => {
    configureApiAuth({
      getAccessToken: () => accessTokenRef.current,
      onUnauthorized: refresh,
    });
  }, [refresh]);

  useEffect(() => {
    (async () => {
      const ok = await fetchMe();
      if (!ok) await refresh();
      setReady(true);
    })();
  }, [fetchMe, refresh]);

  const signIn = useCallback(async (email, password) => {
    await apiFetch("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    await fetchMe();
    return true;
  }, [fetchMe]);

  const signOut = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {}
    accessTokenRef.current = null;
    setUser(null);
    return true;
  }, []);

  // (ยังคง authedFetch ไว้สำหรับบางเคสที่อยาก override เป็นรายคำขอ)
  async function authedFetch(pathOrUrl, init = {}) {
    const isAbs = /^https?:\/\//i.test(pathOrUrl);
    return apiFetch(pathOrUrl, init, { absoluteUrl: isAbs });
  }

  function canVisit(path) { return canVisitPure(path, user); }

  const value = {
    isReady,
    isAuthenticated: !!user,
    user,
    setUser,
    accessToken: accessTokenRef.current,
    signIn,
    signOut,
    refresh,
    authedFetch,
    canVisit,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider/>");
  return ctx;
}

// ---- Guards (คงเดิม) ----
export function hasRolePure(user, roleNameMaybe) {
  const role = (user?.role?.name || user?.roleName || "").toLowerCase();
  const targets = Array.isArray(roleNameMaybe) ? roleNameMaybe : [roleNameMaybe].filter(Boolean);
  return targets.map((t) => String(t).toLowerCase()).includes(role);
}
export function useHasRole(roleNameMaybe) {
  const { user } = useAuth();
  return hasRolePure(user, roleNameMaybe);
}
export function hasRole(userOrRoleName, roleNameMaybe) {
  if (typeof userOrRoleName === "string") return useHasRole(userOrRoleName);
  return hasRolePure(userOrRoleName, roleNameMaybe);
}
export function canVisitPure(path, user) {
  if (!user) return false;
  if (isAdmin(user)) return true;
  const rule = findRule(path);
  if (!rule) return true;
  const { require = {} } = rule;
  const codes = userDeptCodes(user);
  const rank = userRank(user);
  if (require.deptAny?.length) {
    const ok = require.deptAny.some((c) => codes.has(String(c).toUpperCase()));
    if (!ok) return false;
  }
  if (require.deptAll?.length) {
    const ok = require.deptAll.every((c) => codes.has(String(c).toUpperCase()));
    if (!ok) return false;
  }
  if (require.minRank) {
    const need = LEVEL_RANK[String(require.minRank).toUpperCase()] || 0;
    if (rank < need) return false;
  }
  return true;
}
export function useCanVisit(path) {
  const { user } = useAuth();
  return canVisitPure(path, user);
}
