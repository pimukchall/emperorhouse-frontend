"use client";
import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

const S1 = [
  ["s1_responsibility", "1.1 ความรับผิดชอบ (0-10)"],
  ["s1_development", "1.2 การพัฒนา (0-10)"],
  ["s1_workload", "1.3 ปริมาณงาน (0-10)"],
  ["s1_qualityStandard", "1.4 มาตรฐานงาน (0-10)"],
  ["s1_coordination", "1.5 การประสานงาน (0-10)"],
];
const S2 = [
  ["s2_valueOfWork", "2.1 (0-10)"],
  ["s2_customerSatisfaction", "2.2 (0-10)"],
  ["s2_costEffectiveness", "2.3 (OP 0-10 / SV 0-5)"],
  ["s2_timeliness", "2.4 (OP 0-10 / SV 0-5)"],
];
const S3 = [
  ["s3_jobKnowledge","3.1 (0-5)"],["s3_attitude","3.2 (0-5)"],
  ["s3_contextUnderstanding","3.3 (0-5)"],["s3_systematicThinking","3.4 (0-5)"],
  ["s3_decisionMaking","3.5 (0-5)"],["s3_adaptability","3.6 (0-5)"],
  ["s3_leadership","3.7 (0-5)"],["s3_verbalComm","3.8 (0-5)"],
  ["s3_writtenComm","3.9 (0-5)"],["s3_selflessness","3.10 (0-5)"],
  ["s3_ruleCompliance","3.11 (0-5)"],["s3_selfReliance","3.12 (0-5)"],
];

export default function EvalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [row, setRow] = useState(null);
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);

  // comment + signature (submitter)
  const [submitterComment, setSubmitterComment] = useState("");
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => { load(); }, [id]);
  async function load() {
    const r = await apiFetch(`/api/evals/${id}`);
    setRow(r?.data || null);
    setForm(r?.data || {});
    setSubmitterComment(r?.data?.submitterComment || "");
  }

  function setField(k, v) {
    setForm(s => ({ ...s, [k]: v === "" ? null : Number(v) }));
  }

  async function save() {
    setBusy(true);
    try {
      await apiFetch(`/api/evals/${id}`, { method: "PUT", body: form });
      await load();
      alert("บันทึกแล้ว");
    } finally { setBusy(false); }
  }

  function getPos(e){
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const pt = "touches" in e ? e.touches[0] : e;
    return { x: pt.clientX - rect.left, y: pt.clientY - rect.top };
  }
  function start(e){ drawing.current = true; const ctx = canvasRef.current.getContext("2d"); const p=getPos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); }
  function move(e){ if(!drawing.current) return; const ctx = canvasRef.current.getContext("2d"); const p=getPos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); }
  function end(){ drawing.current = false; }
  function clearSig(){ const c=canvasRef.current; const ctx=c.getContext("2d"); ctx.clearRect(0,0,c.width,c.height); }

  async function submit() {
    if (!confirm("ยืนยันการยื่นแบบประเมิน?")) return;
    const dataUrl = canvasRef.current?.toDataURL("image/png");
    if (!dataUrl || dataUrl.length < 100) {
      alert("กรุณาเซ็นก่อนยื่นแบบ");
      return;
    }
    setBusy(true);
    try {
      // ✅ ใช้คีย์ 'signature' ให้ตรงกับหลังบ้าน
      await apiFetch(`/api/evals/${id}/submit`, {
        method: "POST",
        body: { signature: dataUrl, comment: submitterComment }
      });
      router.refresh(); await load();
      alert("ยื่นแบบแล้ว");
    } finally { setBusy(false); }
  }

  if (!row) return <div className="p-6">กำลังโหลด…</div>;
  const canEdit = ["DRAFT","REJECTED"].includes(row.status);

  return (
    <div className="p-6 space-y-6 py-40">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">ฟอร์ม #{row.id} — {row.cycle?.code} ({row.stage})</h1>
          <p className="text-sm text-gray-600">สถานะ: {row.status} | ประเภท: {row.type}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={save} disabled={!canEdit || busy} className="px-3 py-1 bg-gray-900 text-white rounded disabled:opacity-50">บันทึก</button>
          <button onClick={submit} disabled={!canEdit || busy} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50">ยื่นแบบ</button>
        </div>
      </header>

      <Section title="หมวด 1: การปฏิบัติงาน">
        <Grid>
          {S1.map(([k, label]) => (
            <NumInput key={k} label={label} value={form[k] ?? ""} onChange={v => setField(k, v)} min={0} max={10} disabled={!canEdit}/>
          ))}
        </Grid>
      </Section>

      <Section title="หมวด 2: ผลของงาน">
        <Grid>
          {S2.map(([k, label]) => (
            <NumInput key={k} label={label} value={form[k] ?? ""} onChange={v => setField(k, v)} min={0} max={10} disabled={!canEdit}/>
          ))}
        </Grid>
      </Section>

      <Section title="หมวด 3: คุณสมบัติ (0–5)">
        <Grid>
          {S3.map(([k, label]) => (
            <NumInput key={k} label={label} value={form[k] ?? ""} onChange={v => setField(k, v)} min={0} max={5} disabled={!canEdit}/>
          ))}
        </Grid>
      </Section>

      <Section title="ความเห็นผู้ยื่น + ลายเซ็น (ต้องกรอกก่อนยื่น)">
        <TextArea label="ความเห็นผู้ยื่น (ไม่บังคับ)" value={submitterComment} onChange={setSubmitterComment} disabled={!canEdit}/>
        <div>
          <div className="text-sm mb-1">ลายเซ็นผู้ยื่น</div>
          <canvas ref={canvasRef} width={480} height={160}
                  className="border rounded bg-white touch-manipulation"
                  onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
                  onTouchStart={start} onTouchMove={move} onTouchEnd={end}></canvas>
          <div className="mt-2">
            <button onClick={clearSig} disabled={!canEdit} className="px-2 py-1 rounded border disabled:opacity-50">ล้างลายเซ็น</button>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return <section className="space-y-3"><h2 className="font-medium">{title}</h2>{children}</section>;
}
function Grid({ children }) { return <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>; }
function NumInput({ label, value, onChange, min=0, max=10, disabled }) {
  return (
    <label className="block">
      <span className="text-sm">{label}</span>
      <input type="number" className="mt-1 w-full border rounded px-2 py-1"
        min={min} max={max} step="0.5" value={value}
        onChange={e=>onChange(e.target.value)} disabled={disabled}/>
    </label>
  );
}
function TextArea({ label, value, onChange, disabled }) {
  return (
    <label className="block">
      <span className="text-sm">{label}</span>
      <textarea className="mt-1 w-full border rounded px-2 py-1" rows={4}
        value={value} onChange={e=>onChange(e.target.value)} disabled={disabled}/>
    </label>
  );
}
