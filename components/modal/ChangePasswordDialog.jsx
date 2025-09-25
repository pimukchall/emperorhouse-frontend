"use client";
import React, { useState } from "react";
import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import StatefulButton from "@/components/ui/stateful-button";
import { apiFetch } from "@/lib/api";
import NoticeDialog from "@/components/modal/NoticeDialog";

export default function ChangePasswordDialog({ open, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  // ⬇️ เก็บ error รายฟิลด์
  const [fieldErrors, setFieldErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });

  // ⬇️ แจ้งรวม
  const [notice, setNotice] = useState({ open: false, type: "info", message: "" });

  function clearFieldErrors() {
    setFieldErrors({ currentPassword: "", newPassword: "", confirm: "" });
  }

  // ตรวจฝั่ง client
  function validateLocal() {
    const fe = { currentPassword: "", newPassword: "", confirm: "" };
    if (!currentPassword) fe.currentPassword = "กรุณากรอกรหัสผ่านปัจจุบัน";
    if (!newPassword) fe.newPassword = "กรุณากรอกรหัสผ่านใหม่";
    if (newPassword && newPassword.length < 8)
      fe.newPassword = "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร";
    if (newPassword && confirm && newPassword !== confirm)
      fe.confirm = "รหัสผ่านใหม่ไม่ตรงกัน";
    setFieldErrors(fe);
    // คืน true ถ้าไม่มี error
    return !Object.values(fe).some(Boolean);
  }

  async function handleSubmit(e) {
    e?.preventDefault();
    clearFieldErrors();

    if (!validateLocal()) {
      setNotice({ open: true, type: "error", message: "กรุณาตรวจสอบข้อมูลที่กรอก" });
      return;
    }

    setBusy(true);
    try {
      await apiFetch("/api/auth/change-password", {
        method: "POST",
        body: { currentPassword, newPassword },
      });
      // console.log("Body:", { currentPassword, newPassword });
      setNotice({ open: true, type: "success", message: "เปลี่ยนรหัสผ่านเรียบร้อย" });
    } catch (e) {
      // รองรับ payload จากเซิร์ฟเวอร์ที่มี errors รายฟิลด์
      const msg = e?.data?.message || e?.message || "เปลี่ยนรหัสผ่านไม่สำเร็จ";
      const errors = e?.data?.errors || {};
      setNotice({ open: true, type: "error", message: msg });
      setFieldErrors((prev) => ({
        ...prev,
        currentPassword: errors.currentPassword || prev.currentPassword,
        newPassword: errors.newPassword || prev.newPassword,
      }));
    } finally {
      setBusy(false);
    }
  }

  function handleCloseNotice() {
    // ปิดโมดัลเมื่อสำเร็จ
    if (notice.type === "success") {
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
      clearFieldErrors();
      onClose?.();
    }
    setNotice((s) => ({ ...s, open: false }));
  }

  return (
    <>
      <Modal
        open={open}
        onClose={busy ? undefined : onClose}
        title="เปลี่ยนรหัสผ่าน"
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
            <label htmlFor="cur-pass" className="text-sm">รหัสผ่านปัจจุบัน</label>
            <input
              id="cur-pass"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              autoComplete="current-password"
              aria-invalid={!!fieldErrors.currentPassword}
            />
            {fieldErrors.currentPassword && (
              <p className="text-xs text-red-600 dark:text-red-400">{fieldErrors.currentPassword}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="new-pass" className="text-sm">รหัสผ่านใหม่ (≥ 8)</label>
            <input
              id="new-pass"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              minLength={8}
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.newPassword}
            />
            {fieldErrors.newPassword && (
              <p className="text-xs text-red-600 dark:text-red-400">{fieldErrors.newPassword}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="confirm-pass" className="text-sm">ยืนยันรหัสผ่านใหม่</label>
            <input
              id="confirm-pass"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.confirm}
            />
            {fieldErrors.confirm && (
              <p className="text-xs text-red-600 dark:text-red-400">{fieldErrors.confirm}</p>
            )}
          </div>
        </form>
      </Modal>

      <NoticeDialog
        open={notice.open}
        onClose={handleCloseNotice}
        type={notice.type}
        message={notice.message}
      />
    </>
  );
}
