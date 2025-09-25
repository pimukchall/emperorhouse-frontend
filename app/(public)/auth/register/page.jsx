"use client";

import { useRouter } from "next/navigation";
import RegisterDialog from "@/app/(public)/auth/register/_components/RegisterDialog";

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <RegisterDialog
        open={true}
        onClose={() => router.replace("/login")}
      />
    </div>
  );
}
