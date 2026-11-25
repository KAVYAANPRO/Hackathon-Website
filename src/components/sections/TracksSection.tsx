"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { eventConfig, type TrackItem } from "@/config/event";

function TrackGeometry({ type }: { type: TrackItem["accentGeometry"] }) {
  switch (type) {
    case "lattice":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
          <rect x="8" y="8" width="48" height="48" stroke="currentColor" strokeOpacity="0.3" />
          <polygon points="32,12 52,32 32,52 12,32" stroke="#FF5C00" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="5" fill="#FF5C00" />
        </svg>
      );
    case "circuit":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
          <path d="M12 20H32V44H52" stroke="#FF5C00" strokeWidth="1.5" />
          <path d="M12 44H24V20H52" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="12" cy="20" r="3" fill="#FF5C00" />
          <circle cx="52" cy="44" r="3" fill="#F5F5F5" />
        </svg>
      );
    case "pulse":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
          <path d="M6 32H18L24 16L32 48L40 24L46 32H58" stroke="#FF5C00" strokeWidth="1.75" />
          <rect x="8" y="8" width="48" height="48" stroke="currentColor" strokeOpacity="0.2" />
        </svg>
      );
    case "helix":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="20" stroke="currentColor" strokeOpacity="0.3" />
          <circle cx="32" cy="32" r="12" stroke="#FF5C00" strokeDasharray="4 3" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="3.5" fill="#FFB36B" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
          <path d="M32 8L52 16V32C52 44 42 52 32 56C22 52 12 44 12 32V16L32 8Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M32 16L44 21V31C44 39 38 44 32 47C26 44 20 39 20 31V21L32 16Z" stroke="#FF5C00" strokeWidth="1.5" />
        </svg>
      );
    case "prism":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
          <polygon points="32,10 54,50 10,50" stroke="#FF5C00" strokeWidth="1.5" />
          <polygon points="32,22 44,44 20,44" stroke="currentColor" strokeOpacity="0.4" />
        </svg>
      );
  }
}

export function TracksSection() {
  const [activeId, setActiveId] = useState<string>(eventConfig.tracks[0].id);
  const shouldReduceMotion = useReducedMotion();

  const activeTrack =
    eventConfig.tracks.find((t) => t.id === activeId) ?? eventConfig.tracks[0];

  return (
    <section
      id="tracks"
      className="relative border-b border-white/10 bg-[#070709] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#92929C]">
          <span>02 // HACKATHON TRACKS</span>
          <span className="border border-[#FFB36B]/40 bg-[#FFB36B]/10 px-2.5 py-0.5 text-[10px] text-[#FFB36B]">
            PROPOSED DOMAINS — SUBJECT TO FINALIZATION
          </span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#F5F5F5]">
            SIX ARENAS FOR{" "}
            <span className="text-[#FF5C00]">HIGH-IMPACT</span> BUILDING.
          </h2>
          <p className="mt-4 text-base text-[#92929C]">
            Select a proposed track to inspect its problem space and technical
            focus areas. Final problem statements and partner challenges will be
            released closer to the event.
          </p>
        </div>

        {/* Desktop: Horizontal Interactive Selector + Detail Stage */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
          <div
            className="col-span-5 flex flex-col border border-white/10 bg-[#101014]"
            role="tablist"
            aria-label="Proposed Hackathon Tracks"
          >
            {eventConfig.tracks.map((track) => {
              const isSelected = track.id === activeId;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveId(track.id)}
                  className={`group flex min-h-[72px] items-center justify-between border-b border-white/8 px-5 py-4 text-left transition-colors last:border-b-0 ${
                    isSelected
                      ? "bg-[#16161c] text-[#F5F5F5]"
                      : "text-[#92929C] hover:bg-white/[0.02] hover:text-[#F5F5F5]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs ${
                        isSelected ? "text-[#FF5C00]" : "text-[#92929C]"
                      }`}
                    >
                      {track.code}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
                      {track.title}
                    </span>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${
                      isSelected
                        ? "translate-x-0 text-[#FF5C00]"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            className="col-span-7 flex flex-col justify-between border border-white/10 bg-[#101014] p-8"
          >
            <motion.div
              key={activeTrack.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[#F5F5F5]">
                    <TrackGeometry type={activeTrack.accentGeometry} />
                  </div>
                  <span className="border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#FFB36B]">
                    {activeTrack.status === "proposed"
                      ? "Proposed Track"
                      : "Confirmed"}
                  </span>
                </div>

                <div className="mt-8">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF5C00]">
                    {activeTrack.code}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#F5F5F5]">
                    {activeTrack.title}
                  </h3>
                  <p className="mt-3 text-lg text-[#F5F5F5]/90">
                    {activeTrack.tagline}
                  </p>
                  <p className="mt-4 leading-relaxed text-[#92929C]">
                    {activeTrack.description}
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#92929C]">
                  Proposed Focus Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="border border-white/12 bg-[#070709] px-3 py-1.5 font-mono text-xs text-[#F5F5F5]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile & Tablet: Intuitive Vertical Expandable Stack */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {eventConfig.tracks.map((track) => {
            const isOpen = track.id === activeId;
            return (
              <div
                key={track.id}
                className="border border-white/10 bg-[#101014]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveId(isOpen ? "" : track.id)}
                  className="flex min-h-[64px] w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <TrackGeometry type={track.accentGeometry} />
                    <div>
                      <span className="block font-mono text-[11px] text-[#FF5C00]">
                        {`${track.code} // PROPOSED`}
                      </span>
                      <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#F5F5F5]">
                        {track.title}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-lg text-[#92929C]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-white/8 px-5 py-4 text-sm text-[#92929C]">
                    <p className="text-[#F5F5F5]">{track.tagline}</p>
                    <p className="mt-2 leading-relaxed">{track.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {track.focusAreas.map((area) => (
                        <span
                          key={area}
                          className="border border-white/12 bg-[#070709] px-2.5 py-1 font-mono text-[11px] text-[#F5F5F5]"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
