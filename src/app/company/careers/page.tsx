import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { Reveal } from '@/components/flytt/Reveal';
import { ArrowUpRight, Briefcase, Code2, Globe2, ShieldCheck, Users, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Open roles at FlyttGo Technologies Group across platform engineering, deployment architecture, security and public-sector partnerships — EU, AF, MENA.',
  alternates: { canonical: '/company/careers' },
};

const roles = [
  {
    icon: Code2,
    title: 'Staff Platform Engineer',
    team: 'Platform Engineering',
    location: 'Oslo / Stockholm · Remote-friendly EU',
    body:
      'Design the core multi-tenant runtime shared across Transify, Workverge, Civitas, EduPro, Identra, Payvera and Ledgera.',
  },
  {
    icon: ShieldCheck,
    title: 'Senior Security Engineer',
    team: 'Security & Compliance',
    location: 'EU-based',
    body:
      'Drive SOC 2 Type II readiness, penetration-test management and coordinated disclosure programme.',
  },
  {
    icon: Wrench,
    title: 'Deployment Architect',
    team: 'Deployment & Operations',
    location: 'Oslo / Dubai / Remote',
    body:
      'Partner with enterprise and public-sector customers through tenant provisioning, IAM integration and go-live.',
  },
  {
    icon: Globe2,
    title: 'Public-sector Partnerships Lead · MENA',
    team: 'Commercial',
    location: 'Dubai',
    body:
      'Build relationships with ministries, national agencies and sovereign integrators across the Gulf and wider MENA region.',
  },
  {
    icon: Users,
    title: 'Technical Program Manager',
    team: 'Deployment & Operations',
    location: 'Remote EU',
    body:
      'Run cross-customer deployment programmes, manage risk registers, and drive post-mortem learnings into the platform.',
  },
  {
    icon: Briefcase,
    title: 'Enterprise Account Executive',
    team: 'Commercial',
    location: 'London / Stockholm',
    body:
      'Guide enterprise procurement conversations from first call to executed MSA, Order Form and DPA.',
  },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow="Company · Careers"
          title={<>Help operators deploy national-scale platforms — without the years-long build.</>}
          description="FlyttGo Technologies Group is a Nordic-origin platform company hiring across engineering, security, deployment and commercial functions. Most roles are remote-friendly within EU timezones; public-sector roles anchor in key regional hubs."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company', href: '/company' },
            { label: 'Careers' },
          ]}
        />

        <Reveal>
          <section className="py-14 lg:py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Current openings
              </p>
              <ul className="mt-8 divide-y divide-slate-200/80 dark:divide-slate-800/60 border-y border-slate-200/80 dark:border-slate-800/60">
                {roles.map((r) => {
                  const Icon = r.icon;
                  return (
                    <li key={r.title}>
                      <Link
                        href="/contact?intent=careers"
                        className="group grid md:grid-cols-12 gap-4 py-6 items-start hover:bg-slate-50/80 dark:hover:bg-slate-900/40 motion-safe:transition-colors rounded-md -mx-2 px-2"
                      >
                        <div className="md:col-span-1">
                          <div className="w-9 h-9 rounded-lg bg-[#0A3A6B]/5 text-[#0A3A6B] dark:bg-[#1E6FD9]/15 dark:text-[#9ED0F9] flex items-center justify-center">
                            <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                          </div>
                        </div>
                        <div className="md:col-span-6">
                          <div className="text-base font-semibold text-slate-900 dark:text-white tracking-tight group-hover:underline underline-offset-4">
                            {r.title}
                          </div>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-snug">
                            {r.body}
                          </p>
                        </div>
                        <div className="md:col-span-3 text-xs text-slate-500 dark:text-slate-500">
                          <div className="font-mono uppercase tracking-[0.14em]">{r.team}</div>
                        </div>
                        <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2 text-xs text-slate-500">
                          <span className="md:text-right">{r.location}</span>
                          <ArrowUpRight size={14} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white motion-safe:transition-colors" aria-hidden="true" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
                <h2 className="text-base font-semibold tracking-tight">Don&apos;t see your role?</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  We&apos;re always open to conversations with experienced platform, security and
                  deployment engineers.{' '}
                  <Link
                    href="/contact?intent=careers"
                    className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                  >
                    Drop us a line
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
