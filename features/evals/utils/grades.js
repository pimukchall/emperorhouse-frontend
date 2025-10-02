export function gradeFromScore(total) {
  const t = Number(total || 0);
  if (t >= 90) return { grade: "A", color: "text-green-600" };
  if (t >= 80) return { grade: "B+", color: "text-emerald-600" };
  if (t >= 70) return { grade: "B", color: "text-lime-600" };
  if (t >= 60) return { grade: "C", color: "text-yellow-600" };
  if (t >= 50) return { grade: "D", color: "text-orange-600" };
  return { grade: "F", color: "text-red-600" };
}
