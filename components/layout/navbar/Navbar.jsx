"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import StatefulButton from "@/components/ui/stateful-button";
import { NavLinks } from "./NavLinks";
import AvatarButton from "./AvatarButton";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { useConfirm } from "@/hooks/useConfirm";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const { confirm, dialog } = useConfirm();

  async function handleSignOut() {
    const ok = await confirm({
      title: "ออกจากระบบ",
      description: "คุณต้องการออกจากระบบใช่ไหม?",
      confirmText: "ออกจากระบบ",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        await signOut();
      },
    });
    if (ok) router.push("/auth/login");
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "backdrop-blur-md shadow-sm",
        "bg-gradient-to-r from-white/80 to-gray-100/80 dark:from-black/60 dark:to-gray-900/60"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="text-xl font-bold">
          EMP
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center w-full">
          <NavLinks />
          <div className="ml-auto flex items-center gap-3">
            {user && (
              <AvatarButton
                name={user?.name}
                email={user?.email}
                fetchUrl={user?.id ? `/api/files/user/avatar/${user.id}` : undefined}
              />
            )}
            <ThemeToggle />
            {loading ? (
              <div className="h-9 w-28 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            ) : user ? (
              <StatefulButton
                className="h-9 rounded-full"
                loadingText="กำลังออกจากระบบ..."
                onClick={handleSignOut}
              >
                ออกจากระบบ
              </StatefulButton>
            ) : (
              <Button
                className="h-9 rounded-full"
                onClick={() =>
                  router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname || "/")}`)
                }
              >
                เข้าสู่ระบบ
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />

      {/* โมดัลยืนยัน */}
      {dialog}
    </nav>
  );
}
