"use client";
import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/api";

export default function MDApprovalsPage() {
  const [list, setList] = useState([]);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(null);
  const [comment, setComment] = useState("");
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => { load(); }, []);
  async function load() {
    const r = await apiFetch("/api/evals?status=APPROVER_APPROVED&role=md");
    setList(r?.data || []);
  }

  function getPos(e){ const c=canvasRef.current, r=c.getBoundingClientRect(); const p="touches" in e ? e.touches[0] : e; return {x:p.clientX-r.left,y:p.clientY-r.top}; }
  function start(e){ drawing.current=true; const ctx=canvasRef.current.getContext("2d"); const p=getPos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); }
  function move(e){ if(!drawing.current) return; const ctx=canvasRef.current.getContext("2d"); const p=getPos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); }
  function end(){ drawing.current=false; }
  function clearSig(){ const c=canvasRef.current; const ctx=c.getContext("2d"); ctx.clearRect(0,0,c.width,c.height); }

  async function act(id, action) {
    if (!active || active !== id) {
      setActive(id); setComment(""); clearSig(); return;
    }
    const dataUrl = canvasRef.current.toDataURL("image/png");
    if (!dataUrl || dataUrl.length < 100) { alert("กรุณาเซ็นก่อนทำรายการ"); return; }

    setBusy(true);
    try {
      if (action === "approve")
        await apiFetch(`/api/evals/${id}/md-approve`, { method: "POST", body: { mdSignature: dataUrl, mdComment: comment || "" } });
      else
        await apiFetch(`/api/evals/${id}/reject`, { method: "POST", body: { comment: comment || "" } });
      setActive(null);
      await load();
    } finally { setBusy(false); }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Approvals — MD</h1>
      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="py-2">รหัส</th><th>พนักงาน</th><th>รอบ</th><th></th></tr></thead>
        <tbody>
          {list.map(ev => (
            <tr key={ev.id} className="border-b align-top">
              <td className="py-2">{ev.id}</td>
              <td>{ev.owner?.firstNameTh} {ev.owner?.lastNameTh}</td>
              <td>{ev.cycle?.code}</td>
              <td className="py-2">
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-purple-700 text-white disabled:opacity-50"
                          disabled={busy} onClick={()=>act(ev.id,"approve")}>
                    {active===ev.id ? "ยืนยัน MD Approve" : "MD Approve"}
                  </button>
                  <button className="px-3 py-1 rounded bg-red-600 text-white disabled:opacity-50"
                          disabled={busy} onClick={()=>act(ev.id,"reject")}>
                    {active===ev.id ? "ยืนยัน Reject" : "Reject"}
                  </button>
                </div>

                {active===ev.id && (
                  <div className="mt-3 border rounded p-3 space-y-2 bg-gray-50">
                    <label className="block">
                      <span className="text-sm">ความเห็น MD</span>
                      <textarea className="mt-1 w-full border rounded px-2 py-1" rows={3}
                                value={comment} onChange={e=>setComment(e.target.value)} />
                    </label>
                    <div>
                      <div className="text-sm mb-1">ลายเซ็น MD</div>
                      <canvas ref={canvasRef} width={360} height={120}
                              className="border rounded bg-white touch-manipulation"
                              onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
                              onTouchStart={start} onTouchMove={move} onTouchEnd={end}></canvas>
                      <div className="mt-2">
                        <button onClick={clearSig} className="px-2 py-1 rounded border">ล้างลายเซ็น</button>
                      </div>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {list.length === 0 && <tr><td className="py-6 text-gray-500" colSpan={4}>ไม่มีรายการ</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
