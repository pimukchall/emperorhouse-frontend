"use client";

import { useRouter } from "next/navigation";
import RegisterDialog from "@/domains/auth/components/RegisterDialog";

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="min-h-[40vh]">
      <RegisterDialog
        open={true}
        onClose={() => router.replace("/auth/login")}
      />
    </div>
  );
}
