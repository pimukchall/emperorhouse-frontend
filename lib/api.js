// lib/api.js
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";  // ex. http://localhost:4000
const PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";  // เว้นว่างถ้า backend ไม่มี prefix

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

/** parseResponse: แยก JSON/text ตาม content-type */
async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  return data;
}

/**
 * apiFetch(path, init, opts)
 * - ส่ง cookie เสมอ (credentials: "include")
 * - แนบ Bearer ถ้ามี (ผ่าน opts.getAccessToken)
 * - ถ้า 401 แล้ว opts.onUnauthorized สำเร็จ → retry 1 ครั้ง
 */
export async function apiFetch(
  path,
  init = {},
  { getAccessToken, onUnauthorized, absoluteUrl = false } = {}
) {
  const url = absoluteUrl ? path : apiUrl(path);
  const opts = {
    credentials: "include",
    cache: "no-store",
    ...init,
    headers: new Headers(init.headers || {}),
  };

  // แนบ Bearer token ถ้ามี
  if (typeof getAccessToken === "function") {
    const t = getAccessToken();
    if (t) opts.headers.set("Authorization", `Bearer ${t}`);
  }

  // แปลง body → JSON (ถ้าไม่ใช่ FormData)
  if (opts.body && typeof opts.body === "object" && !(opts.body instanceof FormData)) {
    opts.headers.set("content-type", "application/json");
    opts.body = JSON.stringify(opts.body);
  }

  let res = await fetch(url, opts);

  // 401 → ลอง refresh แล้ว retry 1 ครั้ง
  if (res.status === 401 && typeof onUnauthorized === "function") {
    const ok = await onUnauthorized();
    if (ok) {
      if (typeof getAccessToken === "function") {
        const t2 = getAccessToken();
        if (t2) opts.headers.set("Authorization", `Bearer ${t2}`);
      }
      res = await fetch(url, opts);
    }
  }

  const data = await parseResponse(res);
  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      (typeof data === "string" ? data : "Request failed");
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export { parseResponse };
