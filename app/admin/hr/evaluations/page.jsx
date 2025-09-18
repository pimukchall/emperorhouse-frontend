"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

export default function AdminEvaluationsPage() {
  const [q, setQ] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [round, setRound] = useState("");
  const [status, setStatus] = useState("");
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1 });
  const [busy, setBusy] = useState(false);

  async function load(page = 1) {
    setBusy(true);
    try {
      const res = await apiFetch(
        `/api/evaluations?q=${encodeURIComponent(q)}&year=${year || ""}&round=${
          round || ""
        }&status=${
          status || ""
        }&page=${page}&limit=20&sortBy=updatedAt&sort=desc`
      );
      setRows(res?.data || []);
      setMeta(res?.meta || { page: 1, pages: 1 });
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load(1);
  }, []); // first load

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div>
          <label className="text-sm">ปี</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="block rounded-md border px-3 py-1.5"
          />
        </div>
        <div>
          <label className="text-sm">รอบ</label>
          <select
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className="block rounded-md border px-3 py-1.5"
          >
            <option value="">ทุกช่วง</option>
            <option value="1">รอบ 1</option>
            <option value="2">รอบ 2</option>
          </select>
        </div>
        <div>
          <label className="text-sm">สถานะ</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block rounded-md border px-3 py-1.5"
          >
            <option value="">ทั้งหมด</option>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="HeadApproved">Head Approved</option>
            <option value="MDApproved">MD Approved</option>
            <option value="HRReceived">HR Received</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="text-sm">ค้นหา</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ชื่อ/อีเมล"
            className="block w-full rounded-md border px-3 py-1.5"
          />
        </div>
        <button
          onClick={() => load(1)}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          disabled={busy}
        >
          ค้นหา
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">พนักงาน</th>
              <th className="p-2 text-left">แผนก</th>
              <th className="p-2 text-left">ปี/รอบ</th>
              <th className="p-2 text-left">สถานะ</th>
              <th className="p-2 text-right">เปิดดู</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">#{r.id}</td>
                <td className="p-2">
                  {r.employee?.firstNameTh} {r.employee?.lastNameTh}
                  <div className="text-xs text-neutral-500">
                    {r.employee?.email}
                  </div>
                </td>
                <td className="p-2">
                  {r.department?.nameTh || r.department?.nameEn || "-"}
                </td>
                <td className="p-2">
                  {r.year} / {r.round}
                </td>
                <td className="p-2">{r.status}</td>
                <td className="p-2 text-right">
                  <Link
                    href={`/admin/evaluations/${r.id}`}
                    className="rounded-md border px-3 py-1 hover:bg-neutral-50"
                  >
                    เปิด
                  </Link>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td className="p-3 text-center text-neutral-500" colSpan={6}>
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          disabled={meta.page <= 1 || busy}
          onClick={() => load(meta.page - 1)}
          className="rounded-md border px-3 py-1 disabled:opacity-50"
        >
          ก่อนหน้า
        </button>
        <div className="px-2 text-sm text-neutral-600">
          หน้า {meta.page}/{meta.pages}
        </div>
        <button
          disabled={meta.page >= meta.pages || busy}
          onClick={() => load(meta.page + 1)}
          className="rounded-md border px-3 py-1 disabled:opacity-50"
        >
          ถัดไป
        </button>
      </div>
    </main>
  );
}
