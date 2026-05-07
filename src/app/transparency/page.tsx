import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { Activity, ArrowUpRight, FileText } from 'lucide-react';
import IndicativeNotice from '@/components/flytt/IndicativeNotice';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Transparency reports · TR.IDX — FlyttGo Technologies Group',
  description:
    'Annual transparency reports across uptime, incidents, security advisories, supply chain, AI governance, OSS contributions and sustainability. Refreshed every January.',
  alternates: { canonical: '/transparency' },
};

const REPORTS = [
  {
    year: '2026', code: 'TR.26', href: '/transparency/2026', status: 'Live',
    headline: '99.994 % uptime · 0 critical CVEs open · 184 t CO2e',
    body: 'Eleven incidents, zero Sev-1, all postmortems within 14 days. AIBOM expanded to cover every surface. Aggregate carbon down 12 % YoY.',
  },
  {
    year: '2025', code: 'TR.25', href: '/transparency/2025', status: 'Archived',
    headline: '99.982 % uptime · 1 high CVE in flight at year-end · 209 t CO2e',
    body: 'Thirteen incidents, zero Sev-1. SOC 2 Type II first-issuance year. Sigstore signing rolled out across all release artefacts.',
  },
];

export default function TransparencyIndexPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Transparency reports', href: '/transparency' },
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
          code="TR.IDX"
          eyebrow="Transparency reports"
          title={
            <>
              Annual numbers,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                in public, dated.
              </em>
            </>
          }
          description="Aggregate reports refreshed every January. Eight pillars per year — uptime, incidents, security and supply chain, AI governance, open source, sustainability, trust desk, and the people behind the platform."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Transparency reports' }]}
        />

        <IndicativeNotice
          code="TR.IND"
          body="Reports below show the eight-pillar reporting shape and the cadence (refresh every January). Year-over-year numbers are aspirational — the first attested transparency report will publish once SOC 2 Type II + ISO 27001 audits close and the underlying telemetry is being captured live."
        />

        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">TR.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Reports library</span>
              </div>
              <ul className="mt-12 grid md:grid-cols-2 gap-4">
                {REPORTS.map((r) => (
                  <li key={r.code}>
                    <Link
                      href={r.href}
                      className="group flex flex-col h-full p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center" aria-hidden="true">
                            <FileText size={20} strokeWidth={1.75} />
                          </span>
                          <div>
                            <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{r.code}</span>
                            <div className="font-serif text-2xl font-medium text-slate-900 dark:text-white tabular-nums">FY{r.year}</div>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${r.status === 'Live' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                          {r.status}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                        {r.headline}
                      </h3>
                      <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                        {r.body}
                      </p>
                      <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          <Activity size={11} aria-hidden="true" />
                          8 pillars · YoY tracked
                        </span>
                        <ArrowUpRight size={13} className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors" aria-hidden="true" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
