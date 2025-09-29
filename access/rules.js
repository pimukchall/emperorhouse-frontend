// access/rules.js

// ---------- ระดับตำแหน่ง ----------
export const LEVEL_RANK = {
  STAF: 1,
  SVR: 2,
  ASST: 3,
  MANAGER: 4,
  MD: 5,
};

// ---------- helpers ----------
export function isAdmin(user) {
  return (user?.role?.name || "").toLowerCase() === "admin";
}

export function userDeptCodes(user) {
  // return set ของ code แผนกทั้งหมด เช่น { "HR", "IT", "MK" }
  return new Set(
    (user?.departments || []).map((d) => String(d.code).toUpperCase())
  );
}

export function userRank(user) {
  const lvl = user?.primary?.level || user?.positionLevel;
  return LEVEL_RANK[String(lvl).toUpperCase()] || 0;
}

export function ieq(a, b) {
  return String(a || "").toLowerCase() === String(b || "").toLowerCase();
}

// ---------- กฎการเข้าถึง ----------
/**
 * rule.require:
 *  - roleAny: ["admin"]
 *  - deptAny: ["HR"]
 *  - minRank: "MANAGER"
 */
const RULES = [
  // 👑 Admin zone
  { pattern: /^\/admin/, require: { roleAny: ["admin"] } },

  // HR module (summary, reports, evals)
  { pattern: /^\/hr/, require: { deptAny: ["HR"] } },

  // QMS module
  { pattern: /^\/qms/, require: { deptAny: ["QMS"] } },

  // IT module
  { pattern: /^\/it/, require: { deptAny: ["IT"] } },

  // Approvals (ต้องเป็น Manager ขึ้นไป)
  { pattern: /^\/approvals/, require: { minRank: "MANAGER" } },

  // My profile → ใครก็เข้าได้ (แค่ต้อง login)
  { pattern: /^\/me/, require: {} },

  // Dashboard หลังบ้าน (ทุกคนที่ login ได้)
  { pattern: /^\/dashboard/, require: {} },
];

// ---------- API ----------
export function findRule(path) {
  return RULES.find((r) => r.pattern.test(path));
}
