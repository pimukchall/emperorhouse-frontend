"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth, hasRole } from "@/providers/local-auth";

import FiltersBar from "./components/FiltersBar";
import UserForm from "./components/UserForm";
import UsersTable from "./components/UsersTable";
import ManageUserDepartmentsDialog from "./ManageUserDepartmentsDialog";

const PAGE_SIZE = 20;

async function fetchUserDetail(id) {
  return apiFetch(`/api/users/${id}`);
}

// helper: ตัดค่าว่างออกจาก payload
function n(v) {
  if (v === undefined || v === null) return undefined;
  if (typeof v === "string" && v.trim() === "") return undefined;
  return v;
}

export default function AdminUsersPage() {
  const { user, loading } = useAuth();
  const isAdmin = hasRole(user, "admin");

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [q, setQ] = useState("");
  const [roleId, setRoleId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [deptOpen, setDeptOpen] = useState(false);
  const [deptUser, setDeptUser] = useState(null);

  const [form, setForm] = useState({
    id: null,
    email: "",
    name: "",
    firstNameTh: "",
    lastNameTh: "",
    firstNameEn: "",
    lastNameEn: "",
    roleId: "",
    departmentId: "",
    password: "",
    orgId: "",
    orgLabel: "",
    employeeCode: "",
    employeeType: "",
    contractType: "",
    gender: "",
    birthDate: "",
    startDate: "",
    probationEndDate: "",
    resignedAt: "",
  });
  const isEditing = useMemo(() => form.id !== null, [form.id]);

  useEffect(() => {
    if (!loading && !isAdmin) {
      // TODO: redirect/guard ถ้าจำเป็น
    }
  }, [loading, isAdmin]);

  async function loadRef() {
    try {
      const [r1, r2] = await Promise.all([
        apiFetch(`/api/roles?page=1&limit=999`),
        apiFetch(`/api/departments?page=1&limit=999`),
      ]);
      setRoles(r1?.data || []);
      setDepartments(r2?.data || []);
    } catch {}
    try {
      const r3 = await apiFetch(`/api/organizations?page=1&limit=999`);
      setOrganizations(r3?.data || []);
    } catch {
      setOrganizations([]);
    }
  }

  async function load() {
    setBusy(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
        sortBy: "id",
        sort: "asc",
      });
      if (q) params.set("q", q);
      if (roleId) params.set("roleId", roleId);
      if (departmentId) params.set("departmentId", departmentId);
      if (includeDeleted) params.set("includeDeleted", "1");

      const res = await apiFetch(`/api/users?${params.toString()}`);
      setItems(res?.data || []);
      setMeta(res?.meta || { page: 1, pages: 1, total: 0 });
      setError("");
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { loadRef(); }, []);
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [q, roleId, departmentId, includeDeleted, page]);

  function resetForm() {
    setForm((s) => ({
      ...s,
      id: null,
      email: "",
      name: "",
      firstNameTh: "",
      lastNameTh: "",
      firstNameEn: "",
      lastNameEn: "",
      roleId: roles.find(r => r.name?.toLowerCase() === "user")?.id || "",
      departmentId: "",
      password: "",
      orgId: "",
      orgLabel: "",
      employeeCode: "",
      employeeType: "",
      contractType: "",
      gender: "",
      birthDate: "",
      startDate: "",
      probationEndDate: "",
      resignedAt: "",
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ✅ validate ขั้นต่ำ + sanitize payload
  function buildPayload() {
    const requiredMsg = [];
    if (!form.email) requiredMsg.push("อีเมล");
    if (!isEditing && (!form.password || form.password.length < 8)) requiredMsg.push("รหัสผ่าน (อย่างน้อย 8 ตัว)");
    if (!form.roleId) requiredMsg.push("Role");
    if (!form.departmentId) requiredMsg.push("Department");

    if (requiredMsg.length) {
      throw new Error(`กรุณากรอก: ${requiredMsg.join(", ")}`);
    }

    const payload = {
      email: form.email,
      name: n(form.name),
      firstNameTh: n(form.firstNameTh),
      lastNameTh: n(form.lastNameTh),
      firstNameEn: n(form.firstNameEn),
      lastNameEn: n(form.lastNameEn),
      roleId: Number(form.roleId),
      departmentId: Number(form.departmentId),
      orgId: n(form.orgId) ? Number(form.orgId) : undefined,
      employeeCode: n(form.employeeCode) ?? null,
      employeeType: n(form.employeeType) ?? null,
      contractType: n(form.contractType) ?? null,
      gender: n(form.gender) ?? null,
      birthDate: n(form.birthDate) ?? null,
      startDate: n(form.startDate) ?? null,
      probationEndDate: n(form.probationEndDate) ?? null,
      resignedAt: n(form.resignedAt) ?? null,
    };

    if (!isEditing) {
      payload.password = form.password; // สร้างใหม่ต้องส่ง
    }

    return payload;
  }

  async function handleSubmit(e) {
    e.preventDefault(); setBusy(true);
    try {
      const payload = buildPayload();
      if (isEditing) {
        await apiFetch(`/api/users/${form.id}`, { method: "PATCH", body: payload });
      } else {
        await apiFetch(`/api/users`, { method: "POST", body: payload });
      }
      resetForm(); load();
    } catch (e2) {
      setError(e2?.data?.error || e2?.message || "บันทึกไม่สำเร็จ");
    } finally { setBusy(false); }
  }

  async function handleEdit(u) {
    try {
      const detail = await fetchUserDetail(u.id);
      const d = detail?.data || u;
      const orgIdStr = d.organization?.id ? String(d.organization.id) : "";
      const orgLabel =
        d.organization
          ? `${d.organization.code ? d.organization.code + " · " : ""}${
              d.organization.nameTh || d.organization.nameEn || `Org#${d.organization.id}`
            }`
          : "";

      setForm({
        id: d.id,
        email: d.email || "",
        name: d.name || "",
        firstNameTh: d.firstNameTh || "",
        lastNameTh: d.lastNameTh || "",
        firstNameEn: d.firstNameEn || "",
        lastNameEn: d.lastNameEn || "",
        roleId: d.role?.id || "",
        departmentId: d.primaryUserDept?.department?.id || "",
        password: "",
        orgId: orgIdStr,
        orgLabel,
        employeeCode: d.employeeCode || "",
        employeeType: d.employeeType || "",
        contractType: d.contractType || "",
        gender: d.gender || "",
        birthDate: d.birthDate ? d.birthDate.substring(0, 10) : "",
        startDate: d.startDate ? d.startDate.substring(0, 10) : "",
        probationEndDate: d.probationEndDate ? d.probationEndDate.substring(0, 10) : "",
        resignedAt: d.resignedAt ? d.resignedAt.substring(0, 10) : "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดรายละเอียดผู้ใช้ไม่สำเร็จ");
    }
  }

  async function handleToggleDelete(u, hard = false) {
    if (hard ? !confirm(`ลบถาวรผู้ใช้ ${u.email}?`) : (!u.deletedAt && !confirm(`ลบผู้ใช้ ${u.email}? (soft delete)`))) return;
    setBusy(true);
    try {
      await apiFetch(`/api/users/${u.id}${hard ? "?hard=1" : ""}`, { method: "DELETE" });
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "ทำรายการไม่สำเร็จ");
    } finally { setBusy(false); }
  }

  async function handleRestore(u) {
    setBusy(true);
    try { await apiFetch(`/api/users/${u.id}/restore`, { method: "POST" }); load(); }
    catch (e) { setError(e?.data?.error || e?.message || "กู้คืนไม่สำเร็จ"); }
    finally { setBusy(false); }
  }

  async function handleResetPassword(u) {
    const newPassword = prompt("ตั้งรหัสผ่านใหม่ (อย่างน้อย 8 ตัว)"); if (!newPassword) return;
    setBusy(true);
    try { await apiFetch(`/api/users/${u.id}/reset-password`, { method: "POST", body: { newPassword } }); alert("รีเซ็ตรหัสผ่านแล้ว"); }
    catch (e) { setError(e?.data?.error || e?.message || "รีเซ็ตรหัสผ่านไม่สำเร็จ"); }
    finally { setBusy(false); }
  }

  function openManageDepts(u) { setDeptUser(u); setDeptOpen(true); }

  const filters = {
    q, setQ, roleId, setRoleId, departmentId, setDepartmentId,
    includeDeleted, setIncludeDeleted,
    onClear: () => { setQ(""); setRoleId(""); setDepartmentId(""); setIncludeDeleted(false); setPage(1); },
  };

  // ✅ canSubmit สำหรับส่งให้ปุ่มในฟอร์ม
  const canSubmit = Boolean(
    form.email &&
    (isEditing || (form.password && form.password.length >= 8)) &&
    form.roleId &&
    form.departmentId
  );

  return (
    <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Users</h1>
      </header>

      <FiltersBar roles={roles} departments={departments} filters={filters} />

      <section className="rounded-xl border dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4">
        <h2 className="font-medium mb-3 text-neutral-800 dark:text-neutral-100">{isEditing ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้ใหม่"}</h2>
        <UserForm
          roles={roles}
          departments={departments}
          organizations={organizations}
          form={form}
          setForm={setForm}
          isEditing={isEditing}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          canSubmit={canSubmit}
        />
      </section>

      <UsersTable
        items={items}
        meta={meta}
        page={page}
        setPage={setPage}
        onEdit={handleEdit}
        onSoftDelete={(u) => handleToggleDelete(u, false)}
        onRestore={handleRestore}
        onHardDelete={(u) => handleToggleDelete(u, true)}
        onResetPassword={handleResetPassword}
        onManageDepts={openManageDepts}
      />

      <ManageUserDepartmentsDialog
        open={deptOpen}
        onClose={() => setDeptOpen(false)}
        user={deptUser}
        departments={departments}
        onChanged={() => load()}
      />

      {!!error && (
        <div className="rounded-md border border-rose-300 bg-rose-50 dark:bg-rose-900/20 dark:border-rose-800 p-3 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}
    </main>
  );
}
