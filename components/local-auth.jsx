// src/components/local-auth.jsx
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { apiFetch } from "@/lib/api";
// ⬇️ ใช้กฎเดียวกับ middleware
import {
  findRule,
  isAdmin,
  userDeptCodes,
  userRank,
  LEVEL_RANK,
} from "@/access/rules";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setReady] = useState(false);
  const accessTokenRef = useRef(null);

  const refresh = useCallback(async () => {
    try {
      const data = await apiFetch(
        "/auth/refresh",
        { method: "POST" },
        { absoluteUrl: false }
      );
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
      const data = await apiFetch("/auth/me", {}, { absoluteUrl: false });
      setUser(data?.user || null);
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    (async () => {
      const ok = await fetchMe();
      if (!ok) await refresh();
      setReady(true);
    })();
  }, [fetchMe, refresh]);

  const signIn = useCallback(async (email, password) => {
    const data = await apiFetch(
      "/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
      { absoluteUrl: false }
    );
    accessTokenRef.current = data?.accessToken || null;
    setUser(data?.user || null);
    return true;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" }, { absoluteUrl: false });
    } catch {}
    accessTokenRef.current = null;
    setUser(null);
    return true;
  }, []);

  async function authedFetch(pathOrUrl, init = {}) {
    const isAbsolute = /^https?:\/\//i.test(pathOrUrl);
    return apiFetch(pathOrUrl, init, {
      absoluteUrl: isAbsolute,
      getAccessToken: () => accessTokenRef.current,
      onUnauthorized: refresh, // 401 → refresh แล้ว retry (ตาม helper)
    });
  }

  // ──────────────────────────────────────────────────────────────
  // สิทธิ์แบบเดียวกับ middleware (pure + hook + ผ่าน context)
  // ──────────────────────────────────────────────────────────────
  function canVisit(path) {
    return canVisitPure(path, user);
  }

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
    // guards
    canVisit,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider/>");
  return ctx;
}

/* ──────────────────────────────────────────────────────────────
   Role helpers (เดิม)
   - ใช้ในคอมโพเนนต์:  useHasRole("admin") หรือ useHasRole(["admin","user"])
   - ใช้ทั่วไป (นอก React): hasRolePure(user, "admin")
   - hasRole() คงไว้เพื่อ backward-compat
   ────────────────────────────────────────────────────────────── */

export function hasRolePure(user, roleNameMaybe) {
  const role = (user?.role?.name || user?.roleName || "").toLowerCase();
  const targets = Array.isArray(roleNameMaybe)
    ? roleNameMaybe
    : [roleNameMaybe].filter(Boolean);
  return targets.map((t) => String(t).toLowerCase()).includes(role);
}

export function useHasRole(roleNameMaybe) {
  const { user } = useAuth();
  return hasRolePure(user, roleNameMaybe);
}

// DEPRECATED (คงไว้): ดูหมายเหตุในก่อนหน้า
export function hasRole(userOrRoleName, roleNameMaybe) {
  if (typeof userOrRoleName === "string") {
    return useHasRole(userOrRoleName);
  }
  return hasRolePure(userOrRoleName, roleNameMaybe);
}

/* ──────────────────────────────────────────────────────────────
   Path guards ให้ตรงกับ middleware
   - canVisitPure(path, user): ใช้ได้ทุกที่ (pure)
   - useCanVisit(path): ใช้ใน component
   ────────────────────────────────────────────────────────────── */
export function canVisitPure(path, user) {
  if (!user) return false;
  if (isAdmin(user)) return true;

  const rule = findRule(path);
  if (!rule) return true; // ไม่มีข้อกำหนด → ผ่าน

  const { require = {} } = rule;
  const codes = userDeptCodes(user);
  const rank = userRank(user);

  if (require.deptAny?.length) {
    const ok = require.deptAny.some((c) =>
      codes.has(String(c).toUpperCase())
    );
    if (!ok) return false;
  }
  if (require.deptAll?.length) {
    const ok = require.deptAll.every((c) =>
      codes.has(String(c).toUpperCase())
    );
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
