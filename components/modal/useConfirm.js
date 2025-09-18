"use client";
import React from "react";
import ConfirmDialog from "./ConfirmDialog";

export function useConfirm() {
  const [state, setState] = React.useState({
    open: false,
    title: "",
    description: "",
    confirmText: "ยืนยัน",
    cancelText: "ยกเลิก",
    loading: false,
    error: null,
    resolve: null,
  });

  const confirm = React.useCallback((opts = {}) => {
    return new Promise((resolve) => {
      setState((s) => ({
        ...s,
        open: true,
        resolve,
        ...opts,
        loading: false,
        error: null,
      }));
    });
  }, []);

  const handleCancel = () => {
    state.resolve?.(false);
    setState((s) => ({ ...s, open: false }));
  };

  const handleConfirm = async () => {
    if (!state.onConfirm) {
      state.resolve?.(true);
      setState((s) => ({ ...s, open: false }));
      return;
    }
    try {
      setState((s) => ({ ...s, loading: true, error: null }));
      await state.onConfirm();
      state.resolve?.(true);
      setState((s) => ({ ...s, open: false, loading: false }));
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : String(e || "เกิดข้อผิดพลาด"),
      }));
    }
  };

  const dialog = (
    <ConfirmDialog
      open={state.open}
      title={state.title}
      description={state.description}
      confirmText={state.confirmText}
      cancelText={state.cancelText}
      loading={state.loading}
      error={state.error}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );

  return { confirm, dialog };
}
