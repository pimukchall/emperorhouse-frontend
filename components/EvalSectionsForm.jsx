"use client";
import { useMemo } from "react";

const S1 = [
  ["s1_responsibility", "1.1 ความรับผิดชอบ (/10)"],
  ["s1_development", "1.2 การพัฒนา (/10)"],
  ["s1_workload", "1.3 ปริมาณงาน (/10)"],
  ["s1_qualityStandard", "1.4 มาตรฐานงาน (/10)"],
  ["s1_coordination", "1.5 การประสานงาน (/10)"],
];

const S2 = [
  ["s2_valueOfWork", "2.1 ผลของงาน (/10 or OP)"],
  ["s2_customerSatisfaction", "2.2 ความพึงพอใจลูกค้า (/10 or OP)"],
  ["s2_costEffectiveness", "2.3 ความคุ้มค่า (OP /10, SV /5)"],
  ["s2_timeliness", "2.4 ความตรงต่อเวลา (OP /10, SV /5)"],
];

const S3 = [
  ["s3_jobKnowledge","3.1 ความรู้ในงาน (/5)"],
  ["s3_attitude","3.2 ทัศนคติ (/5)"],
  ["s3_contextUnderstanding","3.3 เข้าใจบริบท (/5)"],
  ["s3_systematicThinking","3.4 คิดเป็นระบบ (/5)"],
  ["s3_decisionMaking","3.5 ตัดสินใจ (/5)"],
  ["s3_adaptability","3.6 ปรับตัว (/5)"],
  ["s3_leadership","3.7 ภาวะผู้นำ (/5)"],
  ["s3_verbalComm","3.8 สื่อสารปากเปล่า (/5)"],
  ["s3_writtenComm","3.9 สื่อสารลายลักษณ์ (/5)"],
  ["s3_selflessness","3.10 เห็นแก่ส่วนรวม (/5)"],
  ["s3_ruleCompliance","3.11 วินัย/ระเบียบ (/5)"],
  ["s3_selfReliance","3.12 ยืนหยัดพึ่งตน (/5)"],
];

export default function EvalSectionsForm({ value, onChange, disabled=false }) {
  const v = value || {};
  const set = (k, val) => onChange?.({ ...v, [k]: val });

  const ScoreInput = ({ k, label, max=10 }) => (
    <label className="flex items-center justify-between gap-2 py-1">
      <span className="text-sm">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step="0.5"
        max={max}
        className="w-28 rounded border px-2 py-1 text-right"
        value={v[k] ?? ""}
        onChange={(e)=>set(k, e.target.value === "" ? null : Number(e.target.value))}
        disabled={disabled}
      />
    </label>
  );

  const TextArea = ({ k, label }) => (
    <label className="flex flex-col gap-1">
      <span className="text-sm">{label}</span>
      <textarea
        className="min-h-24 rounded border p-2"
        value={v[k] ?? ""}
        onChange={(e)=>set(k, e.target.value)}
        disabled={disabled}
      />
    </label>
  );

  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-2 font-semibold">หมวด 1: ด้านการปฏิบัติงาน</h3>
        <div className="divide-y rounded border bg-white">
          {S1.map(([k, label]) => <div key={k} className="px-3 py-2"><ScoreInput k={k} label={label} max={10} /></div>)}
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold">หมวด 2: ผลของงาน</h3>
        <div className="divide-y rounded border bg-white">
          {S2.map(([k, label]) => <div key={k} className="px-3 py-2">
            <ScoreInput k={k} label={label} max={10} />
          </div>)}
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold">หมวด 3: คุณสมบัติฯ</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {S3.map(([k, label]) => (
            <div key={k} className="rounded border bg-white px-3 py-2">
              <ScoreInput k={k} label={label} max={5} />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3">
        <TextArea k="t_potential" label="ศักยภาพ (Potential)" />
        <TextArea k="t_strengthsWeaknesses" label="จุดเด่น/จุดด้อย" />
        <TextArea k="t_trainingNeeds" label="หัวข้ออบรมเพิ่มเติม" />
        <TextArea k="ownerComment" label="ความคิดเห็นผู้ถูกประเมิน" />
      </section>
    </div>
  );
}
