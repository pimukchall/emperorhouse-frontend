// middleware.js
import { NextResponse } from "next/server";

/**
 * Soft guard middleware:
 * - ปล่อยผ่านเสมอ แล้วให้ฝั่ง Client (AuthProvider) เป็นคน refresh/ตรวจสิทธิ์/redirect เอง
 * - เหตุผล: refresh cookie ถูกจำกัด path=/api/auth และ access token อยู่ใน memory จึงตรวจที่ Edge ไม่ได้
 * - ถ้าต้องการ hard guard ค่อยย้ายไปตรวจบน server components หรือมี session ที่อ่านได้ที่ Edge แทน
 */
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/hr/:path*", "/approvals/:path*", "/me/:path*", "/dashboard/:path*"],
};
