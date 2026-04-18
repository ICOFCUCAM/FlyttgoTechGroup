import React from 'react';
import { Clock, Zap, Layers, GitBranch, ShieldCheck } from 'lucide-react';

type Row = {
  label: string;
  duration: string;
  widthClass: string;
  toneLabel: string;
  barClass: string;
  trackClass: string;
  textClass: string;
  steps: string[];
};

const rows: Row[] = [
  {
    label: 'Traditional platform build',
    duration: '12–36 months',
    widthClass: 'w-full',
    toneLabel: 'Slow · Custom',
    barClass: 'bg-gradient-to-r from-slate-300/70 via-slate-300 to-slate-400',
    trackClass: 'bg-slate-100 dark:bg-slate-800/60',
    textClass: 'text-slate-600 dark:text-slate-400',
    steps: ['Scoping', 'Architecture', 'Custom backend', 'Integrations', 'Hardening', 'Rollout'],
  },
  {
    label: 'FlyttGo modular deployment',
    duration: '2–6 weeks',
    widthClass: 'w-[14%]',
    toneLabel: 'Production-Ready',
    barClass: 'bg-gradient-to-r from-[#0A3A6B] via-[#1E6FD9] to-[#0FB5A6]',
    trackClass: 'bg-slate-100 dark:bg-slate-800/60',
    textClass: 'text-[#0A3A6B]',
    steps: ['Template', 'Branding', 'Module activation', 'Deploy'],
  },
];

const accelerators = [
  {
    icon: Layers,
    title: 'Prebuilt modules',
    desc: 'Payments, identity, marketplace engine, analytics, admin — activated not rebuilt.',
  },
  {
    icon: GitBranch,
    title: 'Multi-tenant architecture',
    desc: 'Tenant-isolated environments with regional deployment portability.',
  },
  {
    icon: ShieldCheck,
    title: 'Institution-grade security',
    desc: 'OAuth, RBAC, audit-ready logging and compliance baselines out of the box.',
  },
];

const DeploymentSpeed: React.FC = () => {
  return (
    <section
      aria-labelledby="deployment-speed-heading"
      className="relative py-28 lg:py-36 bg-gradient-to-b from-white via-[#F7FAFD] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-xs font-semibold text-[#0A3A6B] uppercase tracking-wider">
            <Zap size={12} aria-hidden="true" />
            Deployment Speed
          </p>
          <h2
            id="deployment-speed-heading"
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
          >
            Launch Platforms in Weeks —{' '}
            <span className="bg-gradient-to-r from-[#1E6FD9] to-[#0FB5A6] bg-clip-text text-transparent">
              Not Years
            </span>
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            Organizations compress deployment from multi-year custom builds into weeks by activating
            modular infrastructure instead of engineering every layer from scratch.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 p-6 lg:p-12 shadow-sm">
          <div className="grid grid-cols-[auto_1fr_auto] gap-x-6 lg:gap-x-10 gap-y-2 items-center text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold">
            <div>Approach</div>
            <div className="hidden lg:block">Relative Timeline</div>
            <div className="text-right">Duration</div>
          </div>

          <div className="mt-6 space-y-10">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-y-4 lg:gap-x-10 lg:items-center">
                <div>
                  <div className="text-base lg:text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                    {r.label}
                  </div>
                  <div className={`mt-1 text-xs uppercase tracking-wider font-semibold ${r.textClass}`}>
                    {r.toneLabel}
                  </div>
                </div>

                <div className={`relative h-4 rounded-full overflow-hidden ${r.trackClass}`} aria-hidden="true">
                  <div
                    className={`${r.barClass} h-full rounded-full origin-left motion-safe:animate-bar-grow ${r.widthClass}`}
                  />
                </div>

                <div className={`text-2xl lg:text-3xl font-semibold tracking-tight ${r.textClass} lg:text-right`}>
                  {r.duration}
                </div>

                <ol className="lg:col-span-3 mt-4 flex flex-wrap gap-2 lg:gap-3" aria-label={`${r.label} stages`}>
                  {r.steps.map((s, i) => (
                    <li
                      key={s}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      <span className="font-mono text-[10px] text-slate-400">0{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800 grid md:grid-cols-3 gap-6">
            {accelerators.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EEF4FA] to-[#E0EBF7] flex items-center justify-center text-[#0A3A6B] flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">{a.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-500 text-center inline-flex items-center gap-2 justify-center w-full">
          <Clock size={14} aria-hidden="true" />
          Time-to-value measured from kickoff to first production tenant.
        </p>
      </div>
    </section>
  );
};

export default DeploymentSpeed;
