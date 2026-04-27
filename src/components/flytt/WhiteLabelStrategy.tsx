import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  LayoutDashboard,
  Puzzle,
  CheckCircle2,
} from 'lucide-react';

type Pillar = {
  icon: typeof Palette;
  title: string;
  description: string;
  bullets: string[];
};

const pillars: Pillar[] = [
  {
    icon: Palette,
    title: 'Branding customization',
    description:
      'Retain full brand identity — custom domains, logos, color systems, typography and regional language presets applied across every tenant interface.',
    bullets: ['Custom domains', 'Brand systems', 'Language & currency'],
  },
  {
    icon: LayoutDashboard,
    title: 'Operator dashboards',
    description:
      'Purpose-built operator cockpits for dispatch, analytics, tenant administration, compliance and performance oversight — unified under one tenant.',
    bullets: ['Tenant admin', 'Dispatch & analytics', 'Role-based access'],
  },
  {
    icon: Puzzle,
    title: 'Modular expansion',
    description:
      'Activate additional modules — payments, identity, marketplace engine, analytics — independently, without re-architecting the platform.',
    bullets: ['Module activation', 'Regional rollouts', 'Multi-tenant ready'],
  },
];

const WhiteLabelStrategy: React.FC = () => {
  return (
    <section
      id="whitelabel"
      aria-labelledby="whitelabel-strategy-heading"
      className="relative py-28 lg:py-36 bg-gradient-to-b from-[#F7FAFD] via-white to-[#F5F8FC] dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end motion-safe:animate-fade-up">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-xs font-semibold text-[#0A3A6B] uppercase tracking-wider">
              White-Label Strategy
            </p>
            <h2
              id="whitelabel-strategy-heading"
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Deploy Your Own Marketplace Brand —{' '}
              <span className="bg-gradient-to-r from-[#1E6FD9] to-[#0FB5A6] bg-clip-text text-transparent">
                Without Building Backend Infrastructure
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              FlyttGo provides the full operator stack — branding, dashboards, modules — so teams
              can focus on market-facing execution instead of reinventing the platform layer.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/white-label"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] motion-safe:transition-colors shadow-lg shadow-blue-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
              >
                Launch Your Platform
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/platforms/flyttgo"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:gap-3 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
              >
                See marketplace modules
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="group relative p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:-translate-y-0.5 motion-safe:transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EEF4FA] to-[#E0EBF7] flex items-center justify-center text-[#0A3A6B] motion-safe:transition-transform group-hover:-rotate-3"
                  aria-hidden="true"
                >
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="mt-7 text-xl lg:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{p.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={16} className="text-[#1E6FD9] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelStrategy;
