'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight, CloudCog, ServerCog, ShieldCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import SectionIndex from '@/components/flytt/SectionIndex';
import DeploymentTopology from '@/components/flytt/diagrams/DeploymentTopology';
import RegionalRollout from '@/components/flytt/diagrams/RegionalRollout';

const modes = [
  {
    icon: CloudCog,
    code: 'DM.01',
    title: 'FlyttGo-managed',
    blurb: 'Region-aware managed SaaS in EU primary regions. Fastest path to production.',
    accent: '#1E6FD9',
    href: '/deployment/managed',
    timeline: '60–90 days',
    sovereignty: 'FlyttGo SOC',
  },
  {
    icon: ServerCog,
    code: 'DM.02',
    title: 'Customer cloud',
    blurb: 'Runs inside your AWS, Azure, or GCP tenancy. Customer SOC, customer compliance boundary.',
    accent: '#0FB5A6',
    href: '/deployment/customer-cloud',
    timeline: '75–120 days',
    sovereignty: 'BYO cloud',
  },
  {
    icon: ShieldCheck,
    code: 'DM.03',
    title: 'Sovereign datacenter',
    blurb: 'Self-hosted in certified national datacenters with optional air-gap and national HSM.',
    accent: '#7C5CE6',
    href: '/deployment/sovereign',
    timeline: '120–180 days',
    sovereignty: 'In-jurisdiction',
  },
];

const HomeDeploymentStrip: React.FC = () => {
  const { t } = useI18n();
  return (
    <section
      aria-labelledby="home-deployment-heading"
      className="relative py-24 lg:py-28 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionIndex
          code="DP.02"
          title="Deployment Architecture"
          meta="3 deployment modes · sovereignty-aware · multi-region"
          className="max-w-2xl"
        />

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="home-deployment-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Deploy on{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                your sovereignty terms.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              {t('home.deployment.description')}{' '}
              <Link
                href="/deployment"
                className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
              >
                {t('home.deployment.cta')}
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Deployment topology diagram */}
        <div className="mt-10 p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm overflow-hidden">
          <DeploymentTopology className="overflow-x-auto" />
        </div>

        {/* Mode cards — upgraded with code, timeline, sovereignty stamp */}
        <ul className="mt-8 grid sm:grid-cols-3 gap-4">
          {modes.map((m) => {
            const Icon = m.icon;
            return (
              <li key={m.title}>
                <Link
                  href={m.href}
                  className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${m.accent}14`, color: m.accent }}
                      aria-hidden="true"
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] font-semibold"
                      style={{ color: m.accent }}
                    >
                      {m.code}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
                      {m.title}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-all"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                    {m.blurb}
                  </p>
                  <dl className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 grid grid-cols-2 gap-2 font-mono text-[10px] tracking-[0.16em] uppercase">
                    <div>
                      <dt className="text-slate-400">Timeline</dt>
                      <dd className="mt-0.5 text-slate-700 dark:text-slate-300">
                        {m.timeline}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Sovereignty</dt>
                      <dd
                        className="mt-0.5"
                        style={{ color: m.accent }}
                      >
                        {m.sovereignty}
                      </dd>
                    </div>
                  </dl>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Regional rollout map */}
        <div className="mt-10 p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">RR.00</span>
              <span className="mx-2">·</span>Regional rollout topology
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
              EU · AF · MENA
            </span>
          </div>
          <RegionalRollout className="overflow-x-auto" />
        </div>

        <p className="mt-8 text-sm text-slate-500 dark:text-slate-500 leading-relaxed max-w-3xl font-mono uppercase tracking-[0.14em]">
          Ledgera supports deployment on FlyttGo-managed, customer cloud, and sovereign national
          datacenters alongside Transify, Workverge, Civitas, EduPro, Identra, and Payvera.
        </p>
      </div>
    </section>
  );
};

export default HomeDeploymentStrip;
