// api/auth.js
import { api, configureApi } from "./index.js";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
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
        credentials: "include", // รับ/ส่ง httpOnly refresh cookie
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
  // รับเฉพาะ username + password ให้ตรงกับ backend
  const body = {
    username: payload?.username ?? "",
    password: payload?.password ?? "",
  };

  const res = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ต้อง include เพื่อรับ refresh cookie
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (res.ok && data?.accessToken) setAccessToken(data.accessToken);
  else if (!res.ok) {
    // เคลียร์ token กรณี login fail
    setAccessToken(null);
  }
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

// รองรับทั้ง email หรือ username -> map เป็น emailOrUsername ให้ backend ใช้ตัวเดียว
export async function forgotPassword(input) {
  const emailOrUsername =
    typeof input === "string"
      ? input
      : input?.email || input?.username || "";

  return api.post("/api/auth/forgot", { emailOrUsername });
}

export async function resetPassword(token, newPassword) {
  return api.post("/api/auth/reset", { token, password: newPassword });
}
