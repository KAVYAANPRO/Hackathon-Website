"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventConfig } from "@/config/event";

gsap.registerPlugin(ScrollTrigger);

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "bottom 75%",
              scrub: true,
            },
          }
        );
      }

      gsap.from(".journey-step", {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative border-b border-white/10 bg-[#101014] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#92929C]">
          <span>03 // EVENT JOURNEY</span>
          <span className="text-[#FFB36B]">PROPOSED PARTICIPANT FLOW</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#F5F5F5]">
              FROM INTEREST TO{" "}
              <span className="text-[#FF5C00]">SHOWCASE.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#92929C]">
              Every stage of AmdavadHacks 2027 is structured to move builders
              from initial intent to working prototype. Steps below reflect the
              proposed format and are subject to finalized event rules.
            </p>
          </div>

          <div className="relative lg:col-span-8">
            {/* Vertical technical rail */}
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-4 w-[1px] bg-white/10 sm:left-6"
            />
            <div
              ref={lineRef}
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-4 w-[2px] origin-top bg-[#FF5C00] sm:left-6"
            />

            <ol className="space-y-6">
              {eventConfig.journey.map((step) => (
                <li
                  key={step.number}
                  className="journey-step relative pl-12 sm:pl-16"
                >
                  {/* Node marker */}
                  <span
                    aria-hidden="true"
                    className="absolute top-5 left-[11px] h-2.5 w-2.5 border border-[#FF5C00] bg-[#070709] sm:left-[19px]"
                  />

                  <div className="border border-white/10 bg-[#070709] p-6 transition-colors hover:border-white/25">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#FF5C00]">
                        {step.number} — {step.title.toUpperCase()}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#92929C]">
                        {step.status}
                      </span>
                    </div>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-medium text-[#F5F5F5]">
                      {step.summary}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#92929C]">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
