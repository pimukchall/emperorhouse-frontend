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

export default function AdminOrganizationsPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState({ id: 0, code: "", nameTh: "", nameEn: "" });

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch(
        `/api/organizations?page=1&limit=50&q=${encodeURIComponent(q)}&includeDeleted=${includeDeleted ? "1" : "0"}&sortBy=id&sort=asc`
      );
      setItems(res?.data || []);
      setError("");
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดไม่สำเร็จ");
      setItems([]);
    } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [q, includeDeleted]);

  function openNew() { setEditing({ id: 0, code: "", nameTh: "", nameEn: "" }); setDialogOpen(true); }
  function openEdit(o) { setEditing({ id: o.id, code: o.code || "", nameTh: o.nameTh || "", nameEn: o.nameEn || "" }); setDialogOpen(true); }

  async function save() {
    const payload = { code: editing.code || null, nameTh: editing.nameTh || null, nameEn: editing.nameEn || null };
    if (editing.id === 0) await apiFetch(`/api/organizations`, { method: "POST", body: payload });
    else await apiFetch(`/api/organizations/${editing.id}`, { method: "PUT", body: payload });
    setDialogOpen(false); load();
  }
  async function softDelete(id) { await apiFetch(`/api/organizations/${id}`, { method: "DELETE" }); load(); }
  async function restore(id) { await apiFetch(`/api/organizations/${id}/restore`, { method: "POST" }); load(); }
  async function destroy(id) { if (!confirm("ลบถาวร?")) return; await apiFetch(`/api/organizations/${id}?hard=1`, { method: "DELETE" }); load(); }

  return (
    <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Organizations</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <input className="w-52 rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200" placeholder="ค้นหา code / ชื่อ" value={q} onChange={(e)=>setQ(e.target.value)} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={includeDeleted} onChange={(e)=>setIncludeDeleted(e.target.checked)} /> แสดงที่ลบแล้ว
          </label>
          <button className="hidden sm:inline-flex items-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80" onClick={openNew}>
            + สร้างใหม่
          </button>
        </div>
      </header>

      <section className="rounded-xl border dark:border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr><Th>ID</Th><Th>Code</Th><Th>Name (TH)</Th><Th>Name (EN)</Th><Th>Deleted?</Th><Th right>Actions</Th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><Td colSpan={6} className="text-center p-6">Loading…</Td></tr>
              ) : items.length === 0 ? (
                <tr><Td colSpan={6} className="text-center p-6">ไม่พบข้อมูล</Td></tr>
              ) : (
                items.map((o, idx) => (
                  <tr key={o.id} className={`border-t dark:border-neutral-700 ${idx%2===0 ? "bg-neutral-50 dark:bg-neutral-900/50":""} hover:bg-neutral-100 dark:hover:bg-neutral-800`}>
                    <Td>{o.id}</Td>
                    <Td className="font-mono">{o.code}</Td>
                    <Td>{o.nameTh}</Td>
                    <Td>{o.nameEn}</Td>
                    <Td>{o.deletedAt ? "Yes" : "-"}</Td>
                    <Td right>
                      <div className="flex flex-wrap gap-1 justify-end">
                        <GhostButton onClick={()=>openEdit(o)}>Edit</GhostButton>
                        {!o.deletedAt ? (
                          <GhostButton className="text-amber-600" onClick={()=>softDelete(o.id)}>Delete</GhostButton>
                        ) : (
                          <>
                            <GhostButton className="text-green-600" onClick={()=>restore(o.id)}>Restore</GhostButton>
                            <GhostButton className="text-rose-600" onClick={()=>destroy(o.id)}>Destroy</GhostButton>
                          </>
                        )}
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
        title={editing.id ? `แก้ไข #${editing.id}` : "สร้างใหม่"}
        footer={
          <>
            <button className="rounded-md border px-4 py-2 text-sm dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800" onClick={()=>setDialogOpen(false)}>ยกเลิก</button>
            <button className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80" onClick={save}>บันทึก</button>
          </>
        }
      >
        <label className="block"><div className="text-sm">Code</div><input className={cx} value={editing.code} onChange={(e)=>setEditing(s=>({...s, code:e.target.value}))} /></label>
        <label className="block"><div className="text-sm">Name (TH)</div><input className={cx} value={editing.nameTh} onChange={(e)=>setEditing(s=>({...s, nameTh:e.target.value}))} /></label>
        <label className="block"><div className="text-sm">Name (EN)</div><input className={cx} value={editing.nameEn} onChange={(e)=>setEditing(s=>({...s, nameEn:e.target.value}))} /></label>
      </Dialog>

      {!!error && <div className="text-red-500 text-sm">{error}</div>}
    </main>
  );
}
function Th({ children, right }) { return <th className={`px-3 py-2 ${right?"text-right":"text-left"} text-neutral-700 dark:text-neutral-200`}>{children}</th>; }
function Td({ children, right, ...rest }) { return <td className={`px-3 py-2 ${right?"text-right":""}`} {...rest}>{children}</td>; }
