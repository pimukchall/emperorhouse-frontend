"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { Home, Info, Wrench, Mail, MessageSquare, Code, ChevronDown, NotebookPen } from "lucide-react";
import { DesktopNavItem } from "./NavItem";
import { cn } from "@/lib/cn";

export function NavLinks({ isHrManager, isHrHrm, isAdmin = false }) {
  const base = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "#about", icon: Info },
    { label: "Services", href: "#services", icon: Wrench },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <div className="ml-10 flex items-center gap-6">
      {base.map((item) => (
        <DesktopNavItem key={item.href} item={item} />
      ))}

      {(isHrManager || isHrHrm || isAdmin) && <HrmDropdown />}
      {isAdmin && <DevDropdown />}
    </div>
  );
}

function HrmDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const menuId = "hrm-menu";

  const handleOpen = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={cn(
          "relative flex items-center gap-1 transition group",
          "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
        )}
      >
        <MessageSquare className="h-4 w-4" />
        HRM
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={menuId}
        role="menu"
        className={`absolute left-0 z-50 mt-2 min-w-[180px] rounded-xl border bg-white shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:border-white/10 dark:ring-white/10 transition-all duration-150
        ${open ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-1 opacity-0"}`}
      >
        <DropdownItem href="/admin/hrm/lineoa" icon={MessageSquare} label="LineOA" />
      </div>
    </div>
  );
}

function DevDropdown(){
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const menuId = "dev-menu";

  const handleOpen = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={cn(
          "relative flex items-center gap-1 transition group",
          "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
        )}
      >
        <Code className="h-4 w-4" />
        Dev
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={menuId}
        role="menu"
        className={`absolute left-0 z-50 mt-2 min-w-[180px] rounded-xl border bg-white shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:border-white/10 dark:ring-white/10 transition-all duration-150
        ${open ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-1 opacity-0"}`}
      >
        <DropdownItem href="/dev/worklog" icon={NotebookPen} label="Daily report" />
      </div>
    </div>
  );
}

function DropdownItem({ href, icon: Icon, label, onClick }) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none dark:text-neutral-200 dark:hover:bg-white/5 dark:focus:bg-white/5"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}
