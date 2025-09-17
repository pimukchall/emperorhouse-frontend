"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XCircle, X } from "lucide-react";

export default function ErrorDialog({ open, title = "เกิดข้อผิดพลาด", message, detail, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto mt-24 w-[min(92vw,520px)] rounded-2xl border border-red-200 bg-white p-5 shadow-xl dark:border-red-900/40 dark:bg-neutral-950"
            initial={{ y: 12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="min-w-0">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
                {message && <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 break-words">{message}</p>}
                {detail && (
                  <pre className="mt-3 max-h-48 overflow-auto rounded-md bg-red-50 p-3 text-xs text-red-800 dark:bg-red-950/40 dark:text-red-200 whitespace-pre-wrap">
                    {detail}
                  </pre>
                )}
              </div>
              <button
                onClick={onClose}
                className="ml-auto grid h-8 w-8 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
