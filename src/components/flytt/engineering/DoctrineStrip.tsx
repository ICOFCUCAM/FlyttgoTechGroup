import React from 'react';

/**
 * SE.00 — Doctrine strip. Single-source doctrine line that sits
 * immediately below the PageHero subtitle. Any duplicate occurrence
 * elsewhere on the page must be removed.
 */
export default function DoctrineStrip() {
  return (
    <section
      role="doc-tip"
      aria-label="FlyttGoTech engineering doctrine"
      className="bg-[#0A1F3D] text-white border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 lg:py-5 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-[#D6B575] flex-shrink-0"
        />
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#D6B575] font-semibold flex-shrink-0 hidden sm:inline">
          Doctrine
        </span>
        <span aria-hidden="true" className="text-white/30 hidden sm:inline">·</span>
        <p className="text-[12px] sm:text-[13px] text-white/85 leading-snug tracking-tight">
          Every engagement runs on the same FlyttGoTech Core, the same compliance posture, the same audit log.
        </p>
      </div>
    </section>
  );
}
