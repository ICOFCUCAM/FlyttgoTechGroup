import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import {
  ServerCog,
  CloudCog,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Reveal } from '@/components/flytt/Reveal';

type Mode = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  icon: typeof ServerCog;
  accent: string;
};

const modes: Mode[] = [
  {
    id: 'managed',
    eyebrow: 'FlyttGo-managed',
    title: 'FlyttGo-managed infrastructure',
    description:
      'Fully managed SaaS deployment in FlyttGo-operated, region-aware cloud environments. Fastest path to production for pilot programmes and multi-region operators.',
    bullets: [
      'Region-aware hosting',
      'Managed upgrades & SLAs',
      'Multi-tenant isolation',
      'Operator success engineering',
    ],
    icon: CloudCog,
    accent: '#1E6FD9',
  },
  {
    id: 'customer-cloud',
    eyebrow: 'Customer cloud',
    title: 'Inside customer cloud environments',
    description:
      'Deploy platform modules inside the customer\u2019s own AWS / Azure / GCP tenancy. Retain full control of infrastructure, networking and access policies.',
    bullets: [
      'AWS · Azure · GCP',
      'Customer-owned tenancy',
      'Private networking & VPC',
      'Infrastructure-as-code templates',
    ],
    icon: ServerCog,
    accent: '#0FB5A6',
  },
  {
    id: 'sovereign',
    eyebrow: 'Sovereign',
    title: 'Within sovereign national data centers',
    description:
      'Self-hosted deployment inside sovereign national data centers for public-sector procurement. Designed for ministries, regulators and regional authorities.',
    bullets: [
      'National data residency',
      'Ministry-grade audit logging',
      'Offline & air-gapped options',
      'Procurement-ready attestations',
    ],
    icon: ShieldCheck,
    accent: '#7C5CE6',
  },
];

const DeploymentArchitecture: React.FC = () => {
  return (
    <section
      id="deployment"
      aria-labelledby="deployment-architecture-heading"
      className="relative py-28 lg:py-36 bg-gradient-to-b from-[#F7FAFD] via-white to-[#F5F8FC] dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-xs font-semibold text-[#0A3A6B] uppercase tracking-[0.18em]">
            <ServerCog size={12} aria-hidden="true" />
            Deployment Architecture
          </p>
          <h2
            id="deployment-architecture-heading"
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
          >
            Flexible Deployment{' '}
            <span className="bg-gradient-to-r from-[#1E6FD9] to-[#0FB5A6] bg-clip-text text-transparent">
              Architecture
            </span>
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            FlyttGo platforms support three deployment modes so every operator — from agile regional
            teams to national ministries — can adopt on terms that match their procurement,
            sovereignty and compliance posture.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modes.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal
                key={m.id}
                delay={i * 80}
                as="article"
                className="group relative p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:-translate-y-0.5 motion-safe:transition-all"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center motion-safe:transition-transform group-hover:-rotate-3"
                    style={{ backgroundColor: `${m.accent}14`, color: m.accent }}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <span
                    className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] px-2 py-1 rounded-md"
                    style={{ backgroundColor: `${m.accent}10`, color: m.accent }}
                  >
                    Mode {i + 1}
                  </span>
                </div>
                <p
                  className="mt-6 text-[11px] uppercase tracking-[0.18em] font-semibold"
                  style={{ color: m.accent }}
                >
                  {m.eyebrow}
                </p>
                <h3 className="mt-2 text-xl lg:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {m.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: m.accent }}
                        aria-hidden="true"
                      />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`/deployment/${m.id}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 motion-safe:transition-all"
                  style={{ color: m.accent }}
                >
                  View {m.eyebrow} details
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact?intent=deployment"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] motion-safe:transition-colors shadow-[0_1px_0_0_rgb(10_58_107/0.6),0_6px_18px_-6px_rgb(10_58_107/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
          >
            Request deployment review
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
          >
            Review architecture
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeploymentArchitecture;
