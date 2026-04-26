import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Leaf, Cpu, Globe2, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sustainability — FlyttGo Technologies',
  description:
    'Per-page carbon disclosure, regional grid intensity, and the FlyttGo platform carbon posture. Methodology grounded in the Sustainable Web Design Model v4.',
  alternates: { canonical: '/sustainability' },
};

const REGIONS = [
  { code: 'EU-N',  label: 'Nordic EU',           gco2: 25,  note: 'Hydro-dominant grid, near zero-carbon' },
  { code: 'EU-W',  label: 'Western Europe',      gco2: 230, note: 'EU mainland mix' },
  { code: 'NA-W',  label: 'North America · West', gco2: 240, note: 'CA hydro + solar mix' },
  { code: 'NA-E',  label: 'North America · East', gco2: 380, note: 'Mixed gas + nuclear' },
  { code: 'SA',    label: 'South America',       gco2: 90,  note: 'Brazil hydro-heavy' },
  { code: 'AF',    label: 'Africa',              gco2: 470, note: 'Heavily fossil; offset programmes available' },
  { code: 'MENA',  label: 'Middle East · GCC',   gco2: 540, note: 'Fossil-heavy; sovereign deployments only' },
  { code: 'APAC',  label: 'Asia-Pacific',        gco2: 410, note: 'Mixed; coal share decreasing year-on-year' },
  { code: 'OCE',   label: 'Oceania',             gco2: 510, note: 'Coal-heavy; renewable transition under way' },
];

export default function SustainabilityPage() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        {/* Hero */}
        <section className="relative pt-14 lg:pt-20 pb-10 bg-gradient-to-b from-emerald-50/40 to-white dark:from-emerald-900/10 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                CO2.00
              </span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Carbon disclosure</span>
            </div>
            <h1 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-3xl">
              Carbon you can{' '}
              <em className="not-italic font-serif italic font-normal text-emerald-700 dark:text-emerald-400">
                actually compute.
              </em>
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65] max-w-2xl">
              Every page in this site reports its own carbon footprint in
              the footer pill. The number is computed locally from
              transferred bytes × regional grid intensity, with no
              third-party tracking. The methodology is published below.
            </p>
          </div>
        </section>

        {/* CO2.01 — Methodology */}
        <section className="py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">CO2.01</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Methodology</span>
            </div>
            <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
              <h2 className="lg:col-span-7 font-serif text-2xl md:text-3xl font-medium tracking-tight leading-[1.1]">
                Sustainable Web Design Model v4{' '}
                <em className="not-italic font-serif italic font-normal text-emerald-700 dark:text-emerald-400">
                  baseline.
                </em>
              </h2>
              <p className="lg:col-span-5 text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">
                The footer pill multiplies transferred bytes by a published
                kWh-per-GB coefficient and the visitor&apos;s nearest grid&apos;s
                gCO2/kWh figure. No estimation of device-side energy or
                upstream embodied carbon — those land in a v2 of this
                disclosure.
              </p>
            </div>

            <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { code: 'M.01', icon: Globe2, title: 'Region detection', body: 'Visitor timezone → nearest FlyttGo region. No IP geolocation, no third-party API.' },
                { code: 'M.02', icon: Cpu, title: 'Bytes transferred', body: 'performance.getEntriesByType(\'resource\') sum + navigation entry. Cached resources contribute zero.' },
                { code: 'M.03', icon: Wind, title: 'Energy coefficient', body: 'Sustainable Web Design Model v4: 0.81 kWh per GB transferred end-to-end.' },
                { code: 'M.04', icon: Leaf, title: 'Grid intensity', body: 'Per-region gCO2/kWh from IEA 2024 + national grid operator publications.' },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <li key={m.code} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-700 dark:text-emerald-400 font-semibold">
                        {m.code}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold tracking-tight">{m.title}</h3>
                    <p className="mt-1 text-[13px] text-slate-600 dark:text-slate-400 leading-snug">{m.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* CO2.02 — Regional grid intensity table */}
        <section className="py-14 lg:py-16 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">CO2.02</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Regional grid intensity</span>
            </div>
            <h2 className="mt-6 font-serif text-2xl md:text-3xl font-medium tracking-tight">
              Per-region grid carbon{' '}
              <em className="not-italic font-serif italic font-normal text-emerald-700 dark:text-emerald-400">
                intensity registry.
              </em>
            </h2>

            <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900">
              <table className="w-full text-sm tabular-nums">
                <thead className="bg-slate-50 dark:bg-slate-900/80 text-left">
                  <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    <th className="px-4 py-3 w-24">Region</th>
                    <th className="px-4 py-3 w-56">Label</th>
                    <th className="px-4 py-3 w-32 text-right">gCO2 / kWh</th>
                    <th className="px-4 py-3">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                  {REGIONS.map((r) => (
                    <tr key={r.code}>
                      <td className="px-4 py-2.5 font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                        {r.code}
                      </td>
                      <td className="px-4 py-2.5 text-slate-800 dark:text-slate-200">{r.label}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span
                          className={
                            r.gco2 < 100
                              ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                              : r.gco2 < 350
                                ? 'text-amber-700 dark:text-amber-400'
                                : 'text-rose-700 dark:text-rose-400'
                          }
                        >
                          {r.gco2}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400 text-[13px]">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
              Source: IEA Electricity 2024 + national grid operator
              publications (Statnett, ENTSO-E, EIA, ONS, AEMO). Refreshed
              quarterly. Methodology reviewed annually against the
              Sustainable Web Design Model release cycle.
            </p>
          </div>
        </section>

        {/* CO2.03 — Platform carbon posture */}
        <section className="py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">CO2.03</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Platform carbon posture</span>
            </div>
            <h2 className="mt-6 font-serif text-2xl md:text-3xl font-medium tracking-tight">
              Engineered to choose{' '}
              <em className="not-italic font-serif italic font-normal text-emerald-700 dark:text-emerald-400">
                the lowest-carbon path.
              </em>
            </h2>

            <ul className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                {
                  code: 'PC.01',
                  title: 'Region-aware routing',
                  body: 'Customer-cloud deployments default to the lowest-carbon eligible region unless a data-residency policy overrides. EU-N (25 g) is selected by default for any deployment without a regional constraint.',
                },
                {
                  code: 'PC.02',
                  title: 'Edge-cached HTML',
                  body: 'Marketing pages cached at the edge with stale-while-revalidate so visitor requests rarely round-trip back to origin. Cache headers in middleware.ts; per-locale cache keys via Vary.',
                },
                {
                  code: 'PC.03',
                  title: 'Static-first delivery',
                  body: 'Workspace data is rendered server-side; marketing surface is fully static where possible. View Transitions + Speculation Rules cut perceived navigation latency without extra round-trips.',
                },
              ].map((p) => (
                <li key={p.code} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-700 dark:text-emerald-400 font-semibold">
                    {p.code}
                  </div>
                  <h3 className="mt-3 text-base font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-[13px] text-slate-600 dark:text-slate-400 leading-snug">{p.body}</p>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
              FlyttGo&apos;s annual carbon disclosure (Scope 1, 2, 3) lands
              with the corporate-reporting cycle and is published here
              alongside this dashboard.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
