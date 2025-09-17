"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function DesktopNavItem({ item }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex items-center gap-1 transition group",
        isActive
          ? "text-black dark:text-white font-semibold"
          : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
      )}
    >
      <motion.span whileHover={{ rotate: -5, scale: 1.1 }} transition={{ duration: 0.2 }}>
        <Icon
          className={cn(
            "w-4 h-4 transition",
            isActive
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white"
          )}
        />
      </motion.span>
      {item.label}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 h-0.5 w-full bg-black dark:bg-white"
        />
      )}
    </Link>
  );
}

export function MobileNavItem({ item, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 transition",
        "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5",
        isActive &&
          "font-semibold text-black dark:text-white relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:bg-black dark:before:bg-white before:-ml-2"
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400")} />
      {item.label}
    </Link>
  );
}
