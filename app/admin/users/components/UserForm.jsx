"use client";

export default function UserForm({
  roles = [],
  departments = [],
  form,
  setForm,
  isEditing,
  onSubmit,
  onCancel,
}) {
  return (
    <form className="grid gap-3 sm:grid-cols-3" onSubmit={onSubmit}>
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
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <div className="text-xs">Department (ตั้งค่า Primary ตอนสร้าง)</div>
        <select
          value={form.departmentId}
          onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          required
        >
          <option value="">- เลือก -</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.code} · {d.nameTh}
            </option>
          ))}
        </select>
      </label>

      <div className="sm:col-span-3 flex gap-2">
        <button type="submit" className="h-9 px-4 rounded-md border">
          {isEditing ? "บันทึกการแก้ไข" : "สร้างผู้ใช้"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="h-9 px-4 rounded-md border"
            onClick={onCancel}
          >
            ยกเลิกแก้ไข
          </button>
        )}
      </div>
    </form>
  );
}
