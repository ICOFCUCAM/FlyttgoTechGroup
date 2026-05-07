import Script from 'next/script';

/**
 * Lightweight Sentry browser init. Runs only when NEXT_PUBLIC_SENTRY_DSN
 * is set; otherwise this component renders nothing.
 *
 * No SDK dependency — uses Sentry's hosted Loader Script pattern. The
 * Loader runs lazily on first error / breadcrumb, so there's zero
 * runtime cost when nothing goes wrong, and no impact on Lighthouse.
 *
 * Set NEXT_PUBLIC_SENTRY_DSN to a DSN like:
 *   https://abc123@oXXX.ingest.sentry.io/YYY
 *
 * For richer instrumentation (server-side errors, source-map upload,
 * tracing) install @sentry/nextjs and wire next.config.js — but that
 * adds a build-time dependency and isn't needed for basic error
 * monitoring on the marketing surface.
 */
const SentryInit: React.FC = () => {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return null;

  // Parse DSN to extract the project ID for the loader URL.
  // DSN format: https://<key>@<host>.ingest.sentry.io/<projectId>
  let host = '';
  let projectId = '';
  try {
    const u = new URL(dsn);
    host = u.host;
    projectId = u.pathname.replace(/^\//, '');
  } catch {
    return null;
  }
  if (!host || !projectId) return null;

  const loaderSrc = `https://${host}/${projectId}/loader.min.js`;

  return (
    <Script
      src={loaderSrc}
      data-lazy="true"
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
};

export default SentryInit;
