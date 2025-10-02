const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const REFRESH_PATH = "/api/auth/refresh";

let _getAccessToken = null;      // async () => string|null
let _onUnauthorized = null;      // async () => boolean
let _fetch = typeof fetch === "function" ? fetch.bind(globalThis) : null;

export function configureApi({ getAccessToken, onUnauthorized, fetchImpl } = {}) {
  _getAccessToken = getAccessToken || null;
  _onUnauthorized = onUnauthorized || null;
  if (fetchImpl) _fetch = fetchImpl;
}

export function toApiUrl(pathOrUrl, absolute = false) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return absolute ? `${API_BASE}${pathOrUrl}` : `${API_BASE}${pathOrUrl}`; // base เดียวกัน
}

async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = await res.text();
    if (!res.ok) throw makeHttpError(res, text);
    return text;
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw makeHttpError(res, data);
  return data;
}

function makeHttpError(res, body) {
  const err = new Error((body && body.message) || res.statusText || "HTTP Error");
  err.status = res.status;
  err.body = body;
  return err;
}

/**
 * apiFetch(path, init?, opts?)
 * - แนบ Bearer token อัตโนมัติ
 * - ถ้า 401 จะเรียก onUnauthorized() เพื่อ refresh แล้ว retry แค่ 1 ครั้ง
 * - ถ้าเป็น /auth/refresh เอง จะไม่เรียก onUnauthorized เพื่อกัน recursion
 */
export async function apiFetch(pathOrUrl, init = {}, opts = {}) {
  if (!_fetch) throw new Error("fetch is not available");

  const url = toApiUrl(pathOrUrl, !!opts.absoluteUrl);
  const isRefreshCall = url.includes(REFRESH_PATH);

  const headers = new Headers(init.headers || {});
  if (_getAccessToken) {
    try {
      const token = await _getAccessToken();
      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    } catch {
      // ignore
    }
  }
  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const req = {
    method: init.method || "GET",
    credentials: init.credentials || "include", // สำคัญสำหรับ refresh-cookie
    ...init,
    headers,
  };

  let res = await _fetch(url, req);
  if (res.status !== 401) return parseResponse(res);

  // ถ้าเป็น /auth/refresh เอง ห้ามพยายาม refresh อีก -> ปล่อย 401 ออกไป
  if (isRefreshCall) throw makeHttpError(res, await safeRead(res));

  // กันลูป: allow retry แค่ครั้งเดียว
  if (req._retried) throw makeHttpError(res, await safeRead(res));
  req._retried = true;

  if (_onUnauthorized) {
    const ok = await _onUnauthorized(); // ให้ auth.js จัดคิว refresh
    if (ok && _getAccessToken) {
      try {
        const newToken = await _getAccessToken();
        if (newToken) headers.set("Authorization", `Bearer ${newToken}`);
      } catch {}
      res = await _fetch(url, req);
      if (res.status !== 401) return parseResponse(res);
    }
  }

  throw makeHttpError(res, await safeRead(res));
}

async function safeRead(res) {
  try {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return await res.json();
    return await res.text();
  } catch {
    return null;
  }
}

// sugar helpers
export const api = {
  get: (p, init, opts) => apiFetch(p, { ...(init || {}), method: "GET" }, opts),
  post: (p, body, init, opts) =>
    apiFetch(
      p,
      { ...(init || {}), method: "POST", body: body instanceof FormData ? body : JSON.stringify(body || {}) },
      opts
    ),
  put: (p, body, init, opts) =>
    apiFetch(
      p,
      { ...(init || {}), method: "PUT", body: body instanceof FormData ? body : JSON.stringify(body || {}) },
      opts
    ),
  patch: (p, body, init, opts) =>
    apiFetch(
      p,
      { ...(init || {}), method: "PATCH", body: body instanceof FormData ? body : JSON.stringify(body || {}) },
      opts
    ),
  delete: (p, init, opts) => apiFetch(p, { ...(init || {}), method: "DELETE" }, opts),
};
