"use client";
import { useCrud } from "@/hooks/useCrud";
import { roleAdapter } from "@/adapters/roleAdapter";

export function useRoles() {
  return useCrud(roleAdapter);
}