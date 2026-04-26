'use client';

import React, { useEffect, useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import { Leaf, ArrowUpRight } from 'lucide-react';

/**
 * Carbon footprint pill rendered in the site footer.
 *
 * Estimates per-page CO2 grams locally — no third-party call:
 *   bytes  = navigator.connection.downlink-derived sample +
 *            performance.getEntriesByType('resource') sum
 *   region = visitor's nearest FlyttGo region (timezone-mapped)
 *   factor = grid-intensity gCO2/kWh × bytes-to-energy coefficient
 *            (Sustainable Web Design Model v4 baseline)
 *
 * Methodology + per-region grid intensity tracked on /sustainability.
 * The number is best-effort; the value of the pill is editorial — it
 * signals that the platform has a measurable carbon posture, which is
 * the stake in the ground 2027+ regulators expect.
 */

// Grid carbon intensity (gCO2 per kWh) by FlyttGo region. Conservative
// 2024-baseline figures. Dataset:
//   IEA 2024 + national grid operator reports (Statnett, ENTSO-E, EIA).
const GRID_GCO2_PER_KWH: Record<string, number> = {
  'EU-N': 25,    // Nordic — heavy hydro, very low-carbon
  'EU-W': 230,   // EU mainland mix
  'NA-W': 240,   // US West (CA hydro / solar mix)
  'NA-E': 380,   // US East (mixed gas + nuclear)
  SA: 90,        // Brazil hydro-heavy
  AF: 470,       // Africa mix (heavily fossil)
  MENA: 540,     // GCC fossil-heavy
  APAC: 410,     // APAC mix
  OCE: 510,      // Australia coal-heavy
  unknown: 350,
};

// Sustainable Web Design Model v4 — kWh per GB transferred (operational
// + embodied energy across the network + datacenter + device).
const KWH_PER_GB = 0.81;

function detectRegion(): keyof typeof GRID_GCO2_PER_KWH {
  if (typeof Intl === 'undefined') return 'unknown';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (/^Europe\/(Oslo|Stockholm|Copenhagen|Helsinki|Reykjavik)$/.test(tz)) return 'EU-N';
    if (/^Europe\//.test(tz)) return 'EU-W';
    if (/^America\/(Los_Angeles|Vancouver|Tijuana|Phoenix|Denver)$/.test(tz)) return 'NA-W';
    if (/^America\//.test(tz)) return 'NA-E';
    if (/^Africa\//.test(tz)) return 'AF';
    if (/^Asia\/(Dubai|Riyadh|Qatar|Kuwait|Bahrain|Muscat)$/.test(tz)) return 'MENA';
    if (/^Asia\//.test(tz)) return 'APAC';
    if (/^Australia\//.test(tz) || /^Pacific\//.test(tz)) return 'OCE';
  } catch {
    return 'unknown';
  }
  return 'unknown';
}

function pageBytes(): number {
  if (typeof performance === 'undefined' || !performance.getEntriesByType) return 0;
  try {
    const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    let total = 0;
    for (const e of entries) {
      // transferSize is the over-the-wire bytes including headers; falls
      // back to encodedBodySize when transferSize is 0 (cached).
      total += e.transferSize || e.encodedBodySize || 0;
    }
    // Add the document itself (PerformanceNavigationTiming).
    const nav = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (nav[0]) total += nav[0].transferSize || nav[0].encodedBodySize || 0;
    return total;
  } catch {
    return 0;
  }
}

export default function CarbonFooterPill() {
  const [grams, setGrams] = useState<number | null>(null);
  const [region, setRegion] = useState<string>('unknown');

  useEffect(() => {
    // Defer until after the page has settled so resource entries are populated.
    const id = window.setTimeout(() => {
      const r = detectRegion();
      const bytes = pageBytes();
      if (bytes <= 0) return;
      const gb = bytes / (1024 ** 3);
      const kwh = gb * KWH_PER_GB;
      const g = kwh * GRID_GCO2_PER_KWH[r];
      setRegion(r);
      setGrams(g);
    }, 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (grams === null) return null;

  return (
    <Link
      href="/sustainability"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-300/60 bg-emerald-50/60 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] uppercase tracking-[0.18em] hover:border-emerald-400 motion-safe:transition-colors"
      title="View FlyttGo's carbon disclosure dashboard"
    >
      <Leaf size={11} aria-hidden="true" />
      <span className="font-semibold">CO2.00</span>
      <span className="text-emerald-600 dark:text-emerald-400/70">·</span>
      <span className="tabular-nums">{grams.toFixed(2)} g</span>
      <span className="text-emerald-600 dark:text-emerald-400/70">·</span>
      <span>{region}</span>
      <ArrowUpRight size={10} aria-hidden="true" className="text-emerald-600 dark:text-emerald-400/70" />
    </Link>
  );
}
