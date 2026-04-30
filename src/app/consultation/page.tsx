import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import ConsultationBooking from '@/components/flytt/consultation/ConsultationBooking';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import {
  CONSULTATION_TYPES,
} from '@/lib/consultation-schema';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { Landmark, ShoppingBag, Network, Briefcase, type LucideIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Architecture Consultation Booking — Structured Engagement Intake',
  description:
    "FlyttGo's structured consultation booking engine. Pick a consultation type, region, deployment substrate and preferred time — request is logged into the engagement-desk register with a category-specific preparation brief.",
  alternates: { canonical: '/consultation' },
  openGraph: {
    title: 'FlyttGo · Architecture Consultation Booking',
    description:
      'Four consultation categories: Platform Architecture · Marketplace Provider Onboarding · Government Pilot Deployment · Enterprise Relocation Programme Setup. Five-step intake with timezone-aware scheduling.',
    url: '/consultation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlyttGo · Architecture Consultation Booking',
    description:
      'Structured consultation intake — four categories · five steps · institutional preparation brief.',
  },
};

type CategoryRow = {
  code: string;
  label: string;
  icon: LucideIcon;
  who: string;
  purpose: string;
  color: string;
};

const CATEGORY_ROWS: CategoryRow[] = [
  {
    code: 'CT.01',
    label: 'Platform Architecture Session',
    icon: Network,
    who: 'Enterprises · universities · mobility operators · relocation companies',
    purpose: 'System design · deployment posture · integration scope',
    color: '#1E6FD9',
  },
  {
    code: 'CT.02',
    label: 'Marketplace Provider Onboarding Session',
    icon: ShoppingBag,
    who: 'Moving companies · drivers · packing teams · storage partners',
    purpose: 'Platform onboarding · compliance · service integration',
    color: '#0FB5A6',
  },
  {
    code: 'CT.03',
    label: 'Government Pilot Deployment Session',
    icon: Landmark,
    who: 'Ministries · municipalities · transport authorities · education systems',
    purpose: 'Pilot rollout · deployment mode · data governance',
    color: '#7C5CE6',
  },
  {
    code: 'CT.04',
    label: 'Enterprise Relocation Programme Setup',
    icon: Briefcase,
    who: 'Corporate HR teams · universities · NGOs · mobility coordinators',
    purpose: 'Tenant setup · workflow configuration · provider routing',
    color: '#D6B575',
  },
];

const consultServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'FlyttGo Architecture Consultation Booking',
  serviceType: 'Structured infrastructure-consultation scheduling',
  provider: {
    '@type': 'Organization',
    name: 'FlyttGo Technologies Group AB',
    url: 'https://flyttgo.tech',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Consultation categories',
    itemListElement: CONSULTATION_TYPES.map((c) => ({
      '@type': 'Offer',
      name: `${c.code} · ${c.label}`,
    })),
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://flyttgo.tech/consultation',
    name: 'Architecture consultation booking',
  },
};

export default function ConsultationPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Consultation', href: '/consultation' },
  ]);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consultServiceLd) }}
      />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="CB.00"
          eyebrow="Architecture Consultation Booking"
          title={
            <>
              Structured infrastructure consultation,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                booked under the right category.
              </em>
            </>
          }
          description="Four consultation categories — platform architecture, marketplace onboarding, government pilot deployment, enterprise relocation programme setup. Five-step intake with timezone-aware scheduling. Each booking is logged into the engagement-desk register with a category-specific preparation brief."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Consultation' }]}
        />

        {/* CB.CAT — four category overview */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CB.CAT</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Four consultation categories</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Pick the category that matches your programme.{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  The desk routes from there.
                </em>
              </h2>

              <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORY_ROWS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li
                      key={c.code}
                      className="flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${c.color}14`, color: c.color }}
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-[0.22em] font-semibold"
                          style={{ color: c.color }}
                        >
                          {c.code}
                        </span>
                      </div>
                      <div className="mt-4 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                        {c.label}
                      </div>
                      <dl className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 space-y-2 font-mono text-[10px] tracking-[0.16em] uppercase">
                        <div>
                          <dt className="text-slate-400">Used by</dt>
                          <dd className="mt-0.5 text-slate-600 dark:text-slate-400 normal-case tracking-normal text-[11px] font-sans leading-snug">
                            {c.who}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-slate-400">Purpose</dt>
                          <dd className="mt-0.5 text-slate-600 dark:text-slate-400 normal-case tracking-normal text-[11px] font-sans leading-snug">
                            {c.purpose}
                          </dd>
                        </div>
                      </dl>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* CB.WIZ — booking wizard */}
        <Reveal>
          <section
            id="book"
            className="bg-white dark:bg-slate-950 py-16 lg:py-20 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CB.WIZ</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Five-step intake</span>
              </div>
              <ConsultationBooking />
            </div>
          </section>
        </Reveal>

        {/* CB.99 — explainer */}
        <Reveal>
          <section className="bg-[#F7FAFD] dark:bg-slate-900/60 py-16 lg:py-20 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CB.99</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>How requests are routed</span>
              </div>
              <div className="mt-6 grid lg:grid-cols-3 gap-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <div>
                  <h3 className="font-serif text-lg font-medium text-slate-900 dark:text-white mb-2">
                    Category routing
                  </h3>
                  <p>
                    The consultation purpose drives the category — Marketplace
                    onboarding routes to <strong>CT.02</strong>, pilot
                    discussion routes to <strong>CT.03</strong>, enterprise
                    rollout to <strong>CT.04</strong>; everything else
                    routes to <strong>CT.01</strong> Platform Architecture.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-slate-900 dark:text-white mb-2">
                    Architecture tier suggestion
                  </h3>
                  <p>
                    The organisation type seeds an architecture tier
                    suggestion (a ministry → L.05, an enterprise → L.04,
                    a relocation company → L.03). Visitors override before
                    submitting if their programme calls for a different
                    tier.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-slate-900 dark:text-white mb-2">
                    Preparation brief
                  </h3>
                  <p>
                    Each category surfaces its own preparation brief on the
                    confirmation panel — the materials the desk asks
                    visitors to bring to the session. Mirrors the
                    engagement-preparation discipline of Big-4 advisory
                    practices.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
