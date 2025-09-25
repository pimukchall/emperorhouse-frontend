export function toArray(v) {
  if (Array.isArray(v)) return v;
  if (!v || typeof v !== "object") return [];
  const candidates = [v.items, v.data, v.rows, v.list, v.results, v.records];
  for (const c of candidates) if (Array.isArray(c)) return c;
  return [];
}