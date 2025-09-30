"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { DesktopNavItem } from "./NavItem";
import { cn } from "@/lib/utils";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { BASE_LINKS, visibleCategories } from "@/config/routes";
import { ChevronDown } from "lucide-react";

export function NavLinks() {
  const { user } = useAuth();
  const categories = visibleCategories(user);

  return (
    <div className="ml-10 flex items-center gap-6">
      {BASE_LINKS.map((item) => (
        <DesktopNavItem key={item.href} item={item} />
      ))}

      {categories.map((cat) => (
        <CategoryDropdown key={cat.id} category={cat} />
      ))}
    </div>
  );
}

function CategoryDropdown({ category }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const menuId = `${category.id}-menu`;

  const handleOpen = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  const Icon = category.icon;

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
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {category.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={menuId}
        role="menu"
        className={`absolute left-0 z-50 mt-2 min-w-[200px] rounded-xl border bg-white shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:border-white/10 dark:ring-white/10 transition-all duration-150
        ${open ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-1 opacity-0"}`}
      >
        {category.links.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            role="menuitem"
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none dark:text-neutral-200 dark:hover:bg-white/5 dark:focus:bg-white/5"
          >
            {it.icon ? <it.icon className="h-4 w-4" /> : null}
            <span>{it.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
