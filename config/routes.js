import {
  findRule,
  isAdmin,
  userDeptCodes,
  userRank,
  LEVEL_RANK,
} from "@/access/rules";

import {
  Home, Info, Wrench, Mail, MessageSquare, Shield,
  Building2, Users, ClipboardList, BarChart3, Wallet
} from "lucide-react";

/** ลิงก์พื้นฐาน (ไม่อยู่ในหมวด) */
export const BASE_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "#about", icon: Info },
  { label: "Services", href: "#services", icon: Wrench },
  { label: "Contact", href: "/contact", icon: Mail },
];

/** หมวดหมู่ทั้งหมด (เพิ่ม/ลบ/แก้ได้ที่นี่ที่เดียว) */
export const CATEGORY_REGISTRY = [
  {
    id: "hr",
    label: "HR",
    icon: MessageSquare,
    basePath: "/hr",
    links: [
      { label: "งานของฉัน",        href: "/hr/evals",               icon: ClipboardList },
      { label: "Approvals",         href: "/approvals",              icon: ClipboardList },
      { label: "กำหนดรอบประเมิน",   href: "/hr/cycles",              icon: ClipboardList },
      { label: "ดูรายงานประเมิน",   href: "/hr/reports/evaluations", icon: BarChart3 },
      { label: "LineOA",            href: "/hr/lineoa",              icon: MessageSquare },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    icon: Shield,
    basePath: "/admin",
    links: [
      { label: "Departments",   href: "/admin/departments",   icon: Building2 },
      { label: "Roles",         href: "/admin/roles",         icon: Shield },
      { label: "Users",         href: "/admin/users",         icon: Users },
      { label: "Contacts",      href: "/admin/contacts",      icon: Mail },
      { label: "Organizations", href: "/admin/organizations", icon: ClipboardList },
    ],
  },

  // —— ตัวอย่างหมวดใหม่: Finance ——
  {
    id: "finance",
    label: "Finance",
    icon: Wallet,
    basePath: "/finance",
    links: [
      { label: "ภาพรวมงบประมาณ", href: "/finance/overview" },
      { label: "คำขอเบิกจ่าย",   href: "/finance/requests" },
      { label: "รายงานการเงิน",  href: "/finance/reports" },
    ],
  },
];

/* ===== Helpers: สิทธิ์กลาง ===== */
export function canVisitPath(path, user) {
  if (!user) return false;
  if (isAdmin(user)) return true;

  const rule = findRule(path);
  if (!rule) return true;

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

export function visibleLinks(user, links) {
  return (links || []).filter(it => canVisitPath(it.href, user));
}

export function visibleCategories(user) {
  return CATEGORY_REGISTRY
    .filter(cat => canVisitPath(cat.basePath, user))
    .map(cat => ({ ...cat, links: visibleLinks(user, cat.links) }))
    .filter(cat => cat.links.length > 0);
}