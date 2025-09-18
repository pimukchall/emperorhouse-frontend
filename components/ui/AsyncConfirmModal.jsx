"use client";

import React from "react";
import Modal from "@/components/ui/Modal";

export default function AsyncConfirmModal({
  open,
  title = "ยืนยันการทำรายการ",
  description,
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
  successText = "สำเร็จ",
  onOpenChange,
  onConfirm,
}) {
  const [phase, setPhase] = React.useState<Phase>("confirm");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) {
      setPhase("confirm");
      setErrorMsg(null);
    }
  }, [open]);

  async function handleConfirm() {
    try {
      setPhase("loading");
      setErrorMsg(null);
      await onConfirm();
      setPhase("success");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setErrorMsg(msg || "เกิดข้อผิดพลาด");
      setPhase("confirm");
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => onOpenChange?.(false)}
      title={title}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4 text-neutral-900 dark:text-neutral-100">
        {/* Confirm */}
        {phase === "confirm" && (
          <>
            {description && (
              <div className="text-sm text-neutral-700 dark:text-neutral-200">
                {description}
              </div>
            )}

            {errorMsg && (
              <div
                className="rounded border px-3 py-2 text-sm
                              border-red-300 bg-red-50 text-red-800
                              dark:border-red-700 dark:bg-red-900 dark:text-red-100"
              >
                {errorMsg}
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => onOpenChange?.(false)}
                className="rounded border px-4 py-2 
                           border-neutral-300 text-neutral-800 hover:bg-neutral-50
                           dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded px-4 py-2 
                           bg-black text-white hover:opacity-90
                           dark:bg-white dark:text-black"
              >
                {confirmText}
              </button>
            </div>
          </>
        )}

        {/* Loading */}
        {phase === "loading" && (
          <div className="flex items-center gap-3 py-6">
            <div
              className="h-5 w-5 animate-spin rounded-full border-2
                            border-neutral-300 border-t-neutral-700
                            dark:border-neutral-600 dark:border-t-neutral-200"
            />
            <div className="text-sm text-neutral-700 dark:text-neutral-200">
              กำลังดำเนินการ…
            </div>
          </div>
        )}

        {/* Success */}
        {phase === "success" && (
          <>
            <div className="flex items-center gap-3 py-4">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full 
                              bg-emerald-100 dark:bg-emerald-800"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-emerald-700 dark:text-emerald-200"
                >
                  <path
                    fill="currentColor"
                    d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
                  />
                </svg>
              </div>
              <div className="text-sm text-emerald-800 dark:text-emerald-200">
                {successText}
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => onOpenChange?.(false)}
                className="rounded px-4 py-2
                           bg-black text-white hover:opacity-90
                           dark:bg-white dark:text-black"
              >
                ปิด
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}