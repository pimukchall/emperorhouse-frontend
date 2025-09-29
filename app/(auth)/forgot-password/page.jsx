"use client";

import { useRouter } from "next/navigation";
import ForgotPasswordDialog from "@/components/modal/ForgotPasswordDialog";

export default function ForgotPasswordPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <ForgotPasswordDialog
        open={true}
        onClose={() => router.replace("/login")}
      />
    </div>
  );
}
