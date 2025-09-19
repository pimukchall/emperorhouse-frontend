"use client";

export default function FiltersBar({ roles = [], departments = [], filters }) {
  const {
    q,
    setQ,
    roleId,
    setRoleId,
    departmentId,
    setDepartmentId,
    includeDeleted,
    setIncludeDeleted,
    onClear,
  } = filters;

  return (
    <section className="rounded-xl border p-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          placeholder="ค้นหา ชื่อ/อีเมล"
          className="border rounded-md px-3 py-1.5 text-sm"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded-md px-2 py-1.5 text-sm"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
        >
          <option value="">ทุก role</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <select
          className="border rounded-md px-2 py-1.5 text-sm"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
        >
          <option value="">ทุกแผนก</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.code} · {d.nameTh}
            </option>
          ))}
        </select>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeDeleted}
            onChange={(e) => setIncludeDeleted(e.target.checked)}
          />
          แสดงที่ถูกลบ (soft)
        </label>
        <button
          className="border rounded-md px-3 py-1.5 text-sm"
          onClick={onClear}
        >
          ล้าง
        </button>
      </div>
    </section>
  );
}
