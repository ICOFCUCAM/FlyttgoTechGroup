import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { VERTICALS } from '@/data/verticals';
import { caseStudies } from '@/data/case-studies';
import {
  ShieldCheck,
  AlertTriangle,
  Briefcase,
  ArrowUpRight,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const SUBSTRATE_LABEL: Record<string, string> = {
  'DM.02': 'Customer cloud',
  'DM.03': 'Sovereign datacenter',
  'DM.04': 'Confidential compute',
};

const SUBSTRATE_HREF: Record<string, string> = {
  'DM.02': '/deployment/customer-cloud',
  'DM.03': '/deployment/sovereign',
  'DM.04': '/deployment/confidential',
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const v = VERTICALS.find((x) => x.slug === params.slug);
  if (!v) return {};
  return {
    title: `${v.code} · ${v.name} — FlyttGo Technologies Group`,
    description: v.positioning,
    alternates: { canonical: `/verticals/${v.slug}` },
  };
}

export default function VerticalPage({ params }: { params: { slug: string } }) {
  const v = VERTICALS.find((x) => x.slug === params.slug);
  if (!v) notFound();

  const refs = caseStudies.filter((c) => v.caseRefs.includes(c.code));

  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Verticals', href: '/verticals' },
    { name: v.name, href: `/verticals/${v.slug}` },
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
          code={v.code}
          eyebrow={
            <span className="inline-flex items-center gap-2">
              <span className="text-base" aria-hidden="true">{v.emoji}</span>
              <span>Vertical accelerator</span>
            </span>
          }
          title={
            <>
              {v.name}{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                — regulator-aligned by default.
              </em>
            </>
          }
          description={v.positioning}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Verticals', href: '/verticals' },
            { label: v.code },
          ]}
        />

        {/* Programme shape */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{v.code}.FT</span>
                  <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                  <span>Why FlyttGo fits this vertical</span>
                </div>
                <h2 className="mt-6 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                  {v.fit}
                </h2>
              </div>
              <aside className="lg:col-span-5">
                <div className="rounded-2xl bg-[#0A1F3D] text-white p-6 border border-white/10">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold">
                    {v.code}.SH · programme shape
                  </div>
                  <dl className="mt-5 space-y-4 text-[14px]">
                    <div className="flex items-baseline gap-3">
                      <dt className="w-32 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 flex-shrink-0">Audience</dt>
                      <dd>{v.audience}</dd>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <dt className="w-32 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 flex-shrink-0">Typical tier</dt>
                      <dd className="font-semibold">{v.typicalTier}</dd>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <dt className="w-32 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 flex-shrink-0">Substrate</dt>
                      <dd>
                        <Link
                          href={SUBSTRATE_HREF[v.recommendedSubstrate] ?? '/deployment'}
                          className="inline-flex items-center gap-1.5 font-semibold text-[#9ED0F9] hover:underline underline-offset-4"
                        >
                          {v.recommendedSubstrate} · {SUBSTRATE_LABEL[v.recommendedSubstrate]}
                          <ArrowUpRight size={11} aria-hidden="true" />
                        </Link>
                      </dd>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <dt className="w-32 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 flex-shrink-0">Modules</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {v.modules.map((m) => (
                          <span key={m.slug} className="px-2 py-0.5 rounded-md bg-white/8 border border-white/10 text-[11px] font-mono">
                            {m.name.split(' · ')[0]}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          </section>
        </Reveal>

        {/* Regulatory frameworks */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{v.code}.RG</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Regulatory framework alignment</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                {v.regulatory.length} frameworks{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  pre-mapped to the platform.
                </em>
              </h2>
              <ul className="mt-10 grid md:grid-cols-2 gap-3">
                {v.regulatory.map((r) => (
                  <li key={r.code} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                    <div className="flex items-start justify-between gap-3">
                      <ShieldCheck size={18} className="text-[#0A3A6B] dark:text-[#9ED0F9] flex-shrink-0" aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{r.code}</span>
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                      {r.framework}
                    </h3>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">{r.jurisdiction}</div>
                    <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {r.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Modules */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{v.code}.MD</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Recommended module fit</span>
              </div>
              <ul className="mt-10 grid md:grid-cols-2 gap-3">
                {v.modules.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/platforms/${m.slug}`}
                      className="group block p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">{m.name}</span>
                        <ArrowUpRight size={13} className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0" aria-hidden="true" />
                      </div>
                      <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {m.rationale}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Risk register */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{v.code}.RK</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Sector risk register</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                {v.risks.length} risks{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  named, with mitigation.
                </em>
              </h2>
              <ul className="mt-10 grid md:grid-cols-2 gap-3">
                {v.risks.map((r) => (
                  <li key={r.code} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                    <div className="flex items-start justify-between gap-3">
                      <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0" aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{r.code}</span>
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {r.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Procurement routes */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{v.code}.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Procurement routes</span>
              </div>
              <ul className="mt-8 grid md:grid-cols-2 gap-3">
                {v.procurementRoutes.map((p) => (
                  <li key={p} className="flex items-start gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                    <Briefcase size={16} className="text-[#0A3A6B] dark:text-[#9ED0F9] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-[13px] text-slate-700 dark:text-slate-300 leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Reference programmes */}
        {refs.length > 0 && (
          <Reveal>
            <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{v.code}.CS</span>
                  <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                  <span>Reference programmes in this vertical</span>
                </div>
                <ul className="mt-10 grid md:grid-cols-2 gap-3">
                  {refs.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/customers/${r.slug}`}
                        className="group flex flex-col h-full p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{r.code}</span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                            {r.tier} · {r.deployment}
                          </span>
                        </div>
                        <h3 className="mt-3 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                          {r.customer}
                        </h3>
                        <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                          {r.programme}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          Open programme <ArrowUpRight size={11} aria-hidden="true" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>
        )}

        {/* Vertical engagement intake */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl p-10 lg:p-14 bg-[#0A1F3D] text-white border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-[#D6B575]" aria-hidden="true" />
                  {v.code}.NX · vertical-aware engagement
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
                  Open a programme on{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    this vertical&apos;s terms.
                  </em>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 leading-[1.65]">
                  Consultation routed to the desk handling {v.name.toLowerCase()} programmes.
                  {' '}{v.recommendedSubstrate} substrate, {v.typicalTier} tier and the regulatory
                  framework matrix above presented at intake — scoping starts at SE.D2, not at
                  framework discovery.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/consultation?vertical=${v.slug}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    <Compass size={14} aria-hidden="true" />
                    Open consultation · CB.00
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/ask-flyttgo"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    Generate a CAIQ for this vertical · AS.00
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/verticals"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    All verticals
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
