"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function ForbiddenPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth(); // มี user = ล็อกอินอยู่ / null = ไม่ได้ล็อกอิน

  async function handleSignIn() {
    try {
      if (user) {
        // ล็อกอินอยู่แต่ไม่มีสิทธิ์ → ออกก่อน
        await signOut();
      }
    } catch {
      // ignore
    } finally {
      router.push(`/api/auth/login?callbackUrl=${encodeURIComponent(pathname || "/")}`);
    }
  }

  return (
    <AuroraBackground className="pointer-events-none">
      <div className="pointer-events-auto relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-7xl font-extrabold tracking-tight text-black dark:text-white">
          403
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-300">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้ (Forbidden).
          <br />
          {user
            ? "กรุณาเข้าสู่ระบบด้วยบัญชีที่มีสิทธิ์"
            : "กรุณาเข้าสู่ระบบก่อน"}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* ปุ่มกลับหน้า Home */}
          <Button asChild className="rounded-full px-6 py-2">
            <Link href="/">Go Home</Link>
          </Button>

          {/* ปุ่ม Sign In: ถ้า login อยู่จะ logout ก่อน แล้วค่อยไปหน้า login */}
          <Button
            variant="outline"
            className="rounded-full px-6 py-2"
            onClick={handleSignIn}
          >
            {user ? "ออกจากระบบ" : "เข้าสู่ระบบ"}
          </Button>
        </div>

        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          ต้องการสิทธิ์เพิ่ม? ติดต่อผู้ดูแลระบบ
        </p>
      </div>
    </AuroraBackground>
  );
}
