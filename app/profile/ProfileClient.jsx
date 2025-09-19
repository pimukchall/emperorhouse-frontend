"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/local-auth";
import { apiFetch, apiUrl } from "@/lib/api";
import StatefulButton from "@/components/ui/stateful-button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import NoticeDialog from "@/components/modal/NoticeDialog";
import ChangePasswordDialog from "@/components/modal/ChangePasswordDialog";
import SignaturePad from "@/components/signature/SignaturePad";

const EMPLOYEE_TYPES = { DAILY: "DAILY (รายวัน)", MONTHLY: "MONTHLY (รายเดือน)" };
const CONTRACT_TYPES = { PERMANENT: "PERMANENT (ประจำ)", TEMPORARY: "TEMPORARY (ชั่วคราว)", PROBATION: "PROBATION (ทดลองงาน)" };
const GENDERS = { MALE: "ชาย", FEMALE: "หญิง", OTHER: "อื่น ๆ" };

function fmtDate(d) {
  if (!d) return "";
  try {
    const dt = typeof d === "string" ? new Date(d) : d;
    if (Number.isNaN(dt.getTime())) return "";
    return dt.toISOString().slice(0, 10);
  } catch { return ""; }
}

export default function ProfileClient() {
  const router = useRouter();
  const { user, loading, reload } = useAuth();

  // ฟิลด์ที่ "ผู้ใช้แก้ไขเองได้"
  const [form, setForm] = useState({
    email: "", name: "", firstNameTh: "", lastNameTh: "", firstNameEn: "", lastNameEn: "",
  });

  // ฟิลด์ "อ่านอย่างเดียว"
  const [readonly, setReadonly] = useState({
    organizationName: "", employeeCode: "", employeeType: "", contractType: "", gender: "",
    birthDate: "", startDate: "", probationEndDate: "", resignedAt: "", roleName: "",
    primaryDept: null, otherDepts: [],
  });

  const [busy, setBusy] = useState(false);

  // Notice modal
  const [notice, setNotice] = useState({ open: false, type: "info", message: "" });

  // Change password modal
  const [showChangePass, setShowChangePass] = useState(false);

  // รูปโปรไฟล์
  const [avatarTick, setAvatarTick] = useState(0);
  const [avatarError, setAvatarError] = useState(false);
  const avatarUrl = user?.id ? apiUrl(`/profile/files/user/avatar/${user.id}?ts=${avatarTick}`) : "";

  // ลายเซ็น
  const [signTick, setSignTick] = useState(0);
  const [signError, setSignError] = useState(false);
  const signatureUrl = user?.id ? apiUrl(`/profile/files/user/signature/${user.id}?ts=${signTick}`) : "";

  // แสดง/ซ่อนโหมดวาดลายเซ็น (เก็บพื้นที่ให้เรียบร้อย)
  const [showDrawPad, setShowDrawPad] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login?callbackUrl=/profile");
  }, [loading, user, router]);

  useEffect(() => {
    let stop = false;
    (async () => {
      if (!user?.id) return;
      try {
        const res = await apiFetch(`/api/users/${user.id}`);
        const u = res?.data || {};
        if (stop) return;

        // editable
        setForm({
          email: u.email || "",
          name: u.name || "",
          firstNameTh: u.firstNameTh || "",
          lastNameTh: u.lastNameTh || "",
          firstNameEn: u.firstNameEn || "",
          lastNameEn: u.lastNameEn || "",
        });

        // derive primary & others (active only)
        const primary = u.primaryUserDept?.department
          ? {
              code: u.primaryUserDept.department.code,
              nameTh: u.primaryUserDept.department.nameTh,
              positionLevel: u.primaryUserDept.positionLevel || "",
              positionName: u.primaryUserDept.positionName || "",
            }
          : null;

        const others = (u.userDepartments || [])
          .filter((d) => !d.endedAt && d.id !== u.primaryUserDept?.id)
          .map((d) => ({
            id: d.id,
            code: d.department?.code,
            nameTh: d.department?.nameTh,
            positionLevel: d.positionLevel || "",
            positionName: d.positionName || "",
          }));

        // readonly
        setReadonly({
          organizationName: u.organization?.nameTh || u.organization?.nameEn || "",
          employeeCode: u.employeeCode || "",
          employeeType: EMPLOYEE_TYPES[u.employeeType] || "",
          contractType: CONTRACT_TYPES[u.contractType] || "",
          gender: GENDERS[u.gender] || "",
          birthDate: fmtDate(u.birthDate),
          startDate: fmtDate(u.startDate),
          probationEndDate: fmtDate(u.probationEndDate),
          resignedAt: fmtDate(u.resignedAt),
          roleName: u.role?.name || "",
          primaryDept: primary,
          otherDepts: others,
        });

        // โหลดรูป/ลายเซ็นใหม่
        setAvatarError(false);
        setSignError(false);
        const now = Date.now();
        setAvatarTick(now);
        setSignTick(now);
      } catch (e) {
        if (!stop)
          setNotice({ open: true, type: "error", message: e?.message || "โหลดโปรไฟล์ล้มเหลว" });
      }
    })();
    return () => { stop = true; };
  }, [user?.id]);

  async function onSubmit(e) {
    e.preventDefault(); setBusy(true);
    try {
      await apiFetch("/api/profile", {
        method: "PATCH",
        body: {
          name: form.name,
          firstNameTh: form.firstNameTh,
          lastNameTh: form.lastNameTh,
          firstNameEn: form.firstNameEn,
          lastNameEn: form.lastNameEn,
        },
      });
      reload?.(); // sync session
      setNotice({ open: true, type: "success", message: "บันทึกโปรไฟล์เรียบร้อย" });
    } catch (e) {
      setNotice({ open: true, type: "error", message: e?.data?.error || e?.message || "บันทึกไม่สำเร็จ" });
    } finally { setBusy(false); }
  }

  async function uploadFile({ file, field, url, tickSetter, errSetter, okMessage }) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice({ open: true, type: "error", message: "กรุณาเลือกรูปภาพเท่านั้น" });
      return;
    }
    // avatar ≤ 2MB, signature ≤ 1MB
    const limit = field === "avatar" ? 2 * 1024 * 1024 : 1 * 1024 * 1024;
    if (file.size > limit) {
      setNotice({
        open: true, type: "error",
        message: field === "avatar" ? "ขนาดรูปโปรไฟล์ต้องไม่เกิน 2MB" : "ขนาดไฟล์ลายเซ็นต้องไม่เกิน 1MB",
      });
      return;
    }

    try {
      const fd = new FormData();
      fd.append(field, file);
      await apiFetch(url, { method: "PUT", body: fd });
      errSetter(false);
      tickSetter(Date.now()); // cache bust
      reload?.();
      setNotice({ open: true, type: "success", message: okMessage });
    } catch (e) {
      setNotice({ open: true, type: "error", message: e?.data?.error || e?.message || "อัปโหลดไม่สำเร็จ" });
    }
  }

  async function onUploadAvatar(file) {
    await uploadFile({
      file, field: "avatar", url: "/profile/avatar",
      tickSetter: setAvatarTick, errSetter: setAvatarError,
      okMessage: "อัปโหลดรูปโปรไฟล์สำเร็จ",
    });
  }

  async function onUploadSignature(file) {
    await uploadFile({
      file, field: "signature", url: "/profile/signature",
      tickSetter: setSignTick, errSetter: setSignError,
      okMessage: "อัปโหลดลายเซ็นสำเร็จ",
    });
  }

  const hasPrimary = useMemo(() => !!readonly.primaryDept, [readonly.primaryDept]);

  return (
    <main className="mx-auto max-w-5xl p-6 py-30 space-y-8">
      <BackgroundGradient className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">โปรไฟล์ของฉัน</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">แก้ไขชื่อที่แสดง อัปโหลดรูปโปรไฟล์/ลายเซ็น และดูข้อมูลบัญชีของคุณ</p>

        {/* Avatar & Signature */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Avatar */}
          <div className="flex items-start gap-4">
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10 bg-neutral-200 dark:bg-neutral-800">
              {avatarUrl && !avatarError ? (
                <img
                  key={avatarUrl}
                  src={avatarUrl}
                  alt="avatar"
                  className="h-full w-full object-cover"
                  onLoad={() => setAvatarError(false)}
                  onError={() => setAvatarError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <svg viewBox="0 0 24 24" className="h-8 w-8 opacity-80" aria-hidden="true">
                  <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                </svg>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onUploadAvatar(e.target.files?.[0])} />
                <span className="rounded-md border px-3 py-1.5 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900">เลือกรูปโปรไฟล์…</span>
              </label>
              <span className="text-xs text-neutral-500">PNG/JPG/WEBP ≤ 2MB</span>
            </div>
          </div>

          {/* Signature — จัดให้เป็นสัดส่วน */}
          <SignatureSection
            signatureUrl={signatureUrl}
            signError={signError}
            setSignError={setSignError}
            onUploadSignature={onUploadSignature}
            showDrawPad={showDrawPad}
            setShowDrawPad={setShowDrawPad}
            setSignTick={setSignTick}
            setNotice={setNotice}
            reload={reload}
          />
        </div>

        {/* Profile form (Editable) */}
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label className="text-sm text-neutral-700 dark:text-neutral-300">องค์กร (Organization)</label>
            <input
              value={readonly.organizationName || "-"} disabled
              className="w-full rounded-md border border-neutral-200 bg-neutral-100 px-3 py-2 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-neutral-700 dark:text-neutral-300">อีเมล (แก้ไขโดยผู้ดูแล)</label>
            <input
              value={form.email} disabled
              className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm opacity-90 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="name" className="text-sm text-neutral-700 dark:text-neutral-300">ชื่อที่แสดง (ชื่อเล่น)</label>
            <input
              id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              placeholder="เช่น โอ๋, Beam, ฯลฯ"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">ชื่อ (ไทย)</label>
              <input
                value={form.firstNameTh} onChange={(e) => setForm({ ...form, firstNameTh: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">นามสกุล (ไทย)</label>
              <input
                value={form.lastNameTh} onChange={(e) => setForm({ ...form, lastNameTh: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">ชื่อ (อังกฤษ)</label>
              <input
                value={form.firstNameEn} onChange={(e) => setForm({ ...form, firstNameEn: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">นามสกุล (อังกฤษ)</label>
              <input
                value={form.lastNameEn} onChange={(e) => setForm({ ...form, lastNameEn: e.target.value })}
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={() => setShowChangePass(true)} className="text-sm underline">เปลี่ยนรหัสผ่าน</button>
            <StatefulButton type="submit" loading={busy} loadingText="กำลังบันทึก..." className="h-10 rounded-md bg-black px-4 text-white dark:bg-white dark:text-black">
              บันทึกการเปลี่ยนแปลง
            </StatefulButton>
          </div>
        </form>
      </BackgroundGradient>

      {/* Readonly blocks */}
      <div className="grid gap-6 md:grid-cols-2">
        <BackgroundGradient className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-base font-semibold mb-4">ข้อมูลพนักงาน (อ่านอย่างเดียว)</h3>

          <ReadonlyRow label="Employee Code" value={readonly.employeeCode} />
          <ReadonlyRow label="Employee Type" value={readonly.employeeType} />
          <ReadonlyRow label="Contract Type" value={readonly.contractType} />
          <ReadonlyRow label="Gender" value={readonly.gender} />

          <div className="grid gap-4 sm:grid-cols-2 mt-2">
            <ReadonlyRow label="Birth Date" value={readonly.birthDate} />
            <ReadonlyRow label="Start Date" value={readonly.startDate} />
            <ReadonlyRow label="Probation End" value={readonly.probationEndDate} />
            <ReadonlyRow label="Resigned At" value={readonly.resignedAt} />
          </div>
        </BackgroundGradient>

        <BackgroundGradient className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-base font-semibold mb-4">สิทธิ์และสังกัด (อ่านอย่างเดียว)</h3>

          <ReadonlyRow label="Role" value={readonly.roleName} />

          <div className="mt-3">
            <div className="text-xs text-neutral-500 mb-1">Primary Department</div>
            {hasPrimary ? (
              <div className="rounded-md border px-3 py-2 text-sm">
                <div className="font-medium">{readonly.primaryDept.code} · {readonly.primaryDept.nameTh}</div>
                <div className="text-xs text-neutral-600">
                  {readonly.primaryDept.positionLevel}
                  {readonly.primaryDept.positionName ? ` (${readonly.primaryDept.positionName})` : ""}
                </div>
              </div>
            ) : (
              <div className="text-sm text-neutral-500">-</div>
            )}
          </div>

          <div className="mt-3">
            <div className="text-xs text-neutral-500 mb-1">Other Active Departments</div>
            {readonly.otherDepts?.length ? (
              <div className="space-y-2">
                {readonly.otherDepts.map((d) => (
                  <div key={d.id} className="rounded-md border px-3 py-2 text-sm">
                    <div className="font-medium">{d.code} · {d.nameTh}</div>
                    <div className="text-xs text-neutral-600">
                      {d.positionLevel}{d.positionName ? ` (${d.positionName})` : ""}
                </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-neutral-500">-</div>
            )}
          </div>
        </BackgroundGradient>
      </div>

      {/* Notice modal (success/error) */}
      <NoticeDialog open={notice.open} onClose={() => setNotice((s) => ({ ...s, open: false }))} type={notice.type} message={notice.message} />

      {/* Change password modal */}
      <ChangePasswordDialog open={showChangePass} onClose={() => setShowChangePass(false)} />
    </main>
  );
}

/** ---------------- Signature Section (จัดระเบียบ) ---------------- */
function SignatureSection({
  signatureUrl,
  signError,
  setSignError,
  onUploadSignature,
  showDrawPad,
  setShowDrawPad,
  setSignTick,
  setNotice,
  reload,
}) {
  // กรอบ preview ขนาดคงที่ + checkerboard (ช่วยมองพื้นโปร่งใส)
  const previewClass =
    "grid place-items-center overflow-hidden rounded-md ring-1 ring-black/10 dark:ring-white/10 bg-[length:16px_16px] bg-[linear-gradient(45deg,rgba(0,0,0,.05) 25%,transparent_25%),linear-gradient(-45deg,rgba(0,0,0,.05) 25%,transparent_25%),linear-gradient(45deg,transparent_75%,rgba(0,0,0,.05)_75%),linear-gradient(-45deg,transparent_75%,rgba(0,0,0,.05)_75%)] bg-[0_0,0_8px,8px_-8px,-8px_0] dark:bg-[linear-gradient(45deg,rgba(255,255,255,.06) 25%,transparent_25%),linear-gradient(-45deg,rgba(255,255,255,.06) 25%,transparent_25%),linear-gradient(45deg,transparent_75%,rgba(255,255,255,.06)_75%),linear-gradient(-45deg,transparent_75%,rgba(255,255,255,.06)_75%)]";

  return (
    <div className="flex flex-col gap-3">
      {/* Preview */}
      <div className={`${previewClass}`} style={{ width: 280, height: 90 }}>
        {signatureUrl && !signError ? (
          <img
            key={signatureUrl}
            src={signatureUrl}
            alt="signature"
            className="h-full w-full object-contain"
            onLoad={() => setSignError(false)}
            onError={() => setSignError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="px-2 text-xs text-neutral-500">ยังไม่มีลายเซ็น</div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onUploadSignature(e.target.files?.[0])}
          />
          <span className="rounded-md border px-3 py-1.5 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900">
            อัปโหลดจากไฟล์…
          </span>
        </label>

        <button
          type="button"
          onClick={() => setShowDrawPad((v) => !v)}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
          aria-expanded={showDrawPad}
          aria-controls="signature-drawpad"
        >
          {showDrawPad ? "ซ่อนพื้นที่วาด" : "วาดลายเซ็น"}
        </button>

        <span className="text-xs text-neutral-500 ml-1">แนะนำ PNG พื้นโปร่งใส ≤ 1MB</span>
      </div>

      {/* Draw pad (collapsible) */}
      {showDrawPad && (
        <div id="signature-drawpad" className="mt-1 rounded-lg border p-3 dark:border-neutral-800">
          <div className="mb-2 text-xs text-neutral-500">วาดด้วยเมาส์/ปากกา จากนั้นกดปุ่ม “บันทึก”</div>
          <SignaturePad
            height={170}
            penSize={2}
            penColor="#111111"
            bgColor={null}
            onSave={async (blob) => {
              try {
                if (!blob) return;
                if (blob.size > 1 * 1024 * 1024) {
                  setNotice({ open: true, type: "error", message: "ไฟล์ลายเซ็นที่บันทึกเกิน 1MB" });
                  return;
                }
                const fd = new FormData();
                fd.append("signature", blob, "signature.png");
                await apiFetch("/profile/signature", { method: "PUT", body: fd });
                setSignError(false);
                setSignTick(Date.now());
                reload?.();
                setNotice({ open: true, type: "success", message: "บันทึกลายเซ็นสำเร็จ" });
              } catch (e) {
                setNotice({ open: true, type: "error", message: e?.data?.error || e?.message || "บันทึกลายเซ็นไม่สำเร็จ" });
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

function ReadonlyRow({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-neutral-500">{label}</div>
      <input
        value={value || ""}
        disabled
        className="w-full rounded-md border border-neutral-200 bg-neutral-100 px-3 py-2 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
      />
    </div>
  );
}
