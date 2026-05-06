import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { ArrowUpRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Jurisdictions · JU.00 — FlyttGo Technologies Group',
  description:
    'Per-jurisdiction procurement and compliance posture across the United Kingdom, European Union, Norway, Saudi Arabia, United Arab Emirates and South Africa.',
  alternates: { canonical: '/jurisdictions' },
};

export default function JurisdictionsIndexPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Jurisdictions', href: '/jurisdictions' },
  ]);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="JU.00"
          eyebrow="Jurisdictions"
          title={
            <>
              Six jurisdictions,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                aligned to local procurement.
              </em>
            </>
          }
          description="Per-jurisdiction landing for procurement officers — local frameworks (G-Cloud, OJEU, NUPP, Doffin, Etimad, Treasury RT), local compliance posture (UK GDPR, eIDAS, NCA, POPIA), local deployment substrate availability and reference programmes."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Jurisdictions' }]}
        />

        <Reveal>
          <section
            id="ju-idx"
            aria-labelledby="ju-idx-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">JU.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="ju-idx-heading">Jurisdictions index</span>
              </div>
              <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {JURISDICTIONS.map((j) => (
                  <li key={j.slug}>
                    <Link
                      href={`/jurisdictions/${j.slug}`}
                      className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-3xl" aria-hidden="true">{j.flag}</span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {j.code}
                        </span>
                      </div>
                      <h3 className="mt-4 font-serif text-xl font-medium tracking-tight text-slate-900 dark:text-white">
                        {j.name}
                      </h3>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {j.region}
                      </div>
                      <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                        {j.positioning}
                      </p>
                      <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          {j.deploymentSubstrates.join(' · ')}
                        </span>
                        <ArrowUpRight
                          size={13}
                          className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
