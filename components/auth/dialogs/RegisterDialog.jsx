"use client";
import { useMemo, useState } from "react";
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
import { apiFetch } from "@/api";

export default function RegisterDialog({ open, onOpenChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    firstNameTh: "",
    lastNameTh: "",
  });
  const canSubmit = useMemo(
    () =>
      !!form.email &&
      !!form.password &&
      !!form.firstNameTh &&
      !!form.lastNameTh,
    [form]
  );
  const setField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  async function onSubmit(e) {
    e?.preventDefault();
    if (!canSubmit) return;
    setBusy(true);
    setError("");
    try {
      await apiFetch("/api/auth/register", {
        method: "POST",
        body: {
          email: form.email,
          password: form.password,
          name: form.name || `${form.firstNameTh} ${form.lastNameTh}`.trim(),
          firstNameTh: form.firstNameTh,
          lastNameTh: form.lastNameTh,
        },
      });
      onOpenChange?.(false);
    } catch (err) {
      setError(err?.data?.error || err?.message || "ลงทะเบียนไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>สมัครสมาชิก</DialogTitle>
        </DialogHeader>

        <form
          id="register-form"
          onSubmit={onSubmit}
          className="grid gap-4 sm:grid-cols-2"
        >
          {error && (
            <p className="text-sm text-red-600 sm:col-span-2">{error}</p>
          )}

          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">รหัสผ่าน</Label>
            <Input
              id="password"
              type="password"
              minLength={8}
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="name">ชื่อที่แสดง (ถ้ามี)</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="ว่างได้ ระบบจะใช้ชื่อ-นามสกุล"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="firstNameTh">ชื่อ (ไทย)</Label>
            <Input
              id="firstNameTh"
              value={form.firstNameTh}
              onChange={(e) => setField("firstNameTh", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="lastNameTh">นามสกุล (ไทย)</Label>
            <Input
              id="lastNameTh"
              value={form.lastNameTh}
              onChange={(e) => setField("lastNameTh", e.target.value)}
              required
            />
          </div>
        </form>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={busy}>
              ยกเลิก
            </Button>
          </DialogClose>
          <Button form="register-form" disabled={!canSubmit || busy}>
            {busy ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
