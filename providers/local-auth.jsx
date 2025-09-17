"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthCtx = createContext(null);

function normalizeRoles(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input.map(String);
  if (typeof input === "string") {
    return input
      .split(/[ ,;]/)
      .map((r) => r.trim())
      .filter(Boolean);
  }
  return [];
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // { name, email, photo, roles:[] }
  const [loading, setLoading] = useState(true);

  // โหลด session ปัจจุบันจาก backend local
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/auth/me", { cache: "no-store", credentials: "include" });
        if (!alive) return;
        if (r.ok) {
          const data = await r.json();
          const roles = normalizeRoles(data?.user?.roles);
          setUser(data?.user ? { ...data.user, roles } : null);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  async function signIn({ email, password }) {
    const r = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(err?.error || "Login failed");
    }
    const data = await r.json(); // { ok:true, user:{...} }
    setUser({ ...data.user, roles: normalizeRoles(data.user?.roles) });
    return data;
  }

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => {});
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, signIn, signOut }), [user, loading]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
