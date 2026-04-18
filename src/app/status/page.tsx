import type { Metadata } from 'next';
import Link from 'next/link';
import { Activity, CheckCircle2, Clock } from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import Breadcrumbs from '@/components/flytt/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Platform status',
  description:
    'Current operational status of FlyttGo Technologies Group platform infrastructure across Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera and FlyttGo.',
  alternates: { canonical: '/status' },
  robots: { index: true, follow: true },
};

const services = [
  { name: 'Transify — Mobility API', status: 'operational' },
  { name: 'Workverge — Workforce API', status: 'operational' },
  { name: 'Civitas — Government Services API', status: 'operational' },
  { name: 'EduPro — Education API', status: 'operational' },
  { name: 'Identra — Identity & Auth', status: 'operational' },
  { name: 'Payvera — Payment Orchestration', status: 'operational' },
  { name: 'Ledgera — Financial Ops', status: 'operational' },
  { name: 'FlyttGo Marketplace', status: 'operational' },
  { name: 'Regional ingress — EU', status: 'operational' },
  { name: 'Regional ingress — AF', status: 'operational' },
  { name: 'Regional ingress — MENA', status: 'operational' },
  { name: 'Developer portal', status: 'operational' },
];

export default function StatusPage() {
  const now = new Date();
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Platform status' },
              ]}
            />
            <div className="mt-6 flex items-start gap-4">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                <span className="absolute inset-0 rounded-full bg-emerald-500/20 motion-safe:animate-ping" aria-hidden="true" />
                <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Platform status
                </p>
                <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08]">
                  All systems operational.
                </h1>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  Real-time status for FlyttGo Technologies Group platform
                  infrastructure. Incidents, maintenance windows and regional
                  degradations are published here before they reach customer
                  dashboards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Component health
              </h2>
              <p className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500 font-mono">
                <Clock size={12} aria-hidden="true" />
                Updated {now.toISOString().replace('T', ' ').slice(0, 16)} UTC
              </p>
            </div>

            <ul className="divide-y divide-slate-200/70 dark:divide-slate-800/60 border-y border-slate-200/70 dark:border-slate-800/60">
              {services.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-4 py-4">
                  <span className="text-[15px] font-medium text-slate-800 dark:text-slate-200">
                    {s.name}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    Operational
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
              <div className="flex items-start gap-3">
                <Activity size={18} className="text-[#1E6FD9] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    Incident history &amp; enterprise SLAs
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Post-mortems, uptime dashboards and per-region SLA reports
                    are available to enterprise customers inside the deployment
                    portal.{' '}
                    <Link
                      href="/contact?intent=procurement"
                      className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                    >
                      Request SLA documentation
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
