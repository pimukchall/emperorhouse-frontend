"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout({ children }) {
  const { isReady, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && isAuthenticated) router.replace("/");
  }, [isReady, isAuthenticated, router]);

  return (
    <main className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow-lg bg-white dark:bg-neutral-900">
        <div className="mb-4 text-center">
          <div className="text-2xl font-semibold">EMP</div>
          <div className="text-sm opacity-70">Welcome back</div>
        </div>
        {children}
      </div>
    </main>
  );
}
