"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { changePassword } from "@/api/auth";

export default function ChangePasswordDialog({ open, onOpenChange }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function resetAll() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirm("");
    setError("");
  }

  async function onSubmit(e) {
    e?.preventDefault();
    setError("");
    if (!currentPassword || !newPassword) return setError("กรอกข้อมูลให้ครบ");
    if (newPassword.length < 8) return setError("รหัสผ่านใหม่อย่างน้อย 8 ตัว");
    if (newPassword !== confirm) return setError("รหัสผ่านใหม่ไม่ตรงกัน");

    setBusy(true);
    try {
      // ✅ ชื่อฟิลด์ตาม backend: currentPassword, newPassword
      await changePassword({ currentPassword, newPassword });
      resetAll();
      onOpenChange?.(false);
    } catch (e) {
      setError(e?.data?.message || e?.message || "เปลี่ยนรหัสผ่านไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) resetAll();
        onOpenChange?.(v);
      }}
    >
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>เปลี่ยนรหัสผ่าน</DialogTitle>
        </DialogHeader>

        <form id="change-pass-form" onSubmit={onSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="space-y-1">
            <Label htmlFor="cur-pass">รหัสผ่านปัจจุบัน</Label>
            <Input
              id="cur-pass"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="new-pass">รหัสผ่านใหม่ (≥ 8)</Label>
            <Input
              id="new-pass"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirm-pass">ยืนยันรหัสผ่านใหม่</Label>
            <Input
              id="confirm-pass"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </form>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={busy}>
              ยกเลิก
            </Button>
          </DialogClose>
          <Button form="change-pass-form" disabled={busy}>
            {busy ? "กำลังบันทึก..." : "บันทึก"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
