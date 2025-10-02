"use client";

import { useRouter } from "next/navigation";
import ForgotPasswordDialog from "@/components/auth/dialogs/ForgotPasswordDialog";

export default function ForgotPasswordPage() {
  const router = useRouter();
  return (
    <div className="min-h-[40vh]">
      <ForgotPasswordDialog
        open={true}
        onOpenChange={(v) => {
          if (!v) router.replace("/auth/login");
        }}
      />
    </div>
  );
}
