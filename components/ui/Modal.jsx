"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export default function Modal({
  open,
  title,
  children,
  onClose,
  maxWidth = "max-w-lg",
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted || !open) return null;

  const node = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={[
          "relative mx-4 w-full",
          maxWidth,
          // พื้นหลัง/เส้นขอบ/เงา/สีตัวอักษรที่คมชัดในทั้งสองธีม
          "rounded-2xl border shadow-xl",
          "bg-white text-neutral-900 border-neutral-200",
          "dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700",
        ].join(" ")}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between gap-4 px-5 pt-4">
            <h3 className="text-base font-semibold">{title}</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-md px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100
                           dark:text-neutral-300 dark:hover:bg-neutral-800"
                aria-label="ปิด"
              >
                ปิด
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );

  // มี SSR? ใช้ portal เพื่อหลีกเลี่ยง stacking context แปลกๆ
  const root = typeof window !== "undefined" ? document.body : null;
  return root ? createPortal(node, root) : node;
}