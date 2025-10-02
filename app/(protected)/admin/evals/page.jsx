"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/api";
import Link from "next/link";

export default function AdminAllEvalsPage() {
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(()=>{ load(); },[]);
  async function load(){
    const r = await apiFetch("/api/evals?limit=200");
    setRows(r?.data || []);
  }
  async function del(id){
    if(!confirm(`ลบฟอร์ม #${id}?`)) return;
    setBusy(true);
    try {
      await apiFetch(`/api/evals/${id}`, { method:"DELETE" });
      await load();
    } finally { setBusy(false); }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Admin — ทุกฟอร์ม</h1>
      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="py-2">ID</th><th>Owner</th><th>Cycle</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id} className="border-b">
              <td className="py-2">{r.id}</td>
              <td>{r.owner?.firstNameTh} {r.owner?.lastNameTh}</td>
              <td>{r.cycle?.code}</td>
              <td>{r.status}</td>
              <td className="flex gap-2">
                <Link className="text-blue-600 underline" href={`/evals/${r.id}`}>เปิด</Link>
                <button className="text-red-600 disabled:opacity-50" disabled={busy} onClick={()=>del(r.id)}>ลบ</button>
              </td>
            </tr>
          ))}
          {!rows.length && <tr><td className="py-6 text-gray-500" colSpan={5}>ไม่มีข้อมูล</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
