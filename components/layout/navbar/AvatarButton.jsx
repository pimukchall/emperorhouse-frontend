"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function initialsFrom(name, email) {
  const src = (name && name.trim()) || (email && email.split("@")[0]) || "";
  if (!src) return "?";
  const parts = src.split(/\s+/).filter(Boolean);
  const pick = parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : src.slice(0, 2);
  return pick.toUpperCase();
}

export default function AvatarButton({
  href = "/account",
  name,
  email,
  photo,
  fetchUrl = "/api/me/photo",
  onClick,
  className,
}) {
  const [autoPhoto, setAutoPhoto] = useState(null);
  const blobRef = useRef(null);

  useEffect(() => {
    let aborted = false;
    const ctrl = new AbortController();

    async function load() {
      if (photo) return;
      try {
        const r = await fetch(fetchUrl, { signal: ctrl.signal, cache: "no-store" });
        if (!r.ok) return;
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
        /* ignore */
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
  }, [photo, fetchUrl]);

  const label = "Open account page";
  const resolved = photo ?? autoPhoto;
  const isInternal = !!resolved && (resolved.startsWith("/api/") || resolved.startsWith("blob:") || resolved.startsWith("data:"));

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
        <Image
          src={resolved}
          alt={name || email || "avatar"}
          className="h-full w-full object-cover"
          fill
          sizes="36px"
          priority
        />
      ) : (
        <span className="text-xs font-semibold select-none">
          {initialsFrom(name, email)}
        </span>
      )}
    </Link>
  );
}
