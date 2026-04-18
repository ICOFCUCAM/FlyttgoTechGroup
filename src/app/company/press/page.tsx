import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { Reveal } from '@/components/flytt/Reveal';
import { Download, FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Press & Media',
  description:
    'Press resources for FlyttGo Technologies Group — boilerplate, positioning, logo assets and media contacts.',
  alternates: { canonical: '/company/press' },
};

const boilerplate = `FlyttGo Technologies Group AB is a Nordic-origin platform infrastructure company. It builds modular deployment platforms covering mobility (Transify), workforce (Workverge), government services (Civitas), education intelligence (EduPro), identity (Identra), payments (Payvera), financial operations (Ledgera) and the FlyttGo marketplace — deployed as FlyttGo-managed SaaS, inside customer cloud tenancies, or within sovereign national datacenters across Europe, Africa and the Middle East.`;

export default function PressPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow="Company · Press"
          title={<>Press &amp; media resources.</>}
          description="Boilerplate, positioning, logo assets and media contact points. Interview requests are handled through the press email below."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company', href: '/company' },
            { label: 'Press' },
          ]}
        />

        <Reveal>
          <section className="py-14 lg:py-20">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-10">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                  Company boilerplate
                </h2>
                <p className="mt-4 text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {boilerplate}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <FileText size={13} aria-hidden="true" />
                    Positioning one-pager
                  </div>
                  <h3 className="mt-3 text-base font-semibold">FlyttGo Technologies Group · 2026</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Single-page PDF covering positioning, platforms, deployment modes and regional
                    coverage. Shared on request.
                  </p>
                  <Link
                    href="/contact?intent=press"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                  >
                    <Download size={14} aria-hidden="true" />
                    Request one-pager
                  </Link>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <FileText size={13} aria-hidden="true" />
                    Logo assets
                  </div>
                  <h3 className="mt-3 text-base font-semibold">Brand kit · Light &amp; dark</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    SVG and PNG logo marks, lockups and the FlyttGo Technologies Group word-mark.
                  </p>
                  <Link
                    href="/contact?intent=press"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                  >
                    <Download size={14} aria-hidden="true" />
                    Request brand kit
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <Mail size={13} aria-hidden="true" />
                  Media contact
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Reach the communications team at{' '}
                  <a
                    href="mailto:press@flyttgotech.com"
                    className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                  >
                    press@flyttgotech.com
                  </a>
                  . Interview requests are answered within two business days.
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
