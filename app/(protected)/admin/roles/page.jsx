"use client";

import { useEffect, useState } from "react";
import RolesTable from "@/components/admin/roles/RolesTable";
import RoleFormDialog from "@/components/admin/roles/RoleFormDialog";
import ConfirmDialog from "@/components/modal/ConfirmDialog";
import NoticeDialog from "@/components/modal/NoticeDialog";
import { listRoles, createRole, updateRole, deleteRole } from "@/lib/roles";

export default function AdminRolesPage() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ฟอร์ม
  const [dlgOpen, setDlgOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // ลบ
  const [confirm, setConfirm] = useState({ open: false, row: null, loading: false, error: "" });

  // แจ้งผล
  const [notice, setNotice] = useState({ open: false, type: "success", message: "" });

  const debouncedQ = useDebounce(q, 300);

  async function load() {
    setLoading(true);
    try {
      const items = await listRoles({ q: debouncedQ, page: 1, limit: 200, sortBy: "id", sort: "asc" });
      setRows(items);
      setError("");
    } catch (e) {
      setError(e?.data?.message || e?.message || "โหลดไม่สำเร็จ");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [debouncedQ]);

  // ——— Actions ———
  function openNew() {
    setEditing(null);
    setFormError("");
    setDlgOpen(true);
  }
  function openEdit(row) {
    setEditing({ id: row.id, name: row.name, labelTh: row.labelTh, labelEn: row.labelEn });
    setFormError("");
    setDlgOpen(true);
  }

  async function handleSubmit(form) {
    try {
      setSaving(true);
      setFormError("");
      if (form.id) {
        await updateRole(form.id, {
          labelTh: form.labelTh || null,
          labelEn: form.labelEn || null,
        });
        setNotice({ open: true, type: "success", message: `อัปเดต ${form.name} สำเร็จ` });
      } else {
        await createRole({
          name: form.name,
          labelTh: form.labelTh || null,
          labelEn: form.labelEn || null,
        });
        setNotice({ open: true, type: "success", message: `สร้าง ${form.name} สำเร็จ` });
      }
      setDlgOpen(false);
      await load();
    } catch (e) {
      setFormError(e?.data?.message || e.message || "บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  function askDelete(row) {
    setConfirm({ open: true, row, loading: false, error: "" });
  }
  async function onConfirmDelete() {
    setConfirm((s) => ({ ...s, loading: true, error: "" }));
    try {
      await deleteRole(confirm.row.id);
      setConfirm({ open: false, row: null, loading: false, error: "" });
      setNotice({ open: true, type: "success", message: `ลบ ${confirm.row.name} สำเร็จ` });
      await load();
    } catch (e) {
      setConfirm((s) => ({ ...s, loading: false, error: e?.data?.message || e.message || "ลบไม่สำเร็จ" }));
    }
  }

  return (
    <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Roles</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <input
            className="w-52 rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            placeholder="ค้นหา role"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            className="hidden sm:inline-flex items-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80"
            onClick={openNew}
          >
            + สร้างใหม่
          </button>
        </div>
      </header>

      <RolesTable
        items={rows}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={askDelete}
      />

      {/* FAB (mobile) */}
      <button
        onClick={openNew}
        className="sm:hidden fixed bottom-5 right-5 z-40 rounded-full h-12 w-12 shadow-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xl leading-none"
        aria-label="สร้างใหม่"
      >
        +
      </button>

      <RoleFormDialog
        open={dlgOpen}
        onClose={() => setDlgOpen(false)}
        initial={editing}
        onSubmit={handleSubmit}
        loading={saving}
        error={formError}
      />

      <ConfirmDialog
        open={confirm.open}
        title="ยืนยันการลบ"
        description={confirm.row ? `ต้องการลบ role "${confirm.row.name}" ใช่ไหม?` : ""}
        loading={confirm.loading}
        error={confirm.error}
        onCancel={() => setConfirm({ open: false, row: null, loading: false, error: "" })}
        onConfirm={onConfirmDelete}
      />

      <NoticeDialog
        open={notice.open}
        type={notice.type}
        message={notice.message}
        onClose={() => setNotice({ open: false, type: "success", message: "" })}
      />
    </main>
  );
}

// ——— utils: debounce hook ———
function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}