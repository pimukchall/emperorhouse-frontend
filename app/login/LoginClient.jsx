"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/local-auth";
import StatefulButton from "@/components/ui/stateful-button";
import ErrorDialog from "@/components/ui/ErrorDialog";
import { BackgroundLines } from "@/components/ui/background-lines";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { IconLock } from "@tabler/icons-react";

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = useMemo(() => sp.get("callbackUrl") || "/", [sp]);
  const { user, loading, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) router.replace(callbackUrl);
  }, [user, loading, router, callbackUrl]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await signIn({ email, password, remember });
      router.replace(callbackUrl);
    } catch (err) {
      setError(err?.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
      <BackgroundLines className="fixed inset-0 -z-10" />

      <BackgroundGradient className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 p-6 shadow-lg dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">เข้าสู่ระบบ</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
          ลงชื่อเข้าใช้ด้วยอีเมลและรหัสผ่านของคุณ
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} autoComplete="on">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm text-neutral-700 dark:text-neutral-300">อีเมล</label>
            <input id="email" type="email" autoComplete="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              placeholder="you@example.com" />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm text-neutral-700 dark:text-neutral-300">รหัสผ่าน</label>
            <input id="password" type="password" autoComplete="current-password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              placeholder="••••••••" />
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 select-none text-sm text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-black dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-white" />
              จำฉันไว้ 7 วัน
            </label>
            <a href="/forgot-password" className="text-sm text-neutral-600 hover:underline dark:text-neutral-400">ลืมรหัสผ่าน?</a>
          </div>

          <StatefulButton type="submit"
            className="relative block h-10 w-full rounded-md bg-gradient-to-r from-black to-neutral-700 font-medium text-white shadow-sm hover:opacity-90 transition dark:from-white dark:to-neutral-300 dark:text-black"
            loadingText="กำลังเข้าสู่ระบบ...">
            <span className="inline-flex items-center gap-2">
              <IconLock className="h-4 w-4" /> เข้าสู่ระบบ
            </span>
          </StatefulButton>

          <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            ยังไม่มีบัญชี? <a href="/register" className="underline">สมัครสมาชิก</a>
          </div>
        </form>
      </BackgroundGradient>

      <ErrorDialog open={!!error} message={error} onClose={() => setError("")} />
    </main>
  );
}
