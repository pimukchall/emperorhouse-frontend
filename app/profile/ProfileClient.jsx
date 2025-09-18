"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/local-auth";
import { apiFetch, apiUrl } from "@/lib/api";
import StatefulButton from "@/components/ui/stateful-button";
import ErrorDialog from "@/components/ui/ErrorDialog";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function ProfileClient() {
  const router = useRouter();
  const { user, loading, reload } = useAuth();

  const [form, setForm] = useState({
    email: "",
    name: "",
    firstNameTh: "",
    lastNameTh: "",
    firstNameEn: "",
    lastNameEn: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  // ใช้ tick สำหรับ cache-busting ของรูป
  const [avatarTick, setAvatarTick] = useState(0);
  const [avatarError, setAvatarError] = useState(false);
  const avatarUrl =
    user?.id ? apiUrl(`/profile/files/user/avatar/${user.id}?ts=${avatarTick}`) : "";

  useEffect(() => {
    if (!loading && !user) router.replace("/login?callbackUrl=/profile");
  }, [loading, user, router]);

  useEffect(() => {
    let stop = false;
    (async () => {
      if (!user?.id) return;
      try {
        const res = await apiFetch(`/api/users/${user.id}`);
        const u = res?.data || {};
        if (!stop) {
          setForm({
            email: u.email || "",
            name: u.name || "",
            firstNameTh: u.firstNameTh || "",
            lastNameTh: u.lastNameTh || "",
            firstNameEn: u.firstNameEn || "",
            lastNameEn: u.lastNameEn || "",
          });
          // โหลด avatar ครั้งแรก + เคลียร์ error รูปก่อนหน้า
          setAvatarError(false);
          setAvatarTick(Date.now());
        }
      } catch (e) {
        if (!stop) setError(e?.message || "โหลดโปรไฟล์ล้มเหลว");
      }
    })();
    return () => {
      stop = true;
    };
  }, [user?.id]);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setOk(false);
    setError("");

    try {
      await apiFetch(`/api/users/${user.id}`, {
        method: "PATCH",
        body: {
          name: (form.name || "").trim(),
          firstNameTh: form.firstNameTh,
          lastNameTh: form.lastNameTh,
          firstNameEn: form.firstNameEn,
          lastNameEn: form.lastNameEn,
        },
      });
      setOk(true);
      reload?.(); // sync session -> navbar แสดงชื่อใหม่
    } catch (e) {
      setError(e?.data?.error || e?.message || "บันทึกไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function onUploadAvatar(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("กรุณาเลือกรูปภาพเท่านั้น");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("ขนาดไฟล์ต้องไม่เกิน 2MB");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("avatar", file); // ให้ตรงกับ backend (uploadAvatarSingle รับ field นี้)
      await apiFetch("/profile/avatar", { method: "PUT", body: fd });
      setAvatarError(false);      // เคลียร์สถานะ error เพื่อให้ลองโหลดใหม่
      setAvatarTick(Date.now());  // รีเฟรชรูป (cache bust)
      reload?.();
    } catch (e) {
      setError(e?.data?.error || e?.message || "อัปโหลดรูปไม่สำเร็จ");
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 py-30 space-y-8">
      <BackgroundGradient className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          โปรไฟล์ของฉัน
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          แก้ไขชื่อที่แสดง อัปโหลดรูปโปรไฟล์ และจัดการข้อมูลของคุณ
        </p>

        {/* Avatar upload */}
        <div className="mt-6 flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10 bg-neutral-200 dark:bg-neutral-800">
            {/* มี URL และไม่ error → โชว์รูป; ถ้า error/ไม่มี → fallback icon */}
            {avatarUrl && !avatarError ? (
              <img
                key={avatarUrl} // ให้ React re-mount เมื่อ tick เปลี่ยน
                src={avatarUrl}
                alt="avatar"
                className="h-full w-full object-cover"
                onLoad={() => setAvatarError(false)}
                onError={() => setAvatarError(true)}
                referrerPolicy="no-referrer"
              />
            ) : (
              // fallback icon
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 opacity-80"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                />
              </svg>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onUploadAvatar(e.target.files?.[0])}
              />
              <span className="rounded-md border px-3 py-1.5 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900">
                เลือกรูปใหม่…
              </span>
            </label>
            <span className="text-xs text-neutral-500">
              รองรับ PNG/JPG/WEBP สูงสุด 2MB
            </span>
          </div>
        </div>

        {/* Profile form */}
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label className="text-sm text-neutral-700 dark:text-neutral-300">
              อีเมล (แก้ไขโดยผู้ดูแล)
            </label>
            <input
              value={form.email}
              disabled
              className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm opacity-90 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="name"
              className="text-sm text-neutral-700 dark:text-neutral-300"
            >
              ชื่อที่แสดง (ชื่อเล่น)
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              placeholder="เช่น โอ๋, Beam, ฯลฯ"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">
                ชื่อ (ไทย)
              </label>
              <input
                value={form.firstNameTh}
                onChange={(e) =>
                  setForm({ ...form, firstNameTh: e.target.value })
                }
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">
                นามสกุล (ไทย)
              </label>
              <input
                value={form.lastNameTh}
                onChange={(e) =>
                  setForm({ ...form, lastNameTh: e.target.value })
                }
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">
                ชื่อ (อังกฤษ)
              </label>
              <input
                value={form.firstNameEn}
                onChange={(e) =>
                  setForm({ ...form, firstNameEn: e.target.value })
                }
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">
                นามสกุล (อังกฤษ)
              </label>
              <input
                value={form.lastNameEn}
                onChange={(e) =>
                  setForm({ ...form, lastNameEn: e.target.value })
                }
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          {ok && (
            <div className="rounded-md border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200">
              บันทึกแล้ว
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <a href="/profile/change-password" className="text-sm underline">
              เปลี่ยนรหัสผ่าน
            </a>
            <StatefulButton
              type="submit"
              loading={busy}
              loadingText="กำลังบันทึก..."
              className="h-10 rounded-md bg-black px-4 text-white dark:bg-white dark:text-black"
            >
              บันทึกการเปลี่ยนแปลง
            </StatefulButton>
          </div>
        </form>
      </BackgroundGradient>

      <ErrorDialog open={!!error} message={error} onClose={() => setError("")} />
    </main>
  );
}
