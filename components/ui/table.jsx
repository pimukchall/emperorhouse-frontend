"use client";
import React from "react";

export function Table({ className = "", ...props }) {
  return (
    <table
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  );
}
export function TableHeader(props) {
  return <thead className="[&_tr]:border-b" {...props} />;
}
export function TableBody(props) {
  return <tbody className="[&_tr:last-child]:border-0" {...props} />;
}
export function TableRow({ className = "", ...props }) {
  return (
    <tr
      className={`border-b transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${className}`}
      {...props}
    />
  );
}
export function TableHead({ className = "", ...props }) {
  return (
    <th
      className={`h-10 px-3 text-left align-middle font-medium text-neutral-600 dark:text-neutral-300 ${className}`}
      {...props}
    />
  );
}
export function TableCell({ className = "", ...props }) {
  return <td className={`p-3 align-middle ${className}`} {...props} />;
}
