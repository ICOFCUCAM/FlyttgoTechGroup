import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { VERTICALS } from '@/data/verticals';
import {
  ArrowUpRight,
  ShieldCheck,
  Globe2,
  Compass,
  Layers3,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Vertical accelerators · VT.00 — FlyttGo Technologies Group',
  description:
    'Sector-specific FlyttGo deployment accelerators. Three verticals — defense + intelligence, healthcare + life sciences, financial services — with regulatory framework alignment, recommended substrate, module fit, risk register and procurement routes.',
  alternates: { canonical: '/verticals' },
};

const SUBSTRATE_LABEL: Record<string, string> = {
  'DM.02': 'Customer cloud',
  'DM.03': 'Sovereign datacenter',
  'DM.04': 'Confidential compute',
};

export default function VerticalsIndexPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Verticals', href: '/verticals' },
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
          code="VT.00"
          eyebrow="Vertical accelerators"
          title={
            <>
              Three sector accelerators,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                regulator-aligned by default.
              </em>
            </>
          }
          description="Defense + intelligence, healthcare + life sciences, financial services — three verticals where regulatory posture is the gating factor on procurement. Each accelerator pre-aligns the deployment substrate, module fit, regulatory frameworks and procurement routes so the conversation starts at scoping, not framework discovery."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Verticals' }]}
        />

        <Reveal>
          <section
            id="vt-idx"
            aria-labelledby="vt-idx-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">VT.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="vt-idx-heading">Vertical index</span>
              </div>
              <ul className="mt-12 grid md:grid-cols-3 gap-4">
                {VERTICALS.map((v) => (
                  <li key={v.slug}>
                    <Link
                      href={`/verticals/${v.slug}`}
                      className="group flex flex-col h-full p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-3xl" aria-hidden="true">{v.emoji}</span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {v.code}
                        </span>
                      </div>
                      <h3 className="mt-4 font-serif text-xl font-medium tracking-tight text-slate-900 dark:text-white">
                        {v.name}
                      </h3>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {v.audience}
                      </div>
                      <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                        {v.positioning}
                      </p>
                      <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          {v.typicalTier} · {v.recommendedSubstrate} {SUBSTRATE_LABEL[v.recommendedSubstrate] ?? ''}
                        </span>
                        <ArrowUpRight
                          size={13}
                          className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="VT.NX"
            eyebrow="Where vertical accelerators plug in"
            titleLead="Sector posture connects to the"
            titleEmphasis="rest of the platform stack."
            intro="Each vertical accelerator anchors a programme to a deployment substrate, a tier, a module bundle and a regulatory framework. The four pathways below take a vertical-led conversation deeper."
            steps={[
              { href: '/jurisdictions',  code: 'JU.00', icon: Globe2,      title: 'Jurisdictions',     body: 'Per-jurisdiction procurement framework alignment cross-references the vertical posture above.', meta: 'JU.00 · 6 jurisdictions' },
              { href: '/customers',      code: 'CS.00', icon: Layers3,     title: 'Reference programmes', body: 'Six anonymised programmes; many tagged to a vertical (defense, healthcare, financial).',       meta: 'CS.00 · 6 programmes' },
              { href: '/trust',          code: 'TC.00', icon: ShieldCheck, title: 'Trust artefacts',    body: 'SOC 2, ISO 27001, DPA, subprocessors, vulnerability disclosure — sector-specific addenda available.', meta: 'TC.00 · 8 artefacts' },
              { href: '/consultation',   code: 'CB.00', icon: Compass,     title: 'Open vertical scoping', body: 'Five-step intake routes a sector-led discussion under the right CT category.',                  meta: 'CT.01 · CT.03 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
