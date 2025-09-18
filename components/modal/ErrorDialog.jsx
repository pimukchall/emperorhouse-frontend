"use client";
import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";

export default function ErrorDialog({ open, title="เกิดข้อผิดพลาด", message, detail, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="md"
      footer={<Button onClick={onClose}>ปิด</Button>}
    >
      {message && <p className="text-sm text-neutral-700 dark:text-neutral-300 break-words">{message}</p>}
      {detail && (
        <pre className="mt-3 max-h-48 overflow-auto rounded-md bg-red-50 p-3 text-xs text-red-800 dark:bg-red-950/40 dark:text-red-200 whitespace-pre-wrap">
          {detail}
        </pre>
      )}
    </Modal>
  );
}