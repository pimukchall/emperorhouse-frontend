"use client";
import React, { useMemo, useState } from "react";
import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import StatefulButton from "@/components/ui/stateful-button";
import NoticeDialog from "@/components/modal/NoticeDialog";
import { apiFetch } from "@/lib/api";

export default function RegisterDialog({ open, onClose }) {
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    firstNameTh: "",
    lastNameTh: "",
  });

  const [notice, setNotice] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const canSubmit = useMemo(
    () =>
      !!form.email &&
      !!form.password &&
      !!form.firstNameTh &&
      !!form.lastNameTh,
    [form]
  );

  function setField(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function handleSubmit(e) {
    e?.preventDefault();
    if (!canSubmit) return;
    setBusy(true);
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: {
          email: form.email,
          password: form.password,
          name:
            form.name ||
            `${form.firstNameTh} ${form.lastNameTh}`.trim(),
          firstNameTh: form.firstNameTh,
          lastNameTh: form.lastNameTh,
          // ❌ ไม่ส่ง org/department/position อะไรทั้งสิ้น
        },
      });
      setNotice({ open: true, type: "success", message: "ลงทะเบียนสำเร็จ" });
    } catch (err) {
      setNotice({
        open: true,
        type: "error",
        message:
          err?.data?.error || err?.message || "ลงทะเบียนไม่สำเร็จ",
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
        title="สมัครสมาชิก"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={onClose} disabled={busy}>
              ยกเลิก
            </Button>
            <StatefulButton
              loading={busy}
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              สมัครสมาชิก
            </StatefulButton>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <div className="text-sm">อีเมล</div>
            <input
              type="email"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              required
            />
          </label>

          <label className="block">
            <div className="text-sm">รหัสผ่าน</div>
            <input
              type="password"
              minLength={8}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              required
            />
          </label>

          <label className="block sm:col-span-2">
            <div className="text-sm">ชื่อที่แสดง</div>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="เว้นว่างได้ ระบบจะใช้ชื่อ-นามสกุล"
            />
          </label>

          <label className="block">
            <div className="text-sm">ชื่อ (ไทย)</div>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              value={form.firstNameTh}
              onChange={(e) => setField("firstNameTh", e.target.value)}
              required
            />
          </label>

          <label className="block">
            <div className="text-sm">นามสกุล (ไทย)</div>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              value={form.lastNameTh}
              onChange={(e) => setField("lastNameTh", e.target.value)}
              required
            />
          </label>
        </form>
      </Modal>

      <NoticeDialog
        open={notice.open}
        onClose={() => {
          setNotice((s) => ({ ...s, open: false }));
          if (notice.type === "success") onClose?.();
        }}
        type={notice.type}
        message={notice.message}
      />
    </>
  );
}
