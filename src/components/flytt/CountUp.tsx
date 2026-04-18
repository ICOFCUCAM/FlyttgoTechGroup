'use client';

import React, { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  /** Optional aria-label; falls back to the rendered string. */
  ariaLabel?: string;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Count-up counter that animates from 0 to `to` when scrolled into view.
 * Honours prefers-reduced-motion by snapping to the final value.
 */
export function CountUp({
  to,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  ariaLabel,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.unobserve(node);

        const startTime = performance.now();
        const step = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / duration, 1);
          setValue(to * easeOut(t));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [to, duration]);

  const formatted =
    value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const full = `${prefix}${formatted}${suffix}`;

  return (
    <span ref={ref} className={className} aria-label={ariaLabel ?? full}>
      <span aria-hidden="true">{full}</span>
    </span>
  );
}
