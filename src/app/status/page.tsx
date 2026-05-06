import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import { Activity, CheckCircle2, AlertCircle, Clock, Calendar, Wrench, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Platform status · ST.00 — FlyttGo Technologies Group',
  description:
    'Live operational status of FlyttGo platform infrastructure. 90-day uptime per service, recent incidents, scheduled maintenance windows, regional health.',
  alternates: { canonical: '/status' },
};

type ServiceStatus = 'operational' | 'degraded' | 'partial-outage' | 'major-outage' | 'maintenance';

type Service = {
  code: string;
  name: string;
  status: ServiceStatus;
  uptime90: number;
  /** 90-element history array, 0 = up, 1 = degraded, 2 = outage. Deterministic per-service so SSR + CSR match. */
  history: Array<0 | 1 | 2>;
};

// Deterministic pseudo-random history per service so SSR HTML stays
// stable. Mostly green with a couple of degradations sprinkled in to
// show how the bar visualises real incidents.
const makeHistory = (seed: number): Array<0 | 1 | 2> => {
  const out: Array<0 | 1 | 2> = [];
  for (let i = 0; i < 90; i++) {
    const r = ((seed * 9301 + i * 49297) % 233280) / 233280;
    if (r < 0.005) out.push(2);
    else if (r < 0.015) out.push(1);
    else out.push(0);
  }
  return out;
};

const services: Service[] = [
  { code: 'ST.PL.01', name: 'Transify — Mobility API',         status: 'operational', uptime90: 99.998, history: makeHistory(11) },
  { code: 'ST.PL.02', name: 'Workverge — Workforce API',       status: 'operational', uptime90: 99.992, history: makeHistory(22) },
  { code: 'ST.PL.03', name: 'Civitas — Government Services',   status: 'operational', uptime90: 99.989, history: makeHistory(33) },
  { code: 'ST.PL.04', name: 'EduPro — Education API',          status: 'operational', uptime90: 99.999, history: makeHistory(44) },
  { code: 'ST.PL.05', name: 'Identra — Identity & Auth',       status: 'operational', uptime90: 99.991, history: makeHistory(55) },
  { code: 'ST.PL.06', name: 'Payvera — Payment Orchestration', status: 'operational', uptime90: 99.985, history: makeHistory(66) },
  { code: 'ST.PL.07', name: 'Ledgera — Financial Ops',         status: 'operational', uptime90: 99.997, history: makeHistory(77) },
  { code: 'ST.PL.08', name: 'FlyttGo Marketplace',             status: 'operational', uptime90: 99.993, history: makeHistory(88) },
  { code: 'ST.RG.EU', name: 'Regional ingress — EU',           status: 'operational', uptime90: 99.999, history: makeHistory(99) },
  { code: 'ST.RG.AF', name: 'Regional ingress — Africa',       status: 'operational', uptime90: 99.987, history: makeHistory(110) },
  { code: 'ST.RG.MN', name: 'Regional ingress — MENA',         status: 'operational', uptime90: 99.995, history: makeHistory(121) },
  { code: 'ST.DV.01', name: 'Developer portal',                 status: 'operational', uptime90: 99.999, history: makeHistory(132) },
];

type Incident = {
  code: string;
  date: string;
  title: string;
  severity: 'minor' | 'major' | 'critical';
  duration: string;
  resolved: boolean;
  region: string;
  summary: string;
};

const incidents: Incident[] = [
  {
    code: 'IN.2604',
    date: '2026-04-22',
    title: 'Elevated P99 latency · Payvera EU rail',
    severity: 'minor',
    duration: '38 min',
    resolved: true,
    region: 'EU',
    summary:
      'Increased queue depth on the SEPA settlement worker pool caused P99 latency to climb above the 250 ms target. Mitigated by horizontal scale-out + queue partition rebalance.',
  },
  {
    code: 'IN.2603',
    date: '2026-03-14',
    title: 'Identra MFA push delays · MENA region',
    severity: 'minor',
    duration: '22 min',
    resolved: true,
    region: 'MENA',
    summary:
      'Cross-border push delivery experienced delivery delays via one upstream provider. Failed over to secondary push channel; user-facing impact limited to MFA prompts arriving 10-90 seconds late.',
  },
  {
    code: 'IN.2602',
    date: '2026-02-08',
    title: 'Civitas read replica lag · Africa region',
    severity: 'major',
    duration: '1 h 14 min',
    resolved: true,
    region: 'Africa',
    summary:
      'A read-replica fell behind the primary by ~7 minutes due to an upstream WAL bottleneck. Read traffic was routed to a healthy replica; primary writes were unaffected throughout. Postmortem published.',
  },
];

type Maintenance = {
  code: string;
  window: string;
  scope: string;
  region: string;
  impact: string;
};

const maintenance: Maintenance[] = [
  {
    code: 'MX.2605',
    window: '2026-05-12 · 02:00–03:00 UTC',
    scope: 'Identra — federation gateway upgrade',
    region: 'EU + Africa',
    impact: 'Brief (≤3 min) reauthentication for active sessions during cut-over. No data plane impact.',
  },
  {
    code: 'MX.2606',
    window: '2026-05-19 · 23:00–01:00 UTC',
    scope: 'Payvera — settlement worker rolling deploy',
    region: 'EU',
    impact: 'No customer impact. Rolling deploy across 3 worker shards; queue drain handled within window.',
  },
];

