'use client';

import React, { useEffect, useState } from 'react';
import { Globe2 } from 'lucide-react';

/**
 * Lightweight visitor-region accent rendered above the hero.
 *
 * Uses Intl.DateTimeFormat().resolvedOptions().timeZone to map the
 * visitor's local clock to a FlyttGo deployment region. No IP
 * geolocation, no tracking, no third-party call. The mapping is a
 * conservative approximation — when the timezone doesn't fall in a
 * known FlyttGo cluster the accent quietly hides.
 *
 * On the server-side render the value is null so the band only
 * appears post-hydration. That's intentional — it prevents layout
 * shift on slow networks and keeps the SSR HTML identical for every
 * cache key.
 */

type RegionAccent = {
  code: 'EU-N' | 'EU-W' | 'NA-W' | 'NA-E' | 'SA' | 'AF' | 'MENA' | 'APAC' | 'OCE';
  label: string;
  primary: string;
};

const TZ_TO_REGION: Array<[RegExp, RegionAccent]> = [
  [/^Europe\/(Oslo|Stockholm|Copenhagen|Helsinki|Reykjavik)$/, { code: 'EU-N', label: 'Nordic EU primary', primary: 'Oslo · Stockholm · primary EU region' }],
  [/^Europe\/(London|Dublin|Lisbon)$/, { code: 'EU-W', label: 'UK & Western Europe', primary: 'London · UK + Commonwealth' }],
  [/^Europe\//, { code: 'EU-W', label: 'Mainland EU', primary: 'Frankfurt · Amsterdam · mainland EU' }],
  [/^America\/(Los_Angeles|Vancouver|Tijuana|Phoenix|Denver)$/, { code: 'NA-W', label: 'North America · West', primary: 'San Francisco · customer-cloud west' }],
  [/^America\/(New_York|Toronto|Chicago|Mexico_City|Detroit|Boston)$/, { code: 'NA-E', label: 'North America · East', primary: 'Northern Virginia · Toronto edge' }],
  [/^America\/(Sao_Paulo|Buenos_Aires|Santiago|Bogota|Lima|Caracas)$/, { code: 'SA', label: 'Latin America', primary: 'São Paulo · LatAm hub' }],
  [/^Africa\/(Johannesburg|Cape_Town|Maputo)$/, { code: 'AF', label: 'Southern Africa', primary: 'Johannesburg · sovereign · ZA' }],
  [/^Africa\/(Nairobi|Dar_es_Salaam|Addis_Ababa|Kampala)$/, { code: 'AF', label: 'East Africa', primary: 'Nairobi · East Africa hub' }],
  [/^Africa\/(Lagos|Accra|Casablanca|Algiers|Tunis|Cairo)$/, { code: 'AF', label: 'North & West Africa', primary: 'Lagos · Cairo · regional edge' }],
  [/^(Asia\/Dubai|Asia\/Riyadh|Asia\/Qatar|Asia\/Kuwait|Asia\/Bahrain|Asia\/Muscat)$/, { code: 'MENA', label: 'GCC & MENA', primary: 'Dubai · Riyadh · sovereign' }],
  [/^Asia\/(Singapore|Tokyo|Seoul|Hong_Kong|Taipei|Bangkok|Kuala_Lumpur|Manila|Jakarta)$/, { code: 'APAC', label: 'APAC', primary: 'Singapore · Tokyo · APAC hub' }],
  [/^Asia\/(Kolkata|Calcutta|Karachi|Dhaka|Colombo)$/, { code: 'APAC', label: 'South Asia', primary: 'Mumbai · South Asia' }],
  [/^Australia\//, { code: 'OCE', label: 'Australia & Oceania', primary: 'Sydney · Oceania' }],
  [/^Pacific\//, { code: 'OCE', label: 'Pacific', primary: 'Sydney · Pacific' }],
];

function detect(): RegionAccent | null {
  if (typeof Intl === 'undefined') return null;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return null;
    for (const [re, accent] of TZ_TO_REGION) {
      if (re.test(tz)) return accent;
    }
  } catch {
    return null;
  }
  return null;
}

export default function VisitorRegionAccent() {
  const [accent, setAccent] = useState<RegionAccent | null>(null);

  useEffect(() => {
    setAccent(detect());
  }, []);

  if (!accent) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300 shadow-sm"
    >
      <Globe2 size={11} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
      <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
        {accent.code}
      </span>
      <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
      <span className="normal-case tracking-tight text-slate-700 dark:text-slate-300">
        Nearest deployment region: {accent.primary}
      </span>
    </div>
  );
}
