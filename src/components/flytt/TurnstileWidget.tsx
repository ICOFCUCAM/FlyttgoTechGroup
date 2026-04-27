'use client';

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

// Minimal shape of the Cloudflare Turnstile global — we only use render /
// reset / remove. The full surface lives in @cloudflare/turnstile-types
// but we'd rather not pull another dev-dep for three methods.
type TurnstileGlobal = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      theme?: 'light' | 'dark' | 'auto';
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
      'refresh-expired'?: 'auto' | 'manual' | 'never';
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileGlobal;
  }
}

type Props = {
  /** Called with the verification token when the widget solves. */
  onVerify: (token: string) => void;
  /** Called when a previously-solved token expires client-side. */
  onExpire?: () => void;
  /** "light" | "dark" | "auto" — matches the surrounding surface. */
  theme?: 'light' | 'dark' | 'auto';
  /** Optional className forwarded to the mount container. */
  className?: string;
};

/**
 * Cloudflare Turnstile widget. Env-gated by NEXT_PUBLIC_TURNSTILE_SITE_KEY
 * — renders nothing when unset so the form still works in development
 * (the server-side verifyTurnstile() also no-ops without a secret key).
 *
 * The widget auto-renders as soon as the Turnstile script is loaded;
 * `data-sitekey` + `data-callback` on the mount div drive the default
 * render path. We use explicit `turnstile.render()` so the callback can
 * flow into React state without a global window function.
 */
const TurnstileWidget: React.FC<Props> = ({
  onVerify,
  onExpire,
  theme = 'light',
  className,
}) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);

  // Keep callback refs current without re-rendering the widget.
  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const render = () => {
    if (!siteKey || !containerRef.current) return;
    if (widgetIdRef.current) return; // already rendered
    const ts = window.turnstile;
    if (!ts) return; // script not ready yet — Script onReady will retry
    widgetIdRef.current = ts.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      callback: (token: string) => onVerifyRef.current(token),
      'expired-callback': () => onExpireRef.current?.(),
      'refresh-expired': 'auto',
    });
  };

  useEffect(() => {
    // If the script was loaded before this component mounted, render now.
    if (typeof window !== 'undefined' && window.turnstile) render();
    return () => {
      // Clean up on unmount so subsequent mounts (navigation back) don't
      // duplicate-render the widget.
      const id = widgetIdRef.current;
      if (id && typeof window !== 'undefined' && window.turnstile) {
        try {
          window.turnstile.remove(id);
        } catch {
          /* noop — widget may already be gone */
        }
      }
      widgetIdRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={render}
      />
      <div ref={containerRef} className={className} data-testid="turnstile" />
    </>
  );
};

export default TurnstileWidget;
