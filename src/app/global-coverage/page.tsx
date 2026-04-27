import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import WorldDeploymentMap from '@/components/flytt/diagrams/WorldDeploymentMap';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Global coverage — FlyttGo deployment footprint',
  description:
    'Nordic EU deployment readiness, Africa rollout compatibility, MENA infrastructure availability, APAC SaaS — the FlyttGo platform infrastructure footprint.',
  alternates: { canonical: '/global-coverage' },
};

const ROLLOUT_ROWS = [
  { region: 'Nordic EU',     code: 'EU-N',   primary: 'Oslo · Stockholm', tier: 'Primary',     readiness: 'Operational' },
  { region: 'Western EU',    code: 'EU-W',   primary: 'London · Frankfurt · Amsterdam', tier: 'Primary', readiness: 'Operational' },
  { region: 'North America', code: 'NA',     primary: 'San Francisco · Northern Virginia', tier: 'SaaS', readiness: 'Operational' },
  { region: 'Latin America', code: 'SA',     primary: 'São Paulo', tier: 'Secondary', readiness: 'Available on request' },
  { region: 'East Africa',   code: 'AF-E',   primary: 'Nairobi · Kampala · Addis Ababa', tier: 'Secondary', readiness: 'Rollout active' },
  { region: 'West Africa',   code: 'AF-W',   primary: 'Lagos · Yaoundé', tier: 'Secondary', readiness: 'Rollout active' },
  { region: 'Southern Africa', code: 'AF-S', primary: 'Johannesburg', tier: 'Sovereign', readiness: 'Sovereign environment' },
  { region: 'GCC / MENA',    code: 'MENA',   primary: 'Dubai · Riyadh · Cairo', tier: 'Sovereign', readiness: 'Sovereign environment' },
  { region: 'South Asia',    code: 'APAC-S', primary: 'Mumbai', tier: 'Secondary', readiness: 'Operational' },
  { region: 'East Asia',     code: 'APAC-E', primary: 'Tokyo · Singapore', tier: 'Primary', readiness: 'Operational' },
  { region: 'Oceania',       code: 'OCE',    primary: 'Sydney', tier: 'Secondary', readiness: 'Operational' },
];

export default function GlobalCoveragePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <section className="relative pt-14 lg:pt-20 pb-10 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GC.00</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Global coverage</span>
            </div>
            <h1 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-3xl">
              Where FlyttGo{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                already runs.
              </em>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65]">
              Eleven regions, three deployment tiers. Primary regions
              operate the SaaS surface; secondary regions provide edge
              presence; sovereign environments host data and workloads
              entirely inside the destination jurisdiction.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm overflow-hidden">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">WM.00</span>
                <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
                Deployment topology
              </div>
              <WorldDeploymentMap className="overflow-x-auto" />
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GC.MX</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Rollout architecture matrix
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
              Region · tier · readiness.
            </h2>
            <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900">
              <table className="w-full text-sm tabular-nums">
                <thead className="bg-slate-50 dark:bg-slate-900/80 text-left">
                  <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    <th className="px-4 py-3 w-44">Region</th>
                    <th className="px-4 py-3 w-24">Code</th>
                    <th className="px-4 py-3">Primary cities</th>
                    <th className="px-4 py-3 w-32">Tier</th>
                    <th className="px-4 py-3 w-44">Readiness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                  {ROLLOUT_ROWS.map((r) => (
                    <tr key={r.code}>
                      <td className="px-4 py-2.5 text-slate-800 dark:text-slate-200">{r.region}</td>
                      <td className="px-4 py-2.5 font-mono font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{r.code}</td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400 text-[13px]">{r.primary}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em]">
                        <span className={
                          r.tier === 'Sovereign' ? 'text-violet-700 dark:text-violet-400'
                          : r.tier === 'Primary' ? 'text-[#0A3A6B] dark:text-[#9ED0F9]'
                          : r.tier === 'SaaS' ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-slate-500'
                        }>{r.tier}</span>
                      </td>
                      <td className="px-4 py-2.5 text-[13px] text-slate-600 dark:text-slate-400">{r.readiness}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
              Tier flags carry through to procurement framework selection
              and the data-residency posture on each deployment.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-3 gap-4">
            <Link href="/sovereign" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SV.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Sovereign deployment</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">National hosting + data-residency posture.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">Posture detail <ArrowUpRight size={11} /></span>
            </Link>
            <Link href="/procurement-compatibility" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PC.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Procurement compatibility</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">DPS · G-Cloud · OJEU · national frameworks.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">Contracting routes <ArrowUpRight size={11} /></span>
            </Link>
            <Link href="/sustainability" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400 font-semibold">CO2.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Carbon disclosure</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">Per-page footprint + per-region grid intensity.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-700 dark:text-emerald-400">View dashboard <ArrowUpRight size={11} /></span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
