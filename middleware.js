import { NextResponse } from "next/server";

/** ใช้ absolute URL ของ API จาก ENV โดยตรงใน middleware */
const API_BASE = process.env.API_BASE_URL || "http://localhost:4000";

/** เทียบแบบไม่แคร์ตัวพิมพ์ */
function ieq(a, b) { return String(a || "").toLowerCase() === String(b || "").toLowerCase(); }
function hasAdmin(user) {
  const rn = user?.role?.name || user?.roleName || "";
  return ieq(rn, "admin");
}
function inHR(user) {
  const code =
    user?.department?.code ||
    user?.deptCode ||
    user?.departmentCode ||
    user?.primaryUserDept?.department?.code ||
    user?.primaryDeptCode ||
    "";
  return ieq(code, "hr");
}
function isManager(user) {
  const rn = user?.role?.name || user?.roleName || "";
  return ieq(rn, "manager");
}

export async function middleware(req) {
  const url = new URL(req.url);

  // ตรวจเฉพาะ /admin/**
  if (!url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // forward cookie ของผู้ใช้ไป API
  const cookieHeader = (req.headers.get("cookie") || "").toString();

  const callApi = async (path) => {
    try {
      return await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { cookie: cookieHeader },
        // @ts-ignore
        credentials: "include",
        cache: "no-store",
      });
    } catch {
      return null;
    }
  };

  const getApi = async (path) => {
    try {
      return await fetch(`${API_BASE}${path}`, {
        method: "GET",
        headers: { cookie: cookieHeader },
        // @ts-ignore
        credentials: "include",
        cache: "no-store",
      });
    } catch {
      return null;
    }
  };

  // 1) ลอง /auth/me ก่อน
  let meRes = await getApi("/auth/me");

  // 2) ถ้า 401 → ลอง refresh แล้วเรียก me ใหม่
  if (!meRes || meRes.status === 401) {
    const refRes = await callApi("/auth/refresh");
    if (refRes && refRes.ok) {
      meRes = await getApi("/auth/me");
    }
  }

  // 3) ยังไม่ ok → เด้งไป /login
  if (!meRes || !meRes.ok) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", url.pathname + url.search);
    return NextResponse.redirect(login);
  }

  // 4) อ่าน user
  const meJson = await meRes.json().catch(() => ({}));
  const user = meJson?.user;
  const authed = meJson?.isAuthenticated ?? !!user;

  if (!authed || !user) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", url.pathname + url.search);
    return NextResponse.redirect(login);
  }

  // 5) เช็คสิทธิ์: admin หรือ (hr + manager)
  const allowed = hasAdmin(user) || (inHR(user) && isManager(user));
  if (!allowed) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
