"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function HRReportsPage() {
  const [cycles, setCycles] = useState([]);
  const [cycleId, setCycleId] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(()=>{ (async()=>{
    const c = await apiFetch("/api/cycles?limit=999");
    setCycles(c?.data||[]);
  })(); }, []);

  async function load() {
    if (!cycleId) return;
    const r = await apiFetch(`/api/evals?cycleId=${cycleId}`);
    setRows(r?.data || []);
  }

  function downloadCSV() {
    const head = ["id","owner","dept","status","scoreTotal"];
    const lines = rows.map(r => [
      r.id,
      `${r.owner?.firstNameTh||""} ${r.owner?.lastNameTh||""}`.trim(),
      r.owner?.primaryUserDept?.department?.code || "",
      r.status,
      r.scoreTotal ?? ""
    ].map(s=>`"${String(s).replace(/"/g,'""')}"`).join(","));
    const csv = [head.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "hr-report.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">HR Summary</h1>

      <div className="flex gap-2">
        <select className="border rounded px-2 py-1" value={cycleId} onChange={e=>setCycleId(e.target.value)}>
          <option value="">-- เลือกรอบ --</option>
          {cycles.map(c=> <option key={c.id} value={c.id}>{c.code}</option>)}
        </select>
        <button onClick={load} className="px-3 py-1 bg-gray-900 text-white rounded">โหลดข้อมูล</button>
        <button onClick={downloadCSV} disabled={!rows.length} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50">ดาวน์โหลด CSV</button>
      </div>

      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="py-2">ID</th><th>พนักงาน</th><th>แผนก</th><th>สถานะ</th><th>รวม</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id} className="border-b">
              <td className="py-2">{r.id}</td>
              <td>{r.owner?.firstNameTh} {r.owner?.lastNameTh}</td>
              <td>{r.owner?.primaryUserDept?.department?.code}</td>
              <td>{r.status}</td>
              <td>{r.scoreTotal ?? "-"}</td>
            </tr>
          ))}
          {!rows.length && <tr><td className="py-6 text-gray-500" colSpan={5}>ยังไม่มีข้อมูล</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
