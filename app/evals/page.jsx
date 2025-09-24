"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import EvalScoreBadge from "@/components/EvalScoreBadge";

export default function MyEvalsPage() {
  const [me, setMe] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const meRes = await apiFetch("/api/profile"); // สมมติคืน { ok:true, data:{ id, roleName, ... } } หรือแค่ {ok:true,...}
    const meData = meRes.data || meRes;
    setMe(meData);

    // ดึงเฉพาะของฉัน
    const my = await apiFetch(`/api/evals?ownerId=${meData.id}`);
    setList(my.data || my);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">งานของฉัน (Evaluation)</h1>
        <Link href="/approvals" className="rounded bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-800">
          ไปหน้า Approvals
        </Link>
      </div>

      {loading ? <p>กำลังโหลด…</p> : (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-[720px] w-full bg-white text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left">รอบ</th>
                <th className="px-3 py-2 text-left">ประเภท</th>
                <th className="px-3 py-2 text-left">สถานะ</th>
                <th className="px-3 py-2 text-left">คะแนนรวม</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2">{r.stage} / CYCLE #{r.cycleId}</td>
                  <td className="px-3 py-2">{r.type}</td>
                  <td className="px-3 py-2">{r.status}</td>
                  <td className="px-3 py-2">
                    {r.scoreTotal != null ? <EvalScoreBadge total={r.scoreTotal} /> : <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Link href={`/evals/${r.id}`} className="rounded border px-2 py-1 hover:bg-slate-50">เปิดแบบฟอร์ม</Link>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td className="px-3 py-4 text-slate-500" colSpan={5}>ยังไม่มีแบบฟอร์ม</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
