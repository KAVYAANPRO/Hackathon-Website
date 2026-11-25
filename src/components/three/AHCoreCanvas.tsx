"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { AHCoreScene } from "./AHCoreScene";

interface AHCoreCanvasProps {
  variant?: "hero" | "finale";
  scrollProgress?: number;
  className?: string;
}

function StaticCoreFallback() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 320"
        className="h-72 w-72 sm:h-88 sm:w-88 opacity-85"
        fill="none"
      >
        <polygon
          points="160,18 260,60 302,160 260,260 160,302 60,260 18,160 60,60"
          stroke="rgba(245,245,245,0.22)"
          strokeWidth="1.5"
        />
        <polygon
          points="160,48 240,80 272,160 240,240 160,272 80,240 48,160 80,80"
          stroke="#FF5C00"
          strokeOpacity="0.65"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
        <polygon
          points="160,82 228,160 160,238 92,160"
          fill="rgba(255,92,0,0.08)"
          stroke="#F5F5F5"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <circle cx="160" cy="160" r="18" fill="#FF5C00" fillOpacity="0.85" />
      </svg>
    </div>
  );
}

export function AHCoreCanvas({
  variant = "hero",
  scrollProgress = 0,
  className = "",
}: AHCoreCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canRender3D, setCanRender3D] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      return;
    }

    const rafId = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (gl) {
          setCanRender3D(true);
        }
      } catch {
        // Fallback remains active
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const onVisibilityChange = () => {
      setTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const active = canRender3D && inView && tabVisible;

  return (
    <div ref={containerRef} className={`relative h-full w-full ${className}`}>
      {!canRender3D ? (
        <StaticCoreFallback />
      ) : (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 5.2], fov: 42 }}
          frameloop={active ? "always" : "never"}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.25,
          }}
          aria-hidden="true"
        >
          <AHCoreScene variant={variant} scrollProgress={scrollProgress} />
        </Canvas>
      )}
    </div>
  );
}
