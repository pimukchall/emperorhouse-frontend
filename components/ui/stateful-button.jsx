"use client";

import * as React from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "@/lib/cn";

export default function StatefulButton({
  className,
  children,
  layoutId,
  loadingText,
  successHoldMs = 1200,
  onClick,
  disabled,
  ...buttonProps
}) {
  const [scope, animate] = useAnimate();
  const [busy, setBusy] = React.useState(false);

  const showLoader = () =>
    animate(".loader", { width: 20, scale: 1 }, { duration: 0.2 });
  const hideLoader = () =>
    animate(".loader", { width: 0, scale: 0 }, { duration: 0.2 });
  const flashCheck = async () => {
    await animate(".check", { width: 20, scale: 1 }, { duration: 0.2 });
    await animate(
      ".check",
      { width: 0, scale: 0 },
      { delay: successHoldMs / 1000, duration: 0.2 }
    );
  };

  const handleClick = async (e) => {
    if (!onClick || busy) return;
    setBusy(true);
    try {
      await showLoader();
      await Promise.resolve(onClick(e));
      await hideLoader();
      await flashCheck();
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.button
      ref={scope}
      layout={!!layoutId}
      layoutId={layoutId}
      aria-busy={busy}
      disabled={disabled || busy}
      className={cn(
        // ปุ่มขาว-ดำตามธีม
        "flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full",
        "bg-black text-white px-4 py-2 font-medium ring-offset-2 transition duration-200",
        "hover:bg-neutral-900 hover:ring-2 hover:ring-black",
        "dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:ring-white dark:ring-offset-black",
        disabled || busy ? "opacity-60 pointer-events-none" : "",
        className
      )}
      onClick={handleClick}
      {...Object.fromEntries(
        Object.entries(buttonProps).filter(([key]) => key !== "onDrag")
      )}
    >
      <motion.div
        layout={!!layoutId}
        className={cn(
          "flex items-center justify-center",
          busy && "gap-2"
        )}
      >
        {/* Spinner */}
        <motion.svg
          className="loader"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: busy ? [0, 360] : 0 }}
          initial={{ scale: 0, width: 0 }}
          style={{ scale: 0.5 }}
          transition={{
            duration: 0.3,
            repeat: busy ? Infinity : 0,
            ease: "linear",
          }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 3a9 9 0 1 0 9 9" />
        </motion.svg>

        {/* Check */}
        <motion.svg
          className="check"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ scale: 0, width: 0 }}
          style={{ scale: 0.5 }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 12l2 2l4 -4" />
        </motion.svg>

        <motion.span layout={!!layoutId}>
          {busy ? loadingText ?? children : children}
        </motion.span>
      </motion.div>
    </motion.button>
  );
}