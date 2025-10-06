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
import { resetPassword } from "@/api/auth";

export default function ResetPasswordDialog({ open, onOpenChange, token }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e?.preventDefault();
    if (!password || password.length < 8) return setError("รหัสผ่านอย่างน้อย 8 ตัว");
    setBusy(true);
    setError("");
    try {
      // ✅ ให้ตรงกับ api/auth.js -> resetPassword(token, newPassword)
      await resetPassword(token, password);
      onOpenChange?.(false);
    } catch (e) {
      setError(e?.data?.error || e?.message || "รีเซ็ตไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>ตั้งรหัสผ่านใหม่</DialogTitle>
        </DialogHeader>

        <form id="reset-form" onSubmit={onSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="space-y-1">
            <Label htmlFor="new-pass">รหัสผ่านใหม่ (≥ 8)</Label>
            <Input
              id="new-pass"
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
        </form>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={busy}>
              ยกเลิก
            </Button>
          </DialogClose>
          <Button form="reset-form" disabled={busy}>
            {busy ? "กำลังบันทึก..." : "บันทึก"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
