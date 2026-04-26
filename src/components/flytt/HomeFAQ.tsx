'use client';

import React, { useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import SectionIndex from '@/components/flytt/SectionIndex';

type QA = {
  q: string;
  a: React.ReactNode;
};

const faqs: QA[] = [
  {
    q: 'How long does a platform deployment typically take?',
    a: (
      <>
        A standard FlyttGo deployment goes from procurement sign-off to a
        production-ready tenant in 60–120 days, depending on deployment mode.
        Sovereign datacenter installations add 30–60 days for network and
        hardware provisioning. See the{' '}
        <Link href="/deployment" className="underline underline-offset-4 font-medium">
          deployment architecture
        </Link>{' '}
        for details.
      </>
    ),
  },
  {
    q: 'Can we host FlyttGo platforms inside our own cloud tenancy?',
    a: (
      <>
        Yes. Every platform supports three deployment modes: FlyttGo-managed
        SaaS, customer cloud (AWS, Azure or GCP under your account), and
        sovereign national datacenters for public-sector procurement.
        Data residency is enforced per deployment.
      </>
    ),
  },
  {
    q: 'Which certifications and compliance frameworks do you support?',
    a: (
      <>
        Platforms are engineered against SOC 2 Type II, ISO 27001, GDPR and
        WCAG 2.1 AA. Regulated verticals (payments, identity, government)
        layer additional controls — PSD2, eIDAS, PCI-DSS — as needed per
        jurisdiction.
      </>
    ),
  },
  {
    q: 'Can we deploy only one module, or do we have to take the full suite?',
    a: (
      <>
        Modules are independent. Most operators start with one or two (e.g.
        Transify for mobility + Identra for auth) and add the rest as
        program requirements grow. Each module is licensed per deployment,
        per region.
      </>
    ),
  },
  {
    q: 'How is multi-tenancy isolated between customer deployments?',
    a: (
      <>
        Every tenant runs on a dedicated schema with region-scoped
        encryption keys, tenant-level audit trails and RBAC boundaries
        enforced at the API gateway. Sovereign deployments can be fully
        air-gapped.
      </>
    ),
  },
  {
    q: 'Do you integrate with our existing identity and payment providers?',
    a: (
      <>
        Yes — SAML 2.0, OIDC, LDAP and national eID schemes are supported
        through Identra. Payvera supports Stripe, Adyen, PayPal, SEPA and
        national payment rails. Integration scoping is part of the initial
        deployment workshop.
      </>
    ),
  },
];

const HomeFAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="home-faq-heading"
      className="relative py-20 lg:py-24 bg-white dark:bg-slate-950"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <SectionIndex
          code="PR.05"
          title="Deployment Procurement Guide"
          meta="6 questions · timeline · compliance · multi-tenancy · sovereignty"
          className="max-w-2xl"
        />
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="home-faq-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Common questions from{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                deployment partners.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              If your RFP or procurement process needs detailed answers on
              compliance, data residency, SLAs or commercial terms,{' '}
              <Link href="/contact?intent=procurement" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                request a solution brief
              </Link>
              .
            </p>
          </div>
        </div>

        <ul className="mt-10 divide-y divide-slate-200/80 dark:divide-slate-800/60 border-y border-slate-200/80 dark:border-slate-800/60">
          {faqs.map((item, i) => {
            const expanded = open === i;
            const headingId = `faq-${i}-heading`;
            const panelId = `faq-${i}-panel`;
            return (
              <li key={i}>
                <h3 id={headingId}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="group w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-md"
                  >
                    <span className="text-base md:text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`flex-shrink-0 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-transform ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  hidden={!expanded}
                  className="pb-6 pr-10 text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                  {item.a}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <Link
            href="/contact?intent=procurement"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:gap-3 motion-safe:transition-all"
          >
            Talk to deployment engineering
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
