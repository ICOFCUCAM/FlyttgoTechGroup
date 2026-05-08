'use client';

import { useEffect, useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Site-wide preview banner.
 *
 * Rendered on every page when the environment variable
 * NEXT_PUBLIC_PREVIEW_MODE is set to anything other than 'false' (so
 * preview-on is the default; flipping the env var to 'false' on the
 * launch deploy hides the banner site-wide without removing the code).
 *
 * Dismissed-state persists in localStorage per browser. The banner
 * still re-shows for new visitors and for visitors on a different
 * device — it isn't a one-and-done global toggle, by design.
 *
 * The banner doesn't claim things are wrong; it's an honest statement
 * that the site shows reference shapes for several surfaces (partner
 * directory, transparency report, press archive, AI governance + PQC
 * roadmap) that are aspirational rather than live.
 */

const LS_KEY = 'flytt:preview-banner-dismissed';

export default function PreviewBanner() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PREVIEW_MODE === 'false') {
      setHidden(true);
      return;
    }
    if (typeof window === 'undefined') return;
    const dismissed = window.localStorage.getItem(LS_KEY) === '1';
    setHidden(dismissed);
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LS_KEY, '1');
    }
    setHidden(true);
  };

  return (
    <div
      role="region"
      aria-label="Site preview notice"
      className="relative bg-[#0A1F3D] text-white border-b border-white/10 print:hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2.5 flex items-center gap-3 flex-wrap">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#D6B575]/15 text-[#D6B575] flex-shrink-0"
        >
          <AlertTriangle size={12} strokeWidth={2} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D6B575] font-semibold">
          PV.00 · preview
        </span>
        <span className="text-[12px] text-white/85 leading-snug min-w-0 flex-1">
          Customer deployments on /customers are real and verifiable at the
          live URLs shown. Other surfaces — partner directory, transparency
          numbers, press archive, AI governance + post-quantum roadmap — are{' '}
          <strong className="text-white">indicative or aspirational</strong>,
          not yet attested. Trust artefacts and live metrics will switch to real
          values as they&apos;re signed and shipped.
        </span>
        <Link
          href="/trust"
          className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#9ED0F9] hover:underline underline-offset-4 flex-shrink-0"
        >
          What&apos;s real today →
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss preview notice"
          className="text-white/55 hover:text-white motion-safe:transition-colors -mr-1 p-1 rounded flex-shrink-0"
        >
          <X size={13} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
