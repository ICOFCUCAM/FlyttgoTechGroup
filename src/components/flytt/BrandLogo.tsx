import React from 'react';
import Image from 'next/image';

/**
 * Single source of truth for the FlyttGo brand mark across the site.
 *
 * Renders the FlyttGo F-mark from /public/logo-mark.png alongside an
 * optional text wordmark — composed at runtime rather than baked
 * into a single image, so the wordmark stays crisp at any zoom level
 * and the mark / wordmark spacing follows the surrounding type
 * rhythm.
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

  // Brand display: 'FlyttGo' set in serif as the primary wordmark, with
  // 'Technologies Group' as a smaller mono kicker beneath. Together they
  // read as the full company name without the wordmark line getting too
  // long for navbar / footer fits.
  const primaryColour = isDark ? 'text-white' : 'text-slate-900 dark:text-white';
  const secondaryColour = isDark
    ? 'text-white/60'
    : 'text-slate-500 dark:text-slate-400';
  const primarySize = Math.round(height * 0.62);
  const secondarySize = Math.max(8, Math.round(height * 0.22));
  // Below ~24 px the kicker becomes unreadable, so the lockup
  // gracefully degrades to mark + 'FlyttGo' wordmark only.
  const showKicker = isLockup && height >= 24;

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
        <span className="flex flex-col leading-none">
          <span
            className={`font-serif font-medium tracking-tight ${primaryColour}`}
            style={{ fontSize: primarySize, letterSpacing: '-0.018em', lineHeight: 1 }}
          >
            FlyttGo
          </span>
          {showKicker && (
            <span
              className={`mt-1 font-mono uppercase font-medium ${secondaryColour}`}
              style={{ fontSize: secondarySize, letterSpacing: '0.18em', lineHeight: 1 }}
            >
              Technologies Group
            </span>
          )}
        </span>
      )}
    </span>
  );
};

export default BrandLogo;
