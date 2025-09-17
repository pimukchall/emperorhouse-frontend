"use client";

import { useState } from "react";
import StatefulButton from "@/components/ui/stateful-button";
import ErrorDialog from "@/components/ui/ErrorDialog";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { IconMail } from "@tabler/icons-react";
import { apiFetch } from "@/lib/api";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const r = await apiFetch("/auth/forgot-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        throw new Error(err?.error || "ไม่สามารถส่งอีเมลรีเซ็ตได้");
      }
      setSent(true);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
      <BackgroundGradient className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 p-6 shadow-lg dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">ลืมรหัสผ่าน</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
          กรอกอีเมลของคุณ เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้
        </p>

        {sent ? (
          <div className="mt-6 rounded-md border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200">
            ส่งลิงก์รีเซ็ตไปที่อีเมลแล้ว กรุณาตรวจสอบกล่องจดหมาย
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-neutral-700 dark:text-neutral-300">อีเมล</label>
              <input id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="you@example.com" />
            </div>

            <StatefulButton type="submit" loadingText="กำลังส่ง..." className="h-10 w-full rounded-md bg-black text-white dark:bg-white dark:text-black">
              <span className="inline-flex items-center gap-2">
                <IconMail className="h-4 w-4" /> ส่งลิงก์รีเซ็ต
              </span>
            </StatefulButton>
          </form>
        )}
      </BackgroundGradient>

      <ErrorDialog open={!!error} message={error} onClose={() => setError("")} />
    </main>
  );
}
