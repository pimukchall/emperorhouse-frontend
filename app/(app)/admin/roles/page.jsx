"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

function Dialog({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-[620px] max-w-[95vw] rounded-lg bg-white dark:bg-neutral-900 shadow-2xl p-6" onClick={(e)=>e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">{title}</h2>
        <div className="space-y-3">{children}</div>
        <div className="mt-6 flex justify-end gap-2">{footer}</div>
      </div>
    </div>
  );
}
function GhostButton({ children, className = "", ...rest }) {
  return (
    <button className={`px-2 py-1 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50 ${className}`} {...rest}>
      {children}
    </button>
  );
}
const cx = "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

export default function AdminRolesPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState({ name: "", labelTh: "", labelEn: "" });

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/roles?q=${encodeURIComponent(q)}&page=1&limit=200&sortBy=id&sort=asc`);
      setItems(res?.data || []);
      setError("");
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดไม่สำเร็จ");
      setItems([]);
    } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [q]);

  function openNew() { setEditing({ name: "", labelTh: "", labelEn: "" }); setDialogOpen(true); }
  function openEdit(r) { setEditing({ name: r.name || "", labelTh: r.labelTh || "", labelEn: r.labelEn || "" }); setDialogOpen(true); }

  async function save() {
    if (!editing.name) return;
    await apiFetch(`/api/roles`, { method: "POST", body: { name: editing.name, labelTh: editing.labelTh || null, labelEn: editing.labelEn || null } });
    setDialogOpen(false); load();
  }
  async function remove(name) { if (!confirm(`ลบ role "${name}" ?`)) return; await apiFetch(`/api/roles/${encodeURIComponent(name)}`, { method: "DELETE" }); load(); }

  return (
    <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Roles</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <input className="w-52 rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200" placeholder="ค้นหา role" value={q} onChange={(e)=>setQ(e.target.value)} />
          <button className="hidden sm:inline-flex items-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80" onClick={openNew}>+ สร้างใหม่</button>
        </div>
      </header>

      <section className="rounded-xl border dark:border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr><Th>ID</Th><Th>name</Th><Th>labelTh</Th><Th>labelEn</Th><Th right>Actions</Th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><Td colSpan={5} className="text-center p-6">Loading…</Td></tr>
              ) : items.length === 0 ? (
                <tr><Td colSpan={5} className="text-center p-6">ไม่พบข้อมูล</Td></tr>
              ) : (
                items.map((r, idx) => (
                  <tr key={r.id ?? r.name} className={`border-t dark:border-neutral-700 ${idx%2===0 ? "bg-neutral-50 dark:bg-neutral-900/50":""} hover:bg-neutral-100 dark:hover:bg-neutral-800`}>
                    <Td>{r.id}</Td>
                    <Td className="font-mono">{r.name}</Td>
                    <Td>{r.labelTh || "-"}</Td>
                    <Td>{r.labelEn || "-"}</Td>
                    <Td right>
                      <div className="flex gap-1 justify-end">
                        <GhostButton onClick={()=>openEdit(r)}>Edit</GhostButton>
                        <GhostButton className="text-rose-600" onClick={()=>remove(r.name)}>Delete</GhostButton>
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAB (mobile) */}
      <button onClick={openNew} className="sm:hidden fixed bottom-5 right-5 z-40 rounded-full h-12 w-12 shadow-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xl leading-none" aria-label="สร้างใหม่">+</button>

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={()=>setDialogOpen(false)}
        title={editing?.name ? `แก้ไข ${editing.name}` : "สร้างใหม่"}
        footer={
          <>
            <button className="rounded-md border px-4 py-2 text-sm dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800" onClick={()=>setDialogOpen(false)}>ยกเลิก</button>
            <button className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80" onClick={save}>บันทึก</button>
          </>
        }
      >
        <label className="block"><div className="text-sm">name (unique)</div><input className={cx} value={editing.name} onChange={(e)=>setEditing(s=>({...s, name:e.target.value}))} placeholder="เช่น admin, user, hr.manager" /></label>
        <label className="block"><div className="text-sm">labelTh</div><input className={cx} value={editing.labelTh} onChange={(e)=>setEditing(s=>({...s, labelTh:e.target.value}))} placeholder="ชื่อภาษาไทย" /></label>
        <label className="block"><div className="text-sm">labelEn</div><input className={cx} value={editing.labelEn} onChange={(e)=>setEditing(s=>({...s, labelEn:e.target.value}))} placeholder="English label" /></label>
      </Dialog>

      {!!error && <div className="text-red-500 text-sm">{error}</div>}
    </main>
  );
}
function Th({ children, right }) { return <th className={`px-3 py-2 ${right?"text-right":"text-left"} text-neutral-700 dark:text-neutral-200`}>{children}</th>; }
function Td({ children, right, ...rest }) { return <td className={`px-3 py-2 ${right?"text-right":""}`} {...rest}>{children}</td>; }
