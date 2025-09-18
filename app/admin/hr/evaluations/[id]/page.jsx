"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch, apiUrl } from "@/lib/api";

export default function EvaluationViewPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    try {
      const res = await apiFetch(`/api/evaluations/${id}`);
      setData(res?.data || null);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  if (!data) return <div className="p-6">กำลังโหลด…</div>;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Evaluation #{data.id}</div>
          <div className="text-sm text-neutral-500">
            {data.year} / รอบ {data.round} • {data.status}
          </div>
        </div>
        <div className="flex gap-2">
          <a
            className="rounded-md border px-3 py-2"
            href={apiUrl(`/api/evaluations/${data.id}/pdf`)}
            target="_blank"
          >
            Export PDF
          </a>
          <a
            className="rounded-md border px-3 py-2"
            href={apiUrl(`/api/evaluations/export.csv?id=${data.id}`)}
            target="_blank"
          >
            Export CSV
          </a>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <Item
            l="พนักงาน"
            v={`${data.employee?.firstNameTh || ""} ${
              data.employee?.lastNameTh || ""
            }`}
            s={data.employee?.email}
          />
          <Item
            l="แผนก"
            v={data.department?.nameTh || data.department?.nameEn}
          />
          <Item
            l="ผู้ประเมิน"
            v={`${data.evaluator?.firstNameTh || ""} ${
              data.evaluator?.lastNameTh || ""
            }`}
            s={data.evaluator?.email}
          />
          <Item l="ประเภท" v={data.type} />
        </div>
      </div>

      {/* แสดงคะแนนย่อยคร่าวๆ (ฝั่ง backend คำนวณสรุปแล้วตอนบันทึก; หน้า view แค่โชว์) */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card title="การปฏิบัติงาน" value={data.section1Score} max={40} />
        <Card
          title="ผลของงาน"
          value={data.section2Score}
          max={data.type?.includes("บังคับบัญชา") ? 40 : 30}
        />
        <Card
          title="คุณสมบัติส่วนบุคคล"
          value={data.section3Score}
          max={data.type?.includes("บังคับบัญชา") ? 20 : 30}
        />
      </div>

      <div className="mt-4 rounded-xl border p-4 text-right text-lg font-semibold">
        รวมทั้งหมด: {Number(data.totalScore || 0).toFixed(2)} / 100
      </div>
    </main>
  );
}

function Item({ l, v, s }) {
  return (
    <div>
      <div className="text-xs text-neutral-500">{l}</div>
      <div className="font-medium">{v || "-"}</div>
      {s ? <div className="text-xs text-neutral-500">{s}</div> : null}
    </div>
  );
}
function Card({ title, value = 0, max = 0 }) {
  const pct = max ? (value / max) * 100 : 0;
  return (
    <div className="rounded-xl border p-4">
      <div className="text-sm text-neutral-600">{title}</div>
      <div className="mt-1 text-2xl font-semibold">
        {Number(value).toFixed(1)}
        <span className="text-sm text-neutral-500"> / {max}</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-neutral-200">
        <div
          className="h-2 rounded-full bg-black"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
