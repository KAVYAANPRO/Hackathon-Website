"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { eventConfig } from "@/config/event";
import { MagneticButton } from "@/components/MagneticButton";

const AHCoreCanvas = dynamic(
  () =>
    import("@/components/three/AHCoreCanvas").then((mod) => mod.AHCoreCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full w-full items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-48 w-48 rounded-full border border-[#FF5C00]/25 bg-[#101014]/40" />
      </div>
    ),
  }
);

function ConfirmedCountdown({ isoDate }: { isoDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    const target = new Date(isoDate).getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      });
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [isoDate]);

  if (!timeLeft) return null;

  return (
    <div className="inline-flex items-center gap-4 border border-white/12 bg-[#101014]/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em]">
      <span className="text-[#92929C]">T-MINUS</span>
      <span className="tabular-nums text-[#F5F5F5]">
        {String(timeLeft.days).padStart(2, "0")}D :{" "}
        {String(timeLeft.hours).padStart(2, "0")}H :{" "}
        {String(timeLeft.minutes).padStart(2, "0")}M
      </span>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden border-b border-white/10 bg-[#070709] bg-arch-grid pt-28 pb-10 sm:pt-32 sm:pb-12"
    >
      {/* Subtle top-right radial ambient depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[540px] w-[540px] rounded-full bg-[#FF5C00]/[0.06] blur-[140px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* Left: Editorial Typography & CTAs */}
        <div className="flex flex-col items-start lg:col-span-7">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-[#FF5C00]/40 bg-[#FF5C00]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#FFB36B]">
              <span className="h-1.5 w-1.5 bg-[#FF5C00]" aria-hidden="true" />
              {eventConfig.brand.edition}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#92929C]">
              {eventConfig.brand.coordinates}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.85rem,7.2vw,6.25rem)] font-bold leading-[0.94] tracking-[-0.035em] text-[#F5F5F5]">
            ENGINEER
            <br />
            <span className="text-[#FF5C00]">THE IMPOSSIBLE.</span>
          </h1>

          <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-[#92929C]">
            {eventConfig.brand.secondaryTagline}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#92929C] sm:text-lg">
            A new generation of builders. One ambitious gathering in{" "}
            <span className="text-[#F5F5F5]">Ahmedabad, Gujarat</span>. The
            opportunity to create what doesn&apos;t exist yet.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="/register" variant="primary">
              Register Interest
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="#about" variant="secondary">
              Explore the Event
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </div>

          {eventConfig.dates.confirmedStartIso && (
            <div className="mt-6">
              <ConfirmedCountdown isoDate={eventConfig.dates.confirmedStartIso} />
            </div>
          )}
        </div>

        {/* Right: Signature 3D Centerpiece */}
        <div className="relative h-[340px] w-full sm:h-[420px] lg:col-span-5 lg:h-[520px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-4 border border-white/[0.06]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-4 left-4 h-3 w-3 border-t border-l border-[#FF5C00]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 bottom-4 h-3 w-3 border-r border-b border-[#FF5C00]"
          />
          <AHCoreCanvas variant="hero" scrollProgress={scrollProgress} />
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-5 font-mono text-xs text-[#92929C] sm:grid-cols-3">
          <div className="flex items-center gap-2.5">
            <MapPin className="h-3.5 w-3.5 text-[#FF5C00]" aria-hidden="true" />
            <span>
              LOCATION:{" "}
              <strong className="font-medium text-[#F5F5F5]">
                {eventConfig.brand.city}, {eventConfig.brand.region}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar
              className="h-3.5 w-3.5 text-[#FF5C00]"
              aria-hidden="true"
            />
            <span>
              TENTATIVE WINDOW:{" "}
              <strong className="font-medium text-[#F5F5F5]">
                {eventConfig.dates.tentativeWindow}
              </strong>
            </span>
          </div>
          <div className="flex items-center justify-start sm:justify-end">
            <span className="uppercase tracking-[0.18em]">
              STATUS //{" "}
              <span className="text-[#FFB36B]">INTEREST REGISTRATION OPEN</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
