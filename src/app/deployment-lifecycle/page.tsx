import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import { ArrowUpRight, FileSignature, Workflow, Layers3, Map, Globe2, ScrollText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deployment lifecycle — FlyttGo platform infrastructure',
  description:
    'How a FlyttGo deployment unfolds — five engagement stages from initial scoping through national scaling. Each stage owns a written deliverable, a fixed cadence, and an architect on point.',
  alternates: { canonical: '/deployment-lifecycle' },
};

const STAGES = [
  {
    code: 'EP.01',
    icon: ScrollText,
    title: 'Initial scoping',
    cadence: 'Week 1',
    deliverable: 'Fit memo',
    body: 'Solution architect reviews the deployment intake, validates fit, and confirms feasibility against your timeline and sovereignty constraints. Output is a one-page fit memo: in/out of scope, recommended modules, recommended deployment mode, open architectural questions.',
  },
  {
    code: 'EP.02',
    icon: Workflow,
    title: 'Architecture alignment',
    cadence: 'Weeks 2–3',
    deliverable: 'Reference architecture',
    body: 'Module selection (Identra · Payvera · Transify · Workverge · Civitas · EduPro · Ledgera) mapped against your data, identity, and integration topology. Output is a reference-architecture diagram + interoperability contract per integration boundary.',
  },
  {
    code: 'EP.03',
    icon: Layers3,
    title: 'Environment selection',
    cadence: 'Weeks 3–4',
    deliverable: 'DM.0X commitment',
    body: 'FlyttGo-managed (DM.01), customer-cloud (DM.02), or sovereign datacenter (DM.03). Selected against procurement framework, residency policy, and operational ownership model. Output is a signed environment commitment plus the contracting framework (DPS / G-Cloud / OJEU / national framework).',
  },
  {
    code: 'EP.04',
    icon: Map,
    title: 'Pilot rollout planning',
    cadence: 'Weeks 4–8',
    deliverable: 'Pilot SOW',
    body: 'Bounded pilot scope — single city, single agency, or single operator. Success metrics, cutover plan, and operational runbook signed before any code ships. Output is a Pilot SOW with explicit success thresholds and a runbook.',
  },
  {
    code: 'EP.05',
    icon: Globe2,
    title: 'National scaling roadmap',
    cadence: 'Quarter 2+',
    deliverable: 'Regional rollout plan',
    body: 'Pilot graduates into staged regional or cross-border rollout. Output is the regional rollout plan: onboarding cadence, regulatory checkpoints per jurisdiction, and Ledgera-backed financial reporting alignment for each jurisdiction.',
  },
];

const ARTEFACTS = [
  { code: 'AR.FIT',  label: 'Fit memo',                 owner: 'Solution architect',     stage: 'EP.01' },
  { code: 'AR.ARC',  label: 'Reference architecture',   owner: 'Architecture team',       stage: 'EP.02' },
  { code: 'AR.ENV',  label: 'Environment commitment',   owner: 'Deployment engineering',  stage: 'EP.03' },
  { code: 'AR.SOW',  label: 'Pilot SOW',                owner: 'Deployment + customer',   stage: 'EP.04' },
  { code: 'AR.ROL',  label: 'Regional rollout plan',    owner: 'Programme office',        stage: 'EP.05' },
];

export default function DeploymentLifecyclePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <section className="relative pt-14 lg:pt-20 pb-10 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">EP.00</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Deployment lifecycle</span>
            </div>
            <h1 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-3xl">
              How deployment engagement{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                actually unfolds.
              </em>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65]">
              Five stages, named architects, written deliverables. The
              cadence below is what enterprise + public-sector procurement
              reviewers expect to see on Page 1 of a deployment plan.
            </p>
          </div>
        </section>

        {/* EP stages */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">EP.0X</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Engagement stages
            </div>
            <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
              {STAGES.map((s, i, arr) => {
                const Icon = s.icon;
                return (
                  <li
                    key={s.code}
                    className="relative flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                      <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{s.code}</span>
                      <span className="text-slate-400 normal-case tracking-tight">{s.cadence}</span>
                    </div>
                    <span className="mt-3 w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-3 text-base font-semibold tracking-tight text-slate-900 dark:text-white">{s.title}</h3>
                    <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-snug flex-1">{s.body}</p>
                    <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] tracking-[0.16em] uppercase">
                      <span className="text-slate-400">Deliverable</span>
                      <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-slate-700 dark:text-slate-300 normal-case tracking-tight">{s.deliverable}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <span aria-hidden="true" className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-slate-300 dark:bg-slate-700" />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Artefacts table */}
        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AR.0X</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Stage artefacts
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
              Artefacts shipped{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                per stage.
              </em>
            </h2>
            <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/80 text-left">
                  <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    <th className="px-4 py-3 w-32">Code</th>
                    <th className="px-4 py-3">Artefact</th>
                    <th className="px-4 py-3 w-56">Owner</th>
                    <th className="px-4 py-3 w-28">Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                  {ARTEFACTS.map((a) => (
                    <tr key={a.code}>
                      <td className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                        {a.code}
                      </td>
                      <td className="px-4 py-2.5 text-slate-800 dark:text-slate-200 inline-flex items-center gap-2">
                        <FileSignature size={14} className="text-slate-400" aria-hidden="true" />
                        {a.label}
                      </td>
                      <td className="px-4 py-2.5 text-[13px] text-slate-600 dark:text-slate-400">{a.owner}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">{a.stage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
              Every artefact is signed before the stage closes — gates are
              deliverable-based, not calendar-based.
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-3 gap-4">
            <Link href="/procurement-compatibility" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PC.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Procurement compatibility</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">DPS · G-Cloud · OJEU · national frameworks.</p>
            </Link>
            <Link href="/sovereign" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SV.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Sovereign deployment</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">National hosting + data-residency posture.</p>
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
