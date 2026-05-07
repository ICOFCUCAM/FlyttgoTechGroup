import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import { getSession } from '@/lib/auth/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import {
  Activity,
  Cpu,
  Sparkles,
  Hash,
  Workflow,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Compass,
  type LucideIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Operator workspace · AP.00 — FlyttGo Technologies Group',
  description:
    'Live operator dashboard reading live sandbox workspaces, AI artefact provenance log and status feed from the FlyttGo platform substrate.',
  alternates: { canonical: '/app' },
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type Workspace = {
  id: string;
  workspace_code: string;
  email: string;
  organisation: string;
  jurisdiction: string;
  intent: string;
  modules: string[];
  created_at: string;
  expires_at: string;
  torn_down_at: string | null;
};

type Artefact = {
  artefact_code: string;
  artefact_kind: 'caiq' | 'rfp' | 'proposal' | 'answer' | 'recommendation';
  output_sha256: string;
  model: string;
  generated_at: string;
};

type StatusRow = {
  service_code: string;
  service_name: string;
  status: 'operational' | 'degraded' | 'partial-outage' | 'major-outage' | 'maintenance';
  uptime_pct: number;
  p99_latency_ms: number;
};

async function loadDashboard(): Promise<{
  workspaces: Workspace[];
  artefacts: Artefact[];
  statusRows: StatusRow[];
  backend: 'supabase' | 'synthetic';
}> {
  try {
    const supabase = getSupabaseServerClient();

    const [ws, art, st] = await Promise.all([
      supabase
        .from('sandbox_workspaces')
        .select('id, workspace_code, email, organisation, jurisdiction, intent, modules, created_at, expires_at, torn_down_at')
        .order('created_at', { ascending: false })
        .limit(10),
      supabase
        .from('ai_artefacts')
        .select('artefact_code, artefact_kind, output_sha256, model, generated_at')
        .order('generated_at', { ascending: false })
        .limit(10),
      supabase
        .from('status_latest')
        .select('service_code, service_name, status, uptime_pct, p99_latency_ms'),
    ]);

    if (ws.error || art.error || st.error) {
      throw new Error(ws.error?.message ?? art.error?.message ?? st.error?.message ?? 'query failed');
    }

    return {
      workspaces: (ws.data ?? []) as Workspace[],
      artefacts:  (art.data ?? []) as Artefact[],
      statusRows: (st.data ?? []) as StatusRow[],
      backend:    'supabase',
    };
  } catch {
    return { workspaces: [], artefacts: [], statusRows: [], backend: 'synthetic' };
  }
}

