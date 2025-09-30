let _getAccessToken = null;     // () => string | null | Promise<string|null>
let _onUnauthorized = null;     // () => boolean | Promise<boolean>

export function configureApiAuth({ getAccessToken, onUnauthorized } = {}) {
  _getAccessToken = getAccessToken || null;
  _onUnauthorized = onUnauthorized || null;
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

/**
 * แปลง path เป็น absolute URL ที่ backend
 */
export function toApiUrl(pathOrUrl, absoluteUrl = false) {
  if (!pathOrUrl) return "";
  if (absoluteUrl) return pathOrUrl;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${API_BASE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/**
 * Core API fetch (มี retry เมื่อโดน 401)
 */
export async function apiFetch(pathOrUrl, init = {}, opts = {}) {
  const url = toApiUrl(pathOrUrl, opts.absoluteUrl);

  // headers
  const headers = new Headers(init.headers || {});
  if (!headers.has("Content-Type") && init.body != null && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // request init
  const reqInit = {
    method: init.method || "GET",
    credentials: "include",   // ส่ง cookie เสมอ
    mode: "cors",
    ...init,
    headers,
    body:
      init.body == null
        ? undefined
        : init.body instanceof FormData
        ? init.body
        : typeof init.body === "string"
        ? init.body
        : JSON.stringify(init.body),
  };

  // Bearer token (ถ้ามี)
  if (_getAccessToken && !headers.has("Authorization")) {
    try {
      const token = await _getAccessToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
    } catch {}
  }

  logRequest(url, reqInit);

  // request (รอบแรก)
  let res = await fetch(url, reqInit);
  if (res.status !== 401) return parseResponse(res, url, reqInit);

  // 401 → ลอง refresh + retry
  if (_onUnauthorized) {
    const ok = await _onUnauthorized();
    if (ok && _getAccessToken) {
      try {
        const token2 = await _getAccessToken();
        if (token2) headers.set("Authorization", `Bearer ${token2}`);
      } catch {}
      res = await fetch(url, { ...reqInit, headers });
      if (res.status !== 401) return parseResponse(res, url, reqInit, true);
    }
  }

  // ยัง 401 → fail
  const data = await safeRead(res);
  console.warn(
    "[HINT] 401 Unauthorized\n" +
      "- ตรวจว่าได้ส่ง cookie (credentials: 'include') หรือยัง\n" +
      "- ตรวจว่า getAccessToken() คืนค่า token ถูกต้องหรือเปล่า\n" +
      "- ตรวจค่า NEXT_PUBLIC_API_BASE_URL ชี้ไป origin ถูกต้อง"
  );
  throw wrapHttpError(res, data);
}

/* ------------------ Helpers ------------------ */

function logRequest(url, reqInit) {
  const safeHeaders = Object.fromEntries(
    Array.from(reqInit.headers.entries()).map(([k, v]) => [
      k,
      /authorization/i.test(k) ? "Bearer ***" : v,
    ])
  );
  // console.groupCollapsed(`%c[API] ${reqInit.method} ${url}`, "color:#6cf;font-weight:bold");
  // console.log("time:", new Date().toISOString());
  // console.log("headers:", safeHeaders);
  // console.log("credentials:", reqInit.credentials);
  if (reqInit.body && !(reqInit.body instanceof FormData)) {
    // console.log("body:", typeof reqInit.body === "string" ? reqInit.body : "[binary]");
  }
  // console.groupEnd();
}

async function parseResponse(res, url, reqInit, isRetry = false) {
  const text = await res.clone().text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }

  // console.groupCollapsed(
  //   `%c[API RES] ${reqInit.method} ${url} -> ${res.status}${isRetry ? " (retry)" : ""}`,
  //   res.ok ? "color:#9f9;font-weight:bold" : "color:#f66;font-weight:bold"
  // );
  // console.log("time:", new Date().toISOString());
  // console.log("status:", res.status, res.statusText);
  // console.log("response:", data);
  // console.groupEnd();

  if (!res.ok) throw wrapHttpError(res, data);
  return data;
}

async function safeRead(res) {
  try {
    const t = await res.clone().text();
    try { return t ? JSON.parse(t) : null; } catch { return t || null; }
  } catch { return null; }
}

function wrapHttpError(res, data) {
  const err = new Error(`HTTP ${res.status}`);
  err.status = res.status;
  err.data = data;
  return err;
}
