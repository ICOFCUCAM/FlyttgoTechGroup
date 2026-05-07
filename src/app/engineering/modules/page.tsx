import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EngineeringSubNav from '@/components/flytt/engineering/EngineeringSubNav';
import AddOnStackDiagram from '@/components/flytt/engineering/AddOnStackDiagram';
import AddOnPricing from '@/components/flytt/engineering/AddOnPricing';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Modular Add-Ons · SE.03 — Institutional Systems Engineering',
  description:
    'Eight modular extensions that bolt onto any capability tier — authentication, payment integration, admin dashboard, mobile companion app, marketplace engine, enterprise workflow system, government compliance module, AI routing engine.',
  alternates: { canonical: '/engineering/modules' },
};

export default function ModulesPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Engineering', href: '/engineering' },
    { name: 'SE.03 Modular Add-Ons', href: '/engineering/modules' },
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
          code="SE.03"
          eyebrow="Modular Add-Ons"
          title={
            <>
              Modular extensions{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                that stack onto any tier.
              </em>
            </>
          }
          description="Each module is licensed independently and stacks against any of the six capability tiers. Final pricing depends on integration depth, identity boundary and regulatory perimeter."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Engineering', href: '/engineering' },
            { label: 'SE.03 Modular Add-Ons' },
          ]}
        />
        <EngineeringSubNav />
        {/* SE.SK — architecture stack diagram first; SE.03 add-on
            cards below carry the per-module price band. */}
        <Reveal>
          <AddOnStackDiagram />
        </Reveal>
        <Reveal>
          <AddOnPricing />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
