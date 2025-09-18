"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { apiUrl } from "@/lib/api";
import { cn } from "@/lib/cn";
import { UserRound } from "lucide-react";

/** ถ้าอยากใช้ตัวอักษรย่อเป็น fallback ก็ยังใช้ได้ */
function initialsFrom(name, email) {
  const src = (name && name.trim()) || (email && email.split("@")[0]) || "";
  if (!src) return "?";
  const parts = src.split(/\s+/).filter(Boolean);
  const pick =
    parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : src.slice(0, 2);
  return pick.toUpperCase();
}

/**
 * AvatarButton
 * - แสดงรูปจาก prop `photo` หรือดึงอัตโนมัติจาก `fetchUrl`
 * - ถ้าไม่มีรูป/โหลดไม่สำเร็จ → แสดงไอคอน UserRound (fallback)
 */
export default function AvatarButton({
  href = "/profile",
  name,
  email,
  photo,
  // ตัวอย่างใช้งานกับ backend: `/files/user/avatar/${userId}`
  fetchUrl = "/api/me/photo",
  onClick,
  className,
  /** เลือก fallback: "icon" | "initials" (ดีฟอลต์ "icon") */
  fallback = "icon",
  /** ไว้บังคับ refresh รูป (เช่น เวลาอัปโหลดไฟล์เสร็จแล้ว) */
  version,
}) {
  const [autoPhoto, setAutoPhoto] = useState(null);
  const [imgError, setImgError] = useState(false);
  const blobRef = useRef(null);

  // โหลดรูปอัตโนมัติถ้าไม่ได้ส่ง photo มาหรืออยาก refresh ด้วย version
  useEffect(() => {
    let aborted = false;
    const ctrl = new AbortController();

    async function load() {
      setImgError(false);
      if (photo || !fetchUrl) return; // มีรูปจาก prop แล้ว ไม่ต้องโหลด
      try {
        const r = await fetch(apiUrl(fetchUrl), {
          signal: ctrl.signal,
          cache: "no-store",
          credentials: "include",
        });
        if (!r.ok) return; // ให้ fallback ทำงานเอง
        const b = await r.blob();
        const url = URL.createObjectURL(b);
        if (!aborted) {
          if (blobRef.current) URL.revokeObjectURL(blobRef.current);
          blobRef.current = url;
          setAutoPhoto(url);
        } else {
          URL.revokeObjectURL(url);
        }
      } catch {
        // เงียบไว้ ให้ fallback ทำงาน
      }
    }

    load();
    return () => {
      aborted = true;
      ctrl.abort();
      if (blobRef.current) {
        URL.revokeObjectURL(blobRef.current);
        blobRef.current = null;
      }
    };
    // รวม version ไว้เพื่อให้เปลี่ยนค่าจะรีโหลดรูป
  }, [photo, fetchUrl, version]);

  const resolved = !imgError ? (photo ?? autoPhoto) : null;
  const showIconFallback = !resolved && fallback === "icon";
  const showInitialsFallback = !resolved && fallback === "initials";

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="Open account page"
      title={name || email || "Account"}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full",
        "ring-offset-2 hover:ring-2 ring-black dark:ring-white dark:ring-offset-black",
        "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
        className
      )}
    >
      {resolved ? (
        <Image
          src={resolved}
          alt={name || email || "avatar"}
          className="h-full w-full object-cover"
          fill
          sizes="36px"
          priority
          onError={() => setImgError(true)} // ถ้ารูปพัง → fallback icon
        />
      ) : showIconFallback ? (
        <UserRound className="h-5 w-5 opacity-80" aria-hidden="true" />
      ) : (
        <span className="text-xs font-semibold select-none">
          {initialsFrom(name, email)}
        </span>
      )}
    </Link>
  );
}
