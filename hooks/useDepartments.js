"use client";
import { useCrud } from "@/hooks/useCrud";
import { departmentAdapter } from "@/adapters/departmentAdapter";

export function useDepartments() {
  return useCrud(departmentAdapter);
}