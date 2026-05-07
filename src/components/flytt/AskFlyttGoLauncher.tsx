'use client';

import { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useAskFlyttGo } from '@/components/flytt/AskFlyttGo';

/**
 * Floating launcher visible on every page (Intercom / Drift style).
 *
 * Sits bottom-right, navy → teal gradient, with an animated halo.
 * Hides on /console (which has its own UI chrome), and gracefully
 * adapts to RTL layouts. Auto-shows a one-time hint bubble after the
 * visitor has spent 12 seconds on a page; dismissed forever via the
 * close button.
 */

const LS_KEY = 'flytt:ask-launcher-hint-dismissed';

export default function AskFlyttGoLauncher() {
  const { toggle } = useAskFlyttGo();
  const [hintShown, setHintShown] = useState(false);
  const [pathname, setPathname] = useState<string>('');

  useEffect(() => {
    setPathname(window.location.pathname);
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.localStorage.getItem(LS_KEY) === '1') return;
    const t = window.setTimeout(() => setHintShown(true), 12_000);
    return () => window.clearTimeout(t);
  }, []);

  // Hide on the operator console preview — it has its own UI chrome.
  if (pathname.startsWith('/console')) return null;

  const dismissHint = () => {
    setHintShown(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LS_KEY, '1');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[55] flex items-end gap-3 print:hidden" aria-live="polite">
      {hintShown && (
        <div className="hidden sm:flex flex-col p-4 pr-3 max-w-[280px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_30px_120px_-40px_rgba(10,58,107,0.40)] motion-safe:animate-fade-up">
          <div className="flex items-start justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
              Ask FlyttGo
            </span>
            <button
              type="button"
              onClick={dismissHint}
              aria-label="Dismiss hint"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 motion-safe:transition-colors -mr-1 -mt-1 p-1 rounded"
            >
              <X size={13} aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2 text-[12px] text-slate-700 dark:text-slate-300 leading-snug">
            Procurement-grade questions answered live — pricing bands, deployment substrates, jurisdiction posture, module compatibility.
          </p>
          <button
            type="button"
            onClick={() => { dismissHint(); toggle(); }}
            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
          >
            Open assistant →
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label="Ask FlyttGo — open the platform assistant"
        title="Ask FlyttGo (⌘J)"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#9ED0F9]/40 motion-safe:transition-transform hover:scale-105"
      >
        {/* Animated halo */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#1E6FD9]/40 motion-safe:animate-ping"
        />
        {/* Static gradient core */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #0A3A6B 0%, #1E6FD9 50%, #0FB5A6 100%)',
          }}
        />
        {/* Inner ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0.5 rounded-full ring-1 ring-white/20"
        />
        <Sparkles
          size={22}
          strokeWidth={1.9}
          className="relative z-10 text-white drop-shadow"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
