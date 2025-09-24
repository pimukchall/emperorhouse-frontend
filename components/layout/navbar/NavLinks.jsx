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
import { useAuth, hasRole } from "@/providers/local-auth";

/** ===== utils ในไฟล์นี้ ===== */
const LEVEL_RANK = { STAF: 1, SVR: 2, ASST: 3, MANAGER: 4, MD: 5 };
function inDepartment(user, code) {
  const target = String(code || "").toUpperCase();
  const primary =
    user?.primaryUserDept?.department?.code ||
    user?.primaryDeptCode ||
    "";
  if (String(primary).toUpperCase() === target) return true;
  const list = Array.isArray(user?.departments) ? user.departments : [];
  return list.some((d) => String(d?.code || "").toUpperCase() === target);
}
function isManagerOrAbove(user) {
  const lvl =
    user?.primaryUserDept?.positionLevel ||
    user?.primaryLevel ||
    user?.positionLevel ||
    "";
  const r = LEVEL_RANK[String(lvl).toUpperCase()] || 0;
  return r >= LEVEL_RANK.ASST; // ปรับเป็น MANAGER ถ้าต้องเข้มขึ้น
}

/** สิทธิ์เข้า HR:
 * - admin → ผ่าน
 * - หรือ แผนก HR
 */
function canAccessHR(user) {
  if (hasRole(user, "admin")) return true;
  if (!inDepartment(user, "HR")) return false;
  return true;
}

/** สิทธิ์เข้า Admin:
 * - admin → ผ่าน
 * - หรือ แผนก HR และ manager ขึ้นไป
 */
function canAccessAdmin(user) {
  if (hasRole(user, "admin")) return true;
  return inDepartment(user, "HR") && isManagerOrAbove(user);
}

export function NavLinks() {
  const { user } = useAuth();

  const base = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "#about", icon: Info },
    { label: "Services", href: "#services", icon: Wrench },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  const showHR = canAccessHR(user);
  const showAdmin = canAccessAdmin(user);

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
        <DropdownItem href="/evals"        icon={ClipboardList} label="งานของฉัน" />
        <DropdownItem href="/approvals"    icon={ClipboardList} label="Approvals" />
        <DropdownItem href="/hr/reports"   icon={BarChart3}     label="รายงาน HR" />

        <div className="my-1 border-t border-neutral-200 dark:border-white/10" />

        <DropdownItem href="/admin/hr/lineoa" icon={MessageSquare} label="LineOA" />
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
          "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
        )}
      >
        <Shield className="h-4 w-4" />
        Admin
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={menuId}
        role="menu"
        className={`absolute left-0 z-50 mt-2 min-w-[200px] rounded-xl border bg-white shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:border-white/10 dark:ring-white/10 transition-all duration-150
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
      className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none dark:text-neutral-200 dark:hover:bg-white/5 dark:focus:bg-white/5"
      onClick={onClick}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{label}</span>
    </Link>
  );
}
