"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import StatefulButton from "@/components/ui/stateful-button";

export default function EvaluationEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    const res = await apiFetch(`/api/evaluations/${id}`);
    setData(res?.data || null);
    setForm(pickScores(res?.data || {}));
  }
  useEffect(()=>{ load(); }, [id]);

  function pickScores(d) {
    return {
      job_responsibilities: d.job_responsibilities || 0,
      work_development: d.work_development || 0,
      workload: d.workload || 0,
      work_standards: d.work_standards || 0,
      coordination: d.coordination || 0,
      the_value_of_work: d.the_value_of_work || 0,
      customer_satisfaction: d.customer_satisfaction || 0,
      worthiness: d.worthiness || 0,
      speed: d.speed || 0,
      job_knowledge: d.job_knowledge || 0,
      work_organization_attitude: d.work_organization_attitude || 0,
      contextual_understanding: d.contextual_understanding || 0,
      critical_thinking: d.critical_thinking || 0,
      decision_making: d.decision_making || 0,
      adaptability: d.adaptability || 0,
      leadership: d.leadership || 0,
      verbal_communication: d.verbal_communication || 0,
      written_communication: d.written_communication || 0,
      selflessness: d.selflessness || 0,
      rule_compliance: d.rule_compliance || 0,
      independent_work: d.independent_work || 0,
      comment: d.comment || "",
    };
  }

  async function save(draft=true) {
    setBusy(true); setErr(""); setOk(false);
    try {
      await apiFetch(`/api/evaluations/${id}`, { method:"PATCH", body:{ ...form, asDraft: draft } });
      setOk(true);
      if (!draft) {
        // ส่งเข้าขั้นตอนถัดไป (submit)
        await apiFetch(`/api/evaluations/${id}/submit`, { method:"POST" });
      }
      router.refresh();
    } catch (e) {
      setErr(e?.data?.error || e?.message || "บันทึกล้มเหลว");
    } finally { setBusy(false); }
  }

  if (!data) return <div className="p-6">กำลังโหลด…</div>;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-4 text-xl font-semibold">แก้ไขการประเมิน #{data.id}</div>

      <FormSection title="การปฏิบัติงาน" fields={[
        ['ความรับผิดชอบในงาน', 'job_responsibilities'],
        ['การพัฒนางาน', 'work_development'],
        ['ปริมาณงาน', 'workload'],
        ['มาตรฐานงาน', 'work_standards'],
        ['การประสานงาน', 'coordination'],
      ]} form={form} setForm={setForm} />

      <FormSection title="ผลของงาน" fields={[
        ['คุณค่าของงาน', 'the_value_of_work'],
        ['ความพอใจของลูกค้า', 'customer_satisfaction'],
        ['ความคุ้มค่า', 'worthiness'],
        ['ความรวดเร็ว', 'speed'],
      ]} form={form} setForm={setForm} />

      <FormSection title="คุณสมบัติ/ความสามารถส่วนบุคคล" fields={[
        ['ความรู้ในงาน', 'job_knowledge'],
        ['ทัศนคติต่องานและองค์กร', 'work_organization_attitude'],
        ['ความเข้าใจบริบทของงาน', 'contextual_understanding'],
        ['ความคิดที่รัดกุม ถี่ถ้วน ครบวงจร', 'critical_thinking'],
        ['หลักการตัดสินใจ', 'decision_making'],
        ['การปรับตัว', 'adaptability'],
        ['ภาวะผู้นำ', 'leadership'],
        ['การพูด/นำเสนอ', 'verbal_communication'],
        ['การเขียน', 'written_communication'],
        ['ความเสียสละ', 'selflessness'],
        ['ปฏิบัติตามกฎระเบียบ', 'rule_compliance'],
        ['ทำงานด้วยตนเอง', 'independent_work'],
      ]} form={form} setForm={setForm} />

      <div className="mt-4">
        <label className="text-sm text-neutral-600">ความคิดเห็นเพิ่มเติม</label>
        <textarea value={form.comment} onChange={e=>setForm({...form, comment:e.target.value})}
          className="mt-1 w-full rounded-md border px-3 py-2" rows={4}/>
      </div>

      {err && <div className="mt-3 rounded-md border border-red-300 bg-red-50 p-2 text-red-700">{err}</div>}
      {ok && <div className="mt-3 rounded-md border border-emerald-300 bg-emerald-50 p-2 text-emerald-700">บันทึกแล้ว</div>}

      <div className="mt-4 flex justify-end gap-2">
        <StatefulButton loading={busy} onClick={()=>save(true)} className="rounded-md border px-4 py-2">บันทึก Draft</StatefulButton>
        <StatefulButton loading={busy} onClick={()=>save(false)} className="rounded-md bg-black px-4 py-2 text-white">ส่งอนุมัติ</StatefulButton>
      </div>
    </main>
  );
}

function FormSection({ title, fields, form, setForm }) {
  return (
    <div className="mt-4 rounded-xl border p-4">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map(([label, key])=>(
          <div key={key}>
            <label className="text-xs text-neutral-600">{label}</label>
            <input type="number" min={0} max={5} step={1}
              value={form[key]}
              onChange={e=>setForm({...form, [key]: Number(e.target.value)})}
              className="mt-1 w-full rounded-md border px-3 py-2"/>
          </div>
        ))}
      </div>
    </div>
  );
}
