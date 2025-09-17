"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MobileNavItem } from "./NavItem";
import { Home, Info, Wrench, Mail, MessageSquare, Code, ChevronDown, FileText } from "lucide-react";
import AvatarButton from "./AvatarButton";
import { Button } from "@/components/ui/button";
import StatefulButton from "@/components/ui/stateful-button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/local-auth";

function Group({ id, label, Icon, open, onToggle, items, onItemClick }) {
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-group`}
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg_WHITE/5"
      >
        <span className="flex items-center gap-3">
          <Icon className="h-5 w-5" />
          {label}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-group`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="ml-8 mt-1 flex flex-col gap-1 border-l border-black/10 pl-3 dark:border-white/10">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onItemClick}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg_WHITE/5"
                >
                  <it.icon className="h-5 w-5" />
                  {it.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileMenu({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const [hrmOpen, setHrmOpen] = useState(false);
  const [devOpen, setDevOpen] = useState(false);

  if (!open) return null;

  const roles = user?.roles ?? [];
  const isHrManager = roles.some((r) => /^(hr\.manager)$/i.test(r));
  const isHrHrm = roles.some((r) => /^(hr\.hrm)$/i.test(r));
  const isAdmin = roles.some((r) => /^(admin)$/i.test(r));

  const base = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "#about", icon: Info },
    { label: "Services", href: "#services", icon: Wrench },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  const toggleGroup = (key) => {
    if (key === "hrm") {
      setHrmOpen((v) => {
        const next = !v;
        if (next) setDevOpen(false);
        return next;
      });
    } else {
      setDevOpen((v) => {
        const next = !v;
        if (next) setHrmOpen(false);
        return next;
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0, y: -6 }}
        animate={{ opacity: 1, height: "auto", y: 0 }}
        exit={{ opacity: 0, height: 0, y: -6 }}
        transition={{ duration: 0.22 }}
        className="lg:hidden overflow-hidden bg-white dark:bg-neutral-900 shadow-xl border border-black/10 dark:border_WHITE/10 rounded-2xl mx-3 mt-2"
      >
        <div className="flex flex-col p-4 gap-1">
          {base.map((item) => (
            <MobileNavItem key={item.href} item={item} onClick={onClose} />
          ))}

          {(isHrManager || isHrHrm || isAdmin) && (
            <Group
              id="hrm-mobile"
              label="HRM"
              Icon={MessageSquare}
              open={hrmOpen}
              onToggle={() => toggleGroup("hrm")}
              onItemClick={onClose}
              items={[{ label: "LineOA", href: "/admin/hrm/lineoa", icon: MessageSquare }]}
            />
          )}

          {isAdmin && (
            <Group
              id="dev-mobile"
              label="Dev"
              Icon={Code}
              open={devOpen}
              onToggle={() => toggleGroup("dev")}
              onItemClick={onClose}
              items={[{ label: "Daily report", href: "/dev/worklog", icon: FileText }]}
            />
          )}

          <div className="my-2 h-px bg-black/10 dark:bg_WHITE/10" />

          <div className="mt-2 space-y-3">
            <div className="flex flex-col gap-3 rounded-xl bg-black/5 px-3 py-2 dark:bg_WHITE/5">
              {user && (
                <div className="flex items-center gap-3">
                  <AvatarButton
                    name={user.name}
                    email={user.email}
                    photo={user.photo}
                    onClick={onClose}
                  />
                  <div className="min-w-0">
                    <Link
                      href="/account"
                      onClick={onClose}
                      className="block truncate text-sm font-medium text-gray-900 hover:underline dark:text-gray-100"
                    >
                      {user.name || user.email}
                    </Link>
                    <div className="truncate text-xs text-gray-500 dark:text-gray-400">Account</div>
                  </div>
                </div>
              )}

              <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {user ? user.email : "พร้อมใช้งาน"}
              </div>

              {loading ? (
                <div className="h-9 w-full animate-pulse rounded-full bg-black/10 dark:bg_WHITE/10" />
              ) : user ? (
                <StatefulButton
                  className="h-9 w-full rounded-full"
                  loadingText="Signing out..."
                  onClick={() => signOut().then(() => { onClose(); router.push("/login"); })}
                >
                  Sign Out
                </StatefulButton>
              ) : (
                <Button
                  className="h-9 w-full rounded-full"
                  onClick={() => {
                    onClose();
                    router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
                  }}
                >
                  Get Started
                </Button>
              )}
            </div>

            <div className="px-3">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="h-3" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
      </motion.div>
    </AnimatePresence>
  );
}
