// lib/api.js

// ==============================
// Config
// ==============================
const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000").trim();

// ==============================
// Internal state (registered by AuthProvider)
// ==============================
let _getAccessToken = null;
let _onUnauthorized = null;
// ใช้กัน “stampede” ตอน refresh token ให้ run ครั้งเดียวแล้ว await ร่วมกัน
let _refreshPromise = null;

// ==============================
// Small utilities
// ==============================
function isAbsoluteUrl(u) {
  return /^https?:\/\//i.test(String(u || ""));
}

function trimTrailingSlash(s) {
  return String(s || "").replace(/\/+$/g, "");
}
function trimLeadingSlash(s) {
  return String(s || "").replace(/^\/+/g, "");
}

/**
 * รวม BASE + path ให้เป็น URL สำหรับ “แสดงผล” (เช่น src/href) ไม่ยิง request เอง
 * - รองรับทั้ง path (`/api/...` หรือ `api/...`) และ absolute URL (ข้าม BASE)
 * - ปรับ slash อัตโนมัติ ไม่ให้ซ้ำกัน
 */
export function apiURL(pathOrUrl = "") {
  const u = String(pathOrUrl || "");
  if (!u) return trimTrailingSlash(BASE); // กรณีอยากได้ BASE เปล่า ๆ
  if (isAbsoluteUrl(u)) return u;

  const base = trimTrailingSlash(BASE);
  const path = "/" + trimLeadingSlash(u); // บังคับให้ขึ้นต้นด้วย /
  return base + path;
}

/** แปลง response -> data (auto json/text) */
export async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  return data;
}

/** ตรวจว่าเป็น URL refresh token (กันวนลูป onUnauthorized) */
function isAuthRefreshUrl(url) {
  try {
    const u = new URL(url, BASE);
    // ตรงกับ backend path: /api/auth/refresh
    return /\/api\/auth\/refresh($|\?)/i.test(u.pathname);
  } catch {
    return false;
  }
}

// ==============================
// Public API
// ==============================

/**
 * ให้ AuthProvider เรียกตอนบูตแอป เพื่อบอกว่าจะเอา accessToken จากไหน
 * และถ้าเจอ 401 ให้ทำอะไร (เช่น เรียก refresh)
 */
export function configureApiAuth({ getAccessToken, onUnauthorized } = {}) {
  _getAccessToken = typeof getAccessToken === "function" ? getAccessToken : null;
  _onUnauthorized = typeof onUnauthorized === "function" ? onUnauthorized : null;
}

/**
 * Wrapper ของ fetch สำหรับคุยกับ backend
 * ข้อดี:
 *  - รับทั้ง absolute URL และ path (แนะนำ path `/api/...`)
 *  - เติม BASE ให้อัตโนมัติเมื่อเป็น path
 *  - แนบ Authorization Bearer ให้อัตโนมัติ (ถ้ามี configureApiAuth)
 *  - จัดการ 401 -> เรียก onUnauthorized() (เช่น refresh) + retry ให้อัตโนมัติ 1 ครั้ง
 *  - ส่ง cookie เสมอ (credentials: "include")
 *  - ถ้า body เป็น object (ไม่ใช่ FormData) จะใส่ content-type: application/json และ stringify ให้
 *
 * @param {string} pathOrUrl - "/api/..." หรือ absolute URL
 * @param {RequestInit & { body?: any }} init
 * @param {{ getAccessToken?: ()=>string, onUnauthorized?: ()=>Promise<boolean>, retryOnce?: boolean }} opts
 */
export async function apiFetch(pathOrUrl, init = {}, opts = {}) {
  // 1) สร้าง URL
  const url = isAbsoluteUrl(pathOrUrl) ? String(pathOrUrl) : apiURL(pathOrUrl);

  // 2) เตรียม header + body
  const isForm = typeof FormData !== "undefined" && init?.body instanceof FormData;
  const headers = new Headers(init?.headers || {});
  if (!isForm && init?.body && typeof init.body === "object" && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  // 3) เลือก token getter / unauthorized handler (สามารถ override รายคำขอได้)
  const getAccessToken =
    typeof opts.getAccessToken === "function" ? opts.getAccessToken : _getAccessToken;
  const onUnauthorized =
    typeof opts.onUnauthorized === "function" ? opts.onUnauthorized : _onUnauthorized;

  // 4) แนบ Bearer ถ้ามี
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

  // 5) ยิงครั้งที่ 1
  const allowRefresh = !isAuthRefreshUrl(url);
  const retryOnce = opts.retryOnce !== false; // default = true
  let res = await fetch(url, requestInit);

  // 6) ถ้า 401 และอนุญาต refresh -> เรียก onUnauthorized() แบบรวมศูนย์
  if (res.status === 401 && allowRefresh && typeof onUnauthorized === "function") {
    if (!_refreshPromise) {
      _refreshPromise = (async () => {
        try {
          const ok = await onUnauthorized();
          return !!ok;
        } finally {
          // ปล่อยให้คำขออื่น ๆ ได้ await ก่อน แล้วค่อยล้างตัวแปร
          setTimeout(() => {
            _refreshPromise = null;
          }, 0);
        }
      })();
    }

    const ok = await _refreshPromise;

    // 7) ถ้า refresh สำเร็จ และอนุญาต retry
    if (ok && retryOnce) {
      // แนบ token ล่าสุดก่อนยิงซ้ำ
      if (typeof getAccessToken === "function") {
        const t2 = getAccessToken();
        if (t2) requestInit.headers.set("authorization", `Bearer ${t2}`);
      }
      res = await fetch(url, requestInit);
    }
  }

  // 8) parse + throw ถ้าไม่ ok
  const data = await parseResponse(res);
  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) || (typeof data === "string" ? data : "Request failed");
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// ==============================
// (Optional) Named export utilities
// ==============================
export { isAbsoluteUrl };
