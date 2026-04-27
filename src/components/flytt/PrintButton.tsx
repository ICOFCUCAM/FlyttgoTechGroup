'use client';

import React from 'react';
import { Printer } from 'lucide-react';

/**
 * Tiny client-only "Print to PDF" button. Lives in its own module so
 * the surrounding page can stay a Server Component (metadata, JSON-LD,
 * static rendering) while still exposing browser-print as a CTA.
 */

type Props = {
  className?: string;
  label?: string;
};

export default function PrintButton({
  className = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0A3A6B] text-white text-xs font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors',
  label = 'Print to PDF',
}: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') window.print();
      }}
      className={className}
    >
      <Printer size={12} strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
  );
}
