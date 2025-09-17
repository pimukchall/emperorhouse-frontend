"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "@/lib/api";

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
  const [user, setUser] = useState(null); // { id,name,email,photo?, roles:[], department? }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMe = useCallback(async (signal) => {
    setError("");
    try {
      // ส่ง signal ต่อไป apiFetch -> fetch
      const data = await apiFetch("/auth/me", { signal });
      const roles = normalizeRoles(data?.user?.roles);
      const department = data?.user?.department ?? null;
      setUser(data?.user ? { ...data.user, roles, department } : null);
    } catch (e) {
      // ถ้าโดนยกเลิก ก็ไม่ต้องทำอะไร
      if (e?.name === "AbortError") return;
      // ไม่ว่าเหตุผลไหน เคลียร์เป็น not-auth ไว้ก่อน
      setUser(null);
      // เก็บข้อความ error แบบเบา ๆ เผื่อ UI อยากโชว์
      setError(e?.message || "");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    loadMe(ac.signal);
    return () => ac.abort();
  }, [loadMe]);

  const signIn = useCallback(async ({ email, password, remember = true }) => {
    setError("");
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: { email, password, remember },
    });
    setUser({
      ...data.user,
      roles: normalizeRoles(data.user?.roles),
      department: data.user?.department ?? null,
    });
    return data;
  }, []);

  const signOut = useCallback(async () => {
    setError("");
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // เงียบ ๆ ได้ เพราะเราจะล้าง state อยู่แล้ว
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated: !!user,
      signIn,
      signOut,
      reload: () => {
        setLoading(true);
        const ac = new AbortController();
        loadMe(ac.signal);
        return () => ac.abort();
      },
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

// helpers สำหรับเช็คสิทธิ์
export function hasRole(user, roleName) {
  return !!user?.roles?.some((r) => new RegExp(`^${roleName}$`, "i").test(r));
}
export function hasAnyRole(user, names = []) {
  return !!user?.roles?.some((r) =>
    names.some((n) => new RegExp(`^${n}$`, "i").test(r))
  );
}
