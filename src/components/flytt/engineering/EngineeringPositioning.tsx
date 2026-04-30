'use client';

import React from 'react';

/**
 * SE.01 — Division positioning. Doctrine statement block.
 * Audience taxonomy lives in AudienceGrid (SE.AU); this surface
 * carries only the positioning paragraphs and the section index rail.
 */

export default function EngineeringPositioning() {
  return (
    <section
      id="se-01"
      aria-labelledby="se-01-heading"
      className="relative bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.01</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Division positioning</span>
        </div>

        <h2
          id="se-01-heading"
          className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
        >
          One engineering substrate.{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            Six capability tiers.
          </em>
        </h2>

        <div className="mt-8 grid gap-5 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65]">
          <p>
            The capability surface this page describes is in production
            today; the deployment posture is the same one our regulator-
            bounded installations operate under across European, African
            and Middle Eastern public-sector and enterprise programmes.
          </p>
          <p>
            Six capability tiers — from a 5-day digital presence website
            (Level 1) to a multi-year platform-ecosystem programme
            (Level 6, where FlyttGo itself sits). Every tier inherits the
            engineering rigour that ships the higher tiers, and every tier
            inherits the speed and clarity that ship the lower ones. Three
            deployment modes accommodate every sovereignty posture from
            managed SaaS in EU primary regions through to sovereign national
            datacenters under national HSM and national-eID integration.
          </p>
        </div>
      </div>

      {/* Thin divider after section */}
      <div
        aria-hidden="true"
        className="mt-20 lg:mt-24 mx-auto max-w-3xl px-6 lg:px-8"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
      </div>
    </section>
  );
}
