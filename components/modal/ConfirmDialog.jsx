"use client";
import React from "react";
import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";

export default function ConfirmDialog({
  open,
  title = "ยืนยันการทำรายการ",
  description,
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
  loading = false,
  error,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            aria-busy={loading || undefined}
          >
            {loading ? "กำลังดำเนินการ…" : confirmText}
          </Button>
        </>
      }
    >
      {description && (
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      )}
      {error && (
        <div
          className="mt-3 rounded border px-3 py-2 text-sm
                        border-red-300 bg-red-50 text-red-800
                        dark:border-red-700 dark:bg-red-900 dark:text-red-100"
        >
          {error}
        </div>
      )}
    </Modal>
  );
}
