"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import StatefulButton from "@/components/ui/stateful-button";
import { NavLinks } from "./NavLinks"; // ถ้าไฟล์นี้ export default ให้เปลี่ยนเป็น: import NavLinks from "./NavLinks";
import AvatarButton from "./AvatarButton";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/cn";
import { useAuth } from "@/providers/local-auth";
import { isRole } from "@/providers/local-auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [avatarVersion, setAvatarVersion] = useState(0); // cache-busting

  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  // เช็ค role จาก DB
  const hr = isRole(user, "hr.manager");
  const hrHrm = isRole(user, "hr.hrm");
  const admin = isRole(user, "admin");

  // อัปเดต version เมื่อ avatarPath เปลี่ยน
  useEffect(() => {
    if (user?.avatarPath) setAvatarVersion(Date.now());
  }, [user?.avatarPath]);

  async function handleSignOut() {
    try {
      setSigningOut(true);
      await signOut();
      router.push("/login");
    } finally {
      setSigningOut(false);
    }
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
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">EMP</Link>

        {/* Desktop Nav */}
        <div className="hidden w-full items-center lg:flex">
          {/* Left: Nav links */}
          <NavLinks isHrManager={hr} isHrHrm={hrHrm} isAdmin={admin} />

          {/* Right: Avatar + Theme + Auth */}
          <div className="ml-auto flex items-center gap-3">
            {user && (
              <AvatarButton
                name={user?.name}
                email={user?.email}
                userId={user?.id}
                version={avatarVersion}
              />
            )}

            <ThemeToggle />

            {loading ? (
              <div className="h-9 w-28 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            ) : user ? (
              <StatefulButton
                className="h-9 rounded-full"
                loading={signingOut}
                loadingText="Signing out..."
                onClick={handleSignOut}
              >
                Sign Out
              </StatefulButton>
            ) : (
              <Button
                className="h-9 rounded-full"
                onClick={() => router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </nav>
  );
}
