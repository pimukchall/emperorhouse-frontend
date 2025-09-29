"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";

function initialsFrom(name, email) {
  const src = (name && name.trim()) || (email && email.split("@")[0]) || "";
  if (!src) return "?";
  const parts = src.split(/\s+/).filter(Boolean);
  const pick = parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : src.slice(0, 2);
  return pick.toUpperCase();
}

export default function AvatarButton({
  href = "/me",
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

  const currentBlobUrl = useRef(null);
  const urlsToRevoke = useRef([]);

  // ทำ URL สำหรับ cache-busting
  const photoWithTs = useMemo(() => {
    if (!photo) return null;
    try {
      const u = new URL(photo, typeof window !== "undefined" ? window.location.origin : "http://localhost");
      if (version) u.searchParams.set("ts", String(version));
      return u.toString();
    } catch {
      const hasQ = photo.includes("?");
      return version ? `${photo}${hasQ ? "&" : "?"}ts=${encodeURIComponent(String(version))}` : photo;
    }
  }, [photo, version]);

  // โหลดรูปอัตโนมัติ (ต้องใช้ fetch เป็น blob เพื่อส่ง cookies ไปด้วย)
  useEffect(() => {
    let aborted = false;
    const ctrl = new AbortController();

    async function load() {
      setImgError(false);
      if (photoWithTs || !fetchUrl) return;

      try {
        const hasQ = fetchUrl.includes("?");
        const url = `${fetchUrl}${version ? `${hasQ ? "&" : "?"}ts=${encodeURIComponent(String(version))}` : ""}`;

        const r = await fetch(url, {
          signal: ctrl.signal,
          cache: "no-store",
          credentials: "include",
        });
        if (!r.ok) { setImgError(true); return; }

        const ct = r.headers.get("content-type") || "";
        if (!ct.toLowerCase().startsWith("image/")) { setImgError(true); return; }

        const b = await r.blob();
        if (aborted) return;
        const blobUrl = URL.createObjectURL(b);

        if (currentBlobUrl.current) urlsToRevoke.current.push(currentBlobUrl.current);
        currentBlobUrl.current = blobUrl;
        setAutoPhoto(blobUrl);
      } catch {
        if (!aborted) setImgError(true);
      }
    }

    load();

    return () => {
      aborted = true;
      ctrl.abort();
      if (currentBlobUrl.current) {
        urlsToRevoke.current.push(currentBlobUrl.current);
        currentBlobUrl.current = null;
      }
      while (urlsToRevoke.current.length) {
        const u = urlsToRevoke.current.pop();
        try { URL.revokeObjectURL(u); } catch {}
      }
    };
  }, [photoWithTs, fetchUrl, version]);

  const resolved = !imgError ? (photoWithTs ?? autoPhoto) : null;
  const isBlob = typeof resolved === "string" && resolved.startsWith("blob:");
  const showIconFallback = !resolved && fallback === "icon";

  const handleLoaded = useCallback(() => {
    while (urlsToRevoke.current.length) {
      const u = urlsToRevoke.current.pop();
      try { URL.revokeObjectURL(u); } catch {}
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
          <img
            src={resolved}
            alt={name || email || "avatar"}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onLoad={handleLoaded}
            onError={() => setImgError(true)}
          />
        ) : (
          <Image
            src={resolved}
            alt={name || email || "avatar"}
            className="h-full w-full object-cover"
            fill
            sizes="36px"
            priority
            unoptimized
            referrerPolicy="no-referrer"
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
