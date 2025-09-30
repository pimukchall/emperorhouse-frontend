"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ResetPasswordDialog from "@/domains/auth/components/ResetPasswordDialog";

export default function ResetPasswordPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const token = sp.get("token") || "";

  return (
    <div className="min-h-[40vh]">
      <ResetPasswordDialog
        open={true}
        token={token}
        onClose={() => router.replace("/auth/login")}
      />
    </div>
  );
}
