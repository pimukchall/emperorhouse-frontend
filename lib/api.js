// lib/api.js
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

// ======== Global auth config (ให้ AuthProvider มา register) ========
let _getAccessToken = null;
let _onUnauthorized = null;
let refreshPromise = null;

/** ตั้งค่าแหล่งโทเค็น + handler สำหรับ 401 (เรียกครั้งเดียวตอนบูตแอป) */
export function configureApiAuth({ getAccessToken, onUnauthorized } = {}) {
  _getAccessToken = typeof getAccessToken === "function" ? getAccessToken : null;
  _onUnauthorized = typeof onUnauthorized === "function" ? onUnauthorized : null;
}

function isAbsoluteUrl(u) {
  return /^https?:\/\//i.test(String(u || ""));
}

export async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  return data;
}

function isAuthRefreshUrl(url) {
  try {
    const u = new URL(url, BASE);
    return /\/api\/auth\/refresh($|\?)/i.test(u.pathname);
  } catch {
    return false;
  }
}

/**
 * apiFetch(path, init, opts?)
 * - path: "/api/..." (relative) หรือ full URL
 * - ส่ง cookie เสมอ (credentials: "include")
 * - แนบ Bearer อัตโนมัติจาก configureApiAuth()
 * - ป้องกัน refresh stampede
 * - ไม่ refresh ตัวเอง (เมื่อเรียก /api/auth/refresh)
 * - รีทรายได้แค่ 1 ครั้ง/คำขอ
 */
export async function apiFetch(path, init = {}, opts = {}) {
  const url = isAbsoluteUrl(path) ? path : `${BASE}${path}`;

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

  const allowRefresh = !isAuthRefreshUrl(url);
  const retryOnce = opts.retryOnce !== false; // default true

  let res = await fetch(url, requestInit);

  // ถ้า 401 และอนุญาต refresh
  if (res.status === 401 && allowRefresh && typeof onUnauthorized === "function") {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const ok = await onUnauthorized();
          return !!ok;
        } finally {
          setTimeout(() => {
            refreshPromise = null;
          }, 0);
        }
      })();
    }

    const ok = await refreshPromise;
    if (ok && retryOnce) {
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
