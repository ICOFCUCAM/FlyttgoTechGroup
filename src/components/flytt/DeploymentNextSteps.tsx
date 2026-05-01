import Link from '@/components/flytt/LocaleLink';
import {
  Layers3,
  Workflow,
  Landmark,
  Compass,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

type NextStep = {
  href: string;
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
  meta: string;
};

const STEPS: NextStep[] = [
  {
    href: '/platforms',
    code: 'PL.00',
    icon: Layers3,
    title: 'Run modules on this substrate',
    body: 'Eight modular platforms — Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera and the FlyttGo Marketplace — each licensed independently per deployment, each running on the same orchestration core.',
    meta: 'PL.00 · 8 modules',
  },
  {
    href: '/engineering',
    code: 'SE.00',
    icon: Workflow,
    title: 'Engineer onto this substrate',
    body: 'Six escalating engagement tiers (L.01 → L.06) — from digital presence websites to platform-class national infrastructure, each delivered on the substrate you choose here.',
    meta: 'L.01 → L.06',
  },
  {
    href: '/government',
    code: 'GV.00',
    icon: Landmark,
    title: 'Sovereign deployment posture',
    body: 'Public-sector substrate — sovereign national datacenter, eIDAS / GDPR / WCAG 2.1 AA alignment, procurement-grade capability brief and orchestration overview.',
    meta: 'GV.01 · GV.02 · GV.03',
  },
  {
    href: '/consultation',
    code: 'CB.00',
    icon: Compass,
    title: 'Scope a deployment',
    body: 'Capability deep-dive within one business day. Pilot scoping under NDA. Sovereign and customer-cloud deployments routed to the deployment-architecture desk.',
    meta: 'CT.01 → CT.04',
  },
];

export default function DeploymentNextSteps() {
  return (
    <section
      id="dm-nx"
      aria-labelledby="dm-nx-heading"
      className="relative bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">DM.NX</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Where this substrate goes next</span>
        </div>

        <h2
          id="dm-nx-heading"
          className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
        >
          The substrate is{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            picked per programme.
          </em>
        </h2>
        <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
          Once a deployment mode is chosen, the next decisions are which
          modules to run, what to engineer on top, whether the workload sits
          inside a sovereign perimeter, and how to enter procurement.
        </p>

        <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                      {s.code}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                    {s.body}
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      {s.meta}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
