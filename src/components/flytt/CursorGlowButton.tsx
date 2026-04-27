'use client';

import React from 'react';

/**
 * Cursor-follow gradient button — the Vercel / Linear pattern.
 *
 * Tracks the pointer position over the button and renders a soft
 * radial gradient at that location. Gives the CTA a "live, premium"
 * feel without animation noise. Honours prefers-reduced-motion: the
 * gradient still tracks but stays at the centre when no pointer is
 * present.
 *
 * Use as a drop-in replacement for any anchor that needs the
 * institutional-deployment commanding look.
 */

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export default function CursorGlowButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: Props) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  function onLeave() {
    setPos(null);
  }

  const base =
    variant === 'primary'
      ? 'bg-[#0A3A6B] text-white hover:bg-[#0a2f57]'
      : 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900';

  const glowColor =
    variant === 'primary' ? 'rgba(158, 208, 249, 0.45)' : 'rgba(30, 111, 217, 0.18)';

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold motion-safe:transition-colors overflow-hidden ${base} ${className}`}
    >
      {pos && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 motion-safe:transition-opacity"
          style={{
            background: `radial-gradient(140px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 60%)`,
          }}
        />
      )}
      <span className="relative inline-flex items-center gap-1.5">{children}</span>
    </a>
  );
}
