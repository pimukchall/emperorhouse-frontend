"use client";

import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function AuthFallbackCard() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <BackgroundGradient className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          ไม่พบข้อมูลผู้ใช้
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          กรุณาเข้าสู่ระบบใหม่เพื่อเข้าถึงหน้าโปรไฟล์
        </p>
        <Link
          href="/auth/login"
          className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          ไปที่หน้าเข้าสู่ระบบ
        </Link>
      </BackgroundGradient>
    </div>
  );
}
