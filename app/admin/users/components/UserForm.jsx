"use client";
import React from "react";

const EMPLOYEE_TYPES = [
  { value: "", label: "- ไม่ระบุ -" },
  { value: "DAILY", label: "DAILY (รายวัน)" },
  { value: "MONTHLY", label: "MONTHLY (รายเดือน)" },
];
const CONTRACT_TYPES = [
  { value: "", label: "- ไม่ระบุ -" },
  { value: "PERMANENT", label: "PERMANENT (ประจำ)" },
  { value: "TEMPORARY", label: "TEMPORARY (ชั่วคราว)" },
  { value: "PROBATION", label: "PROBATION (ทดลองงาน)" },
];
const GENDERS = [
  { value: "", label: "- ไม่ระบุ -" },
  { value: "MALE", label: "ชาย" },
  { value: "FEMALE", label: "หญิง" },
  { value: "OTHER", label: "อื่น ๆ" },
];

export default function UserForm({
  roles = [],
  departments = [],
  organizations = [],
  form,
  setForm,
  isEditing,
  onSubmit,
  onCancel,
}) {
  const hasCurrentOrg = form.orgId && organizations.some((o) => String(o.id) === String(form.orgId));
  const cx = "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

  return (
    <form className="grid gap-3 sm:grid-cols-3" onSubmit={onSubmit}>
      {/* Login */}
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">อีเมล</div>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={cx} required />
      </label>
      {!isEditing && (
        <label className="block">
          <div className="text-xs text-neutral-600 dark:text-neutral-300">รหัสผ่านเริ่มต้น</div>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={cx} placeholder="อย่างน้อย 8 ตัว" />
        </label>
      )}
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">ชื่อที่แสดง (nickname)</div>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cx} />
      </label>

      {/* ชื่อ */}
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">ชื่อ (ไทย)</div>
        <input value={form.firstNameTh} onChange={(e) => setForm({ ...form, firstNameTh: e.target.value })} className={cx} />
      </label>
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">นามสกุล (ไทย)</div>
        <input value={form.lastNameTh} onChange={(e) => setForm({ ...form, lastNameTh: e.target.value })} className={cx} />
      </label>
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">ชื่อ (อังกฤษ)</div>
        <input value={form.firstNameEn} onChange={(e) => setForm({ ...form, firstNameEn: e.target.value })} className={cx} />
      </label>
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">นามสกุล (อังกฤษ)</div>
        <input value={form.lastNameEn} onChange={(e) => setForm({ ...form, lastNameEn: e.target.value })} className={cx} />
      </label>

      {/* HR */}
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Employee Code</div>
        <input value={form.employeeCode} onChange={(e) => setForm({ ...form, employeeCode: e.target.value })} className={cx} placeholder="ถ้าเว้นว่าง ระบบจะสร้างให้อัตโนมัติ" />
      </label>

      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Organization</div>
        <select value={form.orgId ?? ""} onChange={(e) => setForm({ ...form, orgId: e.target.value || "" })} className={cx}>
          <option value="">- ไม่ระบุ -</option>
          {!hasCurrentOrg && form.orgId && <option value={String(form.orgId)}>{form.orgLabel || `Org#${form.orgId}`}</option>}
          {organizations.map((o) => (
            <option key={o.id} value={String(o.id)}>
              {o.code ? `${o.code} · ` : ""}{o.nameTh || o.nameEn || `Org#${o.id}`}
            </option>
          ))}
        </select>
      </label>

      {/* ENUMs */}
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Employee Type</div>
        <select value={form.employeeType ?? ""} onChange={(e) => setForm({ ...form, employeeType: e.target.value || "" })} className={cx}>
          {EMPLOYEE_TYPES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Contract Type</div>
        <select value={form.contractType ?? ""} onChange={(e) => setForm({ ...form, contractType: e.target.value || "" })} className={cx}>
          {CONTRACT_TYPES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Gender</div>
        <select value={form.gender ?? ""} onChange={(e) => setForm({ ...form, gender: e.target.value })} className={cx}>
          {GENDERS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
        </select>
      </label>

      {/* Dates */}
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Birth Date</div>
        <input type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} className={cx} />
      </label>
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Start Date</div>
        <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className={cx} />
      </label>
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Probation End</div>
        <input type="date" value={form.probationEndDate} onChange={(e) => setForm({ ...form, probationEndDate: e.target.value })} className={cx} />
      </label>
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Resigned At</div>
        <input type="date" value={form.resignedAt} onChange={(e) => setForm({ ...form, resignedAt: e.target.value })} className={cx} />
      </label>

      {/* role / department */}
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Role</div>
        <select value={form.roleId} onChange={(e) => setForm({ ...form, roleId: e.target.value })} className={cx} required>
          <option value="">- เลือก -</option>
          {roles.map((r) => <option key={r.id} value={String(r.id)}>{r.name}</option>)}
        </select>
      </label>
      <label className="block">
        <div className="text-xs text-neutral-600 dark:text-neutral-300">Department (Primary)</div>
        <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })} className={cx} required>
          <option value="">- เลือก -</option>
          {departments.map((d) => <option key={d.id} value={String(d.id)}>{d.code} · {d.nameTh || d.nameEn || `Dept#${d.id}`}</option>)}
        </select>
      </label>

      {/* actions */}
      <div className="sm:col-span-3 flex gap-2">
        <button type="submit" className="h-9 px-4 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90">
          {isEditing ? "บันทึกการแก้ไข" : "เพิ่ม"}
        </button>
        <button type="button" onClick={onCancel} className="h-9 px-4 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
          ล้างฟอร์ม
        </button>
      </div>
    </form>
  );
}
