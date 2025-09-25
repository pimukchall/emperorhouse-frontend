// lib/api.js
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const PREFIX = (process.env.NEXT_PUBLIC_API_PREFIX || "api").replace(/^\/+|\/+$/g, "");

// ======== Global auth config (ให้ AuthProvider มา register) ========
let _getAccessToken = null;
let _onUnauthorized = null;

// refresh lock กัน stampede (ให้คำขออื่นๆ รอ refresh เดียว)
let refreshPromise = null;

/** ตั้งค่าแหล่งโทเค็น + handler สำหรับ 401 (เรียกครั้งเดียวตอนบูตแอป) */
export function configureApiAuth({ getAccessToken, onUnauthorized } = {}) {
  _getAccessToken  = typeof getAccessToken  === "function" ? getAccessToken  : null;
  _onUnauthorized  = typeof onUnauthorized  === "function" ? onUnauthorized  : null;
}

function isAbsoluteUrl(u) {
  return /^https?:\/\//i.test(String(u || ""));
}
function normalize(str, mode) {
  if (!str) return "";
  if (mode === "base") return String(str).replace(/\/+$/g, "");
  if (mode === "path") return String(str).replace(/^\/+/g, "");
  if (mode === "prefix") return String(str).replace(/^\/+|\/+$/g, "");
  return String(str);
}
function joinUrl(base, prefix, path) {
  const b = normalize(base, "base");
  const p = normalize(prefix, "prefix");
  let u = normalize(path, "path");
  const startsWithPrefix =
    u.toLowerCase().startsWith(`${p.toLowerCase()}/`) ||
    u.toLowerCase() === p.toLowerCase();
  const mid = p && !startsWithPrefix ? `/${p}` : "";
  return `${b}${mid}/${u}`;
}

export function apiUrl(path) {
  if (isAbsoluteUrl(path)) return String(path);
  return joinUrl(BASE, PREFIX, path || "");
}

export async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  return data;
}

function isAuthRefreshUrl(url) {
  try {
    const u = new URL(url, BASE);
    return /\/auth\/refresh($|\?)/i.test(u.pathname);
  } catch {
    return false;
  }
}

/**
 * apiFetch(path, init, opts?)
 * - ส่ง cookie เสมอ (credentials: "include")
 * - แนบ Bearer อัตโนมัติจาก configureApiAuth()
 * - ป้องกัน refresh stampede ด้วย global refreshPromise
 * - ไม่ refresh ตัวเอง (เมื่อเรียก /auth/refresh)
 * - รีทรายได้แค่ 1 ครั้ง/คำขอ
 * - ถ้าเป็น FormData จะไม่เซ็ต Content-Type เอง
 * - opts override ได้: { getAccessToken, onUnauthorized, absoluteUrl, retryOnce }
 */
export async function apiFetch(path, init = {}, opts = {}) {
  const url = opts.absoluteUrl || isAbsoluteUrl(path) ? String(path) : apiUrl(path);

  const isForm = typeof FormData !== "undefined" && init?.body instanceof FormData;
  const headers = new Headers(init?.headers || {});
  if (!isForm && init?.body && typeof init.body === "object" && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  // ---- เลือก token getter / unauthorized handler ----
  const getAccessToken =
    typeof opts.getAccessToken === "function" ? opts.getAccessToken : _getAccessToken;
  const onUnauthorized =
    typeof opts.onUnauthorized === "function" ? opts.onUnauthorized : _onUnauthorized;

  // ---- แนบ Bearer ถ้ามี ----
  if (typeof getAccessToken === "function") {
    const token = getAccessToken();
    if (token && !headers.has("authorization")) {
      headers.set("authorization", `Bearer ${token}`);
    }
  }

  const requestInit = {
    method: init?.method || "GET",
    credentials: "include",
    cache: "no-store",
    ...init,
    headers,
    body: isForm
      ? init.body
      : init?.body && typeof init.body === "object"
      ? JSON.stringify(init.body)
      : init?.body,
  };

  // ป้องกันวนลูป: /auth/refresh จะไม่เรียก onUnauthorized
  const allowRefresh = !isAuthRefreshUrl(url);

  // รีทรายแค่หนึ่งครั้งต่อคำขอ
  const retryOnce = opts.retryOnce !== false; // default true

  let res = await fetch(url, requestInit);

  // ถ้า 401 และอนุญาต refresh
  if (res.status === 401 && allowRefresh && typeof onUnauthorized === "function") {
    // ถ้ายังไม่มี refresh กำลังทำงาน → สร้างใหม่
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const ok = await onUnauthorized();
          return !!ok;
        } finally {
          // ให้โอกาสคำขออื่น await แล้วค่อยล้าง reference
          setTimeout(() => { refreshPromise = null; }, 0);
        }
      })();
    }

    // รอ refresh ตัวเดียว
    const ok = await refreshPromise;
    if (ok && retryOnce) {
      // แนบ token ใหม่ ก่อนยิงซ้ำ
      if (typeof getAccessToken === "function") {
        const t2 = getAccessToken();
        if (t2) requestInit.headers.set("authorization", `Bearer ${t2}`);
      }
      res = await fetch(url, requestInit);
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
