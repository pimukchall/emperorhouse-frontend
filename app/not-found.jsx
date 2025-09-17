"use client";

import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <AuroraBackground>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-7xl font-extrabold tracking-tight text-black dark:text-white">
          404
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-300">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/">
          <Button className="rounded-full px-6 py-2">Go Home</Button>
        </Link>
      </div>
    </AuroraBackground>
  );
}