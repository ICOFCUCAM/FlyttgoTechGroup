import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import EnterpriseSection from '@/components/flytt/EnterpriseSection';
import GovernmentSection from '@/components/flytt/GovernmentSection';
import SolutionsSection from '@/components/flytt/SolutionsSection';
import SiteFooter from '@/components/flytt/SiteFooter';

export const metadata: Metadata = {
  title: 'Solutions — Enterprise Logistics & Government Deployment Infrastructure',
  description:
    'Deployment solutions for enterprise fleets, municipalities, education ministries and transport authorities — built on the FlyttGo modular infrastructure layer.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'FlyttGo Deployment Solutions',
    description:
      'Enterprise logistics, government services, education analytics and regulated transport oversight — deployed as modular infrastructure.',
    url: '/solutions',
    type: 'website',
  },
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white text-slate-900 antialiased">
        <EnterpriseSection />
        <GovernmentSection />
        <SolutionsSection />
      </main>
      <SiteFooter />
    </>
  );
}
