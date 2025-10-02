"use client";
import React from "react";

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

export const Input = React.forwardRef(function Input(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cx(
        "flex h-10 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
        className
      )}
      {...props}
    />
  );
});
