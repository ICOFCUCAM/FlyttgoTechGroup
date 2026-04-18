import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { T } from '@/components/flytt/T';
import { Reveal } from '@/components/flytt/Reveal';
import { ArrowRight, Briefcase, Code2, Compass, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'The FlyttGo Technologies Group leadership team — platform engineering, deployment architecture, security, commercial operations and public-sector partnerships.',
  alternates: { canonical: '/company/leadership' },
};

const functions = [
  {
    icon: Compass,
    title: 'Office of the CEO',
    body:
      'Sets strategic direction, regional expansion, and long-term commercial partnerships with ministries, enterprise operators and marketplace builders.',
  },
  {
    icon: Code2,
    title: 'Platform Engineering',
    body:
      'Owns the modular platform stack — Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera — and the FlyttGo marketplace engine built on top of it.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    body:
      'Runs the SOC 2 / ISO 27001 programme, customer audit responses, coordinated disclosure, and jurisdictional compliance mappings across EU, AF and MENA.',
  },
  {
    icon: Briefcase,
    title: 'Deployment & Operations',
    body:
      'Guides customers from procurement signal through tenant provisioning, integration, go-live and steady-state operations across all three deployment modes.',
  },
];

export default function LeadershipPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow={<T k="company.leadership.eyebrow" />}
          title={<T k="company.leadership.title" />}
          description="FlyttGo Technologies Group is led by a Nordic-origin team with deep experience in platform engineering, regulated deployments and multi-region operations. Named bios are shared with enterprise buyers during engagement."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company', href: '/company' },
            { label: 'Leadership' },
          ]}
        />

        <Reveal>
          <section className="py-14 lg:py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Leadership functions
              </p>
              <ul className="mt-8 grid md:grid-cols-2 gap-5">
                {functions.map((f) => {
                  const Icon = f.icon;
                  return (
                    <li
                      key={f.title}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0A3A6B]/5 dark:bg-[#1E6FD9]/10 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center">
                        <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                        {f.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {f.body}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#0A1F3D] to-[#0A3A6B] text-white">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                  Named bios, references &amp; organisation chart
                </h2>
                <p className="mt-3 text-white/80 leading-relaxed max-w-2xl">
                  Detailed bios, references and an organisation chart are shared during
                  enterprise and public-sector engagements as part of the vendor evaluation
                  pack.
                </p>
                <Link
                  href="/contact?intent=partnership"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0A3A6B] text-sm font-semibold rounded-md hover:bg-slate-100 motion-safe:transition-colors"
                >
                  Request leadership pack
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
