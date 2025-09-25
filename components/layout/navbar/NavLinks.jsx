// src/components/NavLinks.jsx
"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import {
  Home,
  Info,
  Wrench,
  Mail,
  MessageSquare,
  ChevronDown,
  Shield,
  Building2,
  Users,
  ClipboardList,
  BarChart3,
} from "lucide-react";
import { DesktopNavItem } from "./NavItem";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/local-auth";

// ใช้กฎ/ตัวช่วยเดียวกับ middleware
import { findRule, isAdmin, userDeptCodes, userRank, LEVEL_RANK } from "@/access/rules";

// canVisit (UI) — คิดจากกฎกลางแบบเดียวกับ middleware
function canVisit(path, user) {
  if (!user) return false;
  if (isAdmin(user)) return true;
  const rule = findRule(path);
  if (!rule) return true; // ไม่มีข้อกำหนด = ผ่าน
  const { require = {} } = rule;
  const codes = userDeptCodes(user);
  const rank  = userRank(user);

  if (require.deptAny?.length && !require.deptAny.some(c => codes.has(String(c).toUpperCase()))) return false;
  if (require.deptAll?.length && !require.deptAll.every(c => codes.has(String(c).toUpperCase()))) return false;
  if (require.minRank) {
    const need = LEVEL_RANK[String(require.minRank).toUpperCase()] || 0;
    if (rank < need) return false;
  }
  return true;
}

export function NavLinks() {
  const { user } = useAuth();

  const base = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "#about", icon: Info },
    { label: "Services", href: "#services", icon: Wrench },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  const showHR = !!user && canVisit("/hr", user);
  const showAdmin = !!user && canVisit("/admin", user);

  return (
    <div className="ml-10 flex items-center gap-6">
      {base.map((item) => (
        <DesktopNavItem key={item.href} item={item} />
      ))}

      {showHR && <HrDropdown />}
      {showAdmin && <AdminDropdown />}
    </div>
  );
}

/* ===== HR dropdown ===== */
function HrDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const menuId = "hr-menu";

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
        HR
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={menuId}
        role="menu"
        className={`absolute left-0 z-50 mt-2 min-w-[180px] rounded-xl border bg-white shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:border-white/10 dark:ring-white/10 transition-all duration-150
        ${open ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-1 opacity-0"}`}
      >
        <DropdownItem href="/evals" icon={ClipboardList} label="งานของฉัน" />
        <DropdownItem href="/approvals" icon={ClipboardList} label="Approvals" />
        <DropdownItem href="/hr/cycles" icon={ClipboardList} label="กำหนดรอบประเมิน" />
        <DropdownItem href="/hr/reports/evaluations" icon={BarChart3} label="ดูรายงานประเมิน" />

        <div className="my-1 border-t border-neutral-200 dark:border-white/10" />

        {/* เปลี่ยน path ให้ HR ใช้โซน /hr/ ไม่ใช่ /admin/hr/ */}
        <DropdownItem href="/hr/lineoa" icon={MessageSquare} label="LineOA" />
      </div>
    </div>
  );
}

/* ===== Admin dropdown ===== */
function AdminDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const menuId = "admin-menu";

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
          "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text:white"
        )}
      >
        <Shield className="h-4 w-4" />
        Admin
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={menuId}
        role="menu"
        className={`absolute left-0 z-50 mt-2 min-w-[200px] rounded-xl border bg-white shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:border-white/10 dark:ring:white/10 transition-all duration-150
        ${open ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-1 opacity-0"}`}
      >
        <DropdownItem href="/admin/departments"  icon={Building2} label="Departments" />
        <DropdownItem href="/admin/roles"        icon={Shield}    label="Roles" />
        <DropdownItem href="/admin/users"        icon={Users}     label="Users" />
        <DropdownItem href="/admin/contacts"     icon={Mail}      label="Contacts" />
        <DropdownItem href="/admin/organizations" icon={ClipboardList} label="Organizations" />
      </div>
    </div>
  );
}

function DropdownItem({ href, icon: Icon, label, onClick }) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none dark:text-neutral-200 dark:hover:bg:white/5 dark:focus:bg:white/5"
      onClick={onClick}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{label}</span>
    </Link>
  );
}
