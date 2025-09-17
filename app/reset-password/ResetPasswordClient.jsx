"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StatefulButton from "@/components/ui/stateful-button";
import ErrorDialog from "@/components/ui/ErrorDialog";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { IconKey } from "@tabler/icons-react";
import { apiFetch } from "@/lib/api";

export default function ResetPasswordClient({ token = "" }) {
  const router = useRouter();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!token) {
      setError("ลิงก์ไม่ถูกต้องหรือหมดอายุ");
      return;
    }
    if (form.password !== form.confirm) {
      setError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    try {
      const r = await apiFetch("/auth/reset-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, password: form.password }),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        throw new Error(err?.error || "รีเซ็ตรหัสผ่านไม่สำเร็จ");
      }
      setDone(true);
      setTimeout(() => router.replace("/login"), 1200);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
      <BackgroundGradient className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 p-6 shadow-lg dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">ตั้งรหัสผ่านใหม่</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">กรอกรหัสผ่านใหม่ของคุณ</p>

        {done ? (
          <div className="mt-6 rounded-md border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200">
            ตั้งรหัสผ่านเรียบร้อย กำลังพาไปหน้าเข้าสู่ระบบ…
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm text-neutral-700 dark:text-neutral-300">รหัสผ่านใหม่</label>
              <input id="password" type="password" autoComplete="new-password" required value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="อย่างน้อย 8 ตัวอักษร" />
            </div>
            <div className="space-y-1">
              <label htmlFor="confirm" className="text-sm text-neutral-700 dark:text-neutral-300">ยืนยันรหัสผ่าน</label>
              <input id="confirm" type="password" autoComplete="new-password" required value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="พิมพ์ซ้ำอีกครั้ง" />
            </div>

            <StatefulButton type="submit" loadingText="กำลังบันทึก..." className="h-10 w-full rounded-md bg-black text-white dark:bg-white dark:text-black">
              <span className="inline-flex items-center gap-2">
                <IconKey className="h-4 w-4" /> ตั้งรหัสผ่านใหม่
              </span>
            </StatefulButton>
          </form>
        )}
      </BackgroundGradient>

      <ErrorDialog open={!!error} message={error} onClose={() => setError("")} />
    </main>
  );
}
