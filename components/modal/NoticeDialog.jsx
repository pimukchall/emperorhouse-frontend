"use client";
import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import React from "react";

const tone = {
  success: {
    ring: "ring-green-200 dark:ring-green-900/40",
    bg: "bg-green-50 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-100",
    title: "สำเร็จ",
  },
  error: {
    ring: "ring-red-200 dark:ring-red-900/40",
    bg: "bg-red-50 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-100",
    title: "เกิดข้อผิดพลาด",
  },
  info: {
    ring: "ring-blue-200 dark:ring-blue-900/40",
    bg: "bg-blue-50 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-100",
    title: "แจ้งเตือน",
  },
};

function normalizeMessage(msg) {
  // 1) ปล่อย ReactNode ผ่านไปได้เลย
  if (React.isValidElement(msg)) return msg;

  // 2) string → คืนตรงๆ
  if (typeof msg === "string") return msg;

  // 3) Error instance
  if (msg instanceof Error) return msg.message || "Unexpected error";

  // 4) รูปแบบที่พบบ่อยจาก backend
  const fromCommonShape =
    msg?.message ||
    msg?.error ||
    msg?.data?.message ||
    msg?.data?.error;

  if (typeof fromCommonShape === "string") return fromCommonShape;

  // 5) fallback: stringify แบบสั้นๆ
  try {
    return JSON.stringify(msg);
  } catch {
    return "Unknown error";
  }
}

export default function NoticeDialog({
  open,
  onClose,
  type = "info", // 'success' | 'error' | 'info'
  title,
  message,
  footerButtons, // optional: <Button>...</Button>
}) {
  const t = tone[type] || tone.info;
  const content = normalizeMessage(message);

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title={title || t.title}
      footer={footerButtons ?? <Button onClick={onClose}>ปิด</Button>}
    >
      <div className={`rounded-md ${t.bg} ${t.ring} p-3`} role="status" aria-live="polite">
        {/* ถ้า content เป็น ReactNode ก็ render ตรง ๆ ได้ */}
        {typeof content === "string" ? (
          <p className={`text-sm ${t.text}`}>{content}</p>
        ) : (
          <div className={`text-sm ${t.text}`}>{content}</div>
        )}
      </div>
    </Modal>
  );
}
