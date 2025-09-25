// src/access/rules.js
export const LEVEL_RANK = { STAF:1, SVR:2, ASST:3, MANAGER:4, MD:5 };

// ── helpers (pure) ────────────────────────────────────────────────────────────
export const ieq = (a,b) => String(a||"").toLowerCase() === String(b||"").toLowerCase();

export function isAdmin(user) {
  const r = user?.role?.name || user?.roleName;
  return ieq(r, "admin");
}

export function userDeptCodes(user) {
  const codes = new Set();
  const primary = user?.primaryUserDept?.department?.code || user?.primaryDeptCode;
  if (primary) codes.add(String(primary).toUpperCase());
  (Array.isArray(user?.departments) ? user.departments : []).forEach(d=>{
    if (d?.code) codes.add(String(d.code).toUpperCase());
  });
  return codes;
}

export function userRank(user) {
  const lvl =
    user?.primaryUserDept?.positionLevel ||
    user?.primaryLevel ||
    user?.positionLevel ||
    "";
  return LEVEL_RANK[String(lvl).toUpperCase()] || 0;
}

// ── ประกาศกฎครั้งเดียว (ต่อเส้นทาง) ─────────────────────────────────────────
export const ACCESS_RULES = [
  // admin zone: HR + MANAGER↑ (หรือ admin → ผ่านหมดอยู่แล้ว)
  { match: /^\/admin(\/|$)/,    require: { deptAny: ["HR"], minRank: "MANAGER" } },
  // HR zone: ใครก็ได้ที่อยู่ HR
  { match: /^\/hr(\/|$)/,       require: { deptAny: ["HR"] } },
  // Approvals: อย่างน้อย SVR
  { match: /^\/approvals(\/|$)/,require: { minRank: "SVR" } },
  // Evals/Profile: แค่ล็อกอิน
  { match: /^\/evals(\/|$)/,    require: {} },
  { match: /^\/profile(\/|$)/,  require: {} },
];

// หา rule ตาม pathname
export function findRule(pathname) {
  return ACCESS_RULES.find(r => r.match.test(pathname)) || null;
}
