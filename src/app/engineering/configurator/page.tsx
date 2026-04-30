import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EngineeringSubNav from '@/components/flytt/engineering/EngineeringSubNav';
import PricingConfigurator from '@/components/flytt/pricing/PricingConfigurator';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cost Configurator · PR.00 — Institutional Systems Engineering',
  description:
    'Live procurement estimator. Pick a capability tier, layer feature modules, choose a deployment substrate and a region — total pricing band, delivery window and exportable estimate update live.',
  alternates: { canonical: '/engineering/configurator' },
};

export default function ConfiguratorPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Engineering', href: '/engineering' },
    { name: 'PR.00 Cost Configurator', href: '/engineering/configurator' },
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
              Live procurement estimator,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                from digital presence to platform-class.
              </em>
            </>
          }
          description="Pick an architecture level, layer feature modules, choose a deployment substrate, choose a region. Total pricing band, delivery window and an exportable estimate update live. Indicative — final pricing on the order form after a scoping engagement (SE.D2)."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Engineering', href: '/engineering' },
            { label: 'PR.00 Cost Configurator' },
          ]}
        />
        <EngineeringSubNav />
        <Reveal>
          <section className="relative bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 py-16 lg:py-20 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <PricingConfigurator />
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
