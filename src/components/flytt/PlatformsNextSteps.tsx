import { Globe2, Workflow, Network, Compass } from 'lucide-react';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';

export default function PlatformsNextSteps() {
  return (
    <NextStepsGrid
      code="PL.NX"
      eyebrow="Where these platforms go next"
      titleLead="The platforms are"
      titleEmphasis="one surface in a wider stack."
      intro="Each module above runs on a deployment substrate, can be extended through bespoke engineering, can be turned into a marketplace, and starts with a single procurement intake. The four pathways below route to the next surface a programme typically needs."
      steps={[
        {
          href: '/deployment',
          code: 'DM.00',
          icon: Globe2,
          title: 'Deploy these platforms',
          body: 'Three substrates — FlyttGo-managed SaaS, customer-cloud (AWS · Azure · GCP), sovereign national datacenter. Each module is licensed independently per deployment.',
          meta: 'DM.01 · DM.02 · DM.03',
        },
        {
          href: '/engineering',
          code: 'SE.00',
          icon: Workflow,
          title: 'Build on the same substrate',
          body: 'Six escalating engagement tiers (L.01 → L.06) — from digital presence websites to platform-class ecosystems engineered on the same orchestration core that powers the modules above.',
          meta: 'L.01 → L.06',
        },
        {
          href: '/marketplace',
          code: 'MP.00',
          icon: Network,
          title: 'Operate a marketplace',
          body: 'Provider routing, trust & verification, pricing intelligence, dispute resolution. Four subsystems that turn Transify into a multi-sided national marketplace.',
          meta: 'MP.RT · MP.TV · MP.PI · MP.DR',
        },
        {
          href: '/consultation',
          code: 'CB.00',
          icon: Compass,
          title: 'Start a procurement',
          body: 'Capability deep-dive scheduled within one business day. Pilot scoping under NDA. Procurement-grade proposals delivered in PDF, Word and email-ready form.',
          meta: 'CT.01 → CT.04',
        },
      ]}
    />
  );
}
