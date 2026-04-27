import React from 'react';
import Image from 'next/image';

/**
 * Single source of truth for the FlyttGo brand mark across the site.
 *
 * Four artworks live on Supabase storage; this component picks the
 * right one for the surface it's rendered on. To swap an asset for a
 * variant, edit the `BRAND_ASSETS` map below — every consumer in the
 * site updates automatically.
 *
 * Variants:
 *   - "lockup"           Full mark + wordmark, dark artwork, light surfaces.
 *                        Default. Used in the Navbar.
 *   - "lockup-dark"      Full mark + wordmark, light artwork, dark surfaces.
 *                        Used in the SiteFooter and dark hero panels.
 *   - "mark"             Glyph only. Used in tight spaces — the
 *                        EstablishmentRail and OG/social previews.
 *   - "mark-secondary"   Alternate mark, available for ad-hoc placement
 *                        (cert badges, leadership masthead, etc.).
 */

export type BrandLogoVariant = 'lockup' | 'lockup-dark' | 'mark' | 'mark-secondary';

const BRAND_ASSETS: Record<BrandLogoVariant, { src: string; alt: string }> = {
  lockup: {
    src: 'https://bxjynfuzqhlirdozlgno.supabase.co/storage/v1/object/public/images/Flyt%20Tech%20Group.png',
    alt: 'FlyttGo Technologies Group',
  },
  'lockup-dark': {
    src: 'https://bxjynfuzqhlirdozlgno.supabase.co/storage/v1/object/public/images/Fly%20Dark.png',
    alt: 'FlyttGo Technologies Group',
  },
  mark: {
    src: 'https://bxjynfuzqhlirdozlgno.supabase.co/storage/v1/object/public/images/FlyLogo.png',
    alt: 'FlyttGo',
  },
  'mark-secondary': {
    src: 'https://bxjynfuzqhlirdozlgno.supabase.co/storage/v1/object/public/images/flytlogo.png',
    alt: 'FlyttGo',
  },
};

type Props = {
  variant?: BrandLogoVariant;
  /** Rendered height in px. Width is derived from the natural aspect ratio. */
  height?: number;
  /** Optional aspect-ratio override when the natural ratio is unknown. */
  width?: number;
  className?: string;
  /** Whether the logo is decorative (default false — it's the brand mark). */
  decorative?: boolean;
  /** Eager-load this instance (use on Navbar / above-the-fold). */
  priority?: boolean;
};

const BrandLogo: React.FC<Props> = ({
  variant = 'lockup',
  height = 32,
  width,
  className,
  decorative = false,
  priority = false,
}) => {
  const asset = BRAND_ASSETS[variant];
  // Use a generous default aspect ratio so layout is stable while the
  // image loads; the rendered element uses h-{height}, w-auto so the
  // intrinsic ratio takes over once the image resolves.
  const w = width ?? Math.round(height * 3.5);
  return (
    <Image
      src={asset.src}
      alt={decorative ? '' : asset.alt}
      role={decorative ? 'presentation' : undefined}
      width={w}
      height={height}
      priority={priority}
      className={className}
      style={{ height, width: 'auto', objectFit: 'contain' }}
      unoptimized
    />
  );
};

export default BrandLogo;
