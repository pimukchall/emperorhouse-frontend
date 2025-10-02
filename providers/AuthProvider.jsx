"use client";
import React, { createContext, useCallback, useEffect, useRef, useState, useMemo } from "react";
import { apiFetch, configureApiAuth } from "@/api";
import { findRule, isAdmin, userDeptCodes, userRank, LEVEL_RANK } from "@/access/rules";

export const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setReady] = useState(false);
  const accessTokenRef = useRef(null);

  const refresh = useCallback(async () => {
    try {
      const data = await apiFetch("/api/auth/refresh", { method: "POST" });
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
      const data = await apiFetch("/api/auth/me");
      setUser(data?.user || null);
      return !!data?.user;
    } catch {
      return false;
    }
  }, []);

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
    try {
      const data = await apiFetch("/api/auth/login", { method: "POST", body: { email, password } });
      accessTokenRef.current = data?.accessToken || null;
      await fetchMe();
      return true;
    } catch {
      return false;
    }
  }, [fetchMe]);

  const signOut = useCallback(async () => {
    try { await apiFetch("/api/auth/logout", { method: "POST" }); } catch {}
    accessTokenRef.current = null;
    setUser(null);
    return true;
  }, []);

  function canVisit(path) {
    if (!user) return false;
    if (isAdmin(user)) return true;
    const rule = findRule(path);
    if (!rule) return true;
    const { require = {} } = rule;
    const codes = userDeptCodes(user);
    const rank  = userRank(user);
    if (require.deptAny?.length && !require.deptAny.some((c) => codes.has(String(c).toUpperCase()))) return false;
    if (require.deptAll?.length && !require.deptAll.every((c) => codes.has(String(c).toUpperCase()))) return false;
    if (require.minRank) {
      const need = LEVEL_RANK[String(require.minRank).toUpperCase()] || 0;
      if (rank < need) return false;
    }
    return true;
  }

  const value = useMemo(() => ({
    isReady,
    isAuthenticated: !!user,
    user,
    setUser,
    accessToken: accessTokenRef.current,
    signIn,
    signOut,
    refresh,
    authedFetch: (url, init={}) => apiFetch(url, init, { absoluteUrl: /^https?:\/\//i.test(url) }),
    canVisit,
  }), [isReady, user, signIn, signOut, refresh]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}