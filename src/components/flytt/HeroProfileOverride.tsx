'use client';

import React from 'react';

/**
 * Visitor-profile-aware hero copy override.
 *
 * Reads the visitor's timezone (Intl.DateTimeFormat) and document.referrer
 * after hydration, picks one of three editorial variants, and smoothly
 * fades the alternative copy over the SSR-rendered default. The SSR HTML
 * is unchanged — every cache key still serves the same default — so this
 * is genuinely zero-cost on the network and entirely additive on the
 * client.
 *
 * Profiles:
 *   gov-no  → Norwegian gov / EU-Nordic timezone → sovereign EU emphasis
 *   us-cc   → US gov / mil / NA timezones        → customer-cloud emphasis
 *   default → no override                       → SSR copy stays
 *
 * The override fades in 600ms after hydration so it doesn't fight the
 * staged hero entrance from globals.css.
 */

type Profile = 'gov-no' | 'us-cc' | 'default';

type Variant = {
  eyebrow?: string;
  titlePart1?: string;
  titlePart2?: string;
  subtitle?: string;
};

const VARIANTS: Record<Exclude<Profile, 'default'>, Variant> = {
  'gov-no': {
    eyebrow: 'Norwegian sovereign deployment',
    titlePart1: 'Deploy on sovereign',
    titlePart2: 'Norwegian infrastructure.',
    subtitle:
      'In-jurisdiction hosting, ID-porten + BankID federation, statutory SAF-T export, ministry-grade governance. Ledgera-backed financial reporting on every settlement event.',
  },
  'us-cc': {
    eyebrow: 'US customer-cloud deployment',
    titlePart1: 'Deploy in your',
    titlePart2: 'AWS · Azure · GCP tenancy.',
    subtitle:
      'Customer-controlled cloud surface — your account, your VPC, your IAM. SOC 2-aligned controls, GAAP-bundle exports (Form 1120 / 1065 / Schedule C), tenant-scoped data residency by default.',
  },
};

function detectProfile(): Profile {
  // Profile override is intentionally CONSERVATIVE — only fires on
  // strong referrer signals. Timezone alone was too noisy (a Stockholm
  // visitor was being shown Norwegian-sovereign copy, etc). The
  // canonical default copy now leads with multi-cloud + IaaS/SaaS/PaaS
  // + enterprise + public-sector positioning, which serves every
  // visitor well; the override is reserved for unambiguous deep links
  // from named .gov / .kommune / .mil domains.
  if (typeof document === 'undefined') return 'default';

  const referrer = (document.referrer || '').toLowerCase();
  if (/\.gov\.no(?:\/|$)|\.kommune\.no(?:\/|$)/.test(referrer)) return 'gov-no';
  if (/\.gov(?:\/|$)|\.mil(?:\/|$)|\.gov\.us(?:\/|$)/.test(referrer)) return 'us-cc';

  return 'default';
}

/**
 * Mounts a fixed-position invisible probe at the top of the hero. When
 * a non-default profile is detected, it walks the DOM via document
 * query-selectors and overrides the hero text content with a fade.
 *
 * Why DOM mutation instead of React state in HeroSlider? Because the
 * hero copy is i18n-driven via t() — overriding via React would mean
 * re-rendering, which would re-trigger the staged entrance animation.
 * A targeted DOM swap with crossfade is gentler and preserves the
 * cinematic reveal already in flight.
 */
export default function HeroProfileOverride() {
  React.useEffect(() => {
    const profile = detectProfile();
    if (profile === 'default') return;
    const variant = VARIANTS[profile];

    const root = document.getElementById('top');
    if (!root) return;

    // Wait for the staged hero entrance to mostly complete before
    // crossfading in the override (entrance is 060–840ms). 1100ms
    // gives the cascade time to settle visually.
    const t = window.setTimeout(() => {
      const eyebrow = root.querySelector<HTMLElement>('[class*="bg-white/10"][class*="rounded-full"]');
      const h1 = root.querySelector<HTMLElement>('#hero-heading');
      const subline = h1?.parentElement?.querySelector<HTMLElement>('h1 + p');

      if (variant.eyebrow && eyebrow) {
        crossfade(eyebrow, () => {
          // The eyebrow contains a pulse + text. Find the text node and
          // replace.
          const textNode = Array.from(eyebrow.childNodes).find((n) => n.nodeType === Node.TEXT_NODE);
          if (textNode) textNode.textContent = ' ' + variant.eyebrow!;
          else eyebrow.append(' ' + variant.eyebrow!);
        });
      }

      if (variant.titlePart1 && variant.titlePart2 && h1) {
        const em = h1.querySelector<HTMLElement>('em');
        crossfade(h1, () => {
          // Reset H1 by replacing inner content while preserving the em.
          h1.childNodes.forEach((n) => {
            if (n.nodeType === Node.TEXT_NODE) n.remove();
          });
          h1.insertBefore(document.createTextNode(variant.titlePart1! + ' '), em);
          if (em) em.textContent = variant.titlePart2!;
        });
      }

      if (variant.subtitle && subline) {
        crossfade(subline, () => {
          subline.textContent = variant.subtitle!;
        });
      }
    }, 1100);

    return () => window.clearTimeout(t);
  }, []);

  return null;
}

function crossfade(el: HTMLElement, mutate: () => void) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    mutate();
    return;
  }
  el.style.transition = 'opacity 320ms cubic-bezier(0.4, 0, 0.2, 1)';
  el.style.opacity = '0';
  window.setTimeout(() => {
    mutate();
    el.style.opacity = '1';
  }, 340);
  window.setTimeout(() => {
    el.style.transition = '';
  }, 700);
}
