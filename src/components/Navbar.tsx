"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandWordmark } from "./BrandMark";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Tracks", href: "/#tracks" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "FAQs", href: "/#faqs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  const mobileOpen = openPath === pathname;
  const setMobileOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    setOpenPath((prev) => {
      const currentOpen = prev === pathname;
      const resolved = typeof next === "function" ? next(currentOpen) : next;
      return resolved ? pathname : null;
    });
  };
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 px-4 sm:px-6 lg:px-10"
          : "py-5 px-4 sm:px-6 lg:px-10"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between border transition-all duration-300 ${
          scrolled
            ? "border-white/12 bg-[#070709]/88 px-4 py-2.5 backdrop-blur-md"
            : "border-white/8 bg-[#070709]/55 px-4 py-3 backdrop-blur-sm"
        }`}
      >
        <Link
          href="/"
          aria-label="AmdavadHacks 2027 Home"
          className="inline-flex min-h-[40px] items-center"
        >
          <BrandWordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[#92929C] transition-colors hover:text-[#F5F5F5]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/partners"
            className="px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[#92929C] transition-colors hover:text-[#FFB36B]"
          >
            Partner
          </Link>
          <Link
            href="/register"
            className="inline-flex min-h-[40px] items-center gap-2 border border-[#FF5C00] bg-[#FF5C00] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#070709] transition-colors hover:bg-[#FFB36B] hover:border-[#FFB36B]"
          >
            Register Interest
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-white/15 bg-[#101014] text-[#F5F5F5] lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-7xl border border-white/12 bg-[#070709]/96 p-5 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col divide-y divide-white/8">
              {navLinks.map((link, idx) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[48px] items-center justify-between py-3 font-mono text-sm uppercase tracking-[0.16em] text-[#F5F5F5] hover:text-[#FF5C00]"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#92929C]">
                      0{idx + 1}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/partners"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[48px] items-center justify-between py-3 font-mono text-sm uppercase tracking-[0.16em] text-[#FFB36B]"
                >
                  <span>Become a Partner</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
            <div className="mt-4 pt-2">
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#FF5C00] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#070709]"
              >
                Register Interest
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
