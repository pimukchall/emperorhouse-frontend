"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { forgotPassword } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

function safeCallbackUrl(sp) {
  const raw = sp.get("callbackUrl") || "/";
  return raw.startsWith("/") ? raw : "/";
}

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = useMemo(() => safeCallbackUrl(sp), [sp]);

  const { isReady, isAuthenticated, signIn } = useAuth();

  // ✅ ใช้ username ตามสเปก backend
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState({ type: "info", text: "" });

  // forgot password dialog
  const [showForgot, setShowForgot] = useState(false);
  const [forgotBusy, setForgotBusy] = useState(false);
  // ✅ เปิดให้ใส่ได้ทั้งอีเมล “หรือ” ชื่อผู้ใช้
  const [identifier, setIdentifier] = useState("");

  useEffect(() => {
    if (isReady && isAuthenticated) router.replace(callbackUrl);
  }, [isReady, isAuthenticated, router, callbackUrl]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return;
    setBusy(true);
    setNotice({ type: "info", text: "" });
    try {
      const res = await signIn(username, password, { remember });
      if (res?.ok) {
        setNotice({ type: "success", text: "เข้าสู่ระบบสำเร็จ" });
        router.replace(callbackUrl);
      } else {
        setNotice({ type: "error", text: res?.message || "เข้าสู่ระบบไม่สำเร็จ" });
      }
    } catch (err) {
      setNotice({ type: "error", text: err?.message || "เข้าสู่ระบบไม่สำเร็จ" });
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotSubmit(e) {
    e.preventDefault();
    if (!identifier) return;
    setForgotBusy(true);
    try {
      await forgotPassword(identifier); // api ฝั่งเรา map เป็น { emailOrUsername }
      setShowForgot(false);
      setNotice({ type: "success", text: "ถ้ามีบัญชี ระบบได้ส่งลิงก์รีเซ็ตรหัสแล้ว" });
    } catch (err) {
      setNotice({ type: "error", text: err?.message || "ส่งคำขอไม่สำเร็จ" });
    } finally {
      setForgotBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-bold">เข้าสู่ระบบ</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          ลงชื่อเข้าใช้ด้วยชื่อผู้ใช้และรหัสผ่านของคุณ
        </p>
      </header>

      <form className="space-y-4" onSubmit={handleSubmit} autoComplete="on">
        <div className="space-y-1">
          <Label htmlFor="username">ชื่อผู้ใช้</Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your-username"
            disabled={busy}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">รหัสผ่าน</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={busy}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-black dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-white"
              disabled={busy}
            />
            จำฉันไว้ 7 วัน
          </label>

          <button
            type="button"
            onClick={() => {
              setNotice({ type: "info", text: "" });
              setIdentifier(username);
              setShowForgot(true);
            }}
            className="text-sm underline underline-offset-2 hover:opacity-80 disabled:opacity-50"
            disabled={busy}
          >
            ลืมรหัสผ่าน?
          </button>
        </div>

        <Button type="submit" disabled={busy || !username || !password} className="w-full" aria-busy={busy}>
          {busy ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </Button>

        <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          ยังไม่มีบัญชี?{" "}
          <a href="/auth/register" className="underline underline-offset-2">
            สมัครสมาชิก
          </a>
        </div>

        {notice.text && (
          <div
            className={
              notice.type === "success"
                ? "text-green-600 text-sm"
                : notice.type === "error"
                ? "text-red-600 text-sm"
                : "text-neutral-600 text-sm"
            }
          >
            {notice.text}
          </div>
        )}
      </form>

      {/* Forgot password dialog */}
      <Dialog
        open={showForgot}
        onOpenChange={(v) => {
          setShowForgot(v);
          if (!v) setNotice({ type: "info", text: "" });
        }}
      >
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle>ลืมรหัสผ่าน</DialogTitle>
          </DialogHeader>

          <form id="forgot-form" onSubmit={handleForgotSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="identifier">อีเมลหรือชื่อผู้ใช้</Label>
              <Input
                id="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com หรือ your-username"
                disabled={forgotBusy}
              />
            </div>
          </form>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={forgotBusy}>
                ยกเลิก
              </Button>
            </DialogClose>
            <Button form="forgot-form" disabled={forgotBusy}>
              {forgotBusy ? "กำลังส่ง..." : "ส่งลิงก์รีเซ็ต"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}