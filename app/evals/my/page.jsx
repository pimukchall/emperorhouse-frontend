"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

const STAGE_LABEL_TH = { MID_YEAR: "กลางปี", YEAR_END: "ปลายปี" };

// ตรวจสิทธิ์จากข้อมูลผู้ใช้ที่ได้จาก /auth/me
function isAdminOrHR(me) {
  if (!me) return false;
  const role =
    (me.role && (me.role.name || me.role)) || // รองรับ me.role = { name } หรือเป็น string ตรง ๆ
    me.roleName ||
    "";
  const r = String(role).toLowerCase();
  return r === "admin" || r === "hr";
}

export default function MyEvalsPage() {
  const [me, setMe] = useState(null);
  const [cycles, setCycles] = useState([]);
  const [list, setList] = useState([]);
  const [busy, setBusy] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [cycleForm, setCycleForm] = useState({
    code: "",
    stage: "MID_YEAR",
    year: new Date().getFullYear(),
    openAt: "",
    closeAt: "",
    isActive: true,
    isMandatory: true,
  });

  useEffect(() => {
    (async () => {
      const meRes = await apiFetch("/auth/me");
      setMe(meRes?.user || null);
      await reload();
    })();
  }, []);

  async function reload() {
    const c = await apiFetch("/api/cycles?isActive=1&limit=999");
    setCycles(c?.data || []);
    const l = await apiFetch("/api/evals?owner=me");
    setList(l?.data || []);
  }

  async function createForCycle(cycleId) {
    if (!me) return;
    setBusy(true);
    try {
      const data = await apiFetch("/api/evals", {
        method: "POST",
        body: { cycleId, ownerId: me.id, type: "OPERATIONAL" },
      });
      location.href = `/evals/${data?.data?.id}`;
    } finally {
      setBusy(false);
    }
  }

  function friendlyStage(stage) {
    return STAGE_LABEL_TH[stage] || stage;
  }

  function setCF(k, v) { setCycleForm(s => ({ ...s, [k]: v })); }

  async function createCycle() {
    // เผื่อโดนเรียกจาก DevTools: กันอีกชั้นนึง
    if (!isAdminOrHR(me)) {
      alert("คุณไม่มีสิทธิ์ตั้งรอบ (ต้องเป็น HR หรือ Admin)");
      return;
    }
    if (!cycleForm.code.trim()) {
      alert("กรุณากรอกรหัสรอบ (code)");
      return;
    }
    setBusy(true);
    try {
      await apiFetch("/api/cycles", {
        method: "POST",
        body: {
          code: cycleForm.code.trim(),
          year: Number(cycleForm.year),
          stage: String(cycleForm.stage).toUpperCase(),
          openAt: cycleForm.openAt ? new Date(cycleForm.openAt).toISOString() : null,
          closeAt: cycleForm.closeAt ? new Date(cycleForm.closeAt).toISOString() : null,
          isActive: !!cycleForm.isActive,
          isMandatory: !!cycleForm.isMandatory,
        },
      });
      setCreateOpen(false);
      setCycleForm({
        code: "",
        stage: "MID_YEAR",
        year: new Date().getFullYear(),
        openAt: "",
        closeAt: "",
        isActive: true,
        isMandatory: true,
      });
      await reload();
      alert("สร้างรอบประเมินแล้ว");
    } finally {
      setBusy(false);
    }
  }

  const canManageCycles = isAdminOrHR(me);

  return (
    <div className="p-6 space-y-6 py-20">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold">แบบฟอร์มของฉัน</h1>
        <p className="text-sm text-gray-600">
          เลือกรอบประเมินที่เปิดอยู่ แล้วกด “สร้างฟอร์มรอบนี้” หากยังไม่เคยสร้าง
          จากนั้นเข้าหน้าแบบฟอร์มเพื่อกรอกคะแนนและส่งยื่นได้
        </p>
      </header>

      {/* เลือกรอบ + สร้างฟอร์มของฉัน */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="cycle" className="text-sm text-gray-700">เลือกรอบ:</label>
          <select id="cycle" className="border rounded px-2 py-1 min-w-64">
            {cycles.map(c => (
              <option key={c.id} value={c.id}>
                {c.code} — {friendlyStage(c.stage)}
                {c.openAt ? ` | เปิด ${new Date(c.openAt).toLocaleString()}` : ""}
                {c.closeAt ? ` | ปิด ${new Date(c.closeAt).toLocaleString()}` : ""}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const id = document.getElementById("cycle")?.value;
              if (id) createForCycle(Number(id));
            }}
            disabled={busy || !cycles.length}
            className="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            สร้างฟอร์มรอบนี้
          </button>
        </div>

        {/* ปุ่มตั้งรอบ — แสดงเฉพาะ HR/Admin */}
        {canManageCycles && (
          <div className="text-right">
            <button
              onClick={() => setCreateOpen(v => !v)}
              className="px-3 py-1 rounded border"
            >
              {createOpen ? "ซ่อนการตั้งรอบ" : "ตั้งรอบประเมินใหม่ (สำหรับ HR)"}
            </button>
          </div>
        )}
      </div>

      {/* ฟอร์มตั้งรอบ — แสดงเฉพาะ HR/Admin */}
      {canManageCycles && createOpen && (
        <div className="border rounded p-4 space-y-4 bg-gray-50">
          <p className="text-sm text-gray-700">
            ใช้สำหรับ HR/Admin ในการเปิดรอบใหม่ — ตั้งรหัสรอบ (code), เลือก Stage,
            และกำหนดวัน-เวลาเปิด–ปิด ระบบจะตรวจสิทธิ์ที่ฝั่งเซิร์ฟเวอร์
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm">รหัสรอบ (code)*</span>
              <input
                className="mt-1 w-full border rounded px-2 py-1"
                value={cycleForm.code}
                onChange={e => setCF("code", e.target.value)}
                placeholder="เช่น 2025_MID_YEAR"
              />
            </label>

            <label className="block">
              <span className="text-sm">ปี (year)</span>
              <input
                type="number"
                className="mt-1 w-full border rounded px-2 py-1"
                value={cycleForm.year}
                onChange={e => setCF("year", Number(e.target.value))}
              />
            </label>

            <label className="block">
              <span className="text-sm">รอบ (Stage)</span>
              <select
                className="mt-1 w-full border rounded px-2 py-1"
                value={cycleForm.stage}
                onChange={e => setCF("stage", e.target.value)}
              >
                <option value="MID_YEAR">กลางปี (MID_YEAR)</option>
                <option value="YEAR_END">ปลายปี (YEAR_END)</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm">เปิดรอบ (openAt)</span>
              <input
                type="datetime-local"
                className="mt-1 w-full border rounded px-2 py-1"
                value={cycleForm.openAt}
                onChange={e => setCF("openAt", e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm">ปิดรอบ (closeAt)</span>
              <input
                type="datetime-local"
                className="mt-1 w-full border rounded px-2 py-1"
                value={cycleForm.closeAt}
                onChange={e => setCF("closeAt", e.target.value)}
              />
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={cycleForm.isActive}
                onChange={e => setCF("isActive", e.target.checked)}
              />
              <span className="text-sm">Active (เปิดให้ใช้งาน)</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={cycleForm.isMandatory}
                onChange={e => setCF("isMandatory", e.target.checked)}
              />
              <span className="text-sm">Mandatory (บังคับทุกคน)</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={createCycle}
              disabled={busy}
              className="px-3 py-1 rounded bg-gray-900 text-white disabled:opacity-50"
            >
              สร้างรอบ
            </button>
            <button
              onClick={() => setCreateOpen(false)}
              className="px-3 py-1 rounded border"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* รายการฟอร์มของฉัน */}
      <div className="space-y-2">
        <h2 className="font-medium">รายการฟอร์มของฉัน</h2>
        {!cycles.length && (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
            ยังไม่มี “รอบประเมินที่เปิดอยู่” กรุณาให้ HR สร้างรอบก่อน จึงจะสร้างฟอร์มได้
          </p>
        )}

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">รหัส</th>
              <th>รอบ</th>
              <th>สถานะ</th>
              <th className="w-32"></th>
            </tr>
          </thead>
          <tbody>
            {list.map(row => (
              <tr key={row.id} className="border-b">
                <td className="py-2">{row.id}</td>
                <td>
                  {row.cycle?.code} ({friendlyStage(row.stage)})
                </td>
                <td>{row.status}</td>
                <td>
                  <Link className="text-blue-600 underline" href={`/evals/${row.id}`}>เปิด</Link>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td className="py-6 text-gray-500" colSpan={4}>
                  ยังไม่มีฟอร์ม
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="pt-2 text-xs text-gray-500">
        หมายเหตุ: 1 คน ต่อ 1 รอบ ได้ 1 ฟอร์ม ถ้าแจ้งว่า “มีอยู่แล้ว” ให้เปิดจากรายการด้านล่าง
      </footer>
    </div>
  );
}
