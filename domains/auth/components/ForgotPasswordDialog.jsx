"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/modal/Modal";
import StatefulButton from "@/components/ui/stateful-button";
import { forgotPassword } from "@/domains/auth/api/auth";
import NoticeDialog from "@/components/modal/NoticeDialog";

const inputCx =
  "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

export default function ForgotPasswordDialog({
  open,
  onClose,
  defaultEmail = "",
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState({ open: false, type: "success", message: "" });

  useEffect(() => {
    if (open) {
      setEmail(defaultEmail || "");
      setError("");
    }
  }, [open, defaultEmail]);

  async function handleSubmit() {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      await forgotPassword(email);
      setNotice({
        open: true,
        type: "success",
        message: "ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปที่อีเมลของคุณแล้ว",
      });
      setTimeout(() => {
        setNotice({ open: false, type: "success", message: "" });
        onClose?.();
      }, 1200);
    } catch (e) {
      setError(e?.data?.message || e.message || "ส่งคำขอไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  const footer = (
    <div className="flex gap-2">
      <button
        type="button"
        className="rounded-md border px-4 py-2 text-sm dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-60"
        onClick={onClose}
        disabled={loading}
      >
        ยกเลิก
      </button>
      <StatefulButton
        loading={loading}
        onClick={handleSubmit}
        className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80 disabled:opacity-60"
      >
        ส่งลิงก์รีเซ็ต
      </StatefulButton>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title="ลืมรหัสผ่าน"
        footer={footer}
        size="md"
        dismissable={!loading}
      >
        <div className="space-y-4">
          {!!error && (
            <div className="rounded-md border border-rose-200 bg-rose-50 dark:border-rose-900/40 dark:bg-rose-950/50 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
              {String(error)}
            </div>
          )}

          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            ระบุอีเมลที่ใช้สมัคร เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้
          </p>

          <label className="block">
            <div className="text-sm">อีเมล</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCx}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
        </div>
      </Modal>

      <NoticeDialog
        open={notice.open}
        type={notice.type}
        message={notice.message}
        onClose={() => setNotice({ open: false, type: "success", message: "" })}
      />
    </>
  );
}