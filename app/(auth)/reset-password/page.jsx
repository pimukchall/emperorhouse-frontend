"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ResetPasswordDialog from "@/components/modal/ResetPasswordDialog";

export default function ResetPasswordPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const token = sp.get("token") || "";

  return (
    <div className="min-h-screen">
      <ResetPasswordDialog
        open={true}
        token={token}
        onClose={() => router.replace("/login")}
      />
    </div>
  );
}
