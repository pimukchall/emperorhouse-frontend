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
import { cn } from "@/lib/cn";
import { useAuth } from "@/providers/local-auth";

function has(roles, name) {
  return Array.isArray(roles) && roles.some((r) => new RegExp(`^(${name})$`, "i").test(r));
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const hr = has(user?.roles, "hr\\.manager");
  const hrHrm = has(user?.roles, "hr\\.hrm");
  const admin = has(user?.roles, "admin");

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
        <div className="hidden lg:flex items-center w-full">
          {/* Left: Nav links */}
          <NavLinks isHrManager={hr} isHrHrm={hrHrm} isAdmin={admin} />

          {/* Right: Avatar + Theme + Auth */}
          <div className="ml-auto flex items-center gap-3">
            {user && (
              <AvatarButton
                name={user.name}
                email={user.email}
                photo={user.photo}
              />
            )}

            <ThemeToggle />

            {loading ? (
              <div className="h-9 w-28 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            ) : user ? (
              <StatefulButton
                className="h-9 rounded-full"
                loadingText="Signing out..."
                onClick={() => signOut().then(() => router.push("/login"))}
              >
                Sign Out
              </StatefulButton>
            ) : (
              <Button
                className="h-9 rounded-full"
                onClick={() =>
                  router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
                }
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
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg白/10"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </nav>
  );
}
