"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventConfig } from "@/config/event";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      value: eventConfig.projections.registrations,
      label: eventConfig.projections.registrationsLabel,
      tag: "PROJECTION",
    },
    {
      value: eventConfig.projections.onsiteParticipants,
      label: eventConfig.projections.onsiteLabel,
      tag: "PROJECTION",
    },
    {
      value: eventConfig.projections.creativityValue,
      label: eventConfig.projections.creativityLabel,
      tag: "PRINCIPLE",
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative border-b border-white/10 bg-[#101014] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#92929C]">
          <span>01 // THE MANIFESTO</span>
          <span className="text-[#FF5C00]">AHMEDABAD // 2027</span>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left: Oversized Kinetic Editorial Headline */}
          <div className="lg:col-span-7">
            <h2 className="about-reveal font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.8vw,4.75rem)] font-bold leading-[0.96] tracking-[-0.03em] text-[#F5F5F5]">
              DON&apos;T JUST
              <br />
              IMAGINE IT.
              <br />
              <span className="text-[#FF5C00]">BUILD IT.</span>
            </h2>

            <div className="about-reveal mt-8 space-y-5 text-base leading-relaxed text-[#92929C] sm:text-lg">
              <p>
                AmdavadHacks 2027 is born from a city that has engineered
                monumental architecture, textiles, and enterprise for centuries.
                Now, it becomes a launchpad for student developers, designers,
                and founders building software and hardware that matter.
              </p>
              <p>
                No filler. No recycled templates. Just focused engineering,
                high-caliber mentorship, and a cohort of builders ready to ship
                bold ideas from zero to functional prototype.
              </p>
            </div>
          </div>

          {/* Right: Architectural Stepwell Blueprint Illustration + Projections */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            {/* Abstract Stepwell / Jali Technical SVG */}
            <div className="about-reveal relative overflow-hidden border border-white/10 bg-[#070709] p-6">
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#92929C]">
                <span>SYS.GEOMETRY // VAV_LATTICE</span>
                <span className="text-[#FFB36B]">SPEC 2027</span>
              </div>
              <svg
                viewBox="0 0 400 180"
                className="w-full"
                fill="none"
                aria-hidden="true"
              >
                {/* Stepped Vav concentric geometry */}
                <rect
                  x="20"
                  y="16"
                  width="360"
                  height="148"
                  stroke="rgba(245,245,245,0.14)"
                  strokeWidth="1"
                />
                <rect
                  x="52"
                  y="32"
                  width="296"
                  height="116"
                  stroke="rgba(245,245,245,0.22)"
                  strokeWidth="1"
                />
                <rect
                  x="84"
                  y="48"
                  width="232"
                  height="84"
                  stroke="#FF5C00"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                />
                <rect
                  x="116"
                  y="64"
                  width="168"
                  height="52"
                  stroke="rgba(245,245,245,0.35)"
                  strokeWidth="1"
                />
                <line
                  x1="20"
                  y1="90"
                  x2="380"
                  y2="90"
                  stroke="rgba(255,92,0,0.25)"
                  strokeDasharray="4 4"
                />
                <line
                  x1="200"
                  y1="16"
                  x2="200"
                  y2="164"
                  stroke="rgba(255,92,0,0.25)"
                  strokeDasharray="4 4"
                />
                <circle cx="200" cy="90" r="10" fill="#FF5C00" />
              </svg>
            </div>

            {/* Projected Numbers */}
            <div className="about-reveal grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between border border-white/10 bg-[#070709] px-5 py-4"
                >
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
                      {item.value}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#92929C]">
                      {item.label}
                    </div>
                  </div>
                  <span className="border border-white/12 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#FFB36B]">
                    {item.tag}
                  </span>
                </div>
              ))}
              <p className="font-mono text-[11px] leading-relaxed text-[#92929C]">
                * {eventConfig.projections.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