const KIND_LABEL: Record<Artefact['artefact_kind'], { label: string; cls: string }> = {
  caiq:           { label: 'CAIQ',           cls: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  rfp:            { label: 'RFP',            cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  proposal:       { label: 'Proposal',       cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  answer:         { label: 'Answer',         cls: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
  recommendation: { label: 'Recommendation', cls: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300' },
};

const STATUS_DOT: Record<StatusRow['status'], string> = {
  operational:      'bg-emerald-500',
  degraded:         'bg-amber-500',
  'partial-outage': 'bg-orange-500',
  'major-outage':   'bg-red-500',
  maintenance:      'bg-sky-500',
};

const fmtDateTime = (iso: string) =>
  new Date(iso).toISOString().slice(0, 19).replace('T', ' ');

const fmtRelative = (iso: string) => {
  const t = new Date(iso).getTime();
  const ageMs = Date.now() - t;
  if (ageMs < 60_000) return 'just now';
  if (ageMs < 3_600_000) return `${Math.floor(ageMs / 60_000)} min ago`;
  if (ageMs < 86_400_000) return `${Math.floor(ageMs / 3_600_000)} h ago`;
  return `${Math.floor(ageMs / 86_400_000)} d ago`;
};

export default async function AppDashboardPage() {
  const session = await getSession();
  if (!session) return null;  // layout handles unauth

  const { workspaces, artefacts, statusRows, backend } = await loadDashboard();
  const activeWorkspaces = workspaces.filter((w) => !w.torn_down_at);
  const opCount = statusRows.filter((s) => s.status === 'operational').length;

  const kpis: { code: string; label: string; value: string; icon: LucideIcon; tone: 'brand' | 'amber' | 'emerald' }[] = [
    { code: 'AP.K1', label: 'Active sandboxes',         value: String(activeWorkspaces.length), icon: Cpu,       tone: 'brand' },
    { code: 'AP.K2', label: 'AI artefacts logged',      value: String(artefacts.length),         icon: Sparkles,  tone: 'brand' },
    { code: 'AP.K3', label: 'Operational services',     value: `${opCount}/${statusRows.length || 0}`, icon: Activity, tone: opCount === statusRows.length ? 'emerald' : 'amber' },
    { code: 'AP.K4', label: 'Workspace role',           value: session.role, icon: ShieldCheck, tone: 'brand' },
  ];

  return (
    <>
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <section className="pt-12 lg:pt-16 pb-8 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.00</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Operator workspace · live data</span>
            </div>
            <h1 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
              Welcome, {session.email}.
            </h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Backend: {backend} · session role: {session.role}{session.organizationId ? ` · org ${session.organizationId.slice(0, 8)}…` : ''}
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-10 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {kpis.map((k) => {
                const Icon = k.icon;
                const tone =
                  k.tone === 'brand'   ? 'text-[#0A3A6B] dark:text-[#9ED0F9]' :
                  k.tone === 'amber'   ? 'text-amber-700 dark:text-amber-400'  :
                                          'text-emerald-700 dark:text-emerald-400';
                return (
                  <li key={k.code} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                    <div className="flex items-center justify-between">
                      <Icon size={16} className={tone} aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.18em] text-slate-400 font-semibold">{k.code}</span>
                    </div>
                    <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">{k.label}</div>
                    <div className={`mt-1 font-serif text-2xl font-medium tabular-nums ${tone}`}>{k.value}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Sandboxes */}
        <section className="py-8 lg:py-10 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.SB</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                <span>Sandbox workspaces · last 10</span>
              </div>
              <Link href="/sandbox" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                Spin up new sandbox
                <ArrowUpRight size={11} aria-hidden="true" />
              </Link>
            </div>
            {workspaces.length === 0 ? (
              <EmptyState
                kind="workspaces"
                cta={{ href: '/sandbox', label: 'Spin up a sandbox · SB.SP' }}
              />
            ) : (
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      <th className="px-4 py-3 font-semibold w-32">Code</th>
                      <th className="px-4 py-3 font-semibold">Organisation</th>
                      <th className="px-4 py-3 font-semibold w-28">Jurisdiction</th>
                      <th className="px-4 py-3 font-semibold">Modules</th>
                      <th className="px-4 py-3 font-semibold w-32">Created</th>
                      <th className="px-4 py-3 font-semibold w-28">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                    {workspaces.map((w) => (
                      <tr key={w.id} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                        <td className="px-4 py-2.5 font-mono font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{w.workspace_code}</td>
                        <td className="px-4 py-2.5 text-slate-800 dark:text-slate-200">{w.organisation}</td>
                        <td className="px-4 py-2.5 font-mono text-slate-500 uppercase">{w.jurisdiction}</td>
                        <td className="px-4 py-2.5 font-mono text-slate-500 truncate max-w-xs">{w.modules.join(' · ')}</td>
                        <td className="px-4 py-2.5 font-mono text-slate-500">{fmtRelative(w.created_at)}</td>
                        <td className="px-4 py-2.5">
                          {w.torn_down_at ? (
                            <span className="inline-flex items-center gap-1 text-slate-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" aria-hidden="true" />
                              Torn down
                            </span>
                          ) : new Date(w.expires_at).getTime() < Date.now() ? (
                            <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                              Expired
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                              Active
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* AI artefacts */}
        <section className="py-8 lg:py-10 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.AR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                <span>AI artefact log · last 10</span>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/governance/ai/artefacts" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                  Open registry
                  <ArrowUpRight size={11} aria-hidden="true" />
                </Link>
              </div>
            </div>
            {artefacts.length === 0 ? (
              <EmptyState
                kind="artefacts"
                cta={{ href: '/ask-flyttgo', label: 'Generate first artefact · AS.00' }}
              />
            ) : (
              <ul className="space-y-2">
                {artefacts.map((a) => {
                  const k = KIND_LABEL[a.artefact_kind];
                  return (
                    <li key={a.artefact_code} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-[11px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{a.artefact_code}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${k.cls}`}>{k.label}</span>
                      <span className="font-mono text-[10px] text-slate-500">{a.model}</span>
                      <span className="font-mono text-[10px] text-slate-500 inline-flex items-center gap-1">
                        <Hash size={10} aria-hidden="true" />
                        {a.output_sha256.slice(0, 16)}…
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-slate-400">{fmtDateTime(a.generated_at)}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {/* Live status */}
        <section className="py-8 lg:py-10 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.ST</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                <span>Live status · status_latest view</span>
              </div>
              <Link href="/status" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                Open public status page
                <ArrowUpRight size={11} aria-hidden="true" />
              </Link>
            </div>
            {statusRows.length === 0 ? (
              <EmptyState
                kind="status"
                cta={{ href: '/SETUP.md', label: 'Wire an external uptime monitor' }}
              />
            ) : (
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      <th className="px-4 py-3 font-semibold w-32">Code</th>
                      <th className="px-4 py-3 font-semibold">Service</th>
                      <th className="px-4 py-3 font-semibold w-28 text-right">Uptime</th>
                      <th className="px-4 py-3 font-semibold w-28 text-right">P99 ms</th>
                      <th className="px-4 py-3 font-semibold w-28">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                    {statusRows.map((s) => (
                      <tr key={s.service_code}>
                        <td className="px-4 py-2 font-mono font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{s.service_code}</td>
                        <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{s.service_name}</td>
                        <td className="px-4 py-2 text-right font-mono text-slate-700 dark:text-slate-300">{Number(s.uptime_pct).toFixed(3)}%</td>
                        <td className="px-4 py-2 text-right font-mono text-slate-500">{s.p99_latency_ms}</td>
                        <td className="px-4 py-2">
                          <span className="inline-flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[s.status]}`} aria-hidden="true" />
                            <span className="text-slate-700 dark:text-slate-300 capitalize">{s.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Quick actions */}
        <section className="py-12 lg:py-16 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-4">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.NX</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
              <span>Quick actions</span>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { href: '/sandbox',      icon: Cpu,         label: 'Spin up sandbox',     code: 'SB.SP' },
                { href: '/ask-flyttgo',  icon: Sparkles,    label: 'Generate artefact',   code: 'AS.00' },
                { href: '/recommend',    icon: Workflow,    label: 'Recommendation',      code: 'RC.00' },
                { href: '/consultation', icon: Compass,     label: 'Open consultation',   code: 'CB.00' },
              ].map((q) => {
                const Icon = q.icon;
                return (
                  <li key={q.href}>
                    <Link
                      href={q.href}
                      className="group flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all"
                    >
                      <span className="w-10 h-10 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center" aria-hidden="true">
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      <div className="flex-1">
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">{q.code}</div>
                        <div className="text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">{q.label}</div>
                      </div>
                      <ArrowUpRight size={13} className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

const EmptyState: React.FC<{ kind: string; cta: { href: string; label: string } }> = ({ kind, cta }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center">
    <CheckCircle2 size={28} className="text-slate-300 dark:text-slate-700 mx-auto" aria-hidden="true" />
    <p className="mt-3 text-[13px] text-slate-500">No {kind} yet for this workspace.</p>
    <Link
      href={cta.href}
      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A3A6B] text-white text-[12px] font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
    >
      <Clock size={11} aria-hidden="true" />
      {cta.label}
      <ArrowUpRight size={11} aria-hidden="true" />
    </Link>
  </div>
);
