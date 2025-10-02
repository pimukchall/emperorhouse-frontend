"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/api";

const STAGE_LABEL_TH = { MID_YEAR: "กลางปี", YEAR_END: "ปลายปี" };

export default function MyEvalsPage() {
  const [me, setMe] = useState(null);
  const [cycles, setCycles] = useState([]);
  const [list, setList] = useState([]);
  const [eligible, setEligible] = useState([]); // รายชื่อที่ประเมินได้ตามเงื่อนไข
  const [selectedCycleId, setSelectedCycleId] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState(""); // ผู้ถูกประเมินที่เลือก
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // ⚠️ ใช้ path สั้น ให้ lib/api ต่อ /api ให้อัตโนมัติ
        const meRes = await apiFetch("/auth/me");
        setMe(meRes?.user || null);
        await reload();
      } catch (e) {
        setErr(e?.message || "โหลดข้อมูลไม่สำเร็จ");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function reload() {
    setErr("");
    const c = await apiFetch("/cycles?isActive=1&limit=999");
    const cyclesData = c?.data || [];
    setCycles(cyclesData);
    setSelectedCycleId(cyclesData[0]?.id || "");
    const l = await apiFetch("/evals?owner=me");
    setList(l?.data || []);
  }

  // โหลดรายชื่อผู้ถูกประเมินที่เราสามารถประเมินได้ เมื่อเปลี่ยน cycle
  useEffect(() => {
    (async () => {
      if (!selectedCycleId) { setEligible([]); return; }
      try {
        // ถ้าหลังบ้านรองรับ includeSelf ให้ใช้: `/evals/eligible/${selectedCycleId}?includeSelf=1`
        const r = await apiFetch(`/evals/eligible/${selectedCycleId}`);
        const arr = r?.data || [];
        // เพิ่ม "ตัวฉันเอง" เข้าไปให้เลือกได้เสมอ (กันกรณี backend ไม่ใส่มา)
        if (me) {
          const meItem = { id: me.id, firstNameTh: me.firstNameTh, lastNameTh: me.lastNameTh };
          if (!arr.some(u => u.id === me.id)) arr.unshift(meItem);
        }
        setEligible(arr);
        // ตั้งค่า default owner เป็นตัวเองถ้ายังไม่ได้เลือก
        setSelectedOwnerId(prev => prev || (me?.id || ""));
      } catch (e) {
        setEligible([]);
        setErr(e?.message || "โหลดรายชื่อผู้ถูกประเมินไม่สำเร็จ");
      }
    })();
  }, [selectedCycleId, me]);

  async function createForCycle() {
    if (!me || !selectedCycleId) return;
    if (!selectedOwnerId) {
      alert("กรุณาเลือกผู้ถูกประเมิน");
      return;
    }
    setBusy(true);
    try {
      // ✅ ใช้ path สั้น และส่งเลขให้ชัดเจน
      const body = {
        cycleId: Number(selectedCycleId),
        ownerId: Number(selectedOwnerId),
        type: "OPERATIONAL",
      };
      const data = await apiFetch("/evals", { method: "POST", body });
      const newId = data?.data?.id;
      if (newId) {
        location.href = `/evals/${newId}`;
        return;
      }
      // ถ้า backend ไม่คืน id ให้รีโหลดลิสต์แล้วหาเอง
      await reload();
      const found = (list || []).find(
        (x) => x.cycle?.id === Number(selectedCycleId) && x.ownerId === Number(selectedOwnerId)
      );
      if (found) {
        location.href = `/evals/${found.id}`;
      } else {
        alert("สร้างฟอร์มสำเร็จ แต่ไม่พบรายการในลิสต์");
      }
    } catch (e) {
      // จัดการข้อความ error ที่พบบ่อย
      const msg = String(e?.message || "").toLowerCase();
      // ฟอร์มซ้ำ (unique: cycleId+ownerId)
      if (msg.includes("unique") || msg.includes("already") || msg.includes("exists")) {
        // หาอันเดิมแล้วพาไป
        const found = (list || []).find(
          (x) => x.cycle?.id === Number(selectedCycleId) && x.ownerId === Number(selectedOwnerId)
        );
        if (found) {
          alert("มีฟอร์มรอบนี้อยู่แล้ว — กำลังพาไปยังแบบฟอร์มเดิม");
          location.href = `/evals/${found.id}`;
          return;
        }
        alert("มีฟอร์มรอบนี้อยู่แล้ว");
        return;
      }
      // สิทธิ์ไม่พอ / เงื่อนไขไม่ผ่าน (เช่น ไม่อยู่แผนกเดียวกัน/ระดับไม่ถึง)
      if (e?.status === 403) {
        alert("คุณไม่มีสิทธิ์สร้างแบบฟอร์มสำหรับผู้ถูกประเมินคนนี้ตามเงื่อนไข");
        return;
      }
      if (e?.status === 401) {
        alert("เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่");
        return;
      }
      alert(e?.message || "สร้างฟอร์มไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-6 space-y-6 py-20">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold">แบบฟอร์มของฉัน</h1>
        <p className="text-sm text-gray-600">
          เลือกรอบประเมินและผู้ถูกประเมิน (ตามสิทธิ์ของคุณ) แล้วกด “สร้างฟอร์มรอบนี้”
        </p>
        {err && <p className="text-sm text-amber-700">{err}</p>}
      </header>

      <div className="grid md:grid-cols-3 gap-3 items-end">
        <label className="block">
          <span className="text-sm">เลือกรอบ</span>
          <select
            className="mt-1 w-full border rounded px-2 py-1"
            value={selectedCycleId}
            onChange={(e) => {
              setSelectedCycleId(e.target.value);
              setSelectedOwnerId(""); // รีเซ็ตให้เลือกใหม่ตามรอบ
            }}
          >
            {cycles.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} — {STAGE_LABEL_TH[c.stage] || c.stage}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm">ผู้ถูกประเมิน</span>
          <select
            className="mt-1 w-full border rounded px-2 py-1"
            value={selectedOwnerId}
            onChange={(e) => setSelectedOwnerId(e.target.value)}
          >
            {eligible.map((u) => (
              <option key={u.id} value={u.id}>
                {u.firstNameTh} {u.lastNameTh}
              </option>
            ))}
          </select>
          {!eligible.length && (
            <p className="text-xs text-amber-700 mt-1">
              ไม่มีรายชื่อผู้อื่นให้ประเมิน (บัญชีคุณอาจยังไม่ได้ตั้งค่า role/department/positionLevel)
            </p>
          )}
        </label>

        <div>
          <button
            onClick={createForCycle}
            disabled={busy || !selectedCycleId || !selectedOwnerId}
            className="w-full px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {busy ? "กำลังสร้าง..." : "สร้างฟอร์มรอบนี้"}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-medium">รายการฟอร์มของฉัน</h2>
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
            {list.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="py-2">{row.id}</td>
                <td>{row.cycle?.code} ({row.stage})</td>
                <td>{row.status}</td>
                <td><Link className="text-blue-600 underline" href={`/evals/${row.id}`}>เปิด</Link></td>
              </tr>
            ))}
            {list.length === 0 && <tr><td className="py-6 text-gray-500" colSpan={4}>ยังไม่มีฟอร์ม</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
