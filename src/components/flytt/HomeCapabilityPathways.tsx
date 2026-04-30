import Link from '@/components/flytt/LocaleLink';
import {
  Layers3,
  Workflow,
  Globe2,
  Landmark,
  Network,
  Compass,
  ServerCog,
  Briefcase,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

type Pathway = {
  href: string;
  code: string;
  icon: LucideIcon;
  cluster: string;
  title: string;
  body: string;
  meta: string;
};

const PATHWAYS: Pathway[] = [
  {
    href: '/platforms',
    code: 'PL.00',
    icon: Layers3,
    cluster: 'Platform',
    title: 'Platform ecosystem',
    body: 'Six modular institutional platforms — Transify, Workverge, Civitas, EduPro, Identra, Payvera — running on the same orchestration substrate.',
    meta: '6 platforms · 1 substrate',
  },
  {
    href: '/engineering',
    code: 'SE.00',
    icon: Workflow,
    cluster: 'Engineering',
    title: 'Institutional Systems Engineering',
    body: 'From digital presence websites to platform-class ecosystems. Six escalating tiers (L.01 → L.06), eight modular extensions, deterministic delivery cadence.',
    meta: 'L.01 → L.06 · AO.01 → AO.08',
  },
  {
    href: '/deployment',
    code: 'DM.00',
    icon: Globe2,
    cluster: 'Deployment',
    title: 'Deployment architecture',
    body: 'Three deployment substrates — FlyttGo-managed SaaS, customer-cloud (AWS · Azure · GCP), sovereign national datacenter. Data residency enforced per region.',
    meta: 'DM.01 · DM.02 · DM.03',
  },
  {
    href: '/government',
    code: 'GV.00',
    icon: Landmark,
    cluster: 'Government',
    title: 'Government & public sector',
    body: 'Procurement-grade public infrastructure pipeline — capability brief, orchestration overview, sovereign deployment posture, eIDAS / GDPR / WCAG compliance.',
    meta: 'GV.01 · GV.02 · GV.03',
  },
  {
    href: '/marketplace',
    code: 'MP.00',
    icon: Network,
    cluster: 'Marketplace',
    title: 'Marketplace operating system',
    body: 'Provider routing, trust & verification, pricing intelligence, dispute resolution — four subsystems that turn Transify into a multi-sided marketplace.',
    meta: 'MP.RT · MP.TV · MP.PI · MP.DR',
  },
  {
    href: '/consultation',
    code: 'CB.00',
    icon: Compass,
    cluster: 'Start a project',
    title: 'Engagement intake',
    body: 'Four engagement formats — capability deep-dive, pilot scoping, marketplace onboarding, sovereign briefing. Routed within one business day.',
    meta: 'CT.01 → CT.04',
  },
  {
    href: '/infrastructure',
    code: 'IA.00',
    icon: ServerCog,
    cluster: 'Infrastructure',
    title: 'Infrastructure architecture',
    body: 'The orchestration core that powers every module — global coverage, sovereign substrate, procurement compatibility, technology stack and security posture.',
    meta: 'GC.00 · SV.00 · PC.00',
  },
  {
    href: '/company',
    code: 'CO.00',
    icon: Briefcase,
    cluster: 'Company',
    title: 'Company',
    body: 'Leadership, careers, press and corporate disclosures. The institutional footprint behind the engineering output.',
    meta: 'Leadership · Careers · Press',
  },
];

export default function HomeCapabilityPathways() {
  return (
    <section
      id="hp-idx"
      aria-labelledby="hp-idx-heading"
      className="relative bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">HP.IDX</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Capability pathways · eight clusters</span>
        </div>

        <h2
          id="hp-idx-heading"
          className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
        >
          Pick the pathway{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            your programme starts from.
          </em>
        </h2>
        <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
          FlyttGo Technologies operates as eight distinct capability clusters
          on a single engineering substrate. Each cluster is a self-contained
          surface with its own intake, scoping cadence and deployment posture —
          chosen by the visitor, not assumed by the marketing site.
        </p>

        <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PATHWAYS.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.href}>
                <Link
                  href={p.href}
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
                      {p.code}
                    </span>
                  </div>
                  <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    {p.cluster}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                    {p.body}
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      {p.meta}
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
