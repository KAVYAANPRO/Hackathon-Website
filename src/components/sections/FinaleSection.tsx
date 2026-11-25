"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

const AHCoreCanvas = dynamic(
  () =>
    import("@/components/three/AHCoreCanvas").then((mod) => mod.AHCoreCanvas),
  { ssr: false }
);

export function FinaleSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#070709] bg-arch-grid py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-35"
      >
        <div className="h-[440px] w-[440px] sm:h-[520px] sm:w-[520px]">
          <AHCoreCanvas variant="finale" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#FF5C00]">
          AMDAVADHACKS 2027 // FINAL CALL
        </p>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.6rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.035em] text-[#F5F5F5]">
          THE FUTURE
          <br />
          IS NOT WRITTEN.
          <br />
          <span className="text-[#FF5C00]">BUILD IT.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-[#92929C] sm:text-lg">
          Be first in line when AmdavadHacks 2027 applications, tracks, and
          venue details are officially announced.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="/register" variant="primary">
            Register Interest
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton href="/partners" variant="secondary">
            Partner With Us
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
