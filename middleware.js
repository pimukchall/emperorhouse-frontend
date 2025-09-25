// middleware.js
import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";
import { findRule, isAdmin, userDeptCodes, userRank, LEVEL_RANK } from "@/access/rules";

// ดึง /auth/me โดยส่ง cookie จากผู้ใช้
async function getMe(req) {
  try {
    const data = await apiFetch("/auth/me", {
      headers: {
        cookie: req.headers.get("cookie") || "",
        accept: "application/json",
      },
    });
    return data; // { ok, isAuthenticated, user }
  } catch { return null; }
}

function redirectLogin(req) {
  const url = new URL(req.url);
  const to = new URL("/auth/login", req.url);
  to.searchParams.set("callbackUrl", url.pathname + url.search);
  return NextResponse.redirect(to);
}

export async function middleware(req) {
  const { pathname } = new URL(req.url);

  // ตรวจเฉพาะ path ที่เรามีกฎ
  const rule = findRule(pathname);
  if (!rule) return NextResponse.next();

  // 1) ต้องล็อกอินก่อน
  const me = await getMe(req);
  if (!me?.isAuthenticated) return redirectLogin(req);
  const user = me.user;

  // 2) admin ผ่านหมด
  if (isAdmin(user)) return NextResponse.next();

  // 3) ตรวจตาม require (แผนก/ตำแหน่ง)
  const require = rule.require || {};
  const codes = userDeptCodes(user);
  const rank  = userRank(user);

  if (Array.isArray(require.deptAny) && require.deptAny.length) {
    const ok = require.deptAny.some(c => codes.has(String(c).toUpperCase()));
    if (!ok) return NextResponse.redirect(new URL("/403", req.url));
  }
  if (Array.isArray(require.deptAll) && require.deptAll.length) {
    const ok = require.deptAll.every(c => codes.has(String(c).toUpperCase()));
    if (!ok) return NextResponse.redirect(new URL("/403", req.url));
  }
  if (require.minRank) {
    const need = LEVEL_RANK[String(require.minRank).toUpperCase()] || 0;
    if (rank < need) return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/hr/:path*",
    "/approvals/:path*",
    "/evals/:path*",
    "/profile/:path*",
  ],
};
