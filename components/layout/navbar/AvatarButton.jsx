"use client";

import Link from "next/link";
// ใช้ <img> ปลอดภัยสุด ไม่ต้อง config remotePatterns ของ next/image
import { apiUrl } from "@/lib/api";

function initialsFrom(name, email) {
  const src = (name && name.trim()) || (email && email.split("@")[0]) || "";
  if (!src) return "?";
  const parts = src.split(/\s+/).filter(Boolean);
  const pick =
    parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : src.slice(0, 2);
  return pick.toUpperCase();
}

/**
 * Props:
 * - href: ลิงก์ไปหน้าโปรไฟล์ (default "/profile")
 * - name, email: ใช้ทำตัวอักษร fallback
 * - photo: ถ้ามี (เช่น URL เต็ม / หรือ path จาก backend) จะใช้ทันที
 * - userId: ถ้าให้มา จะประกอบ URL เป็น /files/user/avatar/:userId
 * - fetchUrl: ถ้าอยากกำหนด path เองแทน userId (เช่น "/profile/files/user/avatar/123")
 * - version: number/string สำหรับ cache-busting (เช่น Date.now())
 */
export default function AvatarButton({
  href = "/profile",
  name,
  email,
  photo,
  userId,
  fetchUrl,
  version,
  onClick,
  className,
}) {
  // 1) เลือกฐาน URL ตามลำดับ: photo > userId > fetchUrl
  let base =
    photo ||
    (userId ? apiUrl(`/profile/files/user/avatar/${userId}`) : fetchUrl ? apiUrl(fetchUrl) : "");

  // 2) เติม ?ts=xxx เพื่อ bust cache เวลาอัปโหลดรูปใหม่
  const resolved =
    base && version != null
      ? `${base}${base.includes("?") ? "&" : "?"}ts=${encodeURIComponent(version)}`
      : base;

  const label = "Open account page";

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={label}
      title={name || email || "Account"}
      className={
        "relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full " +
        "ring-offset-2 hover:ring-2 ring-black dark:ring-white dark:ring-offset-black " +
        "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 " +
        (className || "")
      }
    >
      {resolved ? (
        <img
          src={resolved}
          alt={name || email || "avatar"}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="select-none text-xs font-semibold">
          {initialsFrom(name, email)}
        </span>
      )}
    </Link>
  );
}
