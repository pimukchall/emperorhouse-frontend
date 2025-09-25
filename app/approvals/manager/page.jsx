"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function ManagerApprovalsPage() {
  const [list, setList] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => { load(); }, []);
  async function load() {
    const r = await apiFetch("/api/evals?status=SUBMITTED&role=manager");
    setList(r?.data || []);
  }

  async function act(id, action) {
    setBusy(true);
    try {
      if (action === "approve")
        await apiFetch(`/api/evals/${id}/approve`, { method: "POST", body: { comment: "" } });
      else
        await apiFetch(`/api/evals/${id}/reject`, { method: "POST", body: { comment: "" } });
      await load();
    } finally { setBusy(false); }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Approvals — Manager</h1>
      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="py-2">รหัส</th><th>พนักงาน</th><th>รอบ</th><th></th></tr></thead>
        <tbody>
          {list.map(ev => (
            <tr key={ev.id} className="border-b">
              <td className="py-2">{ev.id}</td>
              <td>{ev.owner?.firstNameTh} {ev.owner?.lastNameTh}</td>
              <td>{ev.cycle?.code}</td>
              <td className="flex gap-2 py-2">
                <button className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-50" disabled={busy} onClick={()=>act(ev.id,"approve")}>Approve</button>
                <button className="px-3 py-1 rounded bg-red-600 text-white disabled:opacity-50" disabled={busy} onClick={()=>act(ev.id,"reject")}>Reject</button>
              </td>
            </tr>
          ))}
          {list.length === 0 && <tr><td className="py-6 text-gray-500" colSpan={4}>ไม่มีรายการ</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
