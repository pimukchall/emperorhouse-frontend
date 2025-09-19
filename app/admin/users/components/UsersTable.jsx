"use client";

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
  return (
    <section className="rounded-xl border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 sticky top-0 z-10">
            <tr>
              <Th>ID</Th>
              <Th>Email</Th>
              <Th>ชื่อ / Role</Th>
              <Th>Primary / Others</Th>
              <Th>ลบ?</Th>
              <Th right>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((u) => {
              const pri = u.primaryUserDept;
              // ✅ แสดงเฉพาะสังกัดที่ยัง active เท่านั้น
              const others = (u.userDepartments || [])
                .filter((d) => d.id !== pri?.id && !d.endedAt);

              return (
                <tr key={u.id} className="border-t align-top hover:bg-neutral-50/60">
                  <Td>{u.id}</Td>
                  <Td className="whitespace-nowrap">{u.email}</Td>
                  <Td>
                    <div className="font-medium">
                      {u.name || `${u.firstNameTh || ""} ${u.lastNameTh || ""}`}
                    </div>
                    <div className="text-xs text-neutral-600 mt-0.5">{u.role?.name || "-"}</div>
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
                      <div key={d.id} className="text-[12px] text-neutral-700 whitespace-nowrap">
                        {d.department?.code} · {d.positionLevel}
                        {d.positionName ? ` (${d.positionName})` : ""}
                      </div>
                    ))}
                  </Td>
                  <Td>{u.deletedAt ? "Yes" : "-"}</Td>
                  <Td right className="space-x-1 whitespace-nowrap">
                    <GhostButton onClick={() => onEdit(u)}>Edit</GhostButton>
                    <GhostButton onClick={() => onManageDepts(u)}>Manage Depts</GhostButton>
                    {!u.deletedAt ? (
                      <GhostButton className="text-amber-700" onClick={() => onSoftDelete(u)}>
                        Soft Delete
                      </GhostButton>
                    ) : (
                      <>
                        <GhostButton className="text-green-700" onClick={() => onRestore(u)}>
                          Restore
                        </GhostButton>
                        <GhostButton className="text-rose-700" onClick={() => onHardDelete(u)}>
                          Hard Delete
                        </GhostButton>
                      </>
                    )}
                    <GhostButton className="text-purple-700" onClick={() => onResetPassword(u)}>
                      Reset Password
                    </GhostButton>
                  </Td>
                </tr>
              );
            })}
            {!items.length && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-neutral-500">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="text-xs text-neutral-500">ทั้งหมด {meta.total} รายการ</div>
        <div className="flex gap-2">
          <GhostButton disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </GhostButton>
          <div className="text-sm">Page {meta.page} / {meta.pages || 1}</div>
          <GhostButton disabled={page >= (meta.pages || 1)} onClick={() => setPage((p) => p + 1)}>
            Next
          </GhostButton>
        </div>
      </div>
    </section>
  );
}

function GhostButton({ children, className = "", ...rest }) {
  return (
    <button className={`px-2 py-1 rounded-md border hover:bg-neutral-50 disabled:opacity-50 ${className}`} {...rest}>
      {children}
    </button>
  );
}
function Th({ children, right }) {
  return (
    <th className={`px-3 py-2 ${right ? "text-right" : "text-left"} text-[13px] font-semibold text-neutral-700`}>
      {children}
    </th>
  );
}
function Td({ children, className = "", right }) {
  return <td className={`px-3 py-2 ${right ? "text-right" : ""} ${className}`}>{children}</td>;
}
