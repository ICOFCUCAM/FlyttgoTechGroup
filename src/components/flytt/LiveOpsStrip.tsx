'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Globe2, Gauge, Network } from 'lucide-react';

/**
 * Live operations strip — sits below the hero on the home page.
 *
 * Today the values are simulated client-side (deterministic walks
 * around realistic baselines so the page still feels alive without a
 * back-end metrics endpoint). When `/api/metrics/live` ships as a
 * Server-Sent Events stream, swap the simulator for an EventSource
 * subscription — the rendering surface is already shaped for that.
 *
 * The strip is decorative — every metric carries a "simulated demo"
 * micro-disclosure so visitors don't read the numbers as live SLA
 * data until the real feed lands.
 */

type Metric = {
  code: string;
  label: string;
  unit: string;
  icon: typeof Activity;
  baseline: number;
  jitter: number;
  formatter?: (n: number) => string;
};

const METRICS: Metric[] = [
  {
    code: 'OPS.01',
    label: 'Transactions / sec',
    unit: 'tx/s',
    icon: Activity,
    baseline: 4280,
    jitter: 320,
    formatter: (n) => Math.round(n).toLocaleString('en-US'),
  },
  {
    code: 'OPS.02',
    label: 'Active deployments',
    unit: 'live',
    icon: Network,
    baseline: 184,
    jitter: 4,
    formatter: (n) => Math.round(n).toLocaleString('en-US'),
  },
  {
    code: 'OPS.03',
    label: 'Regions reporting',
    unit: 'rgn',
    icon: Globe2,
    baseline: 18,
    jitter: 0,
    formatter: (n) => `${Math.round(n)} / 18`,
  },
  {
    code: 'OPS.04',
    label: 'p99 API latency',
    unit: 'ms',
    icon: Gauge,
    baseline: 132,
    jitter: 18,
    formatter: (n) => `${Math.round(n)} ms`,
  },
];

function useSimulatedFeed(): number[] {
  const [values, setValues] = useState<number[]>(METRICS.map((m) => m.baseline));

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = now - last;
      if (dt >= 1100) {
        last = now;
        setValues((prev) =>
          prev.map((v, i) => {
            const m = METRICS[i];
            if (m.jitter === 0) return m.baseline;
            // Mean-reverting random walk so values don't drift.
            const target = m.baseline + (Math.random() * 2 - 1) * m.jitter;
            return v + (target - v) * 0.55;
          }),
        );
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return values;
}

export default function LiveOpsStrip() {
  const values = useSimulatedFeed();
  const generatedAt = useTimestamp();

  return (
    <section
      aria-labelledby="live-ops-heading"
      className="relative bg-[#0A1F3D] text-white border-y border-white/10 overflow-hidden"
    >
      {/* Faint scanline pattern — gives the band a "telemetry" feel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-7">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/55 mb-5">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse"
            />
            <span className="text-[#9ED0F9] font-semibold">OPS.LIVE</span>
          </span>
          <span aria-hidden="true" className="flex-1 h-px bg-white/15 max-w-[120px]" />
          <span id="live-ops-heading" className="normal-case tracking-tight text-white/80 text-[11px]">
            FlyttGo infrastructure operational across EU · Africa · MENA deployment regions
          </span>
          <span aria-hidden="true" className="flex-1 h-px bg-white/15 max-w-[120px]" />
          <span className="hidden md:inline tracking-[0.16em] text-white/40">
            {generatedAt}
          </span>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            const display = m.formatter ? m.formatter(values[i]) : Math.round(values[i]).toString();
            return (
              <li
                key={m.code}
                className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-start gap-3"
              >
                <span
                  className="w-9 h-9 rounded-lg bg-[#9ED0F9]/15 text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                    <span className="text-[#9ED0F9] font-semibold">{m.code}</span>
                    <span aria-hidden="true" className="mx-2 text-white/30">·</span>
                    {m.label}
                  </div>
                  <div className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
                    {display}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 leading-relaxed">
          Simulated demo telemetry · live feed lands with the public
          metrics endpoint. SLA dashboards on /status.
        </p>
      </div>
    </section>
  );
}

function useTimestamp(): string {
  const [ts, setTs] = useState<string>('');
  useEffect(() => {
    function update() {
      const now = new Date();
      setTs(
        now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      );
    }
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);
  return ts;
}
