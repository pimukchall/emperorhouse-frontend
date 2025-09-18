"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/local-auth";
import StatefulButton from "@/components/ui/stateful-button";
import { BackgroundLines } from "@/components/ui/background-lines";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { IconLock } from "@tabler/icons-react";

// ✅ โมดัลมาตรฐาน
import NoticeDialog from "@/components/modal/NoticeDialog";
import ForgotPasswordDialog from "@/components/modal/ForgotPasswordDialog";

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = useMemo(() => sp.get("callbackUrl") || "/", [sp]);
  const { user, loading, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);

  // ✅ โมดัลแจ้งผลลัพธ์ (success/error/info)
  const [notice, setNotice] = useState({
    open: false,
    type: "info", // 'success' | 'error' | 'info'
    message: "",
  });

  // ✅ โมดัลลืมรหัสผ่าน
  const [showForgot, setShowForgot] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace(callbackUrl);
  }, [user, loading, router, callbackUrl]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    setBusy(true);
    try {
      await signIn({ email, password, remember });

      // ✅ แสดง Success modal สั้น ๆ ก่อนเปลี่ยนหน้า
      setNotice({ open: true, type: "success", message: "เข้าสู่ระบบสำเร็จ" });
      setTimeout(() => router.replace(callbackUrl), 700);
    } catch (err) {
      setNotice({
        open: true,
        type: "error",
        message: err?.message || "เข้าสู่ระบบไม่สำเร็จ",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <BackgroundLines className="fixed inset-0 -z-10" />

      <BackgroundGradient className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 p-6 shadow-lg dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          เข้าสู่ระบบ
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
          ลงชื่อเข้าใช้ด้วยอีเมลและรหัสผ่านของคุณ
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm text-neutral-700 dark:text-neutral-300"
            >
              อีเมล
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm text-neutral-700 dark:text-neutral-300"
            >
              รหัสผ่าน
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 select-none text-sm text-neutral-700 dark:text-neutral-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-black dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-white"
              />
              จำฉันไว้ 7 วัน
            </label>

            {/* 🔁 เปลี่ยนจากลิงก์ ไปเปิดโมดัลลืมรหัสผ่าน */}
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-sm text-neutral-600 underline-offset-2 hover:underline dark:text-neutral-400"
            >
              ลืมรหัสผ่าน?
            </button>
          </div>

          <StatefulButton
            type="submit"
            loading={busy}
            loadingText="กำลังเข้าสู่ระบบ..."
            className="relative block h-10 w-full rounded-md bg-gradient-to-r from-black to-neutral-700 font-medium text-white shadow-sm transition hover:opacity-90 dark:from-white dark:to-neutral-300 dark:text-black"
          >
            <span className="inline-flex items-center gap-2">
              <IconLock className="h-4 w-4" /> เข้าสู่ระบบ
            </span>
          </StatefulButton>

          <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            ยังไม่มีบัญชี?{" "}
            <a href="/register" className="underline">
              สมัครสมาชิก
            </a>
          </div>
        </form>
      </BackgroundGradient>

      {/* ✅ Success/Error dialog */}
      <NoticeDialog
        open={notice.open}
        onClose={() => setNotice((s) => ({ ...s, open: false }))}
        type={notice.type}
        message={notice.message}
      />

      {/* ✅ Forgot password modal */}
      <ForgotPasswordDialog
        open={showForgot}
        onClose={() => setShowForgot(false)}
        defaultEmail={email}
      />
    </main>
  );
}
