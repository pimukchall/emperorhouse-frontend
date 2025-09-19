"use client";

import { WobbleCard } from "@/components/ui/wobble-card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ClipboardList, PencilRuler, BugPlay, Rocket } from "lucide-react";

const STEPS = [
  {
    title: "1) วางแผน & วิเคราะห์",
    desc: "เก็บความต้องการ กำหนดขอบเขต และเลือกเทคโนโลยีที่เหมาะสม",
    icon: ClipboardList,
    accent: "from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600",
    bar: "bg-blue-500 dark:bg-blue-400",
  },
  {
    title: "2) ออกแบบ & ต้นแบบ",
    desc: "สร้าง UX/UI และ Prototype ให้เห็นภาพและรับ Feedback",
    icon: PencilRuler,
    accent: "from-purple-400 to-purple-500 dark:from-purple-500 dark:to-purple-600",
    bar: "bg-purple-500 dark:bg-purple-400",
  },
  {
    title: "3) พัฒนา & ทดสอบ",
    desc: "พัฒนาเป็นระบบจริง พร้อมทดสอบหลายรอบจนเสถียร",
    icon: BugPlay,
    accent: "from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-600",
    bar: "bg-teal-500 dark:bg-teal-400",
  },
  {
    title: "4) ส่งมอบ & ดูแล",
    desc: "นำระบบไปใช้จริง พร้อมแก้ไข ปรับปรุง และอัปเดตต่อเนื่อง",
    icon: Rocket,
    accent: "from-orange-400 to-orange-500 dark:from-orange-500 dark:to-orange-600",
    bar: "bg-orange-500 dark:bg-orange-400",
  },
];

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function HowItWorks() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            กระบวนการทำงาน (How It Works)
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            เห็นภาพชัดเป็นขั้นตอน โปร่งใส ตรวจสอบได้ และปลอดภัย
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={item}>
                <WobbleCard
                    containerClassName="rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-xl",
                        "bg-gradient-to-b",
                        s.accent
                      )}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-300">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  {/* progress underline */}
                  <div className="mt-5 flex items-center gap-2">
                    {[...Array(4)].map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1 w-8 rounded-full transition-colors",
                          i <= idx ? s.bar : "bg-gray-300 dark:bg-neutral-700"
                        )}
                      />
                    ))}
                  </div>
                </WobbleCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}