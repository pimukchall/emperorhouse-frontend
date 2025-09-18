"use client";

import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <AuroraBackground className="pointer-events-none">
      <div className="pointer-events-auto relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-7xl font-extrabold tracking-tight text-black dark:text-white">
          404
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-300">
          หน้าที่คุณกำลังค้นหาไม่พบ (Not Found).<br />
          โปรดตรวจสอบ URL หรือกลับไปยังหน้าหลัก
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="rounded-full px-6 py-2">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </AuroraBackground>
  );
}
