import { apiFetch } from "@/api";

export async function forgotPassword(email) {
  return apiFetch("/api/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}
export async function resetPassword({ code, newPassword }) {
  return apiFetch("/api/auth/reset-password", {
    method: "POST",
    body: { code, newPassword },
  });
}
export async function changePassword({ currentPassword, newPassword }) {
  return apiFetch("/api/auth/change-password", {
    method: "POST",
    body: { currentPassword, newPassword },
  });
}
