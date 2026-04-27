import Script from 'next/script';

/**
 * Cookieless, GDPR-friendly analytics. Enabled by setting
 * `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (e.g. "flyttgo.tech") at build time.
 * Optional `NEXT_PUBLIC_PLAUSIBLE_SRC` overrides the script source for
 * self-hosted Plausible instances.
 *
 * When the env var is unset this component renders nothing — the site
 * ships with zero tracking by default, and no cookie banner is required
 * (Plausible does not set cookies or collect personal data).
 */
const Analytics: React.FC = () => {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? 'https://plausible.io/js/script.js';
  return (
    <Script
      defer
      src={src}
      data-domain={domain}
      strategy="afterInteractive"
    />
  );
};

export default Analytics;
