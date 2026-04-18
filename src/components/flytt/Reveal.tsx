'use client';

import React, { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  /** Threshold of the element that must be visible to trigger the reveal. */
  threshold?: number;
  /** Additional root margin offset — negative values delay the reveal until the element is further in view. */
  rootMargin?: string;
};

/**
 * Scroll-triggered fade-up wrapper. Reveals once on enter and disconnects the
 * observer. Respects prefers-reduced-motion by skipping the transition
 * entirely (we let CSS handle that via `motion-safe:`).
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  threshold = 0.12,
  rootMargin = '0px 0px -10% 0px',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return React.createElement(
    Tag,
    {
      ref,
      style: { transitionDelay: `${delay}ms` },
      className:
        'motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ' +
        (revealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 motion-safe:translate-y-4') +
        (className ? ` ${className}` : ''),
    },
    children,
  );
}
