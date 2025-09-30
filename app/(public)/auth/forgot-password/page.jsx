"use client";

import { useRouter } from "next/navigation";
import ForgotPasswordDialog from "@/domains/auth/components/ForgotPasswordDialog";

export default function ForgotPasswordPage() {
  const router = useRouter();
  return (
    <div className="min-h-[40vh]">
      <ForgotPasswordDialog
        open={true}
        onClose={() => router.replace("/auth/login")}
      />
    </div>
  );
}
