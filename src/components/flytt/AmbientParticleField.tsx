'use client';

import React from 'react';

/**
 * Ambient particle field — a slow-drifting cloud of dots rendered on
 * a `<canvas>` and absolutely-positioned behind dark hero sections.
 *
 * No WebGL — plain Canvas 2D, ~3 KB gzipped, GPU-accelerated by the
 * browser when the canvas is composited. 200 particles by default,
 * each with its own velocity vector. Wraps at the edges so the field
 * looks infinite. Honours prefers-reduced-motion: the canvas renders
 * one static frame and stops. Hidden when the device opts out of
 * decorative motion entirely.
 *
 * Drop into the very first child of any dark section (FinalCTA,
 * HomeOrchestrationCore, hero) — pointer-events:none so it never
 * intercepts clicks.
 */

type Props = {
  /** Particle count. 100–250 is the sweet spot. */
  count?: number;
  /** Particle base color. Defaults to soft Nordic blue. */
  color?: string;
  /** Optional className appended to the wrapper div. */
  className?: string;
};

export default function AmbientParticleField({
  count = 200,
  color = '#9ED0F9',
  className = '',
}: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let resizeObserver: ResizeObserver | null = null;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    let particles: Particle[] = [];

    function dpr() {
      return Math.min(window.devicePixelRatio || 1, 2);
    }

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const px = dpr();
      canvas.width = Math.max(1, Math.round(rect.width * px));
      canvas.height = Math.max(1, Math.round(rect.height * px));
      ctx.setTransform(px, 0, 0, px, 0, 0);
    }

    function spawn() {
      const rect = canvas!.getBoundingClientRect();
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.12,
        r: 0.6 + Math.random() * 1.4,
        alpha: 0.12 + Math.random() * 0.42,
      }));
    }

    function frame(now: number) {
      if (!canvas || !ctx) return;
      const dt = Math.min(64, now - last);
      last = now;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx * (dt / 16);
          p.y += p.vy * (dt / 16);
          // Wrap edges so the field reads as infinite.
          if (p.x < -2) p.x = rect.width + 2;
          else if (p.x > rect.width + 2) p.x = -2;
          if (p.y < -2) p.y = rect.height + 2;
          else if (p.y > rect.height + 2) p.y = -2;
        }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    }

    resize();
    spawn();
    raf = requestAnimationFrame(frame);

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resize();
        spawn();
      });
      resizeObserver.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
    };
  }, [count, color, reduced]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
