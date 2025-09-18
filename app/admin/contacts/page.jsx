"use client";

import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import ErrorDialog from "@/components/modal/ErrorDialog";
import StatefulButton from "@/components/ui/stateful-button";
import { useAuth, hasRole } from "@/providers/local-auth";

const PAGE_SIZE = 20;

export default function AdminContactsPage() {
  const { user, loading } = useAuth();
  const isAdmin = hasRole(user, "admin");

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [q, setQ] = useState("");
  const [email, setEmail] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [view, setView] = useState(null); // item ที่เปิดดู

  useEffect(() => {
    if (!loading && !isAdmin) {
      // guard/redirect
    }
  }, [loading, isAdmin]);

  async function load() {
    setBusy(true);
    try {
      const params = new URLSearchParams({
        q,
        email,
        page: String(page),
        limit: String(PAGE_SIZE),
        sort,
      });
      if (dateFrom) params.set("dateFrom", dateFrom);
      if (dateTo) params.set("dateTo", dateTo);

      const res = await apiFetch(`/api/contacts?${params.toString()}`);
      setItems(res?.data || []);
      setMeta(res?.meta || { page: 1, pages: 1, total: 0 });
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, email, dateFrom, dateTo, page, sort]);

  async function onDelete(id) {
    if (!confirm("ลบข้อความนี้?")) return;
    setBusy(true);
    try {
      await apiFetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (view?.id === id) setView(null);
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "ลบไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function onOpen(id) {
    try {
      const res = await apiFetch(`/api/contacts/${id}`);
      setView(res?.data || null);
    } catch (e) {
      setError(e?.data?.error || e?.message || "เปิดไม่สำเร็จ");
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 py-30 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin · Contacts</h1>
        <div className="flex flex-wrap items-center gap-2">
          <input
            placeholder="ค้นหา ชื่อ/หัวข้อ/ข้อความ"
            className="border rounded-md px-3 py-1.5 text-sm"
            value={q}
            onChange={(e) => { setPage(1); setQ(e.target.value); }}
          />
          <input
            placeholder="Email"
            className="border rounded-md px-3 py-1.5 text-sm"
            value={email}
            onChange={(e) => { setPage(1); setEmail(e.target.value); }}
          />
          <input type="date" className="border rounded-md px-3 py-1.5 text-sm" value={dateFrom} onChange={(e) => { setPage(1); setDateFrom(e.target.value); }} />
          <input type="date" className="border rounded-md px-3 py-1.5 text-sm" value={dateTo} onChange={(e) => { setPage(1); setDateTo(e.target.value); }} />
          <select className="border rounded-md px-2 py-1.5 text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="desc">ใหม่ → เก่า</option>
            <option value="asc">เก่า → ใหม่</option>
          </select>
          <button className="border rounded-md px-3 py-1.5 text-sm" onClick={() => { setQ(""); setEmail(""); setDateFrom(""); setDateTo(""); setPage(1); }}>
            ล้าง
          </button>
        </div>
      </header>

      <section className="rounded-xl border overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* List */}
          <div className="border-r">
            <div className="max-h-[70vh] overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">เมื่อ</th>
                    <th className="px-3 py-2 text-left">อีเมล</th>
                    <th className="px-3 py-2 text-left">หัวข้อ</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="border-t">
                      <td className="px-3 py-2">{new Date(it.createdAt).toLocaleString()}</td>
                      <td className="px-3 py-2">{it.email}</td>
                      <td className="px-3 py-2">{it.subject}</td>
                      <td className="px-3 py-2 text-right">
                        <button className="px-2 py-1 text-blue-600" onClick={() => onOpen(it.id)}>View</button>
                        <button className="px-2 py-1 text-red-600" onClick={() => onDelete(it.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && (
                    <tr><td colSpan={4} className="px-3 py-6 text-center text-neutral-500">ไม่พบข้อมูล</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-3 border-t">
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
          </div>

          {/* Viewer */}
          <div className="p-4">
            {view ? (
              <article className="prose max-w-none">
                <h2 className="text-xl font-semibold">{view.subject}</h2>
                <p className="text-sm text-neutral-500">
                  จาก: <b>{view.name}</b> &lt;{view.email}&gt; • {new Date(view.createdAt).toLocaleString()}
                </p>
                {view.phone && <p className="text-sm">โทร: {view.phone}</p>}
                <hr className="my-3" />
                <pre className="whitespace-pre-wrap text-sm">{view.message}</pre>
                <div className="mt-4 flex gap-2">
                  <StatefulButton className="h-9 px-3" onClick={() => onDelete(view.id)}>
                    ลบข้อความนี้
                  </StatefulButton>
                  <button className="h-9 px-3 rounded-md border" onClick={() => setView(null)}>
                    ปิด
                  </button>
                </div>
              </article>
            ) : (
              <div className="text-neutral-500">เลือกข้อความทางซ้ายเพื่อดูรายละเอียด</div>
            )}
          </div>
        </div>
      </section>

      <ErrorDialog open={!!error} message={error} onClose={() => setError("")} />
    </main>
  );
}
