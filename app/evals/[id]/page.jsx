"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import EvalSectionsForm from "@/components/EvalSectionsForm";
import EvalScoreBadge from "@/components/EvalScoreBadge";

export default function EvalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [patch, setPatch] = useState({});
  const [busy, setBusy] = useState(false);

  async function load() {
    const r = await apiFetch(`/api/evals/${id}`);
    setData(r.data || r);
  }
  useEffect(() => { load(); }, [id]);

  const editable = data && (data.status === "DRAFT" || data.status === "REJECTED");

  async function saveDraft() {
    if (!editable) return;
    setBusy(true);
    await apiFetch(`/api/evals/${id}`, { method: "PUT", body: patch });
    setPatch({});
    await load();
    setBusy(false);
  }

  async function submit() {
    setBusy(true);
    await apiFetch(`/api/evals/${id}/submit`, { method: "POST" });
    await load();
    setBusy(false);
  }

  return (
    <div className="space-y-4">
      {!data ? <p>กำลังโหลด…</p> : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">แบบฟอร์ม #{data.id} – {data.stage} / {data.type}</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm rounded border px-2 py-0.5">{data.status}</span>
              {data.scoreTotal != null && <EvalScoreBadge total={data.scoreTotal} />}
            </div>
          </div>

          <div className="rounded border bg-white p-4">
            <EvalSectionsForm value={{...data, ...patch}} onChange={setPatch} disabled={!editable} />
          </div>

          <div className="flex gap-2">
            <button
              className="rounded border px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
              onClick={saveDraft}
              disabled={!editable || busy}
            >บันทึกฉบับร่าง</button>

            <button
              className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50"
              onClick={submit}
              disabled={!editable || busy}
            >ยื่นประเมิน</button>

            <button
              className="ml-auto rounded px-4 py-2 hover:bg-slate-50"
              onClick={() => router.push("/evals")}
            >กลับ</button>
          </div>
        </>
      )}
    </div>
  );
}
