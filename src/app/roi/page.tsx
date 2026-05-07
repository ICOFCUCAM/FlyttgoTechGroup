import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import RoiCalculator from '@/components/flytt/RoiCalculator';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Calculator,
  Scale,
  Compass,
  Sparkles,
  type LucideIcon,
  Workflow,
  Layers3,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ROI / TCO calculator · RO.00 — FlyttGo Technologies Group',
  description:
    'Live total-cost-of-ownership calculator. Compare 1 / 3 / 5-year TCO of FlyttGo against build-from-scratch and a hybrid stack of named-vendor components. Tier, region, modules — all live.',
  alternates: { canonical: '/roi' },
};

type Method = { code: string; icon: LucideIcon; title: string; body: string };

const METHOD: Method[] = [
  { code: 'RO.M1', icon: Calculator, title: 'Three procurement paths', body: 'FlyttGo (the live tier ladder), build-from-scratch (in-house team + cloud + integration), hybrid (named-vendor components — Palantir + AWS + Stripe).' },
  { code: 'RO.M2', icon: Scale,      title: 'Five-input matrix',        body: 'Tier (L.03 → L.06), region (EU / MENA / Africa), horizon (1 / 3 / 5 years), module bundle, team size — every input drives the model live.' },
  { code: 'RO.M3', icon: Sparkles,   title: 'Build vs. operate split',  body: 'Year-1 build cost separated from per-year operate cost. Highlights the long-tail run-rate institutional buyers underestimate.' },
];

export default function RoiPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'ROI / TCO calculator', href: '/roi' },
  ]);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="RO.00"
          eyebrow="ROI / TCO calculator"
          title={
            <>
              1, 3 and 5-year TCO,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                three procurement paths.
              </em>
            </>
          }
          description="Procurement boards compare three paths every time: build-from-scratch, hybrid stack from named vendors, or platform like FlyttGo. The calculator below sizes all three live across the same tier, region and module bundle — defensible first-pass numbers procurement can circulate."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'ROI / TCO calculator' }]}
        />

        {/* RO.CL — calculator */}
        <Reveal>
          <section
            id="ro-cl"
            aria-labelledby="ro-cl-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-6">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">RO.CL</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="ro-cl-heading">Live calculator</span>
              </div>
              <RoiCalculator />
            </div>
          </section>
        </Reveal>

        {/* RO.MT — methodology */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">RO.MT</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Methodology</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Defensible first-pass,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  not the final number.
                </em>
              </h2>
              <ul className="mt-12 grid md:grid-cols-3 gap-3">
                {METHOD.map((m) => {
                  const Icon = m.icon;
                  return (
                    <li
                      key={m.code}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-10 h-10 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {m.code}
                        </span>
                      </div>
                      <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {m.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
                Coefficients track Big-4 build-vs-buy literature for institutional platforms.
                Indicative ±15 %. Final number lands on the order form after the scoping
                engagement (SE.D2).
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="RO.NX"
            eyebrow="Where the TCO conversation goes next"
            titleLead="A defensible first number is"
            titleEmphasis="just the start of procurement."
            intro="Once the TCO read lands, the next decisions are around modules, deployment substrate and engagement intake. The four pathways below take a procurement team from this calculator to a signed engagement."
            steps={[
              { href: '/pricing',      code: 'PR.00', icon: Calculator, title: 'Live pricing configurator', body: 'Drill into the FlyttGo build-cost side — pick tier, modules, deployment substrate, region.', meta: 'PR.00 · live · exportable' },
              { href: '/compare',      code: 'CP.00', icon: Scale,      title: 'Honest comparisons',         body: 'Side-by-side vs Stripe Atlas, Palantir Foundry, Databricks, AWS Marketplace.',                  meta: 'CP.00 · 4 comparators' },
              { href: '/customers',    code: 'CS.00', icon: Layers3,    title: 'Reference programmes',      body: 'Six anonymised programmes with delivered metrics — what a real engagement looked like.',         meta: 'CS.00 · 6 programmes' },
              { href: '/consultation', code: 'CB.00', icon: Compass,    title: 'Get a tailored brief',      body: 'Five-step intake routes a TCO review under CT.01 platform architecture session.',                meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
