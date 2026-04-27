import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import InfrastructureModules from '@/components/flytt/InfrastructureModules';
import SiteFooter from '@/components/flytt/SiteFooter';

export const metadata: Metadata = {
  title: 'Infrastructure — Modular Platform Components',
  description:
    'Composable infrastructure modules — payments, identity, marketplace engine, mobility intelligence, admin dashboards and analytics — powering every FlyttGo deployment.',
  alternates: { canonical: '/infrastructure' },
  openGraph: {
    title: 'FlyttGo Infrastructure Modules',
    description:
      'Composable modules for payments, identity, marketplaces, relocation intelligence, admin and analytics.',
    url: '/infrastructure',
    type: 'website',
  },
};

export default function InfrastructurePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          code="IF.00"
          eyebrow="Infrastructure Modules"
          title={
            <>
              Composable modules.{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                One platform substrate.
              </em>
            </>
          }
          description="Payments, identity, marketplace engine, mobility intelligence, admin dashboards and analytics — independent modules that compose into every FlyttGo deployment, governed by a shared audit, identity and orchestration core."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Infrastructure' }]}
        />
        <InfrastructureModules />
      </main>
      <SiteFooter />
    </>
  );
}
