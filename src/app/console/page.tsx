import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Activity,
  CreditCard,
  Settings,
  Workflow,
  Bell,
  ChevronRight,
  CircleDot,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Operator console preview · OC.00 — FlyttGo Technologies Group',
  description:
    'Read-only preview of the FlyttGo operator console — what tenants see post-deployment. Tenant overview, deployment health, audit log, billing summary, identity and policy controls.',
  alternates: { canonical: '/console' },
};

type NavItem = { code: string; label: string; icon: LucideIcon; active?: boolean };

const NAV: NavItem[] = [
  { code: 'OC.OV', label: 'Overview',          icon: LayoutDashboard, active: true },
  { code: 'OC.DP', label: 'Deployments',       icon: Workflow },
  { code: 'OC.US', label: 'Users & roles',     icon: Users },
  { code: 'OC.PC', label: 'Policies',          icon: ShieldCheck },
  { code: 'OC.AU', label: 'Audit log',         icon: Activity },
  { code: 'OC.BL', label: 'Billing',           icon: CreditCard },
  { code: 'OC.NT', label: 'Notifications',     icon: Bell },
  { code: 'OC.ST', label: 'Settings',          icon: Settings },
];

const KPIS = [
  { code: 'KPI.01', label: 'Active deployments',     value: '14',      delta: '+2',    positive: true },
  { code: 'KPI.02', label: 'API calls · 24h',        value: '2.41M',   delta: '+8%',   positive: true },
  { code: 'KPI.03', label: 'P99 latency',            value: '184 ms',  delta: '−23%',  positive: true },
  { code: 'KPI.04', label: 'Failed auth · 24h',      value: '0.03%',   delta: '−12%',  positive: true },
];

const DEPLOYMENTS = [
  { code: 'DP.001', name: 'transify-prod-eu',       module: 'Transify',  region: 'EU',     substrate: 'DM.02', status: 'operational' as const, version: 'v1.14.7' },
  { code: 'DP.002', name: 'identra-prod-eu',        module: 'Identra',   region: 'EU',     substrate: 'DM.02', status: 'operational' as const, version: 'v1.22.1' },
  { code: 'DP.003', name: 'civitas-prod-eu',        module: 'Civitas',   region: 'EU',     substrate: 'DM.02', status: 'operational' as const, version: 'v1.18.0' },
  { code: 'DP.004', name: 'payvera-prod-eu',        module: 'Payvera',   region: 'EU',     substrate: 'DM.02', status: 'operational' as const, version: 'v1.19.4' },
  { code: 'DP.005', name: 'transify-prod-mena',     module: 'Transify',  region: 'MENA',   substrate: 'DM.03', status: 'maintenance' as const,  version: 'v1.14.7' },
  { code: 'DP.006', name: 'identra-prod-mena',      module: 'Identra',   region: 'MENA',   substrate: 'DM.03', status: 'operational' as const, version: 'v1.22.1' },
  { code: 'DP.007', name: 'transify-staging',       module: 'Transify',  region: 'EU',     substrate: 'DM.01', status: 'operational' as const, version: 'v1.15.0-rc.2' },
];

const AUDIT_TAIL = [
  { ts: '14:23:08', actor: 'op@example.com',           verb: 'rotated',   object: 'webhook signing key wh_3Q7…',                    severity: 'info' },
  { ts: '14:08:51', actor: 'system',                    verb: 'deployed',  object: 'identra v1.22.1 to identra-prod-mena',           severity: 'info' },
  { ts: '13:52:14', actor: 'op@example.com',           verb: 'updated',   object: 'policy POL.01 · MFA required for admin role',    severity: 'info' },
  { ts: '13:31:09', actor: 'partner@npstudio.no',      verb: 'created',   object: 'workspace token tok_ja7… · scope read:audit',    severity: 'info' },
  { ts: '13:14:42', actor: 'system',                    verb: 'completed', object: 'audit-log archive 2026-04 · 1.4 GB sealed',      severity: 'info' },
  { ts: '13:02:18', actor: 'sec-bot',                   verb: 'flagged',    object: 'unusual login geography · op2@example.com',     severity: 'warn' },
];

const STATUS_DOT: Record<'operational' | 'maintenance' | 'degraded', string> = {
  operational: 'bg-emerald-500',
  maintenance: 'bg-sky-500',
  degraded:    'bg-amber-500',
};

const STATUS_LABEL: Record<'operational' | 'maintenance' | 'degraded', string> = {
  operational: 'Operational',
  maintenance: 'Maintenance',
  degraded:    'Degraded',
};

