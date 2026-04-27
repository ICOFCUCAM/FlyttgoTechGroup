import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import { FileCheck2, ScrollText, Scale, Globe2, Layers3, Building2, Map, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Procurement compatibility — FlyttGo deployment frameworks',
  description:
    'How FlyttGo platform infrastructure maps to public-sector and enterprise procurement frameworks: DPS, G-Cloud, OJEU/FTS, national framework agreements. Pilot through national infrastructure programmes and white-label licensing.',
  alternates: { canonical: '/procurement-compatibility' },
};

const FRAMEWORKS = [
  { code: 'PC.01', icon: FileCheck2, title: 'Dynamic Purchasing Systems', scope: 'EU · UK · Nordic', body: 'Available through DPS catalogues for digital, cloud, and platform infrastructure procurement.', accent: '#1E6FD9' },
  { code: 'PC.02', icon: ScrollText,  title: 'G-Cloud-style frameworks',  scope: 'UK · Commonwealth', body: 'Compatible with G-Cloud and equivalent national catalogue frameworks for SaaS and managed services.', accent: '#0FB5A6' },
  { code: 'PC.03', icon: Scale,       title: 'OJEU / Find-a-Tender',     scope: 'EU · EEA · UK',     body: 'Responds to public restricted, open and competitive dialogue procedures published under OJEU and FTS.', accent: '#7C5CE6' },
  { code: 'PC.04', icon: Globe2,      title: 'National framework agreements', scope: 'AF · MENA · regional', body: 'Delivered through national framework agreements and ministry-level master service agreements where DPS does not apply.', accent: '#F5B547' },
];

const TIERS = [
  { code: 'PR.01', icon: Layers3,    title: 'Pilot deployments',                cadence: '60–90 days',   body: 'Single-city, single-agency or single-operator pilots. Fixed scope, signed SOW, success metrics agreed before code ships.' },
  { code: 'PR.02', icon: Building2,  title: 'City rollouts',                    cadence: '90–150 days',  body: 'Production deployment across one urban jurisdiction. Identity-federation, payments orchestration and audit trail wired into the city\'s existing systems.' },
  { code: 'PR.03', icon: Map,        title: 'Regional deployments',             cadence: '4–9 months',   body: 'Multi-city or county-scale. Shared identity backbone, region-aware data residency, and coordinated rollout cadence with regulatory checkpoints.' },
  { code: 'PR.04', icon: Globe2,     title: 'National infrastructure programmes', cadence: '6–18 months', body: 'Country-scale digital infrastructure programmes. Sovereign deployment, ministry-level governance, statutory export readiness.' },
  { code: 'PR.05', icon: FileCheck2, title: 'White-label platform licensing',   cadence: 'Per agreement', body: 'Re-brand, re-deploy under your jurisdiction or operator brand. Source escrow, shared-runbook handover, separate compliance attestation chain.' },
];

export default function ProcurementCompatibilityPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <section className="relative pt-14 lg:pt-20 pb-10 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PC.00</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Procurement compatibility</span>
            </div>
            <h1 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-3xl">
              Compatible with how public-sector{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                procurement actually works.
              </em>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65]">
              Five tiers of deployment scope, four contracting frameworks.
              Pick the tier that matches the programme; we map it onto the
              right framework for the destination jurisdiction.
            </p>
          </div>
        </section>

        {/* Tier ladder */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.0X</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Procurement scale ladder
            </div>
            <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
              {TIERS.map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.code} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{t.code}</span>
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-tight">{t.title}</h3>
                    <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400 leading-snug flex-1">{t.body}</p>
                    <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span className="text-slate-400">Cadence</span>
                      <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-slate-700 dark:text-slate-300 normal-case tracking-tight">{t.cadence}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Framework matrix */}
        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PC.0X</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Contracting frameworks
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">Frameworks supported.</h2>
            <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {FRAMEWORKS.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.code} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 flex flex-col">
                    <div className="flex items-start justify-between">
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${f.accent}14`, color: f.accent }} aria-hidden="true">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: f.accent }}>{f.code}</span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400 leading-snug flex-1">{f.body}</p>
                    <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span className="text-slate-400">Scope</span>
                      <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
                      <span style={{ color: f.accent }}>{f.scope}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
              Procurement and contracting routes are confirmed during the
              EP.03 environment-selection step. Pre-intake fit confirmation
              does not require a procurement decision.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-3 gap-4">
            <Link href="/sovereign" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SV.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Sovereign deployment</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">National hosting + data-residency posture.</p>
            </Link>
            <Link href="/global-coverage" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GC.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Global coverage</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">Eleven regions, three deployment tiers.</p>
            </Link>
            <Link href="/contact" className="block p-6 rounded-2xl bg-[#0A1F3D] text-white border border-white/10 hover:border-white/20 motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9ED0F9] font-semibold">DP.01</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Open deployment intake</h3>
              <p className="mt-1 text-sm text-white/70 leading-snug">Solution architect within one business day.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#9ED0F9]">Submit intake <ArrowUpRight size={11} /></span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
