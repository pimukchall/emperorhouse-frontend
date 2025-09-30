import { NextResponse } from "next/server";

const ENV_COOKIES = (process.env.NEXT_PUBLIC_AUTH_COOKIES || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const DEFAULT_COOKIES = ["sid", "access_token", "accessToken", "jwt", "token", "refresh_token"];
const AUTH_COOKIES = [...new Set([...ENV_COOKIES, ...DEFAULT_COOKIES])];

function hasAnyAuthCookie(req) {
  return AUTH_COOKIES.some((name) => {
    const v = req.cookies.get(name)?.value;
    return v && String(v).length > 10;
  });
}

export function middleware(req) {
  if (hasAnyAuthCookie(req)) return NextResponse.next();

  const url = new URL(req.url);
  const to = new URL("/auth/login", req.url);
  to.searchParams.set("redirect", url.pathname + url.search);
  return NextResponse.redirect(to);
}

export const config = {
  matcher: ["/admin/:path*", "/hr/:path*", "/approvals/:path*", "/me/:path*", "/dashboard/:path*"],
};