export default function ConsolePreviewPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Operator console', href: '/console' },
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
          code="OC.00"
          eyebrow="Operator console preview"
          title={
            <>
              What tenants see{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                once they&apos;re deployed.
              </em>
            </>
          }
          description="Read-only preview of the FlyttGo operator console — the surface every tenant lands on after deployment. Live deployments, audit log, identity controls, policy management, billing and notifications."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Operator console' }]}
        />

        {/* OC.MOCK — full-bleed app shell */}
        <Reveal>
          <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
              <div className="rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-[0_30px_120px_-50px_rgba(10,58,107,0.20)]">
                {/* Console title bar */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/80 dark:bg-slate-900/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="ml-2 font-mono text-[10px] tracking-[0.16em] text-slate-500">
                    console.flyttgo.tech / nordic-ministry-tenant
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                    <CircleDot size={10} className="text-emerald-500" />
                    Workspace · Nordic Ministry · region EU
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Sidebar nav */}
                  <aside className="lg:col-span-3 border-r border-slate-200/80 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-3 px-2">
                      Navigation
                    </div>
                    <ul className="space-y-1">
                      {NAV.map((n) => {
                        const Icon = n.icon;
                        return (
                          <li key={n.code}>
                            <button
                              type="button"
                              disabled
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-[13px] motion-safe:transition-colors ${
                                n.active
                                  ? 'bg-[#0A3A6B] text-white shadow-sm'
                                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                              }`}
                            >
                              <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
                              <span className="flex-1 font-medium">{n.label}</span>
                              <span className={`font-mono text-[9px] tracking-[0.14em] ${n.active ? 'text-white/55' : 'text-slate-400'}`}>
                                {n.code}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-6 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Plan</div>
                      <div className="mt-1 text-[13px] font-semibold tracking-tight text-slate-900 dark:text-white">
                        L.05 · Sovereign
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-slate-500">
                        DM.03 · in-jurisdiction
                      </div>
                    </div>
                  </aside>

                  {/* Main content */}
                  <div className="lg:col-span-9 p-6 lg:p-8">
                    {/* Breadcrumb + title */}
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                      <span>Workspace</span>
                      <ChevronRight size={11} aria-hidden="true" />
                      <span>Overview</span>
                      <span className="ml-3 text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">OC.OV</span>
                    </div>
                    <h2 className="mt-3 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                      Tenant overview
                    </h2>

                    {/* KPI grid */}
                    <ul className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {KPIS.map((k) => (
                        <li
                          key={k.code}
                          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                        >
                          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
                            {k.label}
                          </div>
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="font-serif text-2xl font-medium text-slate-900 dark:text-white tabular-nums">
                              {k.value}
                            </span>
                            <span className={`inline-flex items-center gap-0.5 font-mono text-[10px] font-semibold tabular-nums ${
                              k.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              {k.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                              {k.delta}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Deployments table */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[13px] font-semibold tracking-tight text-slate-900 dark:text-white">
                          Active deployments
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                          OC.OV.DP · 7 of 14
                        </span>
                      </div>
                      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
                        <table className="w-full text-[12px]">
                          <thead className="bg-slate-50 dark:bg-slate-900/60 font-mono uppercase tracking-[0.14em] text-[10px] text-slate-500">
                            <tr>
                              <th className="px-3 py-2 text-left font-semibold">Code</th>
                              <th className="px-3 py-2 text-left font-semibold">Name</th>
                              <th className="px-3 py-2 text-left font-semibold">Module</th>
                              <th className="px-3 py-2 text-left font-semibold">Region</th>
                              <th className="px-3 py-2 text-left font-semibold">Substrate</th>
                              <th className="px-3 py-2 text-left font-semibold">Version</th>
                              <th className="px-3 py-2 text-left font-semibold">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                            {DEPLOYMENTS.map((d) => (
                              <tr key={d.code} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                                <td className="px-3 py-2.5 font-mono text-[11px] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{d.code}</td>
                                <td className="px-3 py-2.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">{d.name}</td>
                                <td className="px-3 py-2.5 font-medium text-slate-800 dark:text-slate-200">{d.module}</td>
                                <td className="px-3 py-2.5 font-mono text-slate-600 dark:text-slate-400">{d.region}</td>
                                <td className="px-3 py-2.5 font-mono text-slate-600 dark:text-slate-400">{d.substrate}</td>
                                <td className="px-3 py-2.5 font-mono text-slate-600 dark:text-slate-400">{d.version}</td>
                                <td className="px-3 py-2.5">
                                  <span className="inline-flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[d.status]}`} aria-hidden="true" />
                                    <span className="text-slate-700 dark:text-slate-300">{STATUS_LABEL[d.status]}</span>
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Audit log tail */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[13px] font-semibold tracking-tight text-slate-900 dark:text-white">
                          Recent audit events
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                          OC.OV.AU · last 6 events
                        </span>
                      </div>
                      <ul className="rounded-xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden divide-y divide-slate-200/60 dark:divide-slate-800/60">
                        {AUDIT_TAIL.map((a, i) => (
                          <li key={i} className="px-4 py-2.5 flex items-center gap-3 text-[12px] hover:bg-slate-50/60 dark:hover:bg-slate-900/40 motion-safe:transition-colors">
                            <span className="font-mono text-[10px] tabular-nums text-slate-400 w-16 flex-shrink-0">
                              {a.ts}
                            </span>
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.severity === 'warn' ? 'bg-amber-500' : 'bg-emerald-500'}`} aria-hidden="true" />
                            <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 flex-shrink-0">
                              {a.actor}
                            </span>
                            <span className="font-mono text-[11px] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold flex-shrink-0">
                              {a.verb}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400 truncate">
                              {a.object}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
                Read-only preview · live console available to authenticated
                operators only. Real telemetry, real controls, real audit
                envelope behind the wall.
              </p>
            </div>
          </section>
        </Reveal>

        {/* OC.NX — request access */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl p-10 lg:p-14 bg-[#0A1F3D] text-white border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold">
                  OC.NX · request live access
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
                  Want to drive{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    a real workspace?
                  </em>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 leading-[1.65]">
                  Sandbox tenants are spun up under MNDA for buyers in active
                  scoping engagements. Pre-loaded with synthetic telemetry,
                  test deployments and a guided tour.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact?intent=sandbox"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    Request a sandbox tenant
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/developers/api"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    API reference · AP.00
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
