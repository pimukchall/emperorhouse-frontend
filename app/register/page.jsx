// app/register/page.jsx
"use client";

import { useRouter } from "next/navigation";
import RegisterDialog from "@/components/modal/RegisterDialog";

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
