'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

const sequence = ['light', 'dark', 'system'] as const;
type Theme = (typeof sequence)[number];

const labels: Record<Theme, string> = {
  light: 'Light theme',
  dark: 'Dark theme',
  system: 'System theme',
};

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — show a neutral icon until mounted.
  useEffect(() => setMounted(true), []);

  const current = (theme as Theme) ?? 'system';
  const next = sequence[(sequence.indexOf(current) + 1) % sequence.length];

  const cycle = () => setTheme(next);

  const Icon = current === 'dark' ? Moon : current === 'system' ? Monitor : Sun;

  if (compact) {
    return (
      <button
        type="button"
        onClick={cycle}
        aria-label={`Theme: ${mounted ? labels[current] : 'System theme'}. Switch to ${labels[next]}.`}
        className="inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
      >
        <Icon size={15} aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${mounted ? labels[current] : 'System theme'}. Switch to ${labels[next]}.`}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
    >
      <Icon size={14} aria-hidden="true" />
      <span className="capitalize">{mounted ? current : 'system'}</span>
    </button>
  );
}
