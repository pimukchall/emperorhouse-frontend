"use client";
import React, { useState } from "react";
import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import StatefulButton from "@/components/ui/stateful-button";
import { apiFetch } from "@/lib/api";
import NoticeDialog from "@/components/modal/NoticeDialog";

export default function ResetPasswordDialog({ open, onClose, token }) {
  const [password, setPassword] = useState("");
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
      await apiFetch("/auth/reset-password", {
        method: "POST",
        body: { token, password },
      });
      setNotice({
        open: true,
        type: "success",
        message: "ตั้งรหัสผ่านใหม่เรียบร้อย",
      });
    } catch (err) {
      setNotice({
        open: true,
        type: "error",
        message: err?.data?.error || err?.message || "รีเซ็ตไม่สำเร็จ",
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
        title="ตั้งรหัสผ่านใหม่"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={onClose} disabled={busy}>
              ยกเลิก
            </Button>
            <StatefulButton loading={busy} onClick={handleSubmit}>
              บันทึก
            </StatefulButton>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="new-pass" className="text-sm">
              รหัสผ่านใหม่ (อย่างน้อย 8 ตัว)
            </label>
            <input
              id="new-pass"
              type="password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              placeholder="********"
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
