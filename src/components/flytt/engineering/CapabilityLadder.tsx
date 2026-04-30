'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight, Calculator, type LucideIcon, FileText, Briefcase, LayoutDashboard, Building2, Landmark, Network } from 'lucide-react';

/**
 * SE.02 — Capability ladder. Six capability levels stacked from
 * Level 1 (Digital Presence Website) to Level 6 (Platform Ecosystem
 * Infrastructure — where FlyttGo itself sits). Each card carries the
 * tier code, level name, audience tags, feature bullets, technology
 * stack, delivery cadence and indicative pricing for both US/EU and
 * Africa regions.
 */

type Level = {
  code: string;
  level: string;
  name: string;
  icon: LucideIcon;
  accent: string;
  tier: 'sme' | 'enterprise' | 'sovereign' | 'ecosystem';
  bestFor: string[];
  features: string[];
  technology: string;
  delivery: string;
  pricingEU: string;
  pricingAF: string;
  isFlyttGoTier?: boolean;
};

const LEVELS: Level[] = [
  {
    code: 'L.01',
    level: 'Level 1',
    name: 'Digital Presence Website',
    icon: FileText,
    accent: '#1E6FD9',
    tier: 'sme',
    bestFor: ['Small businesses', 'Consultants', 'Startups', 'Local service providers'],
    features: [
      'Modern homepage',
      'Services pages',
      'Contact form',
      'Mobile-responsive layout',
      'SEO-ready structure',
      'Google indexing setup',
      'Performance optimisation',
      'Basic analytics integration',
    ],
    technology: 'React / Next.js static site',
    delivery: '5 – 10 days',
    pricingEU: '$900 – $2,500',
    pricingAF: '$250 – $900',
  },
  {
    code: 'L.02',
    level: 'Level 2',
    name: 'Professional Business Website',
    icon: Briefcase,
    accent: '#0A6FB5',
    tier: 'sme',
    bestFor: ['SMEs', 'Logistics companies', 'Schools', 'Health centres', 'Construction firms'],
    features: [
      'Multi-page structure',
      'CMS editing capability',
      'Blog / news module',
      'Team & portfolio sections',
      'Lead capture forms',
      'Google Maps integration',
      'Advanced SEO setup',
      'Performance optimisation',
    ],
    technology: 'Next.js + CMS integration',
    delivery: '2 – 4 weeks',
    pricingEU: '$3,000 – $7,000',
    pricingAF: '$800 – $2,500',
  },
  {
    code: 'L.03',
    level: 'Level 3',
    name: 'Smart Interactive Platform',
    icon: LayoutDashboard,
    accent: '#0FB5A6',
    tier: 'sme',
    bestFor: ['Marketplaces', 'Universities', 'NGOs', 'Service aggregators', 'Mobility platforms'],
    features: [
      'User login system',
      'Dashboard environment',
      'Admin control panel',
      'Database integration',
      'Search & filter systems',
      'Multi-role access control',
      'Payment gateway integration',
      'API connectivity support',
      'Real-time interactions',
    ],
    technology: 'Full-stack SaaS · Supabase / PostgreSQL / Node',
    delivery: '1 – 3 months',
    pricingEU: '$8,000 – $35,000',
    pricingAF: '$2,500 – $12,000',
  },
  {
    code: 'L.04',
    level: 'Level 4',
    name: 'Enterprise Operations Platform',
    icon: Building2,
    accent: '#0A3A6B',
    tier: 'enterprise',
    bestFor: ['Corporations', 'Universities', 'Transport systems', 'Municipal services', 'Logistics operators'],
    features: [
      'Multi-department dashboards',
      'Approval workflows',
      'Document management system',
      'Analytics reporting',
      'API-first architecture',
      'Multi-user organisation accounts',
      'Audit-ready logging',
      'Advanced security layers',
      'Role-based permissions',
      'Exportable reporting tools',
    ],
    technology: 'Enterprise SaaS · tenant-based architecture',
    delivery: '3 – 6 months',
    pricingEU: '$40,000 – $120,000',
    pricingAF: '$10,000 – $45,000',
  },
  {
    code: 'L.05',
    level: 'Level 5',
    name: 'National Institutional Platform',
    icon: Landmark,
    accent: '#7C5CE6',
    tier: 'sovereign',
    bestFor: ['Governments', 'Ministries', 'Transport authorities', 'Education systems', 'Digital public infrastructure'],
    features: [
      'Sovereign deployment compatibility',
      'Identity federation readiness',
      'Multi-region deployment architecture',
      'Compliance-ready audit systems',
      'Workflow automation engine',
      'Integration with legacy systems',
      'Procurement compatibility support',
      'Secure data architecture layers',
      'API integration with national systems',
    ],
    technology: 'SaaS + PaaS + sovereign deployment architecture',
    delivery: '6 – 12 months',
    pricingEU: '$150,000 – $800,000',
    pricingAF: '$40,000 – $250,000',
  },
  {
    code: 'L.06',
    level: 'Level 6',
    name: 'Platform Ecosystem Infrastructure',
    icon: Network,
    accent: '#D6B575',
    tier: 'ecosystem',
    isFlyttGoTier: true,
    bestFor: ['National digital infrastructure', 'Cross-border logistics', 'Education ecosystems', 'Mobility coordination platforms', 'Marketplace networks'],
    features: [
      'Multi-platform ecosystem orchestration',
      'AI routing logic',
      'Real-time operations dashboard',
      'Multi-country deployment readiness',
      'Provider marketplace engine',
      'Enterprise portals',
      'Government procurement compatibility',
      'Financial audit console',
      'Identity verification layer',
      'Multi-currency architecture',
      'Deployment-mode selection (SaaS / PaaS / Sovereign)',
    ],
    technology: 'Platform ecosystem architecture',
    delivery: '6 – 18 months',
    pricingEU: '$500,000 – $3M+',
    pricingAF: '$120,000 – $900,000',
  },
];

