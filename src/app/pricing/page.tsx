import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import PricingConfigurator from '@/components/flytt/pricing/PricingConfigurator';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Infrastructure Cost Configurator — Live Pricing Across Six Capability Levels',
  description:
    "FlyttGo's live infrastructure cost configurator. Pick a capability level, layer feature add-ons, choose a deployment substrate and a region — total pricing band, delivery window and exportable estimate update live.",
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'FlyttGo · Infrastructure Cost Configurator',
    description:
      'Live pricing across six capability levels and eight modular add-ons. SaaS / Dedicated / PaaS / Sovereign deployment substrates. USA / Europe / Africa / Government regional pricing.',
    url: '/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlyttGo · Infrastructure Cost Configurator',
    description:
      'Live pricing band + delivery window across six capability levels. Export to PDF / .doc / email.',
  },
};

export default function PricingPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
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
          code="PR.00"
          eyebrow="Infrastructure Cost Configurator"
          title={
            <>
              Live infrastructure pricing,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                from digital presence to platform-class.
              </em>
            </>
          }
          description="Pick a capability level, layer feature add-ons, choose a deployment substrate, choose a region. Total pricing band, delivery window and an exportable estimate update live. Indicative — final pricing on the order form after a scoping engagement (SE.D2)."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]}
        />

        <Reveal>
          <section className="relative bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 py-16 lg:py-20 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <PricingConfigurator />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="bg-white dark:bg-slate-950 py-16 lg:py-20 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.99</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>How this estimate is calculated</span>
              </div>
              <div className="mt-6 grid lg:grid-cols-3 gap-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <div>
                  <h3 className="font-serif text-lg font-medium text-slate-900 dark:text-white mb-2">
                    Pricing model
                  </h3>
                  <p>
                    <code className="font-mono text-[12px] bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded">
                      total = (base + add-ons) × deployment-mult × region-mult
                    </code>
                  </p>
                  <p className="mt-2">
                    Indicative band ±15 %. The base price for each level is the
                    midpoint of the contractual band published on{' '}
                    <a href="/engineering" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline">
                      /engineering
                    </a>
                    .
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-slate-900 dark:text-white mb-2">
                    Timeline model
                  </h3>
                  <p>
                    <code className="font-mono text-[12px] bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded">
                      weeks = base + Σ(add-on weeks) × 0.6 + deployment + region
                    </code>
                  </p>
                  <p className="mt-2">
                    The 0.6 factor reflects parallel work on add-ons during a
                    single sprint cadence. Sovereign deployments add 8 weeks for
                    regulator hand-off; government region adds 4 weeks for
                    procurement governance.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-slate-900 dark:text-white mb-2">
                    What this is not
                  </h3>
                  <p>
                    Not a quote. Final point pricing only appears on the order
                    form signed after the scoping engagement (SE.D2). The
                    configurator is suitable for procurement-officer
                    pre-budgeting and for circulation under standard
                    public-sector information-handling rules.
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
