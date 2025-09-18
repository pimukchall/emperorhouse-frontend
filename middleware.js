import { NextResponse } from "next/server";

/** อ่านค่า BASE ของ API เพื่อเรียก /auth/me */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "http://localhost:4000";

/** helper เทียบ role/department แบบไม่แคร์ตัวพิมพ์ */
function ieq(a, b) {
  return String(a || "").toLowerCase() === String(b || "").toLowerCase();
}
function hasAdmin(user) {
  const rn = user?.role?.name || user?.roleName || "";
  return ieq(rn, "admin");
}
function inHR(user) {
  // รองรับทั้งฟิลด์ที่ตอบกลับมาเป็น object หรือ snapshot จาก session
  const code = user?.department?.code || user?.deptCode || user?.departmentCode || "";
  return ieq(code, "hr");
}
function isManager(user) {
  const rn = user?.role?.name || user?.roleName || "";
  return ieq(rn, "manager");
}

export async function middleware(req) {
  const url = new URL(req.url);

  // ตรวจเฉพาะเส้นทาง /admin/**
  if (!url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // เรียก /auth/me ที่ backend พร้อมส่งคุกกี้จากผู้ใช้ไปด้วย
  const meRes = await fetch(`${API_BASE}/auth/me`, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
    // @ts-ignore (ใน middleware runtime ไม่มี credentials แต่เราส่ง cookie ตรงๆแล้ว)
    credentials: "include",
    cache: "no-store",
  }).catch(() => null);

  if (!meRes || !meRes.ok) {
    // ไม่รู้สถานะ → ให้กลับไป /login
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", url.pathname + url.search);
    return NextResponse.redirect(login);
  }

  const meJson = await meRes.json().catch(() => ({}));
  const user = meJson?.user;
  const authed = meJson?.isAuthenticated ?? !!user;

  if (!authed || !user) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", url.pathname + url.search);
    return NextResponse.redirect(login);
  }

  // สิทธิ์:
  // 1) admin → allowed
  // 2) หรือ HR + manager (เช็คแยก)
  const allowed = hasAdmin(user) || (inHR(user) && isManager(user));
  if (!allowed) {
    // ไปหน้า 403 (ทำเพจเองสั้นๆได้)
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};