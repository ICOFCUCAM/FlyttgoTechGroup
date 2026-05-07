import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { getSupabaseServerClient } from '@/lib/supabase';
import {
  ShieldCheck,
  Hash,
  Sparkles,
  ArrowUpRight,
  Cpu,
  Compass,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Artefact provenance registry · AG.AR — FlyttGo Technologies Group',
  description:
    'Public registry of AI-generated procurement artefacts (CAIQ / RFP / proposal / answer) with C2PA-style SHA-256 provenance hashes. Companion to the AIBOM at /governance/ai.',
  alternates: { canonical: '/governance/ai/artefacts' },
};

type Artefact = {
  artefact_code: string;
  artefact_kind: 'caiq' | 'rfp' | 'proposal' | 'answer';
  context: Record<string, unknown>;
  output_sha256: string;
  model: string;
  generated_at: string;
};

const KIND_LABEL: Record<Artefact['artefact_kind'], { label: string; cls: string }> = {
  caiq:     { label: 'CAIQ',          cls: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  rfp:      { label: 'RFP response',  cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  proposal: { label: 'Proposal',      cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  answer:   { label: 'Answer',        cls: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
};

async function loadArtefacts(): Promise<{ artefacts: Artefact[]; backend: 'supabase' | 'synthetic' }> {
  // Direct read against Supabase rather than fetching our own /api/artefacts/list,
  // so the page renders server-side without an extra round-trip. Falls back to an
  // empty list if Supabase isn't configured.
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('ai_artefacts')
      .select('artefact_code, artefact_kind, context, output_sha256, model, generated_at')
      .order('generated_at', { ascending: false })
      .limit(50);

    if (error) throw new Error(error.message);

    const REDACT_KEYS = new Set(['organisation', 'org', 'email', 'intent']);
    const artefacts: Artefact[] = (data ?? []).map((row) => {
      const ctx = (row.context ?? {}) as Record<string, unknown>;
      const redacted = Object.fromEntries(
        Object.entries(ctx).filter(([k]) => !REDACT_KEYS.has(k)),
      );
      return { ...(row as Artefact), context: redacted };
    });
    return { artefacts, backend: 'supabase' };
  } catch {
    return { artefacts: [], backend: 'synthetic' };
  }
}

export default async function ArtefactRegistryPage() {
  // Read headers() so Next.js treats this page as fully dynamic; ensures
  // every visit re-queries the registry.
  headers();
  const { artefacts, backend } = await loadArtefacts();

  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'AI governance', href: '/governance/ai' },
    { name: 'Artefact registry', href: '/governance/ai/artefacts' },
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
          code="AG.AR"
          eyebrow="Artefact provenance registry"
          title={
            <>
              Every AI artefact{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                signed and logged.
              </em>
            </>
          }
          description="C2PA-style SHA-256 provenance hash on every AI-generated CAIQ, RFP, proposal and answer. Companion to the AIBOM at /governance/ai. Anonymised — the buyer-side fields (organisation, intent, email) are stripped before the registry is published."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'AI governance', href: '/governance/ai' },
            { label: 'Artefact registry' },
          ]}
        />

        {/* AG.AR.RG — registry */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AG.AR.RG</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Live registry · last 50 artefacts</span>
              </div>

              {artefacts.length === 0 ? (
                <div className="mt-12 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 p-10 lg:p-14 text-center">
                  <Sparkles size={32} className="text-slate-300 dark:text-slate-700 mx-auto" aria-hidden="true" />
                  <h2 className="mt-4 font-serif text-xl font-medium tracking-tight text-slate-900 dark:text-white">
                    No artefacts logged yet
                  </h2>
                  <p className="mt-3 max-w-md mx-auto text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    Every artefact generated through the AI procurement assistant lands here once
                    Supabase is configured. {backend === 'synthetic' && 'The registry is currently in synthetic-fallback mode — connect Supabase to start logging.'}
                  </p>
                  <Link
                    href="/ask-flyttgo"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    Open the assistant · AS.00
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              ) : (
                <div className="mt-12 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                      <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        <th className="px-4 py-3 font-semibold w-40">Artefact code</th>
                        <th className="px-4 py-3 font-semibold w-28">Kind</th>
                        <th className="px-4 py-3 font-semibold">SHA-256 (provenance)</th>
                        <th className="px-4 py-3 font-semibold w-44">Model</th>
                        <th className="px-4 py-3 font-semibold w-44">Generated at</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                      {artefacts.map((a) => {
                        const k = KIND_LABEL[a.artefact_kind];
                        return (
                          <tr key={a.artefact_code} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                            <td className="px-4 py-3 font-mono text-[11px] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                              {a.artefact_code}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${k.cls}`}>
                                {k.label}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-400 break-all">
                              <span className="inline-flex items-center gap-1.5">
                                <Hash size={11} aria-hidden="true" />
                                {a.output_sha256}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                              {a.model}
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] tabular-nums text-slate-500">
                              {new Date(a.generated_at).toISOString().slice(0, 19).replace('T', ' ')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
                Backend: {backend} · {artefacts.length} of last 50 artefacts shown · refresh on every visit.
                Buyer-side fields (organisation, intent, email) stripped before publication.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="AG.AR.NX"
            eyebrow="Where the registry plugs in"
            titleLead="Provenance is one signal in"
            titleEmphasis="the AI governance posture."
            intro="The registry verifies AI-generated artefacts have not been tampered with. The four pathways below take a governance-led conversation deeper."
            steps={[
              { href: '/governance/ai', code: 'AG.00', icon: ShieldCheck, title: 'AIBOM',           body: 'Eight AI surfaces · model cards · EU AI Act risk-tier classification · red-team summaries.', meta: 'AG.00 · 8 surfaces' },
              { href: '/ask-flyttgo',   code: 'AS.00', icon: Sparkles,    title: 'AI assistant',     body: 'Generate the next CAIQ / RFP / proposal — automatically logged here on stream completion.',    meta: 'AS.00 · 3 artefacts' },
              { href: '/agents',        code: 'AI.00', icon: Cpu,         title: 'Agent surface',    body: 'MCP-discoverable platform · workspace-scoped agent tokens · same audit envelope.',          meta: 'AI.00 · MCP-native' },
              { href: '/consultation',  code: 'CB.00', icon: Compass,     title: 'Open scoping',    body: 'Five-step intake routes a governance-led discussion under CT.01 platform architecture.',     meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
