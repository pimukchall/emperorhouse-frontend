"use client";

import React, { useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
// import SoftwareRequestForm from "@/components/forms/SoftwareRequestForm";
import FeatureHighlights from "@/components/home/feature-highlights";
import HowItWorks from "@/components/home/how-it-works";

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