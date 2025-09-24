"use client";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { gradeFromScore } from "@/lib/grades";

export default function HrReportsPage() {
  const [cycleId, setCycleId] = useState("");
  const [status, setStatus] = useState("COMPLETED");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cycles, setCycles] = useState([]);

  async function loadCycles() {
    // ถ้ายังไม่มี endpoint list cycles ให้ฮาร์ดโค้ด/หรือสร้างหน้า admin เพิ่มภายหลัง
    try {
      const r = await apiFetch("/api/cycles"); // ถ้ายังไม่มี ให้ข้ามไม่ error
      setCycles(r.data || r);
    } catch {}
  }

  async function run() {
    setLoading(true);
    const qs = new URLSearchParams();
    if (cycleId) qs.set("cycleId", cycleId);
    if (status) qs.set("status", status);
    const r = await apiFetch(`/api/evals?${qs.toString()}`);
    const list = r.data || r;
    setRows(list);
    setLoading(false);
  }

  useEffect(() => { loadCycles(); }, []);
  useEffect(() => { run(); }, [cycleId, status]);

  function downloadCSV() {
    const head = [
      "id","cycleId","stage","type","ownerId","managerId","mdId","status",
      "scorePerf","scoreResult","scoreComp","scoreTotal","grade"
    ];
    const lines = [head.join(",")];
    for (const r of rows) {
      const g = gradeFromScore(r.scoreTotal).grade;
      lines.push([
        r.id, r.cycleId, r.stage, r.type, r.ownerId, r.managerId, r.mdId, r.status,
        n(r.scorePerf), n(r.scoreResult), n(r.scoreComp), n(r.scoreTotal), g
      ].join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hr-report${cycleId?`-cycle${cycleId}`:""}-${status || "ALL"}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  const n = (v)=> v==null ? "" : Number(v).toFixed(2);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">รายงาน HR</h1>

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-sm">รอบ (Cycle)</label>
          <select className="rounded border px-2 py-1 min-w-40" value={cycleId} onChange={(e)=>setCycleId(e.target.value)}>
            <option value="">ทั้งหมด</option>
            {cycles.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm">สถานะ</label>
          <select className="rounded border px-2 py-1" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="">ทั้งหมด</option>
            <option value="DRAFT">DRAFT</option>
            <option value="SUBMITTED">SUBMITTED</option>
            <option value="APPROVER_APPROVED">APPROVER_APPROVED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        <button className="ml-auto rounded border px-3 py-1.5 hover:bg-slate-50" onClick={downloadCSV}>
          ดาวน์โหลด CSV
        </button>
      </div>

      {loading ? <p>กำลังโหลด…</p> : (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-[920px] w-full bg-white text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left">#</th>
                <th className="px-3 py-2 text-left">รหัสรอบ</th>
                <th className="px-3 py-2 text-left">ประเภท</th>
                <th className="px-3 py-2 text-left">สถานะ</th>
                <th className="px-3 py-2 text-right">Perf</th>
                <th className="px-3 py-2 text-right">Result</th>
                <th className="px-3 py-2 text-right">Comp</th>
                <th className="px-3 py-2 text-right">รวม/เกรด</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r)=> {
                const g = gradeFromScore(r.scoreTotal);
                return (
                  <tr key={r.id} className="border-t">
                    <td className="px-3 py-2">#{r.id}</td>
                    <td className="px-3 py-2">{r.stage} / CYCLE {r.cycleId}</td>
                    <td className="px-3 py-2">{r.type}</td>
                    <td className="px-3 py-2">{r.status}</td>
                    <td className="px-3 py-2 text-right">{n(r.scorePerf)}</td>
                    <td className="px-3 py-2 text-right">{n(r.scoreResult)}</td>
                    <td className="px-3 py-2 text-right">{n(r.scoreComp)}</td>
                    <td className={`px-3 py-2 text-right ${g.color}`}>
                      <strong>{n(r.scoreTotal)}</strong> <span className="opacity-75">({g.grade})</span>
                    </td>
                  </tr>
                );
              })}
              {rows.length===0 && <tr><td className="px-3 py-3 text-slate-500" colSpan={8}>ไม่พบข้อมูล</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
