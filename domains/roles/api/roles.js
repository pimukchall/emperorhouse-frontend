import { apiFetch } from "@/lib/api";

// ช่วยแปลงผลลัพธ์ให้รองรับทั้ง {ok,data} หรือ array ตรง ๆ
function unwrapList(res) {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

/** GET /api/roles?q=&page=&limit=&sortBy=&sort= */
export async function listRoles(params = {}) {
  const search = new URLSearchParams({
    q: params.q ?? "",
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 200),
    sortBy: params.sortBy ?? "id",
    sort: params.sort ?? "asc",
  });
  const res = await apiFetch(`/api/roles?${search.toString()}`);
  return unwrapList(res);
}

/** POST /api/roles  body: {name, labelTh?, labelEn?} */
export async function createRole(payload) {
  return apiFetch(`/api/roles`, { method: "POST", body: payload });
}

/** PUT /api/roles/:id  body: {labelTh?, labelEn?} */
export async function updateRole(id, payload) {
  if (!id) throw new Error("Missing role id");
  return apiFetch(`/api/roles/${id}`, { method: "PUT", body: payload });
}

/** DELETE /api/roles/:id */
export async function deleteRole(id) {
  if (!id) throw new Error("Missing role id");
  return apiFetch(`/api/roles/${id}`, { method: "DELETE" });
}
