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

// ---- Normalizers -------------------------------------------------
function normalizeFromUser(u) {
  const rn = (u?.role?.name || "").toLowerCase();              // "admin", "hr.manager"
  const roles =
    Array.isArray(u?.roles) && u.roles.length
      ? u.roles.map((s) => String(s).toLowerCase())
      : rn
      ? [rn]
      : [];

  const dept = u?.department ?? null;                           // { id, code, nameTh, nameEn }
  const departmentCode =
    (dept?.code && String(dept.code).toLowerCase()) || null;
  const departmentId = dept?.id ?? null;

  return { roleName: rn, roles, department: dept, departmentCode, departmentId };
}

const toLower = (v) => String(v ?? "").toLowerCase();

// ---- Provider ----------------------------------------------------
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id,name,email,role,department,..., roleName, roles[], departmentCode, departmentId }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMe = useCallback(async (signal) => {
    setError("");
    try {
      const data = await apiFetch("/auth/me", { signal });
      const norm = normalizeFromUser(data?.user);
      setUser(data?.user ? { ...data.user, ...norm } : null);
    } catch (e) {
      if (e?.name === "AbortError") return;
      setUser(null);
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
    const norm = normalizeFromUser(data?.user);
    setUser({ ...data.user, ...norm });
    return data;
  }, []);

  const signOut = useCallback(async () => {
    setError("");
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // ignore
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

// ---- Helpers: role / department checks ---------------------------

// เดิม (compat)
export function hasRole(user, roleName) {
  return isRole(user, roleName);
}
export function hasAnyRole(user, names = []) {
  return isRole(user, ...names);
}

// ใหม่ (แนะนำใช้)
export function isRole(user, ...names) {
  const rn = toLower(user?.roleName || user?.role?.name);
  if (!rn && !user?.roles?.length) return false;
  return names.some((n) => {
    const want = toLower(n);
    return rn === want || (user?.roles || []).some((r) => toLower(r) === want);
  });
}

export function inDepartment(user, ...codes) {
  const code = toLower(user?.departmentCode || user?.department?.code);
  if (!code) return false;
  return codes.some((c) => code === toLower(c));
}

// เช็ค “ทั้ง role และ department” (AND)
export function hasRoleAndDepartment(user, roleNames = [], deptCodes = []) {
  const okRole = roleNames.length ? isRole(user, ...roleNames) : true;
  const okDept = deptCodes.length ? inDepartment(user, ...deptCodes) : true;
  return okRole && okDept;
}

// เช็ค “อย่างใดอย่างหนึ่ง” (OR)
export function hasRoleOrDepartment(user, roleNames = [], deptCodes = []) {
  const okRole = roleNames.length ? isRole(user, ...roleNames) : false;
  const okDept = deptCodes.length ? inDepartment(user, ...deptCodes) : false;
  return okRole || okDept;
}
