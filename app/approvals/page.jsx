"use client";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function ApprovalsPage() {
  const [me, setMe] = useState(null);
  const [subs, setSubs] = useState([]);      // ที่รอหัวหน้าอนุมัติ (SUBMITTED)
  const [mds, setMds] = useState([]);        // ที่รอ MD (APPROVER_APPROVED)
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const meRes = await apiFetch("/api/profile");
    const meData = meRes.data || meRes;
    setMe(meData);

    // ดึงเฉพาะสถานะสำคัญแล้วกรองฝั่ง client ตาม user ปัจจุบัน
    const sub = await apiFetch(`/api/evals?status=SUBMITTED`);
    const apv = await apiFetch(`/api/evals?status=APPROVER_APPROVED`);

    setSubs((sub.data || sub).filter((x) => x.managerId === meData.id));
    setMds((apv.data || apv).filter((x) => x.mdId === meData.id));
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function act(id, action, comment) {
    const path = action === "approve-manager"
      ? `/api/evals/${id}/approve`
      : action === "approve-md"
        ? `/api/evals/${id}/md-approve`
        : `/api/evals/${id}/reject`;
    await apiFetch(path, { method: "POST", body: { comment } });
    await load();
  }

  const Section = ({ title, items, action }) => (
    <section className="space-y-2">
      <h2 className="font-semibold">{title}</h2>
      <div className="overflow-x-auto rounded border">
        <table className="min-w-[720px] w-full bg-white text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left">แบบฟอร์ม</th>
              <th className="px-3 py-2 text-left">เจ้าของ</th>
              <th className="px-3 py-2 text-left">ประเภท</th>
              <th className="px-3 py-2 text-left">สถานะ</th>
              <th className="px-3 py-2 text-right">การทำงาน</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r)=>(
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2">#{r.id} ({r.stage})</td>
                <td className="px-3 py-2">UID {r.ownerId}</td>
                <td className="px-3 py-2">{r.type}</td>
                <td className="px-3 py-2">{r.status}</td>
                <td className="px-3 py-2 text-right">
                  <button className="rounded border px-2 py-1 mr-2 hover:bg-slate-50" onClick={()=>act(r.id, action, "")}>อนุมัติ</button>
                  <button className="rounded border px-2 py-1 hover:bg-slate-50" onClick={()=>act(r.id, "reject", prompt("เหตุผลที่ปฏิเสธ") || "")}>ปฏิเสธ</button>
                </td>
              </tr>
            ))}
            {items.length===0 && <tr><td className="px-3 py-3 text-slate-500" colSpan={5}>ไม่พบรายการ</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );

  if (loading) return <p>กำลังโหลด…</p>;
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Approvals</h1>
      <Section title="รอหัวหน้าอนุมัติ (SUBMITTED)" items={subs} action="approve-manager" />
      <Section title="รอ MD อนุมัติ (APPROVER_APPROVED)" items={mds} action="approve-md" />
    </div>
  );
}
