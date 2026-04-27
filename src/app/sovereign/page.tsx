import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import { ShieldCheck, ServerCog, Lock, MapPin, FileCheck2, Network, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sovereign deployment — FlyttGo infrastructure',
  description:
    'National hosting compatibility, public-sector procurement compatibility, data residency flexibility, regulated infrastructure readiness — sovereign deployment posture for FlyttGo platform infrastructure.',
  alternates: { canonical: '/sovereign' },
};

const POSTURES = [
  {
    code: 'SV.01',
    icon: MapPin,
    title: 'National hosting compatibility',
    body: 'Deployment in certified national datacenters with optional air-gap and national HSM-backed key storage. Complete operational handover to in-jurisdiction staff supported.',
  },
  {
    code: 'SV.02',
    icon: FileCheck2,
    title: 'Public-sector procurement compatibility',
    body: 'Available through DPS, G-Cloud, OJEU / FTS and national framework agreements. Contracting routes confirmed during EP.03 environment selection.',
  },
  {
    code: 'SV.03',
    icon: Lock,
    title: 'Data residency flexibility',
    body: 'Per-tenant residency tags enforce that personal and regulated data never leaves the named jurisdiction. Cross-border data flows are explicit and audited per request.',
  },
  {
    code: 'SV.04',
    icon: ShieldCheck,
    title: 'Regulated infrastructure readiness',
    body: 'Architecture aligned to SOC 2, ISO 27001, GDPR and regional sectoral frameworks (NIS2, DORA, PSD2). Sovereign deployments inherit the same alignment surface as managed.',
  },
];

const ENVIRONMENTS = [
  { code: 'EU-N', label: 'Nordic EU sovereign environment', note: 'Norway · Sweden · Finland · Iceland' },
  { code: 'EU-W', label: 'Western EU sovereign environment', note: 'UK · Germany · France · Netherlands' },
  { code: 'AF',   label: 'African sovereign environments',   note: 'Cameroon · Uganda · Ethiopia · Kenya · South Africa · Nigeria' },
  { code: 'MENA', label: 'GCC sovereign environments',       note: 'UAE · Saudi Arabia · Qatar · Kuwait · Bahrain · Oman' },
];

export default function SovereignPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <section className="relative pt-14 lg:pt-20 pb-10 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SV.00</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Sovereign deployment</span>
            </div>
            <h1 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-3xl">
              Deploy on{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                your sovereignty terms.
              </em>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65]">
              Sovereign deployment is the third FlyttGo deployment mode
              (DM.03). Your jurisdiction, your hardware, your operational
              control — running the same orchestration contract that
              FlyttGo-managed and customer-cloud deployments run on.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SV.0X</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Sovereign posture
            </div>
            <ul className="grid sm:grid-cols-2 gap-4">
              {POSTURES.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.code} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900">
                    <div className="flex items-start justify-between gap-2">
                      <span className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{p.code}</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-1 text-[13px] text-slate-600 dark:text-slate-400 leading-snug">{p.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SV.ENV</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Available sovereign environments
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">Sovereign environments by region.</h2>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {ENVIRONMENTS.map((e) => (
                <li key={e.code} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[#0A3A6B]/10 dark:bg-[#9ED0F9]/10 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <ServerCog size={16} strokeWidth={1.75} />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{e.code}</div>
                    <div className="mt-1 text-[14px] font-semibold tracking-tight">{e.label}</div>
                    <div className="mt-0.5 text-[12px] text-slate-500 leading-snug">{e.note}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <Link href="/global-coverage" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
                <Network size={20} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold tracking-tight">Global coverage</h3>
                <p className="mt-1 text-sm text-slate-500 leading-snug">Nordic EU · Africa · MENA · APAC infrastructure footprint.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">View map <ArrowUpRight size={11} /></span>
              </Link>
              <Link href="/procurement-compatibility" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
                <FileCheck2 size={20} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold tracking-tight">Procurement compatibility</h3>
                <p className="mt-1 text-sm text-slate-500 leading-snug">DPS · G-Cloud · OJEU · national framework agreements.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">Contracting routes <ArrowUpRight size={11} /></span>
              </Link>
              <Link href="/contact" className="block p-6 rounded-2xl bg-[#0A1F3D] text-white border border-white/10 hover:border-white/20 motion-safe:transition-all">
                <ShieldCheck size={20} className="text-[#9ED0F9]" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold tracking-tight">Talk to deployment engineering</h3>
                <p className="mt-1 text-sm text-white/70 leading-snug">Architecture review within one business day.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#9ED0F9]">Open intake <ArrowUpRight size={11} /></span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
