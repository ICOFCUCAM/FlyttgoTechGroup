'use client';

import React, { useMemo, useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import {
  ArrowUpRight,
  TrendingDown,
  Calculator,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

/**
 * RO.00 — Live TCO calculator.
 *
 * Compares 3 procurement paths over a 1 / 3 / 5-year horizon:
 *
 *   1. FlyttGo (per the existing tier ladder + indicative bands)
 *   2. Build-from-scratch (in-house engineering team + cloud + integration cost)
 *   3. Hybrid stack (named competitors bundled — Palantir / Stripe / AWS components)
 *
 * Every coefficient is illustrative; the real model lands during the
 * scoping engagement (SE.D2). The page exists to give procurement a
 * defensible first-pass number to circulate.
 */

type Tier = 'L.03' | 'L.04' | 'L.05' | 'L.06';
type Region = 'eu' | 'mena' | 'africa';

const TIER_BASE_EU: Record<Tier, number> = {
  'L.03': 22_000,
  'L.04': 80_000,
  'L.05': 480_000,
  'L.06': 1_750_000,
};

const REGION_MULT: Record<Region, number> = {
  eu:     1.00,
  mena:   1.10,
  africa: 0.55,
};

// Annual operate cost as a fraction of the build cost (for FlyttGo) or
// of the per-year delivery for the alternatives.
const FLYTTGO_OPERATE_FRACTION_PER_YEAR = 0.18;
const BUILD_OPERATE_FRACTION_PER_YEAR   = 0.32;
const HYBRID_OPERATE_FRACTION_PER_YEAR  = 0.26;

// Capability premium for build-from-scratch and hybrid relative to
// FlyttGo's tier base. Real Big-4 build-vs-buy literature sits in
// the 2.4×-4.1× range for institutional platforms; we land mid-range.
const BUILD_PREMIUM = 3.2;
const HYBRID_PREMIUM = 1.95;

// Time-to-production multiplier on tier delivery window (months).
const TIER_TTM_MONTHS: Record<Tier, number> = {
  'L.03': 2,
  'L.04': 4,
  'L.05': 9,
  'L.06': 12,
};
const BUILD_TTM_FACTOR = 3.4;
const HYBRID_TTM_FACTOR = 1.8;

const TEAM_SIZE: Record<Tier, { flyttgo: number; build: number; hybrid: number }> = {
  'L.03': { flyttgo: 2,  build: 7,  hybrid: 4  },
  'L.04': { flyttgo: 3,  build: 14, hybrid: 8  },
  'L.05': { flyttgo: 5,  build: 32, hybrid: 18 },
  'L.06': { flyttgo: 8,  build: 64, hybrid: 38 },
};

const MODULE_OPTIONS: Array<{ id: string; label: string; addEU: number }> = [
  { id: 'identra',  label: 'Identra · Identity',     addEU: 8_000 },
  { id: 'payvera',  label: 'Payvera · Payments',     addEU: 12_000 },
  { id: 'transify', label: 'Transify · Mobility',    addEU: 14_000 },
  { id: 'civitas',  label: 'Civitas · Government',   addEU: 24_000 },
  { id: 'edupro',   label: 'EduPro · Education',     addEU: 10_000 },
  { id: 'workverge', label: 'Workverge · Workforce', addEU: 10_000 },
  { id: 'ledgera',  label: 'Ledgera · Financial Ops', addEU: 9_000 },
  { id: 'flyttgo',  label: 'FlyttGo Marketplace',     addEU: 28_000 },
];

const fmtCurrency = (n: number, currency = 'EUR') =>
  new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(n);

export default function RoiCalculator() {
  const [tier, setTier] = useState<Tier>('L.04');
  const [region, setRegion] = useState<Region>('eu');
  const [horizon, setHorizon] = useState<1 | 3 | 5>(3);
  const [modules, setModules] = useState<string[]>(['identra', 'payvera']);

  const calc = useMemo(() => {
    const tierBaseEU = TIER_BASE_EU[tier];
    const moduleAddEU = MODULE_OPTIONS
      .filter((m) => modules.includes(m.id))
      .reduce((sum, m) => sum + m.addEU, 0);
    const baseRegional = (tierBaseEU + moduleAddEU) * REGION_MULT[region];

    // FlyttGo: build cost (year 1) + operate cost per year * (horizon - 1)
    const fgBuild   = baseRegional;
    const fgOperate = fgBuild * FLYTTGO_OPERATE_FRACTION_PER_YEAR;
    const fgTotal   = fgBuild + fgOperate * (horizon - 1);

    // Build-from-scratch: heavy build, heavy operate
    const bdBuild   = baseRegional * BUILD_PREMIUM;
    const bdOperate = bdBuild * BUILD_OPERATE_FRACTION_PER_YEAR;
    const bdTotal   = bdBuild + bdOperate * (horizon - 1);

    // Hybrid: medium build + medium operate
    const hyBuild   = baseRegional * HYBRID_PREMIUM;
    const hyOperate = hyBuild * HYBRID_OPERATE_FRACTION_PER_YEAR;
    const hyTotal   = hyBuild + hyOperate * (horizon - 1);

    const ttmFG    = TIER_TTM_MONTHS[tier];
    const ttmBuild = Math.round(ttmFG * BUILD_TTM_FACTOR);
    const ttmHybrid = Math.round(ttmFG * HYBRID_TTM_FACTOR);

    const team = TEAM_SIZE[tier];

    const savingsVsBuild  = bdTotal - fgTotal;
    const savingsVsHybrid = hyTotal - fgTotal;
    const pctVsBuild      = (savingsVsBuild  / bdTotal) * 100;
    const pctVsHybrid     = (savingsVsHybrid / hyTotal) * 100;

    return {
      flyttgo:  { build: fgBuild, operate: fgOperate, total: fgTotal,    ttm: ttmFG,     team: team.flyttgo },
      build:    { build: bdBuild, operate: bdOperate, total: bdTotal,    ttm: ttmBuild,  team: team.build },
      hybrid:   { build: hyBuild, operate: hyOperate, total: hyTotal,    ttm: ttmHybrid, team: team.hybrid },
      savings: {
        vsBuild:  { abs: savingsVsBuild,  pct: pctVsBuild  },
        vsHybrid: { abs: savingsVsHybrid, pct: pctVsHybrid },
      },
    };
  }, [tier, region, horizon, modules]);

  const toggleModule = (id: string) =>
    setModules((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]));

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_30px_120px_-50px_rgba(10,58,107,0.20)] overflow-hidden">
      {/* Inputs panel */}
      <div className="grid lg:grid-cols-12">
        <aside className="lg:col-span-4 p-6 lg:p-7 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold mb-4">
            RO.IN · inputs
          </div>

          <Group label="Engagement tier" code="RO.I1">
            <div className="grid grid-cols-4 gap-1.5">
              {(['L.03', 'L.04', 'L.05', 'L.06'] as Tier[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  className={`px-2 py-2 rounded-md font-mono text-[11px] uppercase tracking-[0.14em] motion-safe:transition-colors ${
                    tier === t
                      ? 'bg-[#0A3A6B] text-white dark:bg-[#9ED0F9]/20 dark:text-white border border-[#0A3A6B] dark:border-[#9ED0F9]'
                      : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Group>

          <Group label="Region" code="RO.I2">
            <div className="grid grid-cols-3 gap-1.5">
              {(['eu', 'mena', 'africa'] as Region[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={`px-2 py-2 rounded-md font-mono text-[11px] uppercase tracking-[0.14em] motion-safe:transition-colors ${
                    region === r
                      ? 'bg-[#0A3A6B] text-white dark:bg-[#9ED0F9]/20 dark:text-white border border-[#0A3A6B] dark:border-[#9ED0F9]'
                      : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </Group>

          <Group label="Horizon" code="RO.I3">
            <div className="grid grid-cols-3 gap-1.5">
              {([1, 3, 5] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHorizon(h)}
                  className={`px-2 py-2 rounded-md font-mono text-[11px] uppercase tracking-[0.14em] motion-safe:transition-colors ${
                    horizon === h
                      ? 'bg-[#0A3A6B] text-white dark:bg-[#9ED0F9]/20 dark:text-white border border-[#0A3A6B] dark:border-[#9ED0F9]'
                      : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {h} {h === 1 ? 'year' : 'years'}
                </button>
              ))}
            </div>
          </Group>

          <Group label="Modules" code="RO.I4">
            <div className="grid grid-cols-1 gap-1">
              {MODULE_OPTIONS.map((m) => {
                const active = modules.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleModule(m.id)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-[12px] motion-safe:transition-colors ${
                      active
                        ? 'bg-[#0A3A6B]/10 dark:bg-[#9ED0F9]/10 border border-[#0A3A6B]/30 dark:border-[#9ED0F9]/30 text-slate-900 dark:text-white'
                        : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {active ? <CheckCircle2 size={11} className="text-[#0A3A6B] dark:text-[#9ED0F9] flex-shrink-0" /> : <span className="w-2.5 h-2.5 rounded-sm border border-slate-300 dark:border-slate-700 flex-shrink-0" aria-hidden="true" />}
                    <span className="font-medium tracking-tight flex-1 truncate">{m.label}</span>
                    <span className="font-mono text-[10px] text-slate-400">+{(m.addEU / 1000).toFixed(0)}k EU</span>
                  </button>
                );
              })}
            </div>
          </Group>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
            Indicative ±15 %. Real model lands during the scoping engagement (SE.D2).
          </p>
        </aside>

        {/* Outputs panel */}
        <div className="lg:col-span-8 p-6 lg:p-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold mb-4">
            RO.OT · {horizon}-year TCO
          </div>

          {/* Headline savings */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Headline
              accent="brand"
              eyebrow={`Saved vs build · ${horizon}y`}
              big={fmtCurrency(calc.savings.vsBuild.abs)}
              pct={calc.savings.vsBuild.pct}
            />
            <Headline
              accent="amber"
              eyebrow={`Saved vs hybrid · ${horizon}y`}
              big={fmtCurrency(calc.savings.vsHybrid.abs)}
              pct={calc.savings.vsHybrid.pct}
            />
          </div>

          {/* TCO matrix */}
          <div className="mt-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  <th className="px-4 py-3 font-semibold">Procurement path</th>
                  <th className="px-4 py-3 font-semibold text-right">Year 1 build</th>
                  <th className="px-4 py-3 font-semibold text-right">Operate / yr</th>
                  <th className="px-4 py-3 font-semibold text-right">{horizon}y TCO</th>
                  <th className="px-4 py-3 font-semibold text-right">TTM (mo)</th>
                  <th className="px-4 py-3 font-semibold text-right">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                <Row name="FlyttGo · this platform"   path={calc.flyttgo} highlight />
                <Row name="Build from scratch"          path={calc.build} />
                <Row name="Hybrid · Palantir + AWS + Stripe components" path={calc.hybrid} />
              </tbody>
            </table>
          </div>

          {/* Cost composition bars */}
          <div className="mt-6 space-y-2.5">
            <Bar label="FlyttGo"      total={calc.flyttgo.total} maxTotal={calc.build.total} colour="#0A3A6B" />
            <Bar label="Hybrid"        total={calc.hybrid.total} maxTotal={calc.build.total} colour="#D6B575" />
            <Bar label="Build"         total={calc.build.total}  maxTotal={calc.build.total} colour="#94A3B8" />
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
            Build-from-scratch baseline assumes a {calc.build.team}-engineer team at L.04 fully-loaded
            European rate plus cloud + integration overhead.
            Hybrid baseline assumes a smaller team coordinating named-vendor components.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/consultation?intent=tco-review"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A3A6B] text-white text-sm font-semibold rounded-lg hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
            >
              <Sparkles size={14} aria-hidden="true" />
              Get a tailored TCO brief
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold rounded-lg hover:border-slate-300 motion-safe:transition-colors"
            >
              <Calculator size={14} aria-hidden="true" />
              Live pricing configurator
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const Group: React.FC<{ label: string; code: string; children: React.ReactNode }> = ({ label, code, children }) => (
  <div className="mt-4">
    <div className="flex items-baseline justify-between mb-1.5">
      <span className="text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">{label}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">{code}</span>
    </div>
    {children}
  </div>
);

const Headline: React.FC<{ accent: 'brand' | 'amber'; eyebrow: string; big: string; pct: number }> = ({ accent, eyebrow, big, pct }) => {
  const cls = accent === 'brand' ? 'border-[#0A3A6B]/30 bg-[#0A3A6B]/5 dark:bg-[#9ED0F9]/5' : 'border-[#D6B575]/40 bg-[#D6B575]/8';
  const tone = accent === 'brand' ? 'text-[#0A3A6B] dark:text-[#9ED0F9]' : 'text-[#A38545] dark:text-[#D6B575]';
  return (
    <div className={`p-5 rounded-2xl border ${cls}`}>
      <div className={`font-mono text-[10px] uppercase tracking-[0.18em] font-semibold ${tone}`}>
        {eyebrow}
      </div>
      <div className="mt-2 font-serif text-3xl font-medium text-slate-900 dark:text-white tabular-nums leading-none">
        {big}
      </div>
      <div className={`mt-2 inline-flex items-center gap-1 font-mono text-[11px] tabular-nums ${tone}`}>
        <TrendingDown size={11} aria-hidden="true" />
        {pct.toFixed(0)}% lower
      </div>
    </div>
  );
};

const Row: React.FC<{ name: string; path: { build: number; operate: number; total: number; ttm: number; team: number }; highlight?: boolean }> = ({ name, path, highlight }) => (
  <tr className={highlight ? 'bg-[#0A3A6B]/4 dark:bg-[#9ED0F9]/4' : ''}>
    <td className={`px-4 py-3 align-top text-[13px] ${highlight ? 'font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]' : 'text-slate-700 dark:text-slate-300'}`}>
      {name}
    </td>
    <td className="px-4 py-3 align-top text-right font-mono text-[12px] tabular-nums text-slate-700 dark:text-slate-300">{fmtCurrency(path.build)}</td>
    <td className="px-4 py-3 align-top text-right font-mono text-[12px] tabular-nums text-slate-600 dark:text-slate-400">{fmtCurrency(path.operate)}</td>
    <td className={`px-4 py-3 align-top text-right font-mono text-[13px] tabular-nums font-semibold ${highlight ? 'text-[#0A3A6B] dark:text-[#9ED0F9]' : 'text-slate-900 dark:text-white'}`}>{fmtCurrency(path.total)}</td>
    <td className="px-4 py-3 align-top text-right font-mono text-[11px] tabular-nums text-slate-500">{path.ttm}</td>
    <td className="px-4 py-3 align-top text-right font-mono text-[11px] tabular-nums text-slate-500">{path.team}</td>
  </tr>
);

const Bar: React.FC<{ label: string; total: number; maxTotal: number; colour: string }> = ({ label, total, maxTotal, colour }) => {
  const pct = (total / maxTotal) * 100;
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-1">
        <span className="text-[12px] font-medium tracking-tight text-slate-700 dark:text-slate-300">{label}</span>
        <span className="font-mono text-[11px] tabular-nums text-slate-500">{fmtCurrency(total)}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800/60 overflow-hidden">
        <div
          className="h-full rounded-full motion-safe:transition-all"
          style={{ width: `${pct}%`, backgroundColor: colour }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
