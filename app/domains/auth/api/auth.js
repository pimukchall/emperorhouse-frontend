import { apiFetch } from "@/lib/api";

// ส่งอีเมลเพื่อเริ่ม flow ลืมรหัสผ่าน
export async function forgotPassword(email) {
  return apiFetch("/api/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

// (ถ้าต้องการ) รีเซ็ตรหัสผ่านด้วยโค้ดจากอีเมล
export async function resetPassword({ code, newPassword }) {
  return apiFetch("/api/auth/reset-password", {
    method: "POST",
    body: { code, newPassword },
  });
}