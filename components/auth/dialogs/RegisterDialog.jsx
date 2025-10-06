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

  // ✅ เพิ่ม username ให้ตรง backend
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstNameTh: "",
    lastNameTh: "",
    firstNameEn: "",
    lastNameEn: "",
  });

  const canSubmit = useMemo(
    () => !!form.username && !!form.password && !!form.firstNameTh && !!form.lastNameTh,
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
          username: form.username,
          password: form.password,
          email: form.email || undefined,
          firstNameTh: form.firstNameTh,
          lastNameTh: form.lastNameTh,
          firstNameEn: form.firstNameEn || undefined,
          lastNameEn: form.lastNameEn || undefined,
        },
      });
      onOpenChange?.(false);
    } catch (err) {
      setError(err?.data?.message || err?.message || "ลงทะเบียนไม่สำเร็จ");
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

        <form id="register-form" onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}

          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="username">ชื่อผู้ใช้</Label>
            <Input
              id="username"
              value={form.username}
              onChange={(e) => setField("username", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="email">อีเมล (ถ้ามี)</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">รหัสผ่าน (≥ 8)</Label>
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

          <div className="space-y-1">
            <Label htmlFor="firstNameEn">First name (EN)</Label>
            <Input
              id="firstNameEn"
              value={form.firstNameEn}
              onChange={(e) => setField("firstNameEn", e.target.value)}
              placeholder=""
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="lastNameEn">Last name (EN)</Label>
            <Input
              id="lastNameEn"
              value={form.lastNameEn}
              onChange={(e) => setField("lastNameEn", e.target.value)}
              placeholder=""
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
