"use client";

import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import ErrorDialog from "@/components/modal/ErrorDialog";
import StatefulButton from "@/components/ui/stateful-button";
import { useAuth, hasRole } from "@/domains/auth/hooks/useAuth";

const PAGE_SIZE = 20;

// ปุ่มโทน Ghost ให้ใช้งานซ้ำได้
function GhostButton({ children, className = "", ...rest }) {
  return (
    <button
      className={`px-3 py-1.5 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

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

  const [view, setView] = useState(null);

  useEffect(() => {
    if (!loading && !isAdmin) {
      // TODO: guard/redirect ถ้าจำเป็น
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
      setError("");
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

  const inputCx =
    "w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

  return (
    <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto space-y-4">
      {/* Header + Filters */}
      <header className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
            Admin · Contacts
          </h1>
        </div>

        <section className="rounded-xl border dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4">
          <div className="grid gap-3 sm:grid-cols-6">
            <label className="sm:col-span-2">
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                ค้นหา (ชื่อ/หัวข้อ/ข้อความ)
              </div>
              <input
                placeholder="พิมพ์คำค้น…"
                className={inputCx}
                value={q}
                onChange={(e) => {
                  setPage(1);
                  setQ(e.target.value);
                }}
              />
            </label>

            <label className="sm:col-span-2">
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                Email
              </div>
              <input
                placeholder="someone@example.com"
                className={inputCx}
                value={email}
                onChange={(e) => {
                  setPage(1);
                  setEmail(e.target.value);
                }}
              />
            </label>

            <label className="sm:col-span-1">
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                จากวันที่
              </div>
              <input
                type="date"
                className={inputCx}
                value={dateFrom}
                onChange={(e) => {
                  setPage(1);
                  setDateFrom(e.target.value);
                }}
              />
            </label>

            <label className="sm:col-span-1">
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                ถึงวันที่
              </div>
              <input
                type="date"
                className={inputCx}
                value={dateTo}
                onChange={(e) => {
                  setPage(1);
                  setDateTo(e.target.value);
                }}
              />
            </label>

            <label className="sm:col-span-2">
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                เรียงลำดับ
              </div>
              <select
                className={inputCx}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="desc">ใหม่ → เก่า</option>
                <option value="asc">เก่า → ใหม่</option>
              </select>
            </label>

            <div className="sm:col-span-4 flex items-end gap-2">
              <GhostButton
                onClick={() => {
                  setQ("");
                  setEmail("");
                  setDateFrom("");
                  setDateTo("");
                  setPage(1);
                }}
              >
                ล้างตัวกรอง
              </GhostButton>
              {busy && (
                <span className="text-xs text-neutral-500">กำลังโหลด…</span>
              )}
            </div>
          </div>
        </section>
      </header>

      {/* Master / Detail */}
      <section className="rounded-xl border dark:border-neutral-700 overflow-hidden bg-white dark:bg-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* List */}
          <div className="border-b md:border-b-0 md:border-r dark:border-neutral-700">
            <div className="max-h-[70vh] overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-100 dark:bg-neutral-800 sticky top-0 z-10">
                  <tr className="text-neutral-700 dark:text-neutral-200">
                    <th className="px-3 py-2 text-left">เมื่อ</th>
                    <th className="px-3 py-2 text-left">อีเมล</th>
                    <th className="px-3 py-2 text-left">หัวข้อ</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length ? (
                    items.map((it, idx) => (
                      <tr
                        key={it.id}
                        className={`border-t dark:border-neutral-700 ${
                          idx % 2 === 0
                            ? "bg-neutral-50 dark:bg-neutral-900/50"
                            : ""
                        } hover:bg-neutral-100 dark:hover:bg-neutral-800`}
                      >
                        <td className="px-3 py-2 whitespace-nowrap">
                          {new Date(it.createdAt).toLocaleString()}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {it.email}
                        </td>
                        <td className="px-3 py-2">{it.subject}</td>
                        <td className="px-3 py-2 text-right">
                          <div className="flex flex-wrap gap-1 justify-end">
                            <GhostButton
                              className="text-blue-700"
                              onClick={() => onOpen(it.id)}
                            >
                              View
                            </GhostButton>
                            <GhostButton
                              className="text-rose-700"
                              onClick={() => onDelete(it.id)}
                            >
                              Delete
                            </GhostButton>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-6 text-center text-neutral-500"
                      >
                        ไม่พบข้อมูล
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-3 border-t dark:border-neutral-700">
              <div className="text-xs text-neutral-500">
                ทั้งหมด {meta.total} รายการ
              </div>
              <div className="flex gap-2">
                <GhostButton
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </GhostButton>
                <div className="text-sm">
                  Page {meta.page} / {meta.pages || 1}
                </div>
                <GhostButton
                  disabled={page >= (meta.pages || 1)}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </GhostButton>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="p-4">
            {view ? (
              <article className="prose max-w-none">
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                  {view.subject}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  จาก: <b>{view.name}</b> &lt;{view.email}&gt; •{" "}
                  {new Date(view.createdAt).toLocaleString()}
                </p>
                {view.phone && (
                  <p className="text-sm text-neutral-700 dark:text-neutral-200">
                    โทร: {view.phone}
                  </p>
                )}
                <hr className="my-3 border-neutral-200 dark:border-neutral-700" />
                <pre className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-100">
                  {view.message}
                </pre>
                <div className="mt-4 flex gap-2">
                  <StatefulButton
                    className="h-9 px-3"
                    onClick={() => onDelete(view.id)}
                  >
                    ลบข้อความนี้
                  </StatefulButton>
                  <GhostButton onClick={() => setView(null)}>ปิด</GhostButton>
                </div>
              </article>
            ) : (
              <div className="text-neutral-500">
                เลือกข้อความทางซ้ายเพื่อดูรายละเอียด
              </div>
            )}
          </div>
        </div>
      </section>

      <ErrorDialog open={!!error} message={error} onClose={() => setError("")} />
    </main>
  );
}
