"use client";
import { useEffect, useState } from "react";
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
import { forgotPassword } from "@/api/auth";

export default function ForgotPasswordDialog({ open, onOpenChange, defaultEmail = "" }) {
  const [identifier, setIdentifier] = useState(defaultEmail); // ✅ อีเมลหรือชื่อผู้ใช้
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setIdentifier(defaultEmail || "");
      setError("");
    }
  }, [open, defaultEmail]);

  async function onSubmit(e) {
    e?.preventDefault();
    if (!identifier) return setError("กรอกอีเมลหรือชื่อผู้ใช้");
    setBusy(true);
    setError("");
    try {
      await forgotPassword(identifier); // map → { emailOrUsername }
      onOpenChange?.(false);
    } catch (e) {
      setError(e?.data?.message || e?.message || "ส่งคำขอไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>ลืมรหัสผ่าน</DialogTitle>
        </DialogHeader>

        <form id="forgot-form" onSubmit={onSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="space-y-1">
            <Label htmlFor="identifier">อีเมลหรือชื่อผู้ใช้</Label>
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com หรือ your-username"
            />
          </div>
        </form>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={busy}>
              ยกเลิก
            </Button>
          </DialogClose>
        <Button form="forgot-form" disabled={busy}>
            {busy ? "กำลังส่ง..." : "ส่งลิงก์รีเซ็ต"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
