"use client";
import React, { useState } from "react";
import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import StatefulButton from "@/components/ui/stateful-button";
import { apiFetch } from "@/lib/api";
import NoticeDialog from "@/components/modal/NoticeDialog";

export default function ForgotPasswordDialog({
  open,
  onClose,
  defaultEmail = "",
}) {
  const [email, setEmail] = useState(defaultEmail || "");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState({
    open: false,
    type: "success",
    message: "",
  });

  async function handleSubmit(e) {
    e?.preventDefault();
    setBusy(true);
    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: { email },
      });
      setNotice({
        open: true,
        type: "success",
        message: `เราส่งลิงก์รีเซ็ตไปที่ ${email}`,
      });
    } catch (err) {
      setNotice({
        open: true,
        type: "error",
        message: err?.data?.error || err?.message || "ส่งคำขอไม่สำเร็จ",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={busy ? undefined : onClose}
        title="ลืมรหัสผ่าน"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={onClose} disabled={busy}>
              ยกเลิก
            </Button>
            <StatefulButton loading={busy} onClick={handleSubmit}>
              ส่งลิงก์รีเซ็ต
            </StatefulButton>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            ใส่อีเมลที่ใช้สมัคร เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่
          </p>
          <div className="space-y-1">
            <label htmlFor="fp-email" className="text-sm">
              อีเมล
            </label>
            <input
              id="fp-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              placeholder="you@example.com"
            />
          </div>
        </form>
      </Modal>

      <NoticeDialog
        open={notice.open}
        onClose={() => {
          setNotice({ ...notice, open: false });
          if (notice.type === "success") onClose?.();
        }}
        type={notice.type}
        message={notice.message}
      />
    </>
  );
}
