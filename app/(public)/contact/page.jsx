"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { apiFetch } from "@/api"; // ← ใช้ lib/api แทนอ่าน env เอง

// กันสแปมแบบเบา ๆ
const MIN_FILL_SECONDS = 5;
const COOLDOWN_SECONDS = 10;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "", // honeypot
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null); // { ok:boolean, msg:string }
  const [submitting, setSubmitting] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);

  // เวลาเริ่มกรอก (ใช้เช็ค min fill time)
  const startedAtRef = useRef(Date.now());

  useEffect(() => {
    if (!cooldownLeft) return;
    const t = setInterval(
      () => setCooldownLeft((s) => Math.max(0, s - 1)),
      1000
    );
    return () => clearInterval(t);
  }, [cooldownLeft]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // เผื่อ backend อยากใช้ตรวจเพิ่มเติม
  const clientNonce = useMemo(() => Math.random().toString(36).slice(2), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting || cooldownLeft > 0) return;

    setSubmitting(true);
    setStatus(null);

    try {
      if (!form.name || !form.email || !form.subject || !form.message) {
        throw new Error("กรอกข้อมูลให้ครบที่จำเป็น");
      }
      if ((form.website || "").trim() !== "") {
        throw new Error("Bot detected");
      }
      const elapsed = (Date.now() - startedAtRef.current) / 1000;
      if (elapsed < MIN_FILL_SECONDS) {
        throw new Error("กรุณาตรวจสอบข้อมูลแล้วส่งอีกครั้ง");
      }

      // ถ้า backend ของคุณ mount ไว้ใต้ /api ให้เปลี่ยน path เป็น "/api/contact"
      const resp = await apiFetch("/api/contacts", {
        method: "POST",
        headers: { "X-Client-Nonce": clientNonce },
        body: {
          ...form,
          startedAtMs: startedAtRef.current,
        },
      });

      if (!resp?.ok) {
        throw new Error(resp?.error || "Submit failed");
      }

      setStatus({ ok: true, msg: "ส่งข้อความเรียบร้อย ขอบคุณครับ/ค่ะ" });
      setForm(initialForm);
      setCooldownLeft(COOLDOWN_SECONDS);
      startedAtRef.current = Date.now();
    } catch (err) {
      const msg = err?.message || "เกิดข้อผิดพลาด";
      setStatus({ ok: false, msg });
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = submitting || cooldownLeft > 0;

  return (
    <main className="mx-auto max-w-5xl p-6 py-30 space-y-8">
      <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="text-sm">ชื่อ</span>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              placeholder="Your name"
              required
              maxLength={120}
            />
          </label>

          <label className="block">
            <span className="text-sm">อีเมล</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              placeholder="you@example.com"
              required
              maxLength={160}
            />
          </label>

          <label className="block">
            <span className="text-sm">โทรศัพท์ (ถ้ามี)</span>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              placeholder="Optional"
              maxLength={32}
            />
          </label>

          <label className="block">
            <span className="text-sm">หัวข้อ</span>
            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              placeholder="Subject"
              required
              maxLength={160}
            />
          </label>

          <label className="block">
            <span className="text-sm">ข้อความ</span>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border px-3 py-2 h-40"
              placeholder="Write your message..."
              required
              maxLength={5000}
            />
          </label>

          {/* honeypot: ซ่อนไว้สำหรับบอท */}
          <label className="block sr-only" aria-hidden="true">
            <span>Website</span>
            <input
              name="website"
              value={form.website}
              onChange={onChange}
              autoComplete="off"
              tabIndex={-1}
            />
          </label>
        </div>

        {status && (
          <p
            className={`text-sm ${
              status.ok ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.msg}
          </p>
        )}

        <button
          type="submit"
          disabled={disabled}
          className="rounded-xl border px-4 py-2 disabled:opacity-50"
        >
          {submitting
            ? "กำลังส่ง..."
            : cooldownLeft > 0
            ? `โปรดรอ ${cooldownLeft}s`
            : "ส่งข้อความ"}
        </button>

        <p className="text-xs text-neutral-500 mt-3">
          * มีระบบกันสแปมขั้นพื้นฐาน (honeypot, min fill time, cooldown)
        </p>
      </form>
    </main>
  );
}
