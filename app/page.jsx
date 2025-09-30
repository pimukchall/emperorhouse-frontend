"use client";

import React, { useState } from "react";
import { HeroSection } from "@/app/domains/home/components/HeroSection";
// import SoftwareRequestForm from "@/components/forms/SoftwareRequestForm";
import FeatureHighlights from "@/app/domains/home/components/feature-highlights";
import HowItWorks from "@/app/domains/home/components/how-it-works";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      <HeroSection onPrimaryClick={() => setOpen(true)}/>

      <FeatureHighlights />

      <HowItWorks />

      {/* <SoftwareRequestForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log("Form submitted:", data);
        }}
      /> */}
    </main>
  );
}