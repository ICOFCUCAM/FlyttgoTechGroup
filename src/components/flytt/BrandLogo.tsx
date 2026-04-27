import React from 'react';

/**
 * Single source of truth for the FlyttGo F-symbol mark across the
 * site. Inline SVG — no external fetch, sharp at every size, fully
 * theme-able via the `module` prop. Geometry is invariant across
 * variants (the path data is identical to docs/brand/symbol-spec.md
 * and docs/brand/system/*.svg). Variants differ only in fill.
 *
 * Variants:
 *   - "lockup"       Mark + wordmark, light surfaces. Default.
 *   - "lockup-dark"  Mark + wordmark, dark surfaces.
 *   - "mark"         F-symbol only, gradient (modulable via `module`).
 *   - "mark-mono"    F-symbol only, currentColor (host controls ink).
 *   - "favicon-16"   Pixel-snapped 16x16 simplification (only sanctioned
 *                    geometry simplification).
 *
 * Module-color inheritance:
 *   <BrandLogo variant="mark" module="payvera" />
 *
 * On surfaces scoped to a single platform module, pass the module
 * name to swap the gradient pair to that module's palette. Defaults
 * to "platform" (the canonical FlyttGo blue).
 */

const F_PATH = 'M 4 2 H 22 V 7 H 9 V 10 H 18 V 15 H 9 V 22 H 4 Z';
const F_PATH_16 = 'M 3 2 H 13 V 5 H 6 V 7 H 10 V 10 H 6 V 14 H 3 Z';

export type BrandLogoVariant = 'lockup' | 'lockup-dark' | 'mark' | 'mark-mono' | 'favicon-16';

export type BrandModule =
  | 'platform'
  | 'transify'
  | 'workverge'
  | 'civitas'
  | 'edupro'
  | 'identra'
  | 'payvera'
  | 'ledgera'
  | 'marketplace'
  | 'flyttgo';

const MODULE_GRADIENT: Record<BrandModule, [string, string]> = {
  platform:    ['#0A3A6B', '#1E6FD9'],
  transify:    ['#0A3A6B', '#1E6FD9'],
  workverge:   ['#0A3A2A', '#0FB5A6'],
  civitas:     ['#2A1B47', '#7C5CE6'],
  edupro:      ['#5C4A24', '#D6B575'],
  identra:     ['#1B2D4D', '#5B7FBF'],
  payvera:     ['#143E2A', '#2BA876'],
  ledgera:     ['#4D2818', '#B85C3E'],
  marketplace: ['#6B3D0A', '#D9A21E'],
  // 'flyttgo' is the slug for the FlyttGo Marketplace platform — alias
  // so /platforms/flyttgo can pass `module={data.slug}` directly.
  flyttgo:     ['#6B3D0A', '#D9A21E'],
};

const DARK_LOCKUP_GRADIENT: [string, string] = ['#6FAEFF', '#9ED0F9'];

type Props = {
  variant?: BrandLogoVariant;
  /** Module palette to use for mark-class variants. Ignored for lockup
   *  and favicon variants (those are always platform-blue). */
  module?: BrandModule;
  /** Rendered height in px. Width derives from the natural ratio. */
  height?: number;
  className?: string;
  /** Suppress alt text — use when chrome around the mark already names it. */
  decorative?: boolean;
  /** Kept for backwards-compatibility with the previous image-based
   *  component. No effect now (inline SVG renders synchronously). */
  priority?: boolean;
};

export default function BrandLogo({
  variant = 'lockup',
  module = 'platform',
  height = 32,
  className,
  decorative = false,
}: Props) {
  const reactId = React.useId();
  const gradientId = `flytt-grad-${reactId.replace(/:/g, '')}`;

  const ariaLabel = decorative
    ? undefined
    : variant.startsWith('lockup')
    ? 'FlyttGo Technologies Group'
    : module === 'platform'
    ? 'FlyttGo'
    : `FlyttGo · ${module}`;

  // ── Lockup ─────────────────────────────────────────────────────────
  if (variant === 'lockup' || variant === 'lockup-dark') {
    const isDark = variant === 'lockup-dark';
    const [stopA, stopB] = isDark ? DARK_LOCKUP_GRADIENT : MODULE_GRADIENT.platform;
    const wordmarkColor = isDark ? '#FFFFFF' : '#0A1F3D';
    const subColor = isDark ? '#94A3B8' : '#475569';

    return (
      <svg
        viewBox="0 0 152 24"
        height={height}
        style={{ width: 'auto' }}
        className={className}
        role={decorative ? 'presentation' : 'img'}
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={stopA} />
            <stop offset="100%" stopColor={stopB} />
          </linearGradient>
        </defs>
        <path d={F_PATH} fill={`url(#${gradientId})`} />
        <text
          x="32"
          y="17"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          fontSize="14"
          fontWeight="600"
          letterSpacing="-0.3"
          fill={wordmarkColor}
        >
          FlyttGo
        </text>
        <text
          x="84.5"
          y="17"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          fontSize="14"
          fontWeight="400"
          letterSpacing="-0.2"
          fill={subColor}
        >
          Technologies
        </text>
      </svg>
    );
  }

  // ── Favicon-16 ─────────────────────────────────────────────────────
  if (variant === 'favicon-16') {
    return (
      <svg
        viewBox="0 0 16 16"
        width={height}
        height={height}
        shapeRendering="crispEdges"
        className={className}
        role={decorative ? 'presentation' : 'img'}
        aria-label={ariaLabel}
      >
        <rect x="0" y="0" width="16" height="16" fill="#0A3A6B" />
        <path d={F_PATH_16} fill="#9ED0F9" />
      </svg>
    );
  }

  // ── Mark-mono ──────────────────────────────────────────────────────
  if (variant === 'mark-mono') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={height}
        height={height}
        className={className}
        role={decorative ? 'presentation' : 'img'}
        aria-label={ariaLabel}
      >
        <path d={F_PATH} fill="currentColor" />
      </svg>
    );
  }

  // ── Mark (gradient, modulable) ─────────────────────────────────────
  const [stopA, stopB] = MODULE_GRADIENT[module];
  return (
    <svg
      viewBox="0 0 24 24"
      width={height}
      height={height}
      className={className}
      role={decorative ? 'presentation' : 'img'}
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={stopA} />
          <stop offset="100%" stopColor={stopB} />
        </linearGradient>
      </defs>
      <path d={F_PATH} fill={`url(#${gradientId})`} />
    </svg>
  );
}
