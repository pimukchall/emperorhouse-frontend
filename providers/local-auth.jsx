// React Auth context: จัดการ login / refresh / authedFetch ฝั่ง client
"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { apiUrl, apiFetch } from "@/lib/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setReady] = useState(false);
  const accessTokenRef = useRef(null);

  const refresh = useCallback(async () => {
    try {
      const data = await apiFetch("/auth/refresh", { method: "POST" }, { absoluteUrl: false });
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
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    // เริ่มด้วยการลอง /auth/me ก่อน ถ้า 401 ตัว apiFetch จะไม่ refresh อัตโนมัติ
    // เราค่อยลอง refresh เองเพื่อยืดอายุ session
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
      {
        absoluteUrl: false,
      }
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
    return apiFetch(
      pathOrUrl,
      init,
      {
        absoluteUrl: isAbsolute,
        getAccessToken: () => accessTokenRef.current,
        onUnauthorized: refresh,
      }
    );
  }

  const value = {
    isReady,
    user,
    setUser,
    accessToken: accessTokenRef.current,
    signIn,
    signOut,
    refresh,
    authedFetch,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider/>");
  return ctx;
}

export function hasRole(userOrRoleName, roleNameMaybe) {
  // ใช้ได้สองรูปแบบ:
  // 1) hasRole("admin")  → จะอ่าน user จาก context
  // 2) hasRole(user, "admin" | ["admin", "user"])
  const ctx = typeof userOrRoleName === "string" ? useAuth() : null;
  const user = typeof userOrRoleName === "string" ? ctx.user : userOrRoleName;
  const role = (user?.role?.name || user?.roleName || "").toLowerCase();
  const targets = Array.isArray(roleNameMaybe)
    ? roleNameMaybe
    : [typeof userOrRoleName === "string" ? userOrRoleName : roleNameMaybe].filter(Boolean);
  return targets.map((t) => String(t).toLowerCase()).includes(role);
}
