"use client";

const EMPLOYEE_TYPES = [
  { value: "", label: "- ไม่ระบุ -" },
  { value: "DAILY", label: "DAILY (รายวัน)" },
  { value: "MONTHLY", label: "MONTHLY (รายเดือน)" },
];

const CONTRACT_TYPES = [
  { value: "", label: "- ไม่ระบุ -" },
  { value: "PERMANENT", label: "PERMANENT (ประจำ)" },
  { value: "TEMPORARY", label: "TEMPORARY (ชั่วคราว)" },
  { value: "PROBATION", label: "PROBATION (ทดลองงาน)" },
];

const GENDERS = [
  { value: "", label: "- ไม่ระบุ -" },
  { value: "MALE", label: "ชาย" },
  { value: "FEMALE", label: "หญิง" },
  { value: "OTHER", label: "อื่น ๆ" },
];

export default function UserForm({
  roles = [],
  departments = [],
  organizations = [],
  form,
  setForm,
  isEditing,
  onSubmit,
  onCancel,
}) {
  // ตรวจว่ามี option ของ orgId ปัจจุบันในรายการไหม
  const hasCurrentOrg =
    form.orgId &&
    organizations.some((o) => String(o.id) === String(form.orgId));

  return (
    <form className="grid gap-3 sm:grid-cols-3" onSubmit={onSubmit}>
      {/* login */}
      <label className="block sm:col-span-1">
        <div className="text-xs">อีเมล</div>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          required
        />
      </label>

      {!isEditing && (
        <label className="block sm:col-span-1">
          <div className="text-xs">รหัสผ่านเริ่มต้น</div>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="อย่างน้อย 8 ตัว"
          />
        </label>
      )}

      <label className="block sm:col-span-1">
        <div className="text-xs">ชื่อที่แสดง (nickname)</div>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </label>

      {/* ชื่อ */}
      <label className="block">
        <div className="text-xs">ชื่อ (ไทย)</div>
        <input
          value={form.firstNameTh}
          onChange={(e) => setForm({ ...form, firstNameTh: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </label>
      <label className="block">
        <div className="text-xs">นามสกุล (ไทย)</div>
        <input
          value={form.lastNameTh}
          onChange={(e) => setForm({ ...form, lastNameTh: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </label>
      <label className="block">
        <div className="text-xs">ชื่อ (อังกฤษ)</div>
        <input
          value={form.firstNameEn}
          onChange={(e) => setForm({ ...form, firstNameEn: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </label>
      <label className="block">
        <div className="text-xs">นามสกุล (อังกฤษ)</div>
        <input
          value={form.lastNameEn}
          onChange={(e) => setForm({ ...form, lastNameEn: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </label>

      {/* ฟิลด์งานบุคคล */}
      <label className="block">
        <div className="text-xs">Employee Code</div>
        <input
          value={form.employeeCode}
          onChange={(e) => setForm({ ...form, employeeCode: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          placeholder="ถ้าเว้นว่าง ระบบจะสร้างให้อัตโนมัติ"
        />
      </label>

      {/* Organization */}
      <label className="block">
        <div className="text-xs">Organization</div>
        <select
          value={form.orgId ?? ""}
          onChange={(e) => setForm({ ...form, orgId: e.target.value || "" })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">- ไม่ระบุ -</option>

          {/* fallback option ถ้ายังไม่มีใน organizations */}
          {!hasCurrentOrg && form.orgId && (
            <option value={String(form.orgId)}>
              {form.orgLabel || `Org#${form.orgId}`}
            </option>
          )}

          {organizations.map((o) => (
            <option key={o.id} value={String(o.id)}>
              {o.code ? `${o.code} · ` : ""}{o.nameTh || o.nameEn || `Org#${o.id}`}
            </option>
          ))}
        </select>
      </label>

      {/* ENUMs */}
      <label className="block">
        <div className="text-xs">Employee Type</div>
        <select
          value={form.employeeType ?? ""}
          onChange={(e) => setForm({ ...form, employeeType: e.target.value || "" })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        >
          {EMPLOYEE_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <div className="text-xs">Contract Type</div>
        <select
          value={form.contractType ?? ""}
          onChange={(e) => setForm({ ...form, contractType: e.target.value || "" })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        >
          {CONTRACT_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <div className="text-xs">Gender</div>
        <select
          value={form.gender ?? ""}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        >
          {GENDERS.map((g) => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>
      </label>

      {/* Dates */}
      <label className="block">
        <div className="text-xs">Birth Date</div>
        <input
          type="date"
          value={form.birthDate}
          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </label>

      <label className="block">
        <div className="text-xs">Start Date</div>
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </label>

      <label className="block">
        <div className="text-xs">Probation End</div>
        <input
          type="date"
          value={form.probationEndDate}
          onChange={(e) => setForm({ ...form, probationEndDate: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </label>

      <label className="block">
        <div className="text-xs">Resigned At</div>
        <input
          type="date"
          value={form.resignedAt}
          onChange={(e) => setForm({ ...form, resignedAt: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </label>

      {/* role / department */}
      <label className="block">
        <div className="text-xs">Role</div>
        <select
          value={form.roleId}
          onChange={(e) => setForm({ ...form, roleId: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          required
        >
          <option value="">- เลือก -</option>
          {roles.map((r) => (
            <option key={r.id} value={String(r.id)}>{r.name}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <div className="text-xs">Department (ตั้งค่า Primary ตอนสร้าง)</div>
        <select
          value={form.departmentId}
          onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          required={!isEditing}
        >
          <option value="">- เลือก -</option>
          {departments.map((d) => (
            <option key={d.id} value={String(d.id)}>
              {d.code} · {d.nameTh || d.nameEn || `Dept#${d.id}`}
            </option>
          ))}
        </select>
      </label>

      <div className="sm:col-span-3 flex gap-2">
        <button type="submit" className="h-9 px-4 rounded-md border">
          {isEditing ? "บันทึกการแก้ไข" : "สร้างผู้ใช้"}
        </button>
        {isEditing && (
          <button type="button" className="h-9 px-4 rounded-md border" onClick={onCancel}>
            ยกเลิกแก้ไข
          </button>
        )}
      </div>
    </form>
  );
}
