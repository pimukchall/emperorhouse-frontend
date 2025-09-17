const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";  // ex. http://localhost:4000
const PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";  // ปล่อยว่างถ้า path backend ไม่มี prefix

function joinUrl(base, prefix, path) {
  const b = (base || "").replace(/\/+$/g, "");
  const p = (prefix || "").replace(/^\/+|\/+$/g, "");
  const u = (path || "").replace(/^\/+/g, "");
  const mid = p ? `/${p}` : "";
  return `${b}${mid}/${u}`;
}

export function apiUrl(path) {
  return joinUrl(BASE, PREFIX, path);
}

export async function apiFetch(path, init = {}) {
  const url = apiUrl(path);
  const opts = {
    credentials: "include",
    cache: "no-store",
    ...init,
  };
  if (opts.body && typeof opts.body === "object" && !(opts.body instanceof FormData)) {
    opts.headers = { "content-type": "application/json", ...(opts.headers || {}) };
    opts.body = JSON.stringify(opts.body);
  }
  const res = await fetch(url, opts);
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || (typeof data === "string" ? data : "Request failed");
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}