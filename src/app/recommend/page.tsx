import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import RecommendEngine from '@/components/flytt/RecommendEngine';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Sparkles,
  Compass,
  Cpu,
  ShieldCheck,
  Calculator,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Deployment recommendation engine · RC.00 — FlyttGo Technologies Group',
  description:
    'Tier + substrate + module-bundle recommendation tailored to your programme inputs. Streamed live by Claude, anchored to the FlyttGo platform shape, downloadable as Markdown.',
  alternates: { canonical: '/recommend' },
};

type Beat = { code: string; icon: LucideIcon; title: string; body: string };

const BEATS: Beat[] = [
  {
    code: 'RC.B1', icon: Sparkles,
    title: 'Tailored to your inputs',
    body: 'Seven inputs drive the model — programme, jurisdiction, vertical, scale, sensitivity, modules-of-interest, organisation. Output is structured against the FlyttGo tier ladder, deployment substrate menu and module catalog.',
  },
  {
    code: 'RC.B2', icon: ShieldCheck,
    title: 'Anchored to real shapes',
    body: 'Recommendations cite tier codes (L.01-L.06), substrate codes (DM.01-04), engagement cadence (SE.D1-3) and section codes that route to the right page. Reviewers can trace every claim.',
  },
  {
    code: 'RC.B3', icon: Cpu,
    title: 'Provenance-tracked',
    body: 'Every recommendation logged to /governance/ai/artefacts with a SHA-256 content hash. Reviewers verify the artefact has not been tampered with; ties into the broader AIBOM (AG.00).',
  },
  {
    code: 'RC.B4', icon: Workflow,
    title: 'Routes onward, not in circles',
    body: 'Output ends with explicit next-step routing — sandbox / artefact-generator / consultation — so the recommendation kicks off real engagement rather than leaving the visitor at a download.',
  },
];

export default function RecommendPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Recommendation engine', href: '/recommend' },
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
          code="RC.00"
          eyebrow="Deployment recommendation engine"
          title={
            <>
              Tier + substrate + modules,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                tailored to your programme.
              </em>
            </>
          }
          description="Seven inputs in. A 7-section streaming recommendation out — recommended tier (L.01-L.06), substrate (DM.01-04), module bundle, engagement cadence, indicative pricing pointer, vertical-specific caveats and explicit next-step routing. Downloadable as Markdown; logged to the AI artefact registry."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Recommendation engine' }]}
        />

        {/* RC.SF — the surface */}
        <Reveal>
          <section
            id="rc-sf"
            aria-labelledby="rc-sf-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-6">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">RC.SF</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="rc-sf-heading">Live recommendation engine</span>
              </div>
              <RecommendEngine />
            </div>
          </section>
        </Reveal>

        {/* RC.BT — beats */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">RC.BT</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Four guarantees</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Recommendation,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  not a suggestion engine.
                </em>
              </h2>
              <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {BEATS.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li
                      key={b.code}
                      className="flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-10 h-10 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {b.code}
                        </span>
                      </div>
                      <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                        {b.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="RC.NX"
            eyebrow="Where the recommendation goes next"
            titleLead="A recommendation is the start of"
            titleEmphasis="a real procurement engagement."
            intro="The output is structured to route onward. The four pathways below take a recommendation into the surfaces it cites."
            steps={[
              { href: '/sandbox',      code: 'SB.SP', icon: Cpu,         title: 'Spin up a sandbox',     body: '60-second sandbox with the recommended modules pre-seeded; drive them via the operator console.', meta: 'SB.SP · 7-day TTL' },
              { href: '/ask-flyttgo',  code: 'AS.00', icon: Sparkles,    title: 'Generate procurement artefacts', body: 'Take the recommended shape and generate CAIQ + RFP + custom proposal with the same context.', meta: 'AS.00 · 3 artefacts' },
              { href: '/pricing',      code: 'PR.00', icon: Calculator,  title: 'Live pricing',          body: 'Per-tier + per-region pricing band live; total + delivery window updates as you adjust modules.',  meta: 'PR.00 · live · exportable' },
              { href: '/consultation', code: 'CB.00', icon: Compass,     title: 'Open scoping',          body: 'Five-step intake routes the recommended programme under CT.01 platform architecture.',          meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
