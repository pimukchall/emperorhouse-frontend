"use client";
import React, { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/api";

export const PositionLevels = ["STAF", "SVR", "ASST", "MANAGER", "MD"];
const idx = (lv) => PositionLevels.indexOf(lv);

export default function ManageUserDepartmentsDialog({
  open,
  onClose,
  user,
  departments = [],
  onChanged,
}) {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const userId = user?.id;
  const boxRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function load() {
    if (!userId) return;
    try {
      const r = await apiFetch(`/api/users/${userId}/departments`);
      setItems(r?.data || []);
      setError("");
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดข้อมูลสังกัดไม่สำเร็จ");
    }
  }
  useEffect(() => { if (open) load(); /* eslint-disable-line */ }, [open, userId]);

  async function addAssignment(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const departmentId = Number(fd.get("departmentId"));
    const positionLevel = fd.get("positionLevel");
    const positionName = fd.get("positionName") || undefined;
    const setPrimary = fd.get("setPrimary") === "on";
    if (!departmentId || !positionLevel) return;

    setBusy(true);
    try {
      await apiFetch(`/api/users/${userId}/departments`, {
        method: "POST",
        body: { departmentId, positionLevel, positionName, setPrimary },
      });
      e.currentTarget.reset?.();
      await load();
      onChanged?.();
    } catch (err) {
      setError(err?.data?.error || err?.message || "เพิ่มสังกัดไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function setPrimary(udId) {
    setBusy(true);
    try {
      await apiFetch(`/api/users/${userId}/primary/${udId}`, { method: "POST" });
      await load();
      onChanged?.();
    } catch (e) {
      setError(e?.data?.error || e?.message || "ตั้ง primary ไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function endAssignment(udId) {
    if (!confirm("ปิดสังกัดนี้ (endedAt = ตอนนี้)?")) return;
    setBusy(true);
    try {
      await apiFetch(`/api/users/${userId}/departments/${udId}`, {
        method: "PATCH",
        body: { endedAt: new Date().toISOString() },
      });
      await load();
      onChanged?.();
    } catch (e) {
      setError(e?.data?.error || e?.message || "ปิดสังกัดไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function applyLevel(ud, toLevel, positionName) {
    const fromLevel = ud.positionLevel;
    if (!toLevel || toLevel === fromLevel) return savePosition(ud.id, fromLevel, positionName);
    setBusy(true);
    try {
      if (idx(toLevel) > idx(fromLevel)) {
        await apiFetch(`/api/users/${userId}/departments/${ud.id}/promote`, { method: "POST", body: { toLevel, positionName: positionName || undefined } });
      } else {
        await apiFetch(`/api/users/${userId}/departments/${ud.id}/demote`, { method: "POST", body: { toLevel, positionName: positionName || undefined } });
      }
      await load();
      onChanged?.();
    } catch (e) {
      setError(e?.data?.error || e?.message || "อัปเดตระดับไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function savePosition(udId, positionLevel, positionName) {
    setBusy(true);
    try {
      await apiFetch(`/api/users/${userId}/departments/${udId}`, { method: "PATCH", body: { positionLevel, positionName } });
      await load();
      onChanged?.();
    } catch (e) {
      setError(e?.data?.error || e?.message || "อัปเดตตำแหน่งไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  const active = items.filter((x) => !x.endedAt);
  const ended = items.filter((x) => !!x.endedAt);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => onClose?.()}>
      <div
        ref={boxRef}
        className="w-full max-w-4xl rounded-xl bg-white dark:bg-neutral-900 dark:border-neutral-700 border shadow-xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Manage Departments</h3>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">{user?.email}</div>
          </div>
          <button className="px-3 py-1.5 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800" onClick={() => onClose?.()}>
            Close
          </button>
        </div>

        {/* Add assignment */}
        <section className="rounded-lg border dark:border-neutral-700 p-3 mb-4">
          <h4 className="font-medium mb-2">เพิ่มสังกัด</h4>
          <form className="grid gap-3 sm:grid-cols-4" onSubmit={addAssignment}>
            <label className="block">
              <div className="text-xs">Department</div>
              <select name="departmentId" className="mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100" required>
                <option value="">- เลือก -</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.code} · {d.nameTh || d.nameEn || `Dept#${d.id}`}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <div className="text-xs">Position Level</div>
              <select name="positionLevel" className="mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100" required>
                <option value="">- เลือก -</option>
                {PositionLevels.map((lv) => (<option key={lv} value={lv}>{lv}</option>))}
              </select>
            </label>
            <label className="block">
              <div className="text-xs">Position Name (optional)</div>
              <input name="positionName" className="mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100" placeholder="เช่น QMR" />
            </label>
            <label className="block flex items-end gap-2">
              <input type="checkbox" name="setPrimary" className="scale-110" />
              <span className="text-sm">ตั้งเป็น Primary</span>
            </label>
            <div className="sm:col-span-4">
              <button disabled={busy} className="h-9 px-4 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                {busy ? "Saving..." : "Add assignment"}
              </button>
            </div>
          </form>
        </section>

        <Section title={`กำลังใช้งาน (${active.length})`}>
          {active.map((x) => (
            <Row key={x.id} x={x} ended={false} onApply={applyLevel} onSetPrimary={setPrimary} onEnd={endAssignment} />
          ))}
          {!active.length && <EmptyRow text="ยังไม่มีสังกัดที่ใช้งาน" />}
        </Section>

        <Section title={`สิ้นสุดแล้ว (${ended.length})`} muted>
          {ended.map((x) => (<Row key={x.id} x={x} ended onApply={applyLevel} />))}
          {!ended.length && <EmptyRow text="ไม่มีประวัติที่สิ้นสุด" />}
        </Section>

        {!!error && <div className="mt-3 text-red-600 text-sm">{error}</div>}
      </div>
    </div>
  );
}

function Section({ title, muted = false, children }) {
  return (
    <section className="rounded-lg border dark:border-neutral-700 overflow-hidden mb-4">
      <div className={`${muted ? "bg-neutral-100 dark:bg-neutral-800" : "bg-sky-50 dark:bg-sky-900/20"} px-3 py-2 text-sm font-medium`}>{title}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900">
            <tr>
              <Th>Dept</Th>
              <Th>Level / Name</Th>
              <Th>Started</Th>
              <Th>Ended</Th>
              <Th right>Actions</Th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </section>
  );
}

function Row({ x, ended, onApply, onSetPrimary, onEnd }) {
  const [toLevel, setToLevel] = useState(x.positionLevel);
  const [pname, setPname] = useState(x.positionName || "");

  useEffect(() => { setToLevel(x.positionLevel); setPname(x.positionName || ""); }, [x.positionLevel, x.positionName]);

  const dept = x.department;
  const changed = toLevel !== x.positionLevel || (pname || "") !== (x.positionName || "");

  return (
    <tr className="border-t dark:border-neutral-700 align-top">
      <Td className="whitespace-nowrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">
          {dept?.code}
        </span>{" "}
        <span className="text-neutral-700 dark:text-neutral-200">{dept?.nameTh || dept?.nameEn}</span>
      </Td>

      <Td>
        <div className="flex flex-wrap items-center gap-2">
          <select className="border dark:border-neutral-700 rounded-md px-2 py-1 text-sm dark:bg-neutral-800 dark:text-neutral-100" value={toLevel} onChange={(e) => setToLevel(e.target.value)} disabled={ended} title="เปลี่ยนระดับตำแหน่ง">
            {PositionLevels.map((lv) => (<option key={lv} value={lv}>{lv}</option>))}
          </select>
          <input className="border dark:border-neutral-700 rounded-md px-2 py-1 text-sm dark:bg-neutral-800 dark:text-neutral-100" placeholder="ตำแหน่ง (เช่น QMR)" value={pname} onChange={(e) => setPname(e.target.value)} disabled={ended} />
          {!ended && (
            <button disabled={!changed} onClick={() => onApply(x, toLevel, pname)} className="px-2 py-1 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50">
              Apply
            </button>
          )}
        </div>
      </Td>

      <Td className="whitespace-nowrap">{x.startedAt ? new Date(x.startedAt).toLocaleString() : "-"}</Td>
      <Td className="whitespace-nowrap">{x.endedAt ? new Date(x.endedAt).toLocaleString() : "-"}</Td>

      <Td right>
        <div className="flex flex-wrap gap-1 justify-end">
          {!ended && (
            <>
              {!x.isPrimary && (
                <button onClick={() => onSetPrimary(x.id)} className="px-2 py-1 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  Set Primary
                </button>
              )}
              <button onClick={() => onEnd(x.id)} className="px-2 py-1 rounded-md border text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/30">
                End
              </button>
            </>
          )}
        </div>
      </Td>
    </tr>
  );
}

function Th({ children, right }) {
  return <th className={`px-3 py-2 ${right ? "text-right" : "text-left"} text-neutral-700 dark:text-neutral-200`}>{children}</th>;
}
function Td({ children, right, className = "" }) {
  return <td className={`px-3 py-2 ${right ? "text-right" : ""} ${className}`}>{children}</td>;
}
function EmptyRow({ text }) {
  return (
    <tr>
      <td colSpan={5} className="px-3 py-6 text-center text-neutral-500">{text}</td>
    </tr>
  );
}
