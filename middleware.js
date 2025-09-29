import { NextResponse } from "next/server";

// อ่านชื่อคุกกี้จาก ENV (คั่นด้วย ,) เช่น NEXT_PUBLIC_AUTH_COOKIES="sid,access_token"
const ENV_COOKIES = (process.env.NEXT_PUBLIC_AUTH_COOKIES || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// fallback ชื่อยอดนิยม (รวม access + refresh)
const DEFAULT_COOKIES = [
  "sid",
  "access_token",
  "accessToken",
  "jwt",
  "token",
  "refresh_token",
];

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
  const to = new URL("/login", req.url); // หน้า login อยู่ /login
  to.searchParams.set("redirect", url.pathname + url.search);
  return NextResponse.redirect(to);
}

export function middleware(req) {
  const { pathname } = new URL(req.url);

  // ข้ามไฟล์สาธารณะ & หน้า auth กันลูป
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|map)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // เส้นทางที่ต้องล็อกอิน (หลังบ้าน)
  const protectedMatchers = ["/admin", "/hr", "/approvals", "/me"];
  const needAuth = protectedMatchers.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (!needAuth) return NextResponse.next();

  // เช็คจากคุกกี้อย่างเดียว (Edge ไม่ควร fetch ไป BE)
  if (!hasAnyAuthCookie(req)) {
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.NEXT_PUBLIC_ALLOW_NOCOOKIE_DEV === "1"
    ) {
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
