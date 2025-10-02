"use client";

import { useRouter } from "next/navigation";
import RegisterDialog from "@/components/auth/dialogs/RegisterDialog";

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="min-h-[40vh]">
      <RegisterDialog
        open={true}
        onOpenChange={(v) => {
          if (!v) router.replace("/auth/login");
        }}
      />
    </div>
  );
}
