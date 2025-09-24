// src/middleware.js
// ปกป้องเส้นทาง /admin/** ด้วย JWT ผ่านคุกกี้ httpOnly (มี refresh อัตโนมัติ)
// หมายเหตุ: middleware รันฝั่ง Edge — ใช้ fetch() พร้อมส่ง cookie จาก req

import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const LEVEL_RANK = { STAF: 1, SVR: 2, ASST: 3, MANAGER: 4, MD: 5 };

function ieq(a, b) {
  return String(a || "").toLowerCase() === String(b || "").toLowerCase();
}
function hasAdmin(user) {
  return ieq(user?.role?.name || user?.roleName, "admin");
}
function inHR(user) {
  // พิจารณาจาก primary department code (หรือจาก list departments)
  const code =
    user?.primaryUserDept?.department?.code ||
    user?.primaryDeptCode ||
    (Array.isArray(user?.departments) ? user.departments[0]?.code : "") ||
    "";
  return ieq(code, "HR");
}
function isManagerOrAbove(user) {
  const lvl =
    user?.primaryUserDept?.positionLevel ||
    user?.primaryLevel ||
    user?.positionLevel ||
    "";
  const r = LEVEL_RANK[String(lvl).toUpperCase()] || 0;
  return r >= LEVEL_RANK.ASST; // หากต้องการเข้มกว่านี้ ใช้ LEVEL_RANK.MANAGER
}

async function fetchWithCookies(url, req, init = {}) {
  const headers = new Headers(init.headers || {});
  // forward cookies ทั้งหมดไป backend
  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);
  headers.set("accept", "application/json");

  const res = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  // พยายาม parse json; ถ้าไม่ใช่ json ก็คืน text ไป
  let data = null;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    data = await res.json().catch(() => null);
  } else {
    try { data = await res.text(); } catch { data = null; }
  }

  return { res, data };
}

export async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname || "/";

  // ปกป้องเฉพาะ /admin/**
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 1) ลอง /auth/me ก่อน
  let { res: meRes, data: meData } = await fetchWithCookies(`${API_BASE}/auth/me`, req);

  // 2) ถ้า 401 → ลอง refresh แล้วค่อย me อีกครั้ง
  if (meRes.status === 401) {
    await fetchWithCookies(`${API_BASE}/auth/refresh`, req, { method: "POST" });
    ({ res: meRes, data: meData } = await fetchWithCookies(`${API_BASE}/auth/me`, req));
  }

  // 3) ยังไม่ผ่าน → ส่งไป /login?callbackUrl=...
  if (!meRes.ok || !meData?.isAuthenticated) {
    const redirect = new URL("/login", req.url);
    redirect.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirect);
  }

  const user = meData.user;

  // 4) ตรวจสิทธิ์: admin หรือ (HR + manager ขึ้นไป)
  const allowed = hasAdmin(user) || (inHR(user) && isManagerOrAbove(user));
  if (!allowed) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // 5) อนุญาตผ่าน
  return NextResponse.next();
}

// กำหนด matcher เฉพาะเส้นทางที่ต้องป้องกัน
export const config = {
  matcher: ["/admin/:path*"],
};
