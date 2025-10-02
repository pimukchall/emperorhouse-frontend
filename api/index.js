let _getAccessToken = null; 
let _onUnauthorized = null;

export function configureApiAuth({ getAccessToken, onUnauthorized } = {}) {
  _getAccessToken = getAccessToken || null;
  _onUnauthorized = onUnauthorized || null;
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export function toApiUrl(pathOrUrl, absoluteUrl = false) {
  if (!pathOrUrl) return "";
  if (absoluteUrl) return pathOrUrl;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${API_BASE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export async function apiFetch(pathOrUrl, init = {}, opts = {}) {
  const url = toApiUrl(pathOrUrl, opts.absoluteUrl);

  const headers = new Headers(init.headers || {});
  if (!headers.has("Content-Type") && init.body != null && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const reqInit = {
    method: init.method || "GET",
    credentials: "include",
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

  // Bearer token
  if (_getAccessToken && !headers.has("Authorization")) {
    try {
      const token = await _getAccessToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
    } catch {}
  }

  let res = await fetch(url, reqInit);
  if (res.status !== 401) return parseResponse(res);

  // 401 → refresh & retry
  if (_onUnauthorized) {
    const ok = await _onUnauthorized();
    if (ok && _getAccessToken) {
      try {
        const token2 = await _getAccessToken();
        if (token2) headers.set("Authorization", `Bearer ${token2}`);
      } catch {}
      res = await fetch(url, { ...reqInit, headers });
      if (res.status !== 401) return parseResponse(res);
    }
  }

  throw await httpError(res);
}

async function parseResponse(res) {
  const text = await res.clone().text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text || null; }
  if (!res.ok) throw wrap(res, data);
  return data;
}

async function httpError(res) {
  try {
    const t = await res.clone().text();
    try { return wrap(res, t ? JSON.parse(t) : null); }
    catch { return wrap(res, t || null); }
  } catch { return wrap(res, null); }
}

function wrap(res, data) {
  const err = new Error(`HTTP ${res.status}`);
  err.status = res.status;
  err.data = data;
  return err;
}