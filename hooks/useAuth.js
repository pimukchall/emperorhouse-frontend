"use client";
import { useContext } from "react";
import { AuthCtx } from "@/providers/AuthProvider";

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider/>");
  return ctx;
}