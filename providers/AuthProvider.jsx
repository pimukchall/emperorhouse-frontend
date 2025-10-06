"use client";
import React, { createContext, useCallback, useEffect, useRef, useState, useMemo } from "react";
import { apiFetch, configureApi } from "@/api";
import { findRule, isAdmin, userDeptCodes, userRank, LEVEL_RANK } from "@/access/rules";

export const AuthCtx = createContext(null);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const REFRESH_URL = `${API_BASE}/api/auth/refresh`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setReady] = useState(false);
  const accessTokenRef = useRef(null);
  const refreshRef = useRef(null);

  // --- Refresh (ใช้ cookie httpOnly) ---
  const refreshDirect = useCallback(async () => {
    if (refreshRef.current) return refreshRef.current;

    refreshRef.current = (async () => {
      try {
        const res = await fetch(REFRESH_URL, {
          method: "POST",
          credentials: "include", // รับ cookie จาก server
        });
        if (!res.ok) {
          accessTokenRef.current = null;
          setUser(null);
          return false;
        }
        const data = await res.json().catch(() => ({}));
        accessTokenRef.current = data?.accessToken || null;
        if (data?.user) setUser(data.user);
        return !!accessTokenRef.current;
      } catch {
        accessTokenRef.current = null;
        setUser(null);
        return false;
      } finally {
        refreshRef.current = null;
      }
    })();

    return refreshRef.current;
  }, []);

  // --- /me ---
  const fetchMe = useCallback(async () => {
    try {
      const data = await apiFetch("/api/auth/me");
      setUser(data?.user || null);
      return !!data?.user;
    } catch {
      return false;
    }
  }, []);

  // ให้ api layer รู้วิธีดึง token และทำ auto-refresh เมื่อเจอ 401
  useEffect(() => {
    configureApi({
      getAccessToken: () => accessTokenRef.current,
      onUnauthorized: refreshDirect,
    });
  }, [refreshDirect]);

  // --- Bootstrap: ลอง refresh ก่อน แล้วค่อย me ---
  useEffect(() => {
    (async () => {
      const ok = await refreshDirect();
      if (!ok) await fetchMe();
      else await fetchMe(); // เผื่อกรณี BE ส่ง user ให้หลัง login แบบไม่ต้อง refresh
      setReady(true);
    })();
  }, [fetchMe, refreshDirect]);

  // --- Auth actions ---
  const signIn = useCallback(
    async (username, password) => {
      try {
        const data = await apiFetch("/api/auth/login", {
          method: "POST",
          body: { username, password },
          credentials: "include", // รับ cookie จาก server
        });
        accessTokenRef.current = data?.accessToken || null;
        await fetchMe();
        return { ok: true };
      } catch (e) {
        return { ok: false, message: e?.message || "Login failed" };
      }
    },
    [fetchMe]
  );

  const signOut = useCallback(async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST", credentials: "include" }); // ✅ เคลียร์ cookie
    } catch {}
    accessTokenRef.current = null;
    setUser(null);
    return { ok: true };
  }, []);

  // --- RBAC helper ---
  function canVisit(path) {
    if (!user) return false;
    if (isAdmin(user)) return true;
    const rule = findRule(path);
    if (!rule) return true;
    const { require = {} } = rule;
    const codes = userDeptCodes(user);
    const rank = userRank(user);
    if (require.deptAny?.length && !require.deptAny.some((c) => codes.has(String(c).toUpperCase()))) return false;
    if (require.deptAll?.length && !require.deptAll.every((c) => codes.has(String(c).toUpperCase()))) return false;
    if (require.minRank) {
      const need = LEVEL_RANK[String(require.minRank).toUpperCase()] || 0;
      if (rank < need) return false;
    }
    return true;
  }

  const value = useMemo(
    () => ({
      isReady,
      isAuthenticated: !!user,
      user,
      setUser,
      accessToken: accessTokenRef.current,
      signIn,
      signOut,
      refresh: refreshDirect,
      authedFetch: (url, init = {}) => apiFetch(url, init, { absoluteUrl: /^https?:\/\//i.test(url) }),
      canVisit,
    }),
    [isReady, user, signIn, signOut, refreshDirect]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
