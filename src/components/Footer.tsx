"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { eventConfig } from "@/config/event";
import { BrandWordmark } from "./BrandMark";

export function Footer() {
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  return (
    <footer className="bg-[#070709] pt-16 pb-10 text-sm text-[#92929C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandWordmark />
            <p className="mt-4 max-w-sm leading-relaxed text-[#92929C]">
              {eventConfig.brand.primaryTagline}{" "}
              {eventConfig.brand.secondaryTagline}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-[#92929C]">
              {eventConfig.brand.city}, {eventConfig.brand.region} •{" "}
              {eventConfig.dates.tentativeWindow}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#F5F5F5]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/#about" className="hover:text-[#FF5C00]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#tracks" className="hover:text-[#FF5C00]">
                  Tracks
                </Link>
              </li>
              <li>
                <Link href="/#journey" className="hover:text-[#FF5C00]">
                  Journey
                </Link>
              </li>
              <li>
                <Link href="/#schedule" className="hover:text-[#FF5C00]">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-[#FF5C00]">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#F5F5F5]">
              Action &amp; Governance
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/register" className="text-[#FF5C00] hover:underline">
                  Register Interest
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-[#FFB36B]">
                  Partnership Enquiries
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#F5F5F5]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F5F5F5]">
                  Terms &amp; Code of Conduct
                </Link>
              </li>
              <li className="pt-1 font-mono text-xs text-[#92929C]">
                {eventConfig.contact.officialEmailApproved &&
                eventConfig.contact.officialEmail
                  ? eventConfig.contact.officialEmail
                  : "Official contact channels: Awaiting approval"}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-[#92929C]">
            © {eventConfig.brand.year} {eventConfig.brand.edition}. All rights
            reserved.
          </p>

          <button
            type="button"
            onClick={() => setEasterEggOpen((v) => !v)}
            aria-expanded={easterEggOpen}
            className="inline-flex min-h-[36px] items-center gap-2 border border-white/10 bg-[#101014] px-3 py-1.5 font-mono text-[11px] text-[#92929C] transition-colors hover:border-[#FF5C00]/50 hover:text-[#F5F5F5]"
          >
            <Terminal className="h-3.5 w-3.5 text-[#FF5C00]" aria-hidden="true" />
            <span>ah --spec 2027</span>
          </button>
        </div>

        {easterEggOpen && (
          <div className="mt-4 border border-[#FF5C00]/30 bg-[#101014] p-4 font-mono text-xs text-[#F5F5F5]">
            <p className="text-[#FF5C00]">
              &gt; AMDAVADHACKS_SYSTEM_DIAGNOSTIC // v2027.0-alpha
            </p>
            <p className="mt-1 text-[#92929C]">
              COORDS: {eventConfig.brand.coordinates} | MOTIF: VAV_LATTICE |
              STATUS: READY_FOR_BUILDERS
            </p>
            <p className="mt-1 text-[#FFB36B]">
              &quot;The City Builds. The Future Follows.&quot;
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
