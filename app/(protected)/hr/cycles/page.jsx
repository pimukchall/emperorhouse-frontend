"use client";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/api";

// mapping ชื่อรอบ
const STAGE_LABEL_TH = { MID_YEAR: "กลางปี", YEAR_END: "ปลายปี" };
const STAGES = ["MID_YEAR", "YEAR_END"];

// helper: แปลง ISO → ค่าที่ใส่ใน <input type="datetime-local">
function isoToLocalInput(v) {
  if (!v) return "";
  const d = new Date(v);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
// helper: แปลงค่าจาก <input type="datetime-local"> → ISO หรือ null
function localInputToIso(v) {
  if (!v) return null;
  return new Date(v).toISOString();
}
// ค่าขั้นต่ำของ datetime-local (ปัจจุบัน)
function nowLocalInput() {
  const d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
  return d.toISOString().slice(0, 16);
}

export default function HRCyclesCRUDPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // ฟอร์มสร้างรอบ
  const [createBusy, setCreateBusy] = useState(false);
  const [createForm, setCreateForm] = useState({
    code: "",
    year: new Date().getFullYear(),
    stage: "MID_YEAR",
    openAt: "",
    closeAt: "",
    isActive: true,
    isMandatory: true,
  });

  // state แก้ไข
  const [editOpen, setEditOpen] = useState(false);
  const [editBusy, setEditBusy] = useState(false);
  const [editForm, setEditForm] = useState(null); // {id, code, year, ...}

  // filter
  const [q, setQ] = useState(""); // ค้นหา code
  const [filterStage, setFilterStage] = useState("");
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    load();
  }, []);
  async function load() {
    setLoading(true);
    try {
      const r = await apiFetch("/api/cycles?limit=999");
      setRows(r?.data || []);
    } finally {
      setLoading(false);
    }
  }

  function setCF(k, v) {
    setCreateForm((s) => ({ ...s, [k]: v }));
  }
  function setEF(k, v) {
    setEditForm((s) => ({ ...s, [k]: v }));
  }

  // CREATE
  async function createCycle() {
    if (!createForm.code.trim()) return alert("กรุณากรอกรหัสรอบ (code)");
    const o = createForm.openAt && new Date(createForm.openAt);
    const c = createForm.closeAt && new Date(createForm.closeAt);
    const now = new Date();
    if (!o || !c) return alert("กรุณากรอกวัน–เวลาเปิด/ปิดรอบให้ครบ");
    if (o >= c) return alert("ช่วงเวลาไม่ถูกต้อง: วัน–เวลาเปิดต้องก่อนวัน–เวลาปิด");
    if (o < now || c < now) return alert("ไม่อนุญาตให้ตั้งย้อนหลัง");

    setCreateBusy(true);
    try {
      await apiFetch("/api/cycles", {
        method: "POST",
        body: {
          code: createForm.code.trim(),
          year: Number(createForm.year),
          stage: String(createForm.stage).toUpperCase(),
          openAt: localInputToIso(createForm.openAt),
          closeAt: localInputToIso(createForm.closeAt),
          isActive: !!createForm.isActive,
          isMandatory: !!createForm.isMandatory,
        },
      });
      setCreateForm({
        code: "",
        year: new Date().getFullYear(),
        stage: "MID_YEAR",
        openAt: "",
        closeAt: "",
        isActive: true,
        isMandatory: true,
      });
      await load();
      alert("สร้างรอบสำเร็จ");
    } finally {
      setCreateBusy(false);
    }
  }

  // EDIT open
  function openEdit(row) {
    setEditForm({
      id: row.id,
      code: row.code,
      year: row.year,
      stage: row.stage,
      openAt: isoToLocalInput(row.openAt),
      closeAt: isoToLocalInput(row.closeAt),
      isActive: row.isActive,
      isMandatory: row.isMandatory,
    });
    setEditOpen(true);
  }

  // UPDATE
  async function saveEdit() {
    if (!editForm?.id) return;
    if (!String(editForm.code || "").trim()) return alert("code ห้ามว่าง");

    // ตรวจวัน–เวลาก่อนบันทึก
    const o = editForm.openAt && new Date(editForm.openAt);
    const c = editForm.closeAt && new Date(editForm.closeAt);
    const now = new Date();
    if (!o || !c) return alert("กรุณากรอกวัน–เวลาเปิด/ปิดรอบให้ครบ");
    if (o >= c) return alert("ช่วงเวลาไม่ถูกต้อง: วัน–เวลาเปิดต้องก่อนวัน–เวลาปิด");
    if (o < now || c < now) return alert("ไม่อนุญาตให้ตั้งย้อนหลัง");
    if (editForm.isActive && c < now) return alert("ห้ามเปิดใช้งานรอบที่ปิดไปแล้ว");

    setEditBusy(true);
    try {
      await apiFetch(`/api/cycles/${editForm.id}`, {
        method: "PUT",
        body: {
          code: String(editForm.code).trim(),
          year: Number(editForm.year),
          stage: String(editForm.stage).toUpperCase(),
          openAt: localInputToIso(editForm.openAt),
          closeAt: localInputToIso(editForm.closeAt),
          isActive: !!editForm.isActive,
          isMandatory: !!editForm.isMandatory,
        },
      });
      setEditOpen(false);
      setEditForm(null);
      await load();
      alert("บันทึกแล้ว");
    } finally {
      setEditBusy(false);
    }
  }

  // TOGGLE active (กันเปิด ON หากระยะเวลาปิดไปแล้ว)
  async function toggleActive(row) {
    const now = new Date();
    if (!row.closeAt || new Date(row.closeAt) < now) {
      return alert("ห้ามเปิดใช้งานรอบที่ปิดไปแล้ว");
    }
    await apiFetch(`/api/cycles/${row.id}`, {
      method: "PUT",
      body: { isActive: !row.isActive },
    });
    await load();
  }

  // DELETE
  async function remove(id) {
    if (!confirm(`ลบรอบ #${id}?`)) return;
    await apiFetch(`/api/cycles/${id}`, { method: "DELETE" });
    await load();
  }

  // filter client-side
  const view = useMemo(() => {
    return rows
      .filter((r) => {
        if (q && !String(r.code).toLowerCase().includes(q.toLowerCase())) return false;
        if (filterStage && r.stage !== filterStage) return false;
        if (filterYear && String(r.year) !== String(filterYear)) return false;
        return true;
      })
      .sort((a, b) => b.year - a.year || a.stage.localeCompare(b.stage));
  }, [rows, q, filterStage, filterYear]);

  const years = useMemo(() => {
    const set = new Set(rows.map((r) => r.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [rows]);

  return (
    <div className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">จัดการรอบประเมิน (EvalCycle)</h1>
        <p className="text-sm text-gray-600">
          สร้าง/แก้ไข/เปิด-ปิด/ลบรอบประเมิน กำหนดช่วงเวลาเปิด-ปิด และสถานะ Active
        </p>
      </header>

      {/* CREATE */}
      <section className="border rounded p-4 space-y-3 bg-gray-50">
        <h2 className="font-medium">สร้างรอบใหม่</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm">รหัสรอบ (code)*</span>
            <input
              className="mt-1 w-full border rounded px-2 py-1"
              value={createForm.code}
              onChange={(e) => setCF("code", e.target.value)}
              placeholder="เช่น 2025_MID_YEAR"
            />
          </label>

          <label className="block">
            <span className="text-sm">ปี (year)</span>
            <input
              type="number"
              className="mt-1 w-full border rounded px-2 py-1"
              value={createForm.year}
              onChange={(e) => setCF("year", Number(e.target.value))}
            />
          </label>

          <label className="block">
            <span className="text-sm">รอบ (stage)</span>
            <select
              className="mt-1 w-full border rounded px-2 py-1"
              value={createForm.stage}
              onChange={(e) => setCF("stage", e.target.value)}
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABEL_TH[s]} ({s})
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm">เปิดรอบ (openAt)</span>
            <input
              type="datetime-local"
              min={nowLocalInput()}
              className="mt-1 w-full border rounded px-2 py-1"
              value={createForm.openAt}
              onChange={(e) => setCF("openAt", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm">ปิดรอบ (closeAt)</span>
            <input
              type="datetime-local"
              min={nowLocalInput()}
              className="mt-1 w-full border rounded px-2 py-1"
              value={createForm.closeAt}
              onChange={(e) => setCF("closeAt", e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={createForm.isActive}
              onChange={(e) => setCF("isActive", e.target.checked)}
            />
            <span className="text-sm">Active (เปิดให้ใช้งาน)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={createForm.isMandatory}
              onChange={(e) => setCF("isMandatory", e.target.checked)}
            />
            <span className="text-sm">Mandatory (บังคับทุกคน)</span>
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={createCycle}
            disabled={createBusy}
            className="px-3 py-1 rounded bg-gray-900 text-white disabled:opacity-50"
          >
            บันทึก
          </button>
          <button
            onClick={() =>
              setCreateForm({
                code: "",
                year: new Date().getFullYear(),
                stage: "MID_YEAR",
                openAt: "",
                closeAt: "",
                isActive: true,
                isMandatory: true,
              })
            }
            className="px-3 py-1 rounded border"
          >
            ล้างฟอร์ม
          </button>
        </div>
      </section>

      {/* FILTER */}
      <section className="flex flex-wrap gap-2 items-end">
        <div>
          <label className="block text-sm">ค้นหา code</label>
          <input
            className="border rounded px-2 py-1"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="พิมพ์บางส่วนของโค้ด"
          />
        </div>
        <div>
          <label className="block text-sm">Stage</label>
          <select
            className="border rounded px-2 py-1"
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
          >
            <option value="">ทั้งหมด</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {STAGE_LABEL_TH[s]} ({s})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm">Year</label>
          <select
            className="border rounded px-2 py-1"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">ทั้งหมด</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            setQ("");
            setFilterStage("");
            setFilterYear("");
          }}
          className="px-3 py-1 rounded border"
        >
          เคลียร์ตัวกรอง
        </button>
      </section>

      {/* TABLE */}
      <section>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Code</th>
              <th>Year</th>
              <th>Stage</th>
              <th>Open</th>
              <th>Close</th>
              <th>Active</th>
              <th className="w-48"></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="py-6 text-gray-500" colSpan={7}>
                  กำลังโหลด…
                </td>
              </tr>
            )}
            {!loading &&
              view.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-2">{r.code}</td>
                  <td>{r.year}</td>
                  <td>
                    {STAGE_LABEL_TH[r.stage]} ({r.stage})
                  </td>
                  <td>{r.openAt ? new Date(r.openAt).toLocaleString() : "-"}</td>
                  <td>{r.closeAt ? new Date(r.closeAt).toLocaleString() : "-"}</td>
                  <td>
                    <button
                      onClick={() => toggleActive(r)}
                      className={`px-2 py-0.5 rounded text-white ${r.isActive ? "bg-green-600" : "bg-gray-400"}`}
                      title="สลับสถานะ Active"
                    >
                      {r.isActive ? "ON" : "OFF"}
                    </button>
                  </td>
                  <td className="flex gap-2 py-2">
                    <button onClick={() => openEdit(r)} className="px-2 py-1 rounded border">
                      แก้ไข
                    </button>
                    <button onClick={() => remove(r.id)} className="px-2 py-1 rounded bg-red-600 text-white">
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            {!loading && !view.length && (
              <tr>
                <td className="py-6 text-gray-500" colSpan={7}>
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* EDIT MODAL */}
      {editOpen && editForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl p-5 space-y-4">
            <h3 className="text-lg font-semibold">แก้ไขรอบ #{editForm.id}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm">Code*</span>
                <input
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={editForm.code}
                  onChange={(e) => setEF("code", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm">Year</span>
                <input
                  type="number"
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={editForm.year}
                  onChange={(e) => setEF("year", Number(e.target.value))}
                />
              </label>

              <label className="block">
                <span className="text-sm">Stage</span>
                <select
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={editForm.stage}
                  onChange={(e) => setEF("stage", e.target.value)}
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      {STAGE_LABEL_TH[s]} ({s})
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm">Open</span>
                <input
                  type="datetime-local"
                  min={nowLocalInput()}
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={editForm.openAt}
                  onChange={(e) => setEF("openAt", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm">Close</span>
                <input
                  type="datetime-local"
                  min={nowLocalInput()}
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={editForm.closeAt}
                  onChange={(e) => setEF("closeAt", e.target.value)}
                />
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.isActive}
                  onChange={(e) => setEF("isActive", e.target.checked)}
                />
                <span className="text-sm">Active</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.isMandatory}
                  onChange={(e) => setEF("isMandatory", e.target.checked)}
                />
                <span className="text-sm">Mandatory</span>
              </label>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setEditOpen(false);
                  setEditForm(null);
                }}
                className="px-3 py-1 rounded border"
              >
                ยกเลิก
              </button>
              <button
                onClick={saveEdit}
                disabled={editBusy}
                className="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
