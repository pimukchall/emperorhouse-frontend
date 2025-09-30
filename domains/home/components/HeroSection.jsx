"use client";

import React from "react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { devSystemCopy as copy } from "@/domains/home/content/devSystemCopy";

const defaultImages = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
];
/**
 * @param {HeroSectionProps} props
 */
export function HeroSection({
  images = defaultImages,
  onPrimaryClick,
  onSecondaryClick,
}) {
  return (
    <section>
      <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden">
        <h1 className="relative z-20 mx-auto max-w-3xl text-center text-balance text-white text-2xl font-semibold sm:text-3xl md:text-5xl lg:max-w-4xl lg:text-6xl">
          {copy.title}{" "}
          <span className="relative z-20 inline-block rounded-lg bg-blue-500/40 px-3 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[10px] backdrop-blur-sm sm:rounded-xl sm:px-4 sm:py-1.5 sm:underline-offset-[14px]">
            {copy.highlight}
          </span>
        </h1>

        <p className="relative z-20 mx-auto max-w-[72ch] py-5 text-center text-neutral-200 text-sm leading-relaxed sm:text-base md:py-8 md:text-lg">
          {copy.description}
        </p>

        {/* ปุ่ม: mobile เต็มแถว, desktop เรียงกัน */}
        <div className="relative z-20 flex w-full max-w-md flex-col items-stretch justify-center gap-3 pt-2 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:pt-4">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="w-full sm:w-auto rounded-md bg-sky-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            {copy.primaryCta}
          </button>
          <button
            type="button"
            onClick={onSecondaryClick}
            className="w-full sm:w-auto rounded-md border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black"
          >
            {copy.secondaryCta}
          </button>
        </div>

        {/* overlay: มือถือเข้มกว่า, หน้าจอใหญ่โปร่งขึ้น */}
        <div className="absolute inset-0 z-10 bg-black/75 sm:bg-black/70 md:bg-black/60 lg:bg-black/50" />

        {/* พื้นหลัง 3D marquee เต็มพื้นที่ */}
        <ThreeDMarquee
          className="pointer-events-none absolute inset-0 h-full w-full"
          images={images}
        />
      </div>
    </section>
  );
}