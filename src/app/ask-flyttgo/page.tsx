import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import AskFlyttGoSurface from '@/components/flytt/AskFlyttGoSurface';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Sparkles,
  ShieldCheck,
  FileText,
  Briefcase,
  Compass,
  Cpu,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AI procurement assistant · AS.00 — FlyttGo Technologies Group',
  description:
    'Generate CAIQ security questionnaires, RFP responses and tailored procurement proposals — streamed live, signed for provenance, downloadable as Markdown. Anchored against the FlyttGo trust artefacts.',
  alternates: { canonical: '/ask-flyttgo' },
};

type Beat = { code: string; icon: LucideIcon; title: string; body: string };

const BEATS: Beat[] = [
  {
    code: 'AS.B1', icon: Sparkles,
    title: 'Streamed live · 30-90 seconds',
    body: 'Artefacts stream chunk-by-chunk to the surface. Stop mid-stream if the direction is wrong; restart with new inputs.',
  },
  {
    code: 'AS.B2', icon: ShieldCheck,
    title: 'Grounded in the trust framework',
    body: 'System prompt anchored against the FlyttGo knowledge base + trust posture. The model cites section codes (TC.00, AP.RF, DM.04) so reviewers can trace claims.',
  },
  {
    code: 'AS.B3', icon: FileText,
    title: 'Markdown · downloadable · auditable',
    body: 'Output ships as Markdown ready to paste into Notion, Word or PDF tooling. Provenance manifest signed alongside under /governance/ai (AG.00) once GA.',
  },
  {
    code: 'AS.B4', icon: Briefcase,
    title: 'Indicative · countersigned at SE.D2',
    body: 'Generated artefacts are indicative procurement-grade drafts. Final countersigned versions land during the scoping engagement (SE.D2) under MNDA.',
  },
];

export default function AskFlyttGoPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'AI procurement assistant', href: '/ask-flyttgo' },
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
          code="AS.00"
          eyebrow="AI procurement assistant"
          title={
            <>
              Three artefacts,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                streamed in 90 seconds.
              </em>
            </>
          }
          description="CAIQ security questionnaires, RFP responses and tailored procurement proposals — generated live by Claude, grounded in the FlyttGo trust framework, downloadable as Markdown. Procurement-grade first pass; countersigned drafts during scoping (SE.D2)."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'AI procurement assistant' }]}
        />

        {/* AS.SF — the surface */}
        <Reveal>
          <section
            id="as-sf"
            aria-labelledby="as-sf-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-6">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AS.SF</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="as-sf-heading">Live artefact generator</span>
              </div>
              <AskFlyttGoSurface />
            </div>
          </section>
        </Reveal>

        {/* AS.BT — beats */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AS.BT</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Four guarantees</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Real assistant,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  not a chatbot in costume.
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
            code="AS.NX"
            eyebrow="Where the artefact goes next"
            titleLead="Generated drafts feed into"
            titleEmphasis="real procurement engagement."
            intro="The artefact is the start of a conversation, not the end. The four pathways below take an AI-generated draft into the procurement engagement that countersigns it."
            steps={[
              { href: '/governance/ai', code: 'AG.00', icon: ShieldCheck, title: 'AI governance',    body: 'AIBOM, model cards, EU AI Act risk-tier classification — every AI artefact is provenance-tracked.', meta: 'AG.00 · 8 surfaces' },
              { href: '/agents',        code: 'AI.00', icon: Cpu,         title: 'Agent surface',     body: 'Drive the platform via MCP. Pair the assistant with a sandbox token to act on live data.',                meta: 'AI.00 · MCP · scopes' },
              { href: '/trust',         code: 'TC.00', icon: ShieldCheck, title: 'Trust artefacts',   body: 'The evidence the model cites. SOC 2, ISO 27001, DPA, subprocessors — live downloads.',                       meta: 'TC.00 · 8 artefacts' },
              { href: '/consultation',  code: 'CB.00', icon: Compass,     title: 'Open scoping',      body: 'Five-step intake routes a draft artefact under CT.01 platform architecture session — countersigned at SE.D2.', meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
