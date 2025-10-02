"use client";
import React, { createContext, useContext, useEffect } from "react";

const DialogCtx = createContext({ onOpenChange: () => {}, open: false });

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  return (
    <DialogCtx.Provider value={{ onOpenChange, open }}>
      {children}
    </DialogCtx.Provider>
  );
}

export function DialogContent({ className = "", children, ...rest }) {
  const { open, onOpenChange } = useContext(DialogCtx);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div
          className={`w-full max-w-lg rounded-lg bg-white dark:bg-neutral-900 shadow-2xl border dark:border-neutral-800 ${className}`}
          {...rest}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
export function DialogHeader({ className = "", ...props }) {
  return <div className={`border-b px-6 py-4 ${className}`} {...props} />;
}
export function DialogTitle({ className = "", ...props }) {
  return <h2 className={`text-lg font-semibold ${className}`} {...props} />;
}
export function DialogFooter({ className = "", ...props }) {
  return (
    <div
      className={`border-t px-6 py-4 flex justify-end gap-2 ${className}`}
      {...props}
    />
  );
}
export function DialogClose({ asChild, children }) {
  const { onOpenChange } = useContext(DialogCtx);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props?.onClick?.(e);
        onOpenChange(false);
      },
    });
  }
  return (
    <button
      onClick={() => onOpenChange(false)}
      className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm"
    >
      {children || "Close"}
    </button>
  );
}
