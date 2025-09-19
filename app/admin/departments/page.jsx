"use client";

import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import StatefulButton from "@/components/ui/stateful-button";
import ErrorDialog from "@/components/modal/ErrorDialog";
import { useAuth, hasRole } from "@/providers/local-auth";

const PAGE_SIZE = 20;

export default function AdminDepartmentsPage() {
  const { user, loading } = useAuth();
  const isAdmin = hasRole(user, "admin");

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ id: null, code: "", nameTh: "", nameEn: "" });
  const isEditing = useMemo(() => form.id !== null, [form.id]);

  useEffect(() => {
    if (!loading && !isAdmin) {
      // guard/redirect
    }
  }, [loading, isAdmin]);

  async function load() {
    setBusy(true);
    try {
      const res = await apiFetch(`/api/departments?q=${encodeURIComponent(q)}&page=${page}&limit=${PAGE_SIZE}`);
      setItems(res?.data || []);
      setMeta(res?.meta || { page: 1, pages: 1, total: 0 });
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [q, page]);

  function resetForm() {
    setForm({ id: null, code: "", nameTh: "", nameEn: "" });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      // ✅ upsert ผ่าน POST /api/departments (ถ้ามี id -> update, ถ้าไม่มี -> create)
      await apiFetch(`/api/departments`, {
        method: "POST",
        body: {
          id: form.id ?? undefined,
          code: form.code,
          nameTh: form.nameTh,
          nameEn: form.nameEn || null,
        },
      });
      resetForm();
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "บันทึกไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id) {
    if (!confirm("ลบรายการนี้?")) return;
    setBusy(true);
    try {
      await apiFetch(`/api/departments/${id}`, { method: "DELETE" });
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "ลบไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 py-30 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin · Departments</h1>
        <div className="flex gap-2">
          <input
            placeholder="ค้นหา code / ชื่อ"
            className="border rounded-md px-3 py-1.5 text-sm"
            value={q}
            onChange={(e) => { setPage(1); setQ(e.target.value); }}
          />
          <button className="border rounded-md px-3 py-1.5 text-sm" onClick={() => { setQ(""); setPage(1); }}>
            ล้าง
          </button>
        </div>
      </header>

      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-3">{isEditing ? "แก้ไขแผนก" : "เพิ่มแผนกใหม่"}</h2>
        <form className="grid gap-3 sm:grid-cols-3" onSubmit={onSubmit}>
          <label className="block">
            <div className="text-xs">Code</div>
            <input
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              required
              maxLength={32}
            />
          </label>
          <label className="block sm:col-span-1">
            <div className="text-xs">ชื่อ (ไทย)</div>
            <input
              value={form.nameTh}
              onChange={(e) => setForm({ ...form, nameTh: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              required
              maxLength={120}
            />
          </label>
          <label className="block sm:col-span-1">
            <div className="text-xs">ชื่อ (อังกฤษ) (ถ้ามี)</div>
            <input
              value={form.nameEn}
              onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              maxLength={120}
            />
          </label>

          <div className="sm:col-span-3 flex gap-2">
            <StatefulButton type="submit" loading={busy} className="h-9 px-4 rounded-md">
              {isEditing ? "บันทึกการแก้ไข" : "เพิ่ม"}
            </StatefulButton>
            {isEditing && (
              <button type="button" className="h-9 px-4 rounded-md border" onClick={resetForm}>
                ยกเลิกแก้ไข
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Code</th>
                <th className="px-3 py-2 text-left">ชื่อ (TH)</th>
                <th className="px-3 py-2 text-left">ชื่อ (EN)</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="px-3 py-2">{d.id}</td>
                  <td className="px-3 py-2">{d.code}</td>
                  <td className="px-3 py-2">{d.nameTh}</td>
                  <td className="px-3 py-2">{d.nameEn || "-"}</td>
                  <td className="px-3 py-2 text-right">
                    <button
                      className="px-2 py-1 text-blue-600"
                      onClick={() => setForm({ id: d.id, code: d.code, nameTh: d.nameTh, nameEn: d.nameEn || "" })}
                    >
                      Edit
                    </button>
                    <button className="px-2 py-1 text-red-600" onClick={() => onDelete(d.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr><td colSpan={5} className="px-3 py-6 text-center text-neutral-500">ไม่พบข้อมูล</td></tr>
              )}
            </tbody>
          </table>
        </div>

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
