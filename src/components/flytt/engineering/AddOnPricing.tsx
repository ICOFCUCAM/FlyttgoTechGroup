'use client';

import React from 'react';
import {
  KeyRound,
  CreditCard,
  LayoutDashboard,
  Smartphone,
  ShoppingBag,
  Workflow,
  ShieldCheck,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

/**
 * SE.03 — Modular add-on pricing. Eight feature extensions that
 * scale orthogonally to the six capability levels. Customers add
 * any subset to any level; pricing is per add-on and bundled into
 * the same order form as the level itself.
 */

type AddOn = {
  code: string;
  icon: LucideIcon;
  name: string;
  body: string;
  price: string;
};

const ADDONS: AddOn[] = [
  { code: 'AO.01', icon: KeyRound,        name: 'Authentication system',         body: 'SSO / SAML / OIDC · multi-tenant identity broker · session-cookie hardening', price: '$1,500 – $8,000' },
  { code: 'AO.02', icon: CreditCard,      name: 'Payment integration',           body: 'PSD2-aligned · SEPA + national rails · Stripe / Adyen / national processors',  price: '$2,000 – $12,000' },
  { code: 'AO.03', icon: LayoutDashboard, name: 'Admin dashboard',               body: 'Role-based access · audit-log surfaces · reporting · multi-org tenancy',         price: '$3,000 – $20,000' },
  { code: 'AO.04', icon: Smartphone,      name: 'Mobile app companion',          body: 'iOS + Android · React Native · push notifications · deep-link integration',      price: '$15,000 – $80,000' },
  { code: 'AO.05', icon: ShoppingBag,     name: 'Marketplace engine',            body: 'Multi-sided platform · provider directory · order routing · escrow optional',    price: '$25,000 – $150,000' },
  { code: 'AO.06', icon: Workflow,        name: 'Enterprise workflow system',    body: 'Approval chains · document management · SLA-bounded queues · API-first',         price: '$20,000 – $120,000' },
  { code: 'AO.07', icon: ShieldCheck,     name: 'Government compliance module', body: 'eIDAS · GDPR · sector regulators · DPIA artefacts · regulator hand-off',          price: '$40,000 – $250,000' },
  { code: 'AO.08', icon: Cpu,             name: 'AI routing engine',             body: 'Demand forecasting · multi-objective routing · anomaly detection · MLOps pipeline', price: '$60,000 – $300,000' },
];

export default function AddOnPricing() {
  return (
    <section
      id="se-03"
      aria-labelledby="se-03-heading"
      className="relative bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.03</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Modular add-ons</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="se-03-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Eight modular add-ons.{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                Bolt onto any capability level.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              Each add-on is licensable independently and stacks against
              any of the six capability levels. Final pricing depends on
              integration depth, identity boundary and regulatory
              perimeter — the bands below are indicative.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid md:grid-cols-2 gap-3">
          {ADDONS.map((a) => {
            const Icon = a.icon;
            return (
              <li
                key={a.code}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
              >
                <span
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                        {a.code}
                      </span>
                      <span className="text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                        {a.name}
                      </span>
                    </div>
                    <span className="font-mono text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] tabular-nums">
                      {a.price}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] text-slate-600 dark:text-slate-400 leading-snug">
                    {a.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed">
          Pricing bands indicative · per add-on · final point pricing on the order form
          after the scoping engagement
        </p>
      </div>
    </section>
  );
}
