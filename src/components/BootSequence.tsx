"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandMark } from "./BrandMark";

const STORAGE_KEY = "ah27_boot_seen";

export function BootSequence() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      return;
    }

    const start = performance.now();
    const duration = 1150;
    let rafId = 0;

    const tick = (now: number) => {
      setVisible(true);
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 180);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Initializing AmdavadHacks 2027"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#070709] px-6"
        >
          <div className="w-full max-w-sm border border-white/10 bg-[#101014]/90 p-6">
            <div className="mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#92929C]">
              <span>AH // SYS_INIT</span>
              <span className="text-[#FF5C00]">23.0225°N 72.5714°E</span>
            </div>

            <div className="my-8 flex flex-col items-center gap-4">
              <BrandMark size={64} animated />
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold uppercase tracking-[0.22em] text-[#F5F5F5]">
                Amdavad<span className="text-[#FF5C00]">Hacks</span> 2027
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#92929C]">
                <span>ENGINEER THE IMPOSSIBLE</span>
                <span className="tabular-nums text-[#F5F5F5]">{progress}%</span>
              </div>
              <div className="h-[2px] w-full overflow-hidden bg-white/10">
                <div
                  className="h-full bg-[#FF5C00] transition-[width] duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
