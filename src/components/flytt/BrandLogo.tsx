import React from 'react';
import Image from 'next/image';

/**
 * Single source of truth for the FlyttGo brand mark across the site.
 *
 * Renders the F-mark from /public/logo-mark.png next to a 'FlyttGo'
 * wordmark in serif. The full 'FlyttGo Technologies Group' name is
 * surfaced elsewhere (top utility bar, footer brand block, JSON-LD)
 * so the navbar lockup stays compact.
 *
 * Variants:
 *   - "lockup"           Mark + 'FlyttGo' wordmark, slate text. Light surfaces.
 *                        Default. Used in the Navbar.
 *   - "lockup-dark"      Mark + 'FlyttGo' wordmark, white text. Dark surfaces.
 *                        Used in the SiteFooter and dark hero panels.
 *   - "mark"             Glyph only. Used in tight spaces — the
 *                        EstablishmentRail and OG / social previews.
 *   - "mark-secondary"   Same glyph at the secondary scale. Available
 *                        for cert badges and leadership masthead use.
 */

export type BrandLogoVariant = 'lockup' | 'lockup-dark' | 'mark' | 'mark-secondary';

const MARK_SRC = '/logo-mark.png';

type Props = {
  variant?: BrandLogoVariant;
  /** Rendered height in px. Mark is rendered at this height; wordmark scales from it. */
  height?: number;
  className?: string;
  /** Whether the logo is decorative (default false — it's the brand mark). */
  decorative?: boolean;
  /** Eager-load this instance (use on Navbar / above-the-fold). */
  priority?: boolean;
};

const BrandLogo: React.FC<Props> = ({
  variant = 'lockup',
  height = 32,
  className,
  decorative = false,
  priority = false,
}) => {
  const isLockup = variant === 'lockup' || variant === 'lockup-dark';
  const isDark = variant === 'lockup-dark';
  const altText = decorative ? '' : 'FlyttGo Technologies Group';

  const wordmarkColour = isDark ? 'text-white' : 'text-slate-900 dark:text-white';
  const wordmarkSize = Math.round(height * 0.66);

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className ?? ''}`}
      role={decorative ? 'presentation' : undefined}
      aria-label={decorative ? undefined : altText}
    >
      <Image
        src={MARK_SRC}
        alt={decorative || isLockup ? '' : altText}
        width={height}
        height={height}
        priority={priority}
        style={{ height, width: height, objectFit: 'contain' }}
      />
      {isLockup && (
        <span
          className={`font-serif font-medium tracking-tight ${wordmarkColour}`}
          style={{ fontSize: wordmarkSize, letterSpacing: '-0.018em', lineHeight: 1 }}
        >
          FlyttGo
        </span>
      )}
    </span>
  );
};

export default BrandLogo;
