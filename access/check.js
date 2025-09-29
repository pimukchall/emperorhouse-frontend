// access/check.js
import { LEVEL_RANK, userDeptCodes, userRank, isAdmin, findRule, ieq } from "@/access/rules";

// ตรวจว่าผ่านเงื่อนไข rule หรือไม่
export function checkAccessByRule(user, rule) {
  if (!rule) return true;
  const req = rule.require || {};

  // admin ผ่านหมด
  if (isAdmin(user)) return true;

  // แผนก
  if (req.deptAny && req.deptAny.length > 0) {
    const userCodes = userDeptCodes(user); // Set of UPPER CASE
    const needed = req.deptAny.map((c) => String(c).toUpperCase());
    const hit = needed.some((c) => userCodes.has(c));
    if (!hit) return false;
  }

  // ระดับขั้นต่ำ
  if (req.minRank) {
    const want = LEVEL_RANK[String(req.minRank).toUpperCase()] || 0;
    const got = userRank(user);
    if (got < want) return false;
  }

  // role เฉพาะ (ถ้ามี)
  if (req.roleAny && req.roleAny.length > 0) {
    const rname = user?.role?.name || user?.roleName || "";
    const ok = req.roleAny.some((rn) => ieq(rname, rn));
    if (!ok) return false;
  }

  return true;
}

// สรุปให้เรียกง่าย: ส่ง pathname + user -> true/false
export function canAccess(user, pathname) {
  const rule = findRule(pathname);
  return checkAccessByRule(user, rule);
}
