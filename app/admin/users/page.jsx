"use client";

import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import StatefulButton from "@/components/ui/stateful-button";
import ErrorDialog from "@/components/ui/ErrorDialog";
import { useAuth, hasRole } from "@/providers/local-auth";

const PAGE_SIZE = 20;

export default function AdminUsersPage() {
  const { user, loading } = useAuth();
  const isAdmin = hasRole(user, "admin");

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [q, setQ] = useState("");
  const [roleId, setRoleId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    id: null,
    email: "",
    name: "",
    firstNameTh: "",
    lastNameTh: "",
    firstNameEn: "",
    lastNameEn: "",
    roleId: "",
    departmentId: "",
    password: "",
  });
  const isEditing = useMemo(() => form.id !== null, [form.id]);

  useEffect(() => {
    if (!loading && !isAdmin) {
      // guard/redirect
    }
  }, [loading, isAdmin]);

  async function loadRef() {
    try {
      const [r1, r2] = await Promise.all([
        apiFetch(`/api/roles?page=1&limit=999`),
        apiFetch(`/api/departments?page=1&limit=999`),
      ]);
      setRoles(r1?.data || []);
      setDepartments(r2?.data || []);
    } catch (e) {
      // ignore (ยังทำงานต่อได้)
    }
  }

  async function load() {
    setBusy(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
        sortBy: "id",
        sort: "asc",
      });
      if (q) params.set("q", q);
      if (roleId) params.set("roleId", roleId);
      if (departmentId) params.set("departmentId", departmentId);
      if (includeDeleted) params.set("includeDeleted", "1");

      const res = await apiFetch(`/api/users?${params.toString()}`);
      setItems(res?.data || []);
      setMeta(res?.meta || { page: 1, pages: 1, total: 0 });
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { loadRef(); }, []);
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, roleId, departmentId, includeDeleted, page]);

  function resetForm() {
    setForm({
      id: null,
      email: "",
      name: "",
      firstNameTh: "",
      lastNameTh: "",
      firstNameEn: "",
      lastNameEn: "",
      roleId: "",
      departmentId: "",
      password: "",
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      if (isEditing) {
        // admin: อัปเดตได้ email/roleId/departmentId + ชื่อ
        await apiFetch(`/api/users/${form.id}`, {
          method: "PATCH",
          body: {
            email: form.email,
            firstNameTh: form.firstNameTh,
            lastNameTh: form.lastNameTh,
            firstNameEn: form.firstNameEn,
            lastNameEn: form.lastNameEn,
            roleId: form.roleId ? Number(form.roleId) : undefined,
            departmentId: form.departmentId ? Number(form.departmentId) : undefined,
          },
        });
      } else {
        // create (admin-only): ต้องส่ง password หรือ passwordHash
        await apiFetch(`/api/users`, {
          method: "POST",
          body: {
            email: form.email,
            password: form.password || undefined,
            name: form.name || "",
            firstNameTh: form.firstNameTh || "",
            lastNameTh: form.lastNameTh || "",
            firstNameEn: form.firstNameEn || "",
            lastNameEn: form.lastNameEn || "",
            roleId: Number(form.roleId),
            departmentId: Number(form.departmentId),
          },
        });
      }
      resetForm();
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "บันทึกไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function onEdit(u) {
    setForm({
      id: u.id,
      email: u.email || "",
      name: u.name || "",
      firstNameTh: u.firstNameTh || "",
      lastNameTh: u.lastNameTh || "",
      firstNameEn: u.firstNameEn || "",
      lastNameEn: u.lastNameEn || "",
      roleId: u.role?.id || "",
      departmentId: u.department?.id || "",
      password: "",
    });
  }

  async function onSoftDelete(u) {
    if (!confirm(`ลบผู้ใช้ ${u.email}? (soft delete)`)) return;
    setBusy(true);
    try {
      await apiFetch(`/api/users/${u.id}`, { method: "DELETE" }); // soft by default
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "ลบไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function onRestore(u) {
    setBusy(true);
    try {
      await apiFetch(`/api/users/${u.id}/restore`, { method: "POST" });
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "คืนค่าผู้ใช้ไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function onHardDelete(u) {
    if (!confirm(`ลบถาวรผู้ใช้ ${u.email}? (admin only)`)) return;
    setBusy(true);
    try {
      await apiFetch(`/api/users/${u.id}?hard=1`, { method: "DELETE" });
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "ลบถาวรไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function onResetPassword(u) {
    const newPassword = prompt("ตั้งรหัสผ่านใหม่ (อย่างน้อย 8 ตัว)");
    if (!newPassword) return;
    setBusy(true);
    try {
      await apiFetch(`/api/users/${u.id}/reset-password`, {
        method: "POST",
        body: { newPassword },
      });
      alert("รีเซ็ตรหัสผ่านแล้ว");
    } catch (e) {
      setError(e?.data?.error || e?.message || "รีเซ็ตรหัสผ่านไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 py-30 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin · Users</h1>
        <div className="flex flex-wrap items-center gap-2">
          <input
            placeholder="ค้นหา ชื่อ/อีเมล"
            className="border rounded-md px-3 py-1.5 text-sm"
            value={q}
            onChange={(e) => { setPage(1); setQ(e.target.value); }}
          />
          <select className="border rounded-md px-2 py-1.5 text-sm" value={roleId} onChange={(e) => { setPage(1); setRoleId(e.target.value); }}>
            <option value="">ทุก role</option>
            {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <select className="border rounded-md px-2 py-1.5 text-sm" value={departmentId} onChange={(e) => { setPage(1); setDepartmentId(e.target.value); }}>
            <option value="">ทุกแผนก</option>
            {departments.map((d) => <option key={d.id} value={d.id}>{d.code} · {d.nameTh}</option>)}
          </select>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={includeDeleted} onChange={(e) => { setPage(1); setIncludeDeleted(e.target.checked); }} />
            แสดงที่ถูกลบ (soft)
          </label>
          <button className="border rounded-md px-3 py-1.5 text-sm" onClick={() => { setQ(""); setRoleId(""); setDepartmentId(""); setIncludeDeleted(false); setPage(1); }}>
            ล้าง
          </button>
        </div>
      </header>

      {/* Form create/edit */}
      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-3">{isEditing ? "แก้ไขผู้ใช้" : "สร้างผู้ใช้ใหม่"}</h2>
        <form className="grid gap-3 sm:grid-cols-3" onSubmit={onSubmit}>
          <label className="block sm:col-span-1">
            <div className="text-xs">อีเมล</div>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              required
            />
          </label>
          {!isEditing && (
            <label className="block sm:col-span-1">
              <div className="text-xs">รหัสผ่านเริ่มต้น</div>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                placeholder="อย่างน้อย 8 ตัว"
              />
            </label>
          )}
          <label className="block sm:col-span-1">
            <div className="text-xs">ชื่อที่แสดง (nickname)</div>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <div className="text-xs">ชื่อ (ไทย)</div>
            <input
              value={form.firstNameTh}
              onChange={(e) => setForm({ ...form, firstNameTh: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <div className="text-xs">นามสกุล (ไทย)</div>
            <input
              value={form.lastNameTh}
              onChange={(e) => setForm({ ...form, lastNameTh: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <div className="text-xs">ชื่อ (อังกฤษ)</div>
            <input
              value={form.firstNameEn}
              onChange={(e) => setForm({ ...form, firstNameEn: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <div className="text-xs">นามสกุล (อังกฤษ)</div>
            <input
              value={form.lastNameEn}
              onChange={(e) => setForm({ ...form, lastNameEn: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <div className="text-xs">Role</div>
            <select
              value={form.roleId}
              onChange={(e) => setForm({ ...form, roleId: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              required
            >
              <option value="">- เลือก -</option>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </label>
          <label className="block">
            <div className="text-xs">Department</div>
            <select
              value={form.departmentId}
              onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              required
            >
              <option value="">- เลือก -</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.code} · {d.nameTh}</option>)}
            </select>
          </label>

          <div className="sm:col-span-3 flex gap-2">
            <StatefulButton type="submit" loading={busy} className="h-9 px-4 rounded-md">
              {isEditing ? "บันทึกการแก้ไข" : "สร้างผู้ใช้"}
            </StatefulButton>
            {isEditing && (
              <button type="button" className="h-9 px-4 rounded-md border" onClick={resetForm}>
                ยกเลิกแก้ไข
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Table */}
      <section className="rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Role</th>
                <th className="px-3 py-2 text-left">Dept</th>
                <th className="px-3 py-2 text-left">Deleted?</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-3 py-2">{u.id}</td>
                  <td className="px-3 py-2">{u.email}</td>
                  <td className="px-3 py-2">{u.name || `${u.firstNameTh || ""} ${u.lastNameTh || ""}`}</td>
                  <td className="px-3 py-2">{u.role?.name || "-"}</td>
                  <td className="px-3 py-2">{u.department?.code || "-"}</td>
                  <td className="px-3 py-2">{u.deletedAt ? "Yes" : "-"}</td>
                  <td className="px-3 py-2 text-right">
                    <button className="px-2 py-1 text-blue-600" onClick={() => onEdit(u)}>Edit</button>
                    {!u.deletedAt ? (
                      <button className="px-2 py-1 text-amber-600" onClick={() => onSoftDelete(u)}>Soft Delete</button>
                    ) : (
                      <>
                        <button className="px-2 py-1 text-green-600" onClick={() => onRestore(u)}>Restore</button>
                        <button className="px-2 py-1 text-red-600" onClick={() => onHardDelete(u)}>Hard Delete</button>
                      </>
                    )}
                    <button className="px-2 py-1 text-purple-600" onClick={() => onResetPassword(u)}>Reset Password</button>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr><td colSpan={7} className="px-3 py-6 text-center text-neutral-500">ไม่พบข้อมูล</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-3">
          <div className="text-xs text-neutral-500">ทั้งหมด {meta.total} รายการ</div>
          <div className="flex gap-2">
            <button className="border rounded-md px-3 py-1.5 text-sm disabled:opacity-50" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>
            <div className="text-sm">Page {meta.page} / {meta.pages || 1}</div>
            <button className="border rounded-md px-3 py-1.5 text-sm disabled:opacity-50" disabled={page >= (meta.pages || 1)} onClick={() => setPage((p) => p + 1)}>
              Next
            </button>
          </div>
        </div>
      </section>

      <ErrorDialog open={!!error} message={error} onClose={() => setError("")} />
    </main>
  );
}
