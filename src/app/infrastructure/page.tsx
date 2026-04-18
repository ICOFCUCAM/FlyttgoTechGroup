import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import InfrastructureModules from '@/components/flytt/InfrastructureModules';
import SiteFooter from '@/components/flytt/SiteFooter';

export const metadata: Metadata = {
  title: 'Infrastructure — Modular Platform Components',
  description:
    'Six composable infrastructure modules — payments, identity, marketplace engine, relocation intelligence, admin dashboards and analytics — powering every FlyttGo deployment.',
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
        <InfrastructureModules />
      </main>
      <SiteFooter />
    </>
  );
}
