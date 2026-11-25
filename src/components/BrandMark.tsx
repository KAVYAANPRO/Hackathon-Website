"use client";

import { motion, useReducedMotion } from "motion/react";

interface BrandMarkProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

/**
 * Custom AH Monogram inspired by Ahmedabad's stepwell geometry and Sidi Saiyyed lattice precision.
 */
export function BrandMark({
  size = 36,
  animated = false,
  className = "",
}: BrandMarkProps) {
  const shouldReduceMotion = useReducedMotion();
  const animateDraw = animated && !shouldReduceMotion;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Outer chamfered architectural frame */}
      <motion.path
        d="M10 2H54L62 10V54L54 62H10L2 54V10L10 2Z"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        initial={animateDraw ? { pathLength: 0 } : undefined}
        animate={animateDraw ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Inner 'A' structural spire */}
      <motion.path
        d="M16 48L28 16H33L39 32"
        stroke="#F5F5F5"
        strokeWidth="3.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        initial={animateDraw ? { pathLength: 0 } : undefined}
        animate={animateDraw ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* 'H' vertical & stepped crossbar in signal orange */}
      <motion.path
        d="M36 16V48M48 16V48M22 35H48"
        stroke="#FF5C00"
        strokeWidth="3.2"
        strokeLinecap="square"
        initial={animateDraw ? { pathLength: 0 } : undefined}
        animate={animateDraw ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Precision corner node */}
      <rect x="52" y="8" width="4" height="4" fill="#FF5C00" />
    </svg>
  );
}

export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-[family-name:var(--font-display)] tracking-tight ${className}`}
    >
      <BrandMark size={30} />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#F5F5F5]">
          Amdavad<span className="text-[#FF5C00]">Hacks</span>
        </span>
        <span className="font-mono text-[10px] tracking-[0.22em] text-[#92929C]">
          2027 // AMD
        </span>
      </span>
    </span>
  );
}
