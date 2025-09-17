"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/local-auth";
import { apiFetch } from "@/lib/api";
import StatefulButton from "@/components/ui/stateful-button";
import ErrorDialog from "@/components/ui/ErrorDialog";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { IconUserPlus } from "@tabler/icons-react";

export default function RegisterClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = useMemo(() => sp.get("callbackUrl") || "/", [sp]);
  const { user, loading } = useAuth();

  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    departmentId: "",          // เก็บเป็น string ในฟอร์ม
  });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace(callbackUrl);
  }, [user, loading, router, callbackUrl]);

  // ✅ โหลดรายชื่อแผนก รองรับทั้ง {data:[...]} และ [...] ตรง ๆ
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch("/api/departments");
        const list = Array.isArray(res)
          ? res
          : (res && Array.isArray(res.data) ? res.data : []);
        if (!cancelled) setDepartments(list);
      } catch (e) {
        if (!cancelled) setError(e?.message || "โหลดแผนกล้มเหลว");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    if (!form.departmentId) {
      setError("กรุณาเลือกแผนก");
      return;
    }

    try {
      // ✅ แปลง departmentId เป็น number (ตามตัวอย่าง id: 1,2)
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        departmentId: Number(form.departmentId) || form.departmentId,
      };

      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: payload,
      });

      // ถ้าแบ็กเอนด์ส่ง {ok:false} มาพร้อม 200 ให้กันไว้
      if (res && res.ok === false) {
        throw new Error(res.error || "สมัครสมาชิกไม่สำเร็จ");
      }

      setDone(true);
      setTimeout(() => {
        router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      }, 1100);
    } catch (e) {
      setError(e?.data?.error || e?.message || "สมัครสมาชิกไม่สำเร็จ");
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
      <BackgroundGradient className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 p-6 shadow-lg dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">สมัครสมาชิก</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
          สร้างบัญชีใหม่เพื่อใช้งานระบบ (สิทธิ์เริ่มต้น: staff)
        </p>

        {done ? (
          <div className="mt-6 rounded-md border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200">
            สมัครสำเร็จ กำลังพาไปหน้าเข้าสู่ระบบ…
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit} autoComplete="on">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm text-neutral-700 dark:text-neutral-300">ชื่อที่แสดง</label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="ชื่อ-นามสกุล หรือชื่อเล่น"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-neutral-700 dark:text-neutral-300">อีเมล</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="department" className="text-sm text-neutral-700 dark:text-neutral-300">แผนก</label>
              <select
                id="department"
                required
                value={form.departmentId}
                onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              >
                <option value="">-- เลือกแผนก --</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.code ? `[${d.code}] ` : ""}{d.nameTh || d.nameEn || d.code}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm text-neutral-700 dark:text-neutral-300">รหัสผ่าน</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="อย่างน้อย 8 ตัวอักษร"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="confirm" className="text-sm text-neutral-700 dark:text-neutral-300">ยืนยันรหัสผ่าน</label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                required
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="พิมพ์ซ้ำอีกครั้ง"
              />
            </div>

            <StatefulButton
              type="submit"
              loadingText="กำลังสมัคร..."
              className="h-10 w-full rounded-md bg-black text-white dark:bg-white dark:text-black"
            >
              <span className="inline-flex items-center gap-2">
                <IconUserPlus className="h-4 w-4" /> สมัครสมาชิก
              </span>
            </StatefulButton>

            <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              มีบัญชีแล้ว? <a href="/login" className="underline">เข้าสู่ระบบ</a>
            </div>
          </form>
        )}
      </BackgroundGradient>

      <ErrorDialog open={!!error} message={error} onClose={() => setError("")} />
    </main>
  );
}
