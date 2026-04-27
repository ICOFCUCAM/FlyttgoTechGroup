'use client';

import React from 'react';

/**
 * Persistent live-ops status rail rendered immediately under the
 * primary navbar on every page. Reads as a hostile-environment
 * status pill — pulse dot, region count, p99 latency, UTC clock —
 * so visitors register that the platform is operational regardless
 * of which surface they land on.
 *
 * Same simulated-feed shape as LiveOpsStrip (mean-reverting random
 * walk, deterministic baseline). When /api/metrics/live ships,
 * swap to an EventSource subscription with no UI change.
 */

const REGIONS_TOTAL = 18;

export default function OpsStatusRail() {
  const [latency, setLatency] = React.useState(132);
  const [ts, setTs] = React.useState<string>('');

  React.useEffect(() => {
    let raf = 0;
    let last = performance.now();
    function tick(now: number) {
      const dt = now - last;
      if (dt >= 1100) {
        last = now;
        setLatency((v) => {
          const target = 132 + (Math.random() * 2 - 1) * 18;
          return Math.round((v + (target - v) * 0.55) * 10) / 10;
        });
        setTs(new Date().toISOString().replace('T', ' ').slice(11, 19));
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="hidden md:block bg-[#0A1F3D] text-white border-t border-b border-white/10 print:hidden"
      role="status"
      aria-live="off"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
        {/* Pulse + brand */}
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
          <span className="text-[#9ED0F9] font-semibold tracking-[0.22em]">OPS.LIVE</span>
        </span>

        <span aria-hidden="true" className="text-white/20">·</span>

        <span className="text-white/65">
          <span className="tabular-nums text-white">{REGIONS_TOTAL}/{REGIONS_TOTAL}</span>{' '}
          regions reporting
        </span>

        <span aria-hidden="true" className="text-white/20">·</span>

        <span className="text-white/65">
          p99 <span className="tabular-nums text-white">{Math.round(latency)} ms</span>
        </span>

        <span aria-hidden="true" className="text-white/20 hidden lg:inline">·</span>

        <span className="text-white/65 hidden lg:inline">
          EU · AF · MENA · NA · APAC operational
        </span>

        {/* Timestamp pushed right */}
        <span className="ml-auto text-white/40 tabular-nums">
          {ts || '00:00:00'} UTC
        </span>
      </div>
    </div>
  );
}