const TIER_LABEL: Record<Level['tier'], string> = {
  sme: 'SMB · SME',
  enterprise: 'Enterprise',
  sovereign: 'Sovereign',
  ecosystem: 'Platform-class',
};

export default function CapabilityLadder() {
  return (
    <section
      id="se-02"
      aria-labelledby="se-02-heading"
      className="relative bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.02</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Capability ladder · six levels</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="se-02-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Six capability levels.{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                Pick the one your programme calls for.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              Each level is a discrete engagement shape — defined feature
              set, defined technology profile, defined delivery cadence,
              indicative pricing band per region. Programmes typically
              start at one level and advance up the ladder as scope and
              audience grow.
            </p>
          </div>
        </div>

        <ol className="mt-12 grid lg:grid-cols-2 gap-4">
          {LEVELS.map((l) => {
            const Icon = l.icon;
            return (
              <li
                key={l.code}
                className={`relative flex flex-col p-6 rounded-2xl border ${
                  l.isFlyttGoTier
                    ? 'bg-[#0A1F3D] text-white border-white/10 shadow-[0_24px_60px_-30px_rgb(214_181_117/0.40)]'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      l.isFlyttGoTier ? 'bg-[#D6B575]/15 text-[#D6B575]' : ''
                    }`}
                    style={l.isFlyttGoTier ? undefined : { backgroundColor: `${l.accent}14`, color: l.accent }}
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-mono text-[10px] tracking-[0.22em] uppercase font-semibold"
                        style={{ color: l.isFlyttGoTier ? '#D6B575' : l.accent }}
                      >
                        {l.code}
                      </span>
                      <span
                        className={`font-mono text-[9px] tracking-[0.18em] uppercase px-1.5 py-0.5 rounded ${
                          l.isFlyttGoTier
                            ? 'text-[#D6B575] border border-[#D6B575]/30'
                            : 'text-slate-500 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {TIER_LABEL[l.tier]}
                      </span>
                      {l.isFlyttGoTier && (
                        <span className="font-mono text-[9px] tracking-[0.18em] uppercase px-1.5 py-0.5 rounded text-[#0A1F3D] bg-[#D6B575]">
                          FlyttGo sits here
                        </span>
                      )}
                    </div>
                    <div
                      className={`mt-1 text-[16px] font-semibold tracking-tight leading-snug ${
                        l.isFlyttGoTier ? 'text-white' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {l.name}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div
                    className={`font-mono text-[10px] uppercase tracking-[0.18em] mb-2 ${
                      l.isFlyttGoTier ? 'text-white/55' : 'text-slate-400'
                    }`}
                  >
                    Best for
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {l.bestFor.map((b) => (
                      <span
                        key={b}
                        className={`text-[11px] tracking-tight px-2 py-0.5 rounded-md ${
                          l.isFlyttGoTier
                            ? 'bg-white/[0.06] text-white/80 border border-white/10'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700'
                        }`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <div
                    className={`font-mono text-[10px] uppercase tracking-[0.18em] mb-2 ${
                      l.isFlyttGoTier ? 'text-white/55' : 'text-slate-400'
                    }`}
                  >
                    Features
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {l.features.map((f) => (
                      <li
                        key={f}
                        className={`text-[12px] leading-snug pl-3 relative ${
                          l.isFlyttGoTier ? 'text-white/75' : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-2 w-1 h-1 rounded-full"
                          style={{ backgroundColor: l.isFlyttGoTier ? '#D6B575' : l.accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <dl
                  className={`mt-5 pt-4 border-t grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] ${
                    l.isFlyttGoTier ? 'border-white/10' : 'border-slate-200/70 dark:border-slate-800/60'
                  }`}
                >
                  <div>
                    <dt className={l.isFlyttGoTier ? 'text-white/55' : 'text-slate-400'}>Technology</dt>
                    <dd
                      className={`mt-0.5 normal-case tracking-normal text-[12px] font-sans ${
                        l.isFlyttGoTier ? 'text-white/85' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {l.technology}
                    </dd>
                  </div>
                  <div>
                    <dt className={l.isFlyttGoTier ? 'text-white/55' : 'text-slate-400'}>Delivery</dt>
                    <dd
                      className={`mt-0.5 normal-case tracking-normal text-[12px] font-sans ${
                        l.isFlyttGoTier ? 'text-white/85' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {l.delivery}
                    </dd>
                  </div>
                </dl>

                <div
                  className={`mt-4 pt-4 border-t ${
                    l.isFlyttGoTier ? 'border-white/10' : 'border-slate-200/70 dark:border-slate-800/60'
                  }`}
                >
                  <div
                    className={`font-mono text-[10px] uppercase tracking-[0.18em] mb-2 ${
                      l.isFlyttGoTier ? 'text-white/55' : 'text-slate-400'
                    }`}
                  >
                    Indicative pricing band
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    <div>
                      <div
                        className={`font-mono text-[9px] uppercase tracking-[0.16em] ${
                          l.isFlyttGoTier ? 'text-white/45' : 'text-slate-400'
                        }`}
                      >
                        US / EU
                      </div>
                      <div
                        className={`mt-0.5 text-[13px] font-semibold tracking-tight tabular-nums ${
                          l.isFlyttGoTier ? 'text-[#D6B575]' : ''
                        }`}
                        style={l.isFlyttGoTier ? undefined : { color: l.accent }}
                      >
                        {l.pricingEU}
                      </div>
                    </div>
                    <div>
                      <div
                        className={`font-mono text-[9px] uppercase tracking-[0.16em] ${
                          l.isFlyttGoTier ? 'text-white/45' : 'text-slate-400'
                        }`}
                      >
                        Africa
                      </div>
                      <div
                        className={`mt-0.5 text-[13px] font-semibold tracking-tight tabular-nums ${
                          l.isFlyttGoTier ? 'text-[#D6B575]' : ''
                        }`}
                        style={l.isFlyttGoTier ? undefined : { color: l.accent }}
                      >
                        {l.pricingAF}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
          >
            <Calculator size={14} strokeWidth={2} aria-hidden="true" />
            Open the live cost configurator · PR.00
            <ArrowUpRight
              size={13}
              className="motion-safe:transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            Live total · delivery window · export to PDF · .doc · email
          </span>
        </div>
        <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed">
          Pricing bands are indicative · per programme · final point pricing on the order form
          after a scoping engagement (SE.04 · scoping)
        </p>
      </div>
    </section>
  );
}
