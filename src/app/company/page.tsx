import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import { ArrowRight, ArrowUpRight, Globe2, Building2, Flag, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Company — About FlyttGo Technologies Group',
  description:
    'FlyttGo Technologies Group is a Nordic-origin platform infrastructure company building modular deployment environments for logistics, education, government and enterprise operators across Europe, Africa and the Middle East.',
  alternates: { canonical: '/company' },
  openGraph: {
    title: 'About FlyttGo Technologies Group',
    description:
      'Nordic-origin platform infrastructure company building modular deployment environments across EU · AF · MENA.',
    url: '/company',
    type: 'website',
  },
};

const pillars = [
  {
    icon: Target,
    title: 'Mission',
    description:
      'Turn the multi-year platform build into a multi-week deployment. Operators and institutions focus on market execution; FlyttGo supplies the infrastructure layer.',
  },
  {
    icon: Globe2,
    title: 'Coverage',
    description:
      'Nordic origin. Deployed across Europe, Africa and the Middle East through tenant-isolated, region-aware infrastructure with data residency options.',
  },
  {
    icon: Building2,
    title: 'Customers',
    description:
      'Governments, ministries, municipalities, logistics operators, enterprise fleets and marketplace founders — a single platform layer serving four operator profiles.',
  },
  {
    icon: Flag,
    title: 'Positioning',
    description:
      'Peers in spirit: Stripe Infrastructure, Shopify Marketplace, Palantir Foundry, AWS Marketplace, Uber Movement — infrastructure-first platform companies.',
  },
];

export default function CompanyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <section
          aria-labelledby="company-heading"
          className="relative py-24 lg:py-32 bg-gradient-to-b from-[#F7FAFD] via-white to-white"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl motion-safe:animate-fade-up">
              <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Company
              </p>
              <h1
                id="company-heading"
                className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
              >
                Platform infrastructure for{' '}
                <span className="text-[#0A3A6B]">global operators and institutions.</span>
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                FlyttGo Technologies Group is a Nordic-origin platform infrastructure company.
                We build the modular deployment layer that logistics, education, government and
                enterprise operators run on.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] motion-safe:transition-colors shadow-lg shadow-blue-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
                >
                  Contact the team
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/platforms"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 dark:text-white font-semibold rounded-lg border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-900/60 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
                >
                  Explore platforms
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-5">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <article
                    key={p.title}
                    className="p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/80 dark:border-slate-800/60 shadow-sm hover:shadow-xl motion-safe:transition-shadow"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EEF4FA] to-[#E0EBF7] flex items-center justify-center text-[#0A3A6B]"
                      aria-hidden="true"
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h2 className="mt-6 text-xl lg:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.description}
                    </p>
                  </article>
                );
              })}
            </div>

            <dl className="mt-10 p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/80 dark:border-slate-800/60 shadow-sm grid sm:grid-cols-4 gap-6">
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Headquarters</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">Stockholm · Nordic EU</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Regions served</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">EU · AF · MENA</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Platforms</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">5 infrastructure platforms</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Modules</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">18+ composable modules</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