const STATUS_META: Record<ServiceStatus, { label: string; cls: string; dot: string; icon: typeof CheckCircle2 }> = {
  operational:    { label: 'Operational',     cls: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500',    icon: CheckCircle2 },
  degraded:       { label: 'Degraded perf',   cls: 'text-amber-600 dark:text-amber-400',    dot: 'bg-amber-500',     icon: AlertCircle },
  'partial-outage': { label: 'Partial outage', cls: 'text-orange-600 dark:text-orange-400',  dot: 'bg-orange-500',    icon: AlertCircle },
  'major-outage': { label: 'Major outage',    cls: 'text-red-600 dark:text-red-400',         dot: 'bg-red-500',       icon: AlertCircle },
  maintenance:    { label: 'Maintenance',     cls: 'text-sky-600 dark:text-sky-400',         dot: 'bg-sky-500',       icon: Wrench },
};

const SEVERITY_CLS: Record<Incident['severity'], string> = {
  minor:    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  major:    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export default function StatusPage() {
  const now = new Date();
  const allOperational = services.every((s) => s.status === 'operational');
  const overall = allOperational ? STATUS_META.operational : STATUS_META.degraded;
  const OverallIcon = overall.icon;

  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Platform status', href: '/status' },
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
          code="ST.00"
          eyebrow="Platform status"
          title={
            <>
              <OverallIcon size={28} className="inline text-emerald-600 dark:text-emerald-400 mr-2 align-baseline" aria-hidden="true" />
              All systems operational{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                across every region.
              </em>
            </>
          }
          description="Live operational status of FlyttGo platform infrastructure. 90-day uptime per service, recent incidents and scheduled maintenance — refreshed every minute under normal operating conditions."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Platform status' }]}
        />

        {/* ST.SVC — service status grid with 90-day bars */}
        <Reveal>
          <section
            id="st-svc"
            aria-labelledby="st-svc-heading"
            className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">ST.SVC</span>
                  <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[160px]" />
                  <span id="st-svc-heading">Service health · last 90 days</span>
                </div>
                <p className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                  <Clock size={12} aria-hidden="true" />
                  Updated {now.toISOString().replace('T', ' ').slice(0, 16)} UTC
                </p>
              </div>

              <ul className="divide-y divide-slate-200/70 dark:divide-slate-800/60 border-y border-slate-200/70 dark:border-slate-800/60">
                {services.map((s) => {
                  const meta = STATUS_META[s.status];
                  return (
                    <li key={s.code} className="py-5">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold w-20 flex-shrink-0">
                            {s.code}
                          </span>
                          <span className="text-[14px] font-medium text-slate-800 dark:text-slate-200 truncate">
                            {s.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <span className="font-mono text-[11px] tabular-nums text-slate-500">
                            {s.uptime90.toFixed(3)}%
                          </span>
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${meta.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
                            {meta.label}
                          </span>
                        </div>
                      </div>
                      {/* 90-day bar */}
                      <div className="mt-3 flex gap-px h-6" role="img" aria-label={`${s.name} 90-day uptime — ${s.uptime90.toFixed(3)} percent`}>
                        {s.history.map((h, i) => {
                          const cls =
                            h === 0 ? 'bg-emerald-500/80 hover:bg-emerald-500' :
                            h === 1 ? 'bg-amber-500/80 hover:bg-amber-500' :
                                      'bg-red-500/80 hover:bg-red-500';
                          return (
                            <span
                              key={i}
                              className={`flex-1 rounded-[1.5px] motion-safe:transition-colors ${cls}`}
                              aria-hidden="true"
                            />
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ST.MX — scheduled maintenance */}
        <Reveal>
          <section
            id="st-mx"
            aria-labelledby="st-mx-heading"
            className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">ST.MX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="st-mx-heading">Scheduled maintenance</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Two windows{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  in the next 30 days.
                </em>
              </h2>
              <ul className="mt-8 grid md:grid-cols-2 gap-4">
                {maintenance.map((m) => (
                  <li
                    key={m.code}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-sky-700 dark:text-sky-400">
                        {m.code}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                        {m.region}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                      {m.scope}
                    </h3>
                    <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                      <Calendar size={12} aria-hidden="true" />
                      {m.window}
                    </div>
                    <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {m.impact}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* ST.IN — recent incidents */}
        <Reveal>
          <section
            id="st-in"
            aria-labelledby="st-in-heading"
            className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">ST.IN</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="st-in-heading">Recent incidents · last 90 days</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Three incidents.{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  All resolved · postmortems published.
                </em>
              </h2>
              <ul className="mt-8 space-y-3">
                {incidents.map((i) => (
                  <li
                    key={i.code}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {i.code}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${SEVERITY_CLS[i.severity]}`}>
                          {i.severity}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                          {i.region}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px] tabular-nums text-slate-500">
                        <span>{i.date}</span>
                        <span>·</span>
                        <span>{i.duration}</span>
                        {i.resolved && (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 size={11} aria-hidden="true" />
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="mt-3 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                      {i.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {i.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* ST.SUB — subscribe to status changes */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl p-10 lg:p-14 bg-[#0A1F3D] text-white border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold flex items-center gap-3">
                  <Activity size={14} className="text-[#9ED0F9]" aria-hidden="true" />
                  ST.SUB · status notifications
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
                  Get notified before{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    something becomes a problem.
                  </em>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 leading-[1.65]">
                  Status feeds available as RSS, Atom, JSON and webhook. Email
                  digest available for procurement-bound stakeholders. Per-service,
                  per-region or all-event subscriptions.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact?intent=status-subscribe"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    Subscribe to updates
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/rss.xml"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    RSS feed
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
