"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/modal/Modal";
import StatefulButton from "@/components/ui/stateful-button";

const inputCx =
  "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

export default function RoleFormDialog({
  open,
  onClose,
  initial,          // { id?, name, labelTh, labelEn }
  onSubmit,         // async (form) => {}
  loading = false,  // สถานะบันทึก
  error = "",       // ถ้าส่งมาก็จะแสดงบนฟอร์ม
}) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    labelTh: "",
    labelEn: "",
  });

  useEffect(() => {
    setForm({
      id: initial?.id ?? null,
      name: initial?.name ?? "",
      labelTh: initial?.labelTh ?? "",
      labelEn: initial?.labelEn ?? "",
    });
  }, [initial, open]);

  const isEdit = !!form.id;

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
        onClick={() => onSubmit(form)}
        className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80 disabled:opacity-60"
      >
        บันทึก
      </StatefulButton>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? `แก้ไข Role: ${initial?.name ?? ""}` : "สร้าง Role ใหม่"}
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

        <label className="block">
          <div className="text-sm">name (unique)</div>
          <input
            className={inputCx}
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="เช่น admin, user, hr.manager"
            disabled={isEdit} // ส่วนมากไม่ให้เปลี่ยน name ตอนแก้ไข
          />
        </label>

        <label className="block">
          <div className="text-sm">labelTh</div>
          <input
            className={inputCx}
            value={form.labelTh}
            onChange={(e) => setForm((s) => ({ ...s, labelTh: e.target.value }))}
            placeholder="ชื่อภาษาไทย"
          />
        </label>

        <label className="block">
          <div className="text-sm">labelEn</div>
          <input
            className={inputCx}
            value={form.labelEn}
            onChange={(e) => setForm((s) => ({ ...s, labelEn: e.target.value }))}
            placeholder="English label"
          />
        </label>
      </div>
    </Modal>
  );
}