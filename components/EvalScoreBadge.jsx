"use client";
import { gradeFromScore } from "@/features/evals/utils/grades";

export default function EvalScoreBadge({ total }) {
  const { grade, color } = gradeFromScore(total);
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-sm ${color}`}>
      <strong>{Number(total ?? 0).toFixed(1)}</strong>
      <span className="opacity-75">({grade})</span>
    </span>
  );
}
