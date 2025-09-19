"use client";
import { forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const StatefulButton = forwardRef(function StatefulButton(
  {
    loading = false,
    loadingText = "Loading...",
    disabled,
    className,
    children,
    ...rest // ← จะไม่มี loading ติดไปใน DOM แล้ว
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      type="button"
      {...rest}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-loading={loading ? "" : undefined}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm transition",
        isDisabled ? "opacity-70" : "",
        className
      )}
      whileTap={!isDisabled ? { scale: 0.985 } : undefined}
    >
      {loading ? loadingText : children}
    </motion.button>
  );
});

export default StatefulButton;
