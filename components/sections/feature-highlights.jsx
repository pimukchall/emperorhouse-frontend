"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import {
  IconBolt,
  IconCircleCheck,
  IconSearch,
  IconUsers,
  IconLock,
  IconLayersIntersect,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from "@tabler/icons-react";

//ค่อยมาแก้
const Content = () => {
  return (
    <div className="space-y-4">
      {[...new Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-[#F5F5F7] p-6 dark:bg-neutral-800 md:p-10"
        >
          <p className="mx-auto max-w-3xl text-sm md:text-lg text-neutral-700 dark:text-neutral-200">
            ตัวอย่างคอนเทนต์สำหรับการ์ด เปิดดูรายละเอียด ฟีเจอร์/ภาพ/ขั้นตอนการทำงาน
          </p>
          <Image
            src="https://assets.aceternity.com/macbook.png"
            alt="mock"
            height={480}
            width={800}
            className="mx-auto w-full max-w-[720px] object-contain"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
};

const FEATURES = [
  {
    title: "ทำงานรวดเร็ว",
    desc: "ลดขั้นตอนซ้ำซ้อน ประมวลผลอัตโนมัติ ไม่ต้องกรอกซ้ำ",
    icon: IconBolt,
    accent: "from-pink-500/10 to-pink-500/0 ring-pink-500/30",
    content: <Content />,
  },
  {
    title: "ถูกต้องแม่นยำ",
    desc: "ลดข้อผิดพลาด ตรวจสอบได้แบบเรียลไทม์",
    icon: IconCircleCheck,
    accent: "from-blue-500/10 to-blue-500/0 ring-blue-500/30",
    content: <Content />,
  },
  {
    title: "ค้นหาและติดตามง่าย",
    desc: "ค้นหาประวัติย้อนหลังได้ทันที ทุกที่ทุกเวลา",
    icon: IconSearch,
    accent: "from-purple-500/10 to-purple-500/0 ring-purple-500/30",
    content: <Content />,
  },
  {
    title: "ทำงานร่วมกันได้",
    desc: "หลายคนทำงานพร้อมกัน ไม่ทับไฟล์ ไม่หลุดอัปเดต",
    icon: IconUsers,
    accent: "from-teal-500/10 to-teal-500/0 ring-teal-500/30",
    content: <Content />,
  },
  {
    title: "ปลอดภัยและเชื่อถือได้",
    desc: "กำหนดสิทธิ์ บันทึกกิจกรรม สำรองข้อมูล",
    icon: IconLock,
    accent: "from-red-500/10 to-red-500/0 ring-red-500/30",
    content: <Content />,
  },
  {
    title: "ขยายต่อยอดได้",
    desc: "เชื่อมต่อระบบอื่นและเพิ่มฟีเจอร์ได้ตามเติบโต",
    icon: IconLayersIntersect,
    accent: "from-amber-500/10 to-amber-500/0 ring-amber-500/30",
    content: <Content />,
  },
];

export default function FeatureHighlights() {
  // ====== Loop Scroll Setup ======
  const LOOP_BLOCKS = 3;
  const items = useMemo(
    () => Array.from({ length: LOOP_BLOCKS }, () => FEATURES).flat(),
    []
  );

  const scrollRef = useRef(null);

  // ✅ JS: ไม่ใส่ generic; ใช้ค่าเริ่มต้นที่สื่อชนิดได้เอง
  const [openIndex, setOpenIndex] = useState(null);
  const [cardWidth, setCardWidth] = useState(0);

  const measure = () => {
    const track = scrollRef.current;
    if (!track) return;

    const first = track.querySelector("[data-card]");
    const second = first?.nextElementSibling ? first.nextElementSibling : null;
    if (!first) return;

    const r1 = first.getBoundingClientRect();

    let gap = 0;
    if (second) {
      const r2 = second.getBoundingClientRect();
      gap = Math.max(0, r2.left - r1.right);
    } else {
      const cs = getComputedStyle(track);
      gap = parseFloat(cs.gap || cs.columnGap || "0") || 0;
    }
    setCardWidth(r1.width + gap);
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    const track = scrollRef.current;
    if (track) ro.observe(track);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!scrollRef.current || !cardWidth) return;
    // ตั้งต้นไว้ที่บล็อกกลาง
    const block = FEATURES.length * cardWidth;
    scrollRef.current.scrollLeft = block;
  }, [cardWidth]);

  useEffect(() => {
    if (openIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openIndex]);

  const handleLoopScroll = () => {
    const el = scrollRef.current;
    if (!el || !cardWidth) return;

    const block = FEATURES.length * cardWidth;
    const total = LOOP_BLOCKS * block;
    const x = el.scrollLeft;

    if (x < block * 0.25) {
      el.scrollLeft = x + block;
    } else if (x > total - block * 1.25) {
      el.scrollLeft = x - block;
    }
  };

  // ปุ่มเลื่อน: ใช้ระยะเท่ากับ 1 การ์ดจริง ๆ
  const scrollByDir = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = (dir === "left" ? -1 : 1) * (cardWidth || 360);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            จุดเด่นของระบบ
          </h2>
          <h3 className="mt-3 text-gray-600 dark:text-gray-300 text-center">
            <PointerHighlight containerClassName="inline-block">
              ทันสมัย โปร่งใส ปลอดภัย และสอดคล้องมาตรฐานองค์กร
            </PointerHighlight>
          </h3>
        </div>

        {/* ปุ่มเลื่อนแบบลอย และดันออกมานอกการ์ดนิดหน่อย */}
        <div className="relative">
          <button
            onClick={() => scrollByDir("left")}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full 
                      bg-white/90 dark:bg-neutral-800/90 shadow-lg ring-1 ring-black/5 hover:ring-black/10 backdrop-blur"
            aria-label="Scroll left"
          >
            <IconChevronLeft className="h-5 w-5 text-neutral-800 dark:text-neutral-100" />
          </button>
          <button
            onClick={() => scrollByDir("right")}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full 
                      bg-white/90 dark:bg-neutral-800/90 shadow-lg ring-1 ring-black/5 hover:ring-black/10 backdrop-blur"
            aria-label="Scroll right"
          >
            <IconChevronRight className="h-5 w-5 text-neutral-800 dark:text-neutral-100" />
          </button>

          {/* แทร็คสไลด์: การ์ดใหญ่ขึ้น + loop */}
          <div
            ref={scrollRef}
            onScroll={handleLoopScroll}
            className={cn(
              "relative flex snap-x snap-mandatory gap-6 md:gap-8",
              "overflow-x-auto no-scrollbar px-6 pb-8"
            )}
          >
            {items.map((f, i) => {
              const Icon = f.icon;
              const isProbe = i === 0;
              return (
                <motion.article
                  data-card
                  key={`${f.title}-${i}`}
                  data-card-probe={isProbe ? "true" : undefined}
                  whileHover={{ y: -8, scale: 1.015 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => setOpenIndex(i % FEATURES.length)}
                  className={cn(
                    "group relative snap-center cursor-pointer",
                    "min-w-[320px] sm:min-w-[380px] md:min-w-[420px] xl:min-w-[460px]",
                    "rounded-3xl border border-black/10 bg-gradient-to-b from-white to-white/70 p-6 md:p-8",
                    "shadow-[0_24px_50px_-24px_rgba(0,0,0,0.25)] transition-shadow dark:border-white/10 dark:from-neutral-900 dark:to-neutral-900/70"
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-2 transition-opacity group-hover:opacity-100",
                      f.accent ?? "ring-indigo-500/30"
                    )}
                  />
                  <div className="flex items-start gap-4">
                    <div className="grid place-items-center rounded-2xl p-3 ring-1 ring-black/5 bg-white/70
                                  dark:ring-white/10 dark:bg-white/10">
                      <Icon className="h-6 w-6 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-300">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    layout
                    className="mt-6 h-px w-14 bg-gray-900/15 transition-all group-hover:w-20 dark:bg-white/20"
                  />
                  <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                    กดเพื่อดูรายละเอียด
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* gradient mask ซ้าย/ขวา */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white/80 to-transparent dark:from-neutral-950/80" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white/80 to-transparent dark:from-neutral-950/80" />
        </div>

        {/* Hint mobile */}
        <div className="px-6 pb-2 pt-1 text-center text-xs text-gray-500 dark:text-gray-400 md:hidden">
          ปัดเพื่อดูฟีเจอร์เพิ่มเติม →
        </div>
      </div>

      {/* ===== Modal Pop-out ===== */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm overscroll-none"
            onClick={() => setOpenIndex(null)}
            onTouchMove={(e) => e.preventDefault()}
          >
            <motion.div
              layout
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative z-[70] mx-auto my-10 w-[min(92vw,1000px)]
                rounded-3xl bg-white p-4 md:p-10 dark:bg-neutral-900
                max-h-[min(86vh,920px)] overflow-y-auto overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black text-white dark:bg-white dark:text-black"
                onClick={() => setOpenIndex(null)}
                aria-label="close"
              >
                <IconX className="h-5 w-5" />
              </button>
              {openIndex !== null && (
                <>
                  <div className="flex items-center gap-3">
                    {React.createElement(FEATURES[openIndex].icon, {
                      className: "h-6 w-6 text-gray-900 dark:text-white",
                    })}
                    <h3 className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-white">
                      {FEATURES[openIndex].title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                    {FEATURES[openIndex].desc}
                  </p>
                  <div className="mt-8">{FEATURES[openIndex].content}</div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
