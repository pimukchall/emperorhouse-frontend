"use client";

import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import ErrorDialog from "@/components/modal/ErrorDialog";
import { useAuth, hasRole } from "@/providers/local-auth";

import FiltersBar from "./components/FiltersBar";
import UserForm from "./components/UserForm";
import UsersTable from "./components/UsersTable";
import ManageUserDepartmentsDialog from "./ManageUserDepartmentsDialog";

const PAGE_SIZE = 20;

async function fetchUserDetail(id) {
  return apiFetch(`/api/users/${id}`);
}

export default function AdminUsersPage() {
  const { user, loading } = useAuth();
  const isAdmin = hasRole(user, "admin");

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

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

    // ใหม่
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
      // redirect ตาม UX
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
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { loadRef(); }, []);
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [q, roleId, departmentId, includeDeleted, page]);

  function resetForm() {
    setForm({
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

      employeeCode: "",
      employeeType: "",
      contractType: "",
      gender: "",
      birthDate: "",
      startDate: "",
      probationEndDate: "",
      resignedAt: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      if (isEditing) {
        await apiFetch(`/api/users/${form.id}`, {
          method: "PATCH",
          body: {
            email: form.email,
            name: form.name || "",
            firstNameTh: form.firstNameTh || "",
            lastNameTh: form.lastNameTh || "",
            firstNameEn: form.firstNameEn || "",
            lastNameEn: form.lastNameEn || "",
            roleId: form.roleId ? Number(form.roleId) : undefined,
            departmentId: form.departmentId ? Number(form.departmentId) : undefined,

            employeeCode: form.employeeCode || null,
            employeeType: form.employeeType || null,
            contractType: form.contractType || null,
            gender: form.gender || null,
            birthDate: form.birthDate || null,
            startDate: form.startDate || null,
            probationEndDate: form.probationEndDate || null,
            resignedAt: form.resignedAt || null,
          },
        });
      } else {
        await apiFetch(`/api/users`, {
          method: "POST",
          body: {
            email: form.email,
            password: form.password || undefined,
            name: form.name || "",
            firstNameTh: form.firstNameTh || "",
            lastNameTh: form.lastNameTh || "",
            firstNameEn: form.firstNameEn || "",
            lastNameEn: form.lastNameEn || "",
            roleId: Number(form.roleId),
            departmentId: Number(form.departmentId),

            employeeCode: form.employeeCode || null,
            employeeType: form.employeeType || null,
            contractType: form.contractType || null,
            gender: form.gender || null,
            birthDate: form.birthDate || null,
            startDate: form.startDate || null,
            probationEndDate: form.probationEndDate || null,
            resignedAt: form.resignedAt || null,
          },
        });
      }
      resetForm();
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "บันทึกไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function handleEdit(u) {
    try {
      const detail = await fetchUserDetail(u.id);
      const d = detail?.data || u;
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

        employeeCode: d.employeeCode || "",
        employeeType: d.employeeType || "",
        contractType: d.contractType || "",
        gender: d.gender || "",
        birthDate: d.birthDate ? d.birthDate.substring(0,10) : "",
        startDate: d.startDate ? d.startDate.substring(0,10) : "",
        probationEndDate: d.probationEndDate ? d.probationEndDate.substring(0,10) : "",
        resignedAt: d.resignedAt ? d.resignedAt.substring(0,10) : "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e?.data?.error || e?.message || "โหลดรายละเอียดผู้ใช้ไม่สำเร็จ");
    }
  }

  async function handleToggleDelete(u, hard = false) {
    if (hard) {
      if (!confirm(`ลบถาวรผู้ใช้ ${u.email}?`)) return;
    } else if (!u.deletedAt) {
      if (!confirm(`ลบผู้ใช้ ${u.email}? (soft delete)`)) return;
    }
    setBusy(true);
    try {
      await apiFetch(`/api/users/${u.id}${hard ? "?hard=1" : ""}`, { method: "DELETE" });
      load();
    } catch (e) {
      setError(e?.data?.error || e?.message || "ทำรายการไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function handleResetPassword(u) {
    const newPassword = prompt("ตั้งรหัสผ่านใหม่ (อย่างน้อย 8 ตัว)");
    if (!newPassword) return;
    setBusy(true);
    try {
      await apiFetch(`/api/users/${u.id}/reset-password`, { method: "POST", body: { newPassword } });
      alert("รีเซ็ตรหัสผ่านแล้ว");
    } catch (e) {
      setError(e?.data?.error || e?.message || "รีเซ็ตรหัสผ่านไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  function openManageDepts(u) {
    setDeptUser(u);
    setDeptOpen(true);
  }

  const filters = {
    q, setQ,
    roleId, setRoleId,
    departmentId, setDepartmentId,
    includeDeleted, setIncludeDeleted,
    onClear: () => { setQ(""); setRoleId(""); setDepartmentId(""); setIncludeDeleted(false); setPage(1); }
  };

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin · Users</h1>
      </header>

      <FiltersBar roles={roles} departments={departments} filters={filters} />

      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-3">{isEditing ? "แก้ไขผู้ใช้" : "สร้างผู้ใช้ใหม่"}</h2>
        <UserForm
          roles={roles}
          departments={departments}
          form={form}
          setForm={setForm}
          isEditing={isEditing}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      </section>

      <UsersTable
        items={items}
        meta={meta}
        page={page}
        setPage={setPage}
        onEdit={handleEdit}
        onSoftDelete={(u) => handleToggleDelete(u, false)}
        onRestore={(u) => handleToggleDelete(u, false)}
        onHardDelete={(u) => handleToggleDelete(u, true)}
        onResetPassword={handleResetPassword}
        onManageDepts={openManageDepts}
      />

      <ErrorDialog open={!!error} message={error} onClose={() => setError("")} />

      <ManageUserDepartmentsDialog
        open={deptOpen}
        onClose={() => setDeptOpen(false)}
        user={deptUser}
        departments={departments}
        onChanged={() => load()}
      />
    </main>
  );
}
