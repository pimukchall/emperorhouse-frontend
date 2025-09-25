// middleware.js
import { NextResponse } from "next/server";

// อ่านชื่อคุกกี้จาก ENV (คั่นด้วย ,) เช่น NEXT_PUBLIC_AUTH_COOKIES="sid,access_token"
const ENV_COOKIES = (process.env.NEXT_PUBLIC_AUTH_COOKIES || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// fallback ชื่อยอดนิยม
const DEFAULT_COOKIES = ["sid", "access_token", "jwt", "token", "refresh_token"];

// สุดท้ายใช้ set รวม
const AUTH_COOKIES = [...new Set([...ENV_COOKIES, ...DEFAULT_COOKIES])];

function hasAnyAuthCookie(req) {
  const cookies = req.cookies;
  if (!cookies) return false;
  for (const name of AUTH_COOKIES) {
    const v = cookies.get(name)?.value;
    if (v && String(v).length > 10) return true;
  }
  return false;
}

function redirectLogin(req) {
  const url = new URL(req.url);
  const to = new URL("/auth/login", req.url); // app/(public)/auth/login/page.jsx
  to.searchParams.set("callbackUrl", url.pathname + url.search);
  return NextResponse.redirect(to);
}

export function middleware(req) {
  const { pathname } = new URL(req.url);

  // ข้ามไฟล์สาธารณะ & หน้า login กันลูป
  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|map)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ตรวจเฉพาะเส้นทางที่ต้องล็อกอิน
  const protectedMatchers = ["/admin/", "/hr/", "/approvals/", "/evals/", "/profile/"];
  const needAuth = protectedMatchers.some((p) => pathname === p || pathname.startsWith(p));
  if (!needAuth) return NextResponse.next();

  // เช็คจากคุกกี้อย่างเดียว (Edge ไม่ควร fetch ไป BE)
  if (!hasAnyAuthCookie(req)) {
    // dev บางเคสคุกกี้โดนตั้ง Path แคบ (เช่น /api/auth) ทำให้ไม่ส่งตอนเรียกหน้าเพจ
    // เพื่อกัน false negative ใน dev: ถ้าอยาก “ปล่อยผ่านชั่วคราว” ให้ตั้ง NEXT_PUBLIC_ALLOW_NOCOOKIE_DEV=1
    if (process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_ALLOW_NOCOOKIE_DEV === "1") {
      return NextResponse.next();
    }
    return redirectLogin(req);
  }

  return NextResponse.next();
}

// ตรวจทุกเส้นทางยกเว้นไฟล์ static/API
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
