"use client";

import { useAuth } from "@/domains/auth/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }) {
  const { user, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && user) router.replace("/");
  }, [isReady, user, router]);

  return (
    <main className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow-lg bg-white/80 dark:bg-neutral-900/70 backdrop-blur">
        <div className="mb-4 text-center">
          <div className="text-2xl font-semibold">EMP</div>
          <div className="text-sm opacity-70">Welcome back</div>
        </div>
        {children}
      </div>
    </main>
  );
}
