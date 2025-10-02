import { api, configureApi } from "./index.js";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const REFRESH_URL = `${API_BASE}/api/auth/refresh`;
const LOGIN_URL = `${API_BASE}/api/auth/login`;
const LOGOUT_URL = `${API_BASE}/api/auth/logout`;

let _accessToken = null;
let _refreshing = null; // Promise<boolean>

/* ---------- Token store (in-memory + localStorage) ---------- */
const KEY = "accessToken";

export function setAccessToken(token) {
  _accessToken = token || null;
  try {
    if (token) localStorage.setItem(KEY, token);
    else localStorage.removeItem(KEY);
  } catch {}
}

export async function getAccessToken() {
  if (_accessToken) return _accessToken;
  try {
    const t = localStorage.getItem(KEY);
    if (t) _accessToken = t;
  } catch {}
  return _accessToken;
}

/* ---------- Configure api wrapper ---------- */
configureApi({
  getAccessToken,
  onUnauthorized: tryRefreshOnce,
});

/* ---------- Refresh queue ---------- */
async function tryRefreshOnce() {
  if (_refreshing) return _refreshing;

  _refreshing = (async () => {
    try {
      const res = await fetch(REFRESH_URL, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        setAccessToken(null);
        return false;
      }
      const data = await res.json().catch(() => ({}));
      const t = data?.accessToken || null;
      setAccessToken(t);
      return !!t;
    } catch {
      setAccessToken(null);
      return false;
    } finally {
      _refreshing = null;
    }
  })();

  return _refreshing;
}

/* ---------- Public auth actions ---------- */
export async function login(payload) {
  const data = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload || {}),
  }).then((r) => r.json());

  if (data?.accessToken) setAccessToken(data.accessToken);
  return data;
}

export async function logout() {
  try {
    await fetch(LOGOUT_URL, { method: "POST", credentials: "include" });
  } catch {}
  setAccessToken(null);
}

export const me = () => api.get("/api/auth/me");
export const changePassword = (body) => api.post("/api/auth/change-password", body);

export async function forgotPassword(email) {
  return api.post("/api/auth/forgot", { email });
}

export async function resetPassword(token, newPassword) {
  return api.post("/api/auth/reset", { token, password: newPassword });
}