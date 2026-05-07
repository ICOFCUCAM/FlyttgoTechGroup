import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EnterpriseSection from '@/components/flytt/EnterpriseSection';
import GovernmentSection from '@/components/flytt/GovernmentSection';
import DeploymentSpeed from '@/components/flytt/DeploymentSpeed';
import SolutionsSection from '@/components/flytt/SolutionsSection';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { Calculator, Workflow, Globe2, Compass } from 'lucide-react';

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
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          code="SO.00"
          eyebrow="Deployment Solutions"
          title={
            <>
              Programme-shaped engagements{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                for operators and institutions.
              </em>
            </>
          }
          description="Enterprise logistics, government services, education analytics and regulated-transport oversight. Each programme is composed from the same modular surface — picked, configured and deployed against the procurement tier the buyer's operating reality calls for."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
        />
        <EnterpriseSection />
        <Reveal>
          <GovernmentSection />
        </Reveal>
        <Reveal>
          <DeploymentSpeed />
        </Reveal>
        <Reveal>
          <SolutionsSection />
        </Reveal>
        <Reveal>
          <NextStepsGrid
            code="SO.NX"
            eyebrow="From a programme shape to a procurement"
            titleLead="Programmes start with a"
            titleEmphasis="capability scope, not a contract."
            intro="The four pathways below take a sector programme from initial sizing through to deployment scoping — pricing estimator, engineering tier ladder, deployment substrate selection and consultation booking."
            steps={[
              {
                href: '/pricing',
                code: 'PR.00',
                icon: Calculator,
                title: 'Size the programme live',
                body: 'Live procurement estimator. Pick a tier, layer feature modules, choose a deployment substrate and region — total band updates live.',
                meta: 'Live total · PDF / Word / email',
              },
              {
                href: '/engineering/ladder',
                code: 'SE.02',
                icon: Workflow,
                title: 'Pick an engagement tier',
                body: 'Six tiers L.01 → L.06 — from digital presence websites to platform-class national infrastructure. Audience + delivery + deployment matrix on the page.',
                meta: 'L.01 → L.06',
              },
              {
                href: '/deployment',
                code: 'DM.00',
                icon: Globe2,
                title: 'Pick a deployment substrate',
                body: 'Three substrates — managed SaaS, customer cloud, sovereign datacenter. Compatibility matrix on the page.',
                meta: 'DM.01 · DM.02 · DM.03',
              },
              {
                href: '/consultation',
                code: 'CB.00',
                icon: Compass,
                title: 'Open a scoping engagement',
                body: 'Five-step intake routed to a solution architect within one business day. NDA scoping under SE.D2 follows.',
                meta: 'CT.01 → CT.04',
              },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
