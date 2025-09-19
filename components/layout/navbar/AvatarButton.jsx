"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { apiUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";

function initialsFrom(name, email) {
  const src = (name && name.trim()) || (email && email.split("@")[0]) || "";
  if (!src) return "?";
  const parts = src.split(/\s+/).filter(Boolean);
  const pick =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : src.slice(0, 2);
  return pick.toUpperCase();
}

export default function AvatarButton({
  href = "/profile",
  name,
  email,
  photo,
  fetchUrl = null,
  onClick,
  className,
  fallback = "icon",
  version,
}) {
  const [autoPhoto, setAutoPhoto] = useState(null);
  const [imgError, setImgError] = useState(false);
  const currentBlobUrl = useRef(null); // เก็บ blob URL ปัจจุบัน
  const urlsToRevoke = useRef([]); // คิวสำหรับ revoke ทีหลังอย่างปลอดภัย

  // โหลดรูปอัตโนมัติเมื่อไม่มี photo ที่ส่งมา
  useEffect(() => {
    let aborted = false;
    const ctrl = new AbortController();

    async function load() {
      setImgError(false);
      if (photo || !fetchUrl) return;
      try {
        const r = await fetch(apiUrl(fetchUrl), {
          signal: ctrl.signal,
          cache: "no-store",
          credentials: "include",
        });
        if (!r.ok) return;
        const b = await r.blob();
        const url = URL.createObjectURL(b);

        if (!aborted) {
          // อย่า revoke ทันที—อาจยังโหลดไม่เสร็จ (StrictMode dev จะยิ่งชน)
          // เก็บ URL เดิมไว้ในคิว รอ revoke ตอนหลังจากรูปใหม่ onLoad หรือ unmount
          if (currentBlobUrl.current)
            urlsToRevoke.current.push(currentBlobUrl.current);
          currentBlobUrl.current = url;
          setAutoPhoto(url);
        } else {
          URL.revokeObjectURL(url);
        }
      } catch {
        // ให้ fallback ทำงาน
      }
    }

    load();
    return () => {
      aborted = true;
      ctrl.abort();
      // cleanup ตอน unmount: revoke ทุก URL ที่ค้าง
      if (currentBlobUrl.current) {
        urlsToRevoke.current.push(currentBlobUrl.current);
        currentBlobUrl.current = null;
      }
      while (urlsToRevoke.current.length) {
        const u = urlsToRevoke.current.pop();
        try {
          URL.revokeObjectURL(u);
        } catch {}
      }
    };
  }, [photo, fetchUrl, version]);

  const resolved = !imgError ? photo ?? autoPhoto : null;
  const isBlob = typeof resolved === "string" && resolved.startsWith("blob:");
  const showIconFallback = !resolved && fallback === "icon";
  const showInitialsFallback = !resolved && fallback === "initials";

  const handleLoaded = useCallback(() => {
    // เมื่อรูปใหม่โหลดเสร็จ ค่อย revoke URL เก่าที่ค้างในคิว
    while (urlsToRevoke.current.length) {
      const u = urlsToRevoke.current.pop();
      try {
        URL.revokeObjectURL(u);
      } catch {}
    }
  }, []);

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
        isBlob ? (
          // ใช้ <img> ธรรมดาเมื่อเป็น blob: เพื่อเลี่ยง behavior ของ <Image>
          // และเรียก handleLoaded เพื่อ revoke URL เก่าหลังโหลดเสร็จ
          <img
            src={resolved}
            alt={name || email || "avatar"}
            className="h-full w-full object-cover"
            onLoad={handleLoaded}
            onError={() => setImgError(true)}
          />
        ) : (
          // รูปจาก URL ปกติ/ไฟล์ static
          <Image
            src={resolved}
            alt={name || email || "avatar"}
            className="h-full w-full object-cover"
            fill
            sizes="36px"
            priority
            unoptimized
            onLoadingComplete={handleLoaded}
            onError={() => setImgError(true)}
          />
        )
      ) : showIconFallback ? (
        <UserRound className="h-5 w-5 opacity-80" aria-hidden="true" />
      ) : (
        <span className="select-none text-xs font-semibold">
          {initialsFrom(name, email)}
        </span>
      )}
    </Link>
  );
}
