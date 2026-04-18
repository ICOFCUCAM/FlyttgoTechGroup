import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CloudCog, ServerCog, ShieldCheck } from 'lucide-react';

const modes = [
  { icon: CloudCog, title: 'FlyttGo-managed', blurb: 'Fully managed SaaS with region-aware hosting.', accent: '#1E6FD9' },
  { icon: ServerCog, title: 'Customer cloud', blurb: 'Runs inside your AWS, Azure or GCP tenancy.', accent: '#0FB5A6' },
  { icon: ShieldCheck, title: 'Sovereign datacenter', blurb: 'Self-hosted for public-sector procurement.', accent: '#7C5CE6' },
];

const HomeDeploymentStrip: React.FC = () => {
  return (
    <section
      aria-labelledby="home-deployment-heading"
      className="relative py-20 lg:py-24 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-[11px] font-semibold text-[#0A3A6B] uppercase tracking-[0.18em]">
              Deployment Architecture
            </p>
            <h2
              id="home-deployment-heading"
              className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
            >
              Deploy on your terms.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Three deployment modes to match any procurement or sovereignty posture.{' '}
              <Link href="/deployment" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                Deployment details
              </Link>
              .
            </p>
          </div>
        </div>

        <ul className="mt-10 grid sm:grid-cols-3 gap-4">
          {modes.map((m) => {
            const Icon = m.icon;
            return (
              <li key={m.title}>
                <Link
                  href="/deployment"
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${m.accent}14`, color: m.accent }}
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
                        {m.title}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-all"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 leading-snug">
                      {m.blurb}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-sm text-slate-500 dark:text-slate-500 leading-relaxed max-w-3xl">
          Ledgera supports deployment on FlyttGo-managed infrastructure, customer cloud
          environments and sovereign national data centers alongside Transify, Workverge, Civitas,
          EduPro, Identra and Payvera.
        </p>
      </div>
    </section>
  );
};

export default HomeDeploymentStrip;
