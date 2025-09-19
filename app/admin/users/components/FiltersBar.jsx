"use client";
import React from "react";

/** FiltersBar — ใช้คู่กับ AdminUsersPage */
export default function FiltersBar({ roles = [], departments = [], filters }) {
  const {
    q, setQ,
    roleId, setRoleId,
    departmentId, setDepartmentId,
    includeDeleted, setIncludeDeleted,
    onClear,
  } = filters;

  const cx = "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

  return (
    <section className="rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-700 p-4">
      <div className="grid gap-3 sm:grid-cols-6">
        <label className="sm:col-span-2">
          <div className="text-xs text-neutral-600 dark:text-neutral-300">ค้นหา (ชื่อ/อีเมล/โค้ด)</div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="พิมพ์คำค้น…" className={cx} />
        </label>

        <label className="sm:col-span-2">
          <div className="text-xs text-neutral-600 dark:text-neutral-300">Role</div>
          <select value={roleId} onChange={(e) => setRoleId(e.target.value)} className={cx}>
            <option value="">ทั้งหมด</option>
            {roles.map((r) => <option key={r.id} value={String(r.id)}>{r.name}</option>)}
          </select>
        </label>

        <label className="sm:col-span-2">
          <div className="text-xs text-neutral-600 dark:text-neutral-300">Department</div>
          <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} className={cx}>
            <option value="">ทั้งหมด</option>
            {departments.map((d) => (
              <option key={d.id} value={String(d.id)}>
                {d.code} · {d.nameTh || d.nameEn || `Dept#${d.id}`}
              </option>
            ))}
          </select>
        </label>

        <label className="sm:col-span-6 flex items-center gap-2 mt-1">
          <input type="checkbox" checked={!!includeDeleted} onChange={(e) => setIncludeDeleted(e.target.checked)} className="h-4 w-4" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">แสดงผู้ใช้ที่ถูกลบ (soft-delete)</span>
        </label>

        <div className="sm:col-span-6 flex gap-2">
          <button type="button" onClick={onClear} className="h-9 px-4 rounded-md border hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
            ล้างตัวกรอง
          </button>
        </div>
      </div>
    </section>
  );
}
