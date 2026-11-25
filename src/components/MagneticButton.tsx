"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

export function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !window.matchMedia("(pointer: fine)").matches)
    ) {
      return;
    }

    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex min-h-[48px] items-center justify-center gap-2.5 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200 select-none";

  const variantStyles = {
    primary:
      "bg-[#FF5C00] text-[#070709] hover:bg-[#FFB36B] active:bg-[#FF5C00] border border-[#FF5C00]",
    secondary:
      "bg-[#101014] text-[#F5F5F5] border border-white/20 hover:border-[#FF5C00] hover:text-[#FFB36B]",
    ghost:
      "bg-transparent text-[#F5F5F5] border border-transparent hover:border-white/15 hover:text-[#FF5C00]",
  }[variant];

  const innerStyle = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition:
      offset.x === 0 && offset.y === 0
        ? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
        : "transform 0.08s linear",
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <Link
          href={href}
          aria-label={ariaLabel}
          style={innerStyle}
          className={`${baseStyles} ${variantStyles} ${className}`}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          style={innerStyle}
          className={`${baseStyles} ${variantStyles} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
          {children}
        </button>
      )}
    </div>
  );
}
