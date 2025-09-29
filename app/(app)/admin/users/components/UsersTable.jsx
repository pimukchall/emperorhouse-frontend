"use client";
import React from "react";

export default function UsersTable({
  items = [],
  meta = { page: 1, pages: 1, total: 0 },
  page,
  setPage,
  onEdit,
  onSoftDelete,
  onRestore,
  onHardDelete,
  onResetPassword,
  onManageDepts,
}) {
  const columns = ["ID", "Email", "ชื่อ / Role", "Organization", "Primary / Others", "ลบ?", "Actions"];

  return (
    <section className="rounded-xl border dark:border-neutral-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100 dark:bg-neutral-800 sticky top-0 z-10">
            <tr>
              {columns.map((c, i) => (
                <Th key={i} right={c === "Actions"}>{c}</Th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((u) => {
                const pri = u.primaryUserDept;
                const others = (u.userDepartments || []).filter((d) => d.id !== pri?.id && !d.endedAt);
                const org = u.organization;

                return (
                  <tr key={u.id} className="border-t dark:border-neutral-700 align-top hover:bg-neutral-50/60 dark:hover:bg-neutral-800/50">
                    <Td>{u.id}</Td>
                    <Td className="whitespace-nowrap">{u.email}</Td>
                    <Td>
                      <div className="font-medium">{u.name || `${u.firstNameTh || ""} ${u.lastNameTh || ""}`}</div>
                      <div className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-300">{u.role?.name || "-"}</div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      {org ? (
                        <>
                          {org.code ? <b>{org.code}</b> : <b>ORG#{org.id}</b>} · {org.nameTh || org.nameEn || "-"}
                        </>
                      ) : (
                        <span className="text-neutral-500">-</span>
                      )}
                    </Td>
                    <Td>
                      {pri?.department ? (
                        <div className="whitespace-nowrap">
                          <b>{pri.department.code}</b> · {pri.positionLevel}
                          {pri.positionName ? ` (${pri.positionName})` : ""}{" "}
                          <span className="text-[11px] text-green-700">Primary</span>
                        </div>
                      ) : (
                        <div className="text-neutral-500">-</div>
                      )}
                      {others.map((d) => (
                        <div key={d.id} className="whitespace-nowrap text-[12px] text-neutral-700 dark:text-neutral-300">
                          {d.department?.code} · {d.positionLevel}
                          {d.positionName ? ` (${d.positionName})` : ""}
                        </div>
                      ))}
                    </Td>
                    <Td>{u.deletedAt ? "Yes" : "-"}</Td>
                    <Td right>
                      <div className="flex flex-wrap gap-1 justify-end">
                        <GhostButton onClick={() => onEdit(u)}>Edit</GhostButton>
                        <GhostButton onClick={() => onManageDepts(u)}>Manage Depts</GhostButton>
                        {!u.deletedAt ? (
                          <GhostButton className="text-amber-700" onClick={() => onSoftDelete(u)}>Soft Delete</GhostButton>
                        ) : (
                          <>
                            <GhostButton className="text-green-700" onClick={() => onRestore(u)}>Restore</GhostButton>
                            <GhostButton className="text-rose-700" onClick={() => onHardDelete(u)}>Hard Delete</GhostButton>
                          </>
                        )}
                        <GhostButton className="text-purple-700" onClick={() => onResetPassword(u)}>Reset Password</GhostButton>
                      </div>
                    </Td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <Td colSpan={7} className="px-3 py-6 text-center text-neutral-500">ไม่พบข้อมูล</Td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="text-xs text-neutral-500">ทั้งหมด {meta.total} รายการ</div>
        <div className="flex gap-2">
          <GhostButton disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</GhostButton>
          <div className="text-sm">Page {meta.page} / {meta.pages || 1}</div>
          <GhostButton disabled={page >= (meta.pages || 1)} onClick={() => setPage((p) => p + 1)}>Next</GhostButton>
        </div>
      </div>
    </section>
  );
}

function GhostButton({ children, className = "", ...rest }) {
  return (
    <button
      className={`px-2 py-1 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

function Th({ children, right }) {
  return (
    <th className={`px-3 py-2 ${right ? "text-right" : "text-left"} text-neutral-700 dark:text-neutral-200`}>{children}</th>
  );
}
function Td({ children, right, className = "", ...rest }) {
  return (
    <td className={`px-3 py-2 ${right ? "text-right" : ""} ${className}`} {...rest}>{children}</td>
  );
}
