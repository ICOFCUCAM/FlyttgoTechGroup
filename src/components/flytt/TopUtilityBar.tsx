'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe2, Phone } from 'lucide-react';
import { LOCALES, type LocaleCode, type LocaleMeta } from '@/lib/i18n/locales';
import { useI18n } from '@/lib/i18n/I18nProvider';

const TopUtilityBar: React.FC = () => {
  const { locale, setLocale, t } = useI18n();
  const meta: LocaleMeta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(
    LOCALES.findIndex((l) => l.code === locale) || 0,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    const timer = window.setTimeout(() => {
      optionRefs.current[focusIdx]?.focus();
    }, 0);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(timer);
    };
  }, [open, focusIdx]);

  const select = (code: LocaleCode) => {
    setLocale(code);
    setFocusIdx(LOCALES.findIndex((l) => l.code === code));
    setOpen(false);
  };

  const handleListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusIdx((i) => {
        const next = (i + 1) % LOCALES.length;
        optionRefs.current[next]?.focus();
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusIdx((i) => {
        const next = (i - 1 + LOCALES.length) % LOCALES.length;
        optionRefs.current[next]?.focus();
        return next;
      });
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusIdx(0);
      optionRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = LOCALES.length - 1;
      setFocusIdx(last);
      optionRefs.current[last]?.focus();
    }
  };

  return (
    <div className="bg-[#0A1F3D] text-slate-200 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-9 flex items-center justify-between gap-4 text-[12px]">
        <div className="flex items-center gap-5 min-w-0">
          <a
            href="tel:+442012345678"
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D] rounded-sm"
          >
            <Phone size={12} className="text-slate-400" aria-hidden="true" />
            <span className="font-medium tabular-nums">+44 20 1234 5678</span>
          </a>
          <span
            className="hidden sm:inline-flex items-center text-slate-400 before:content-['|'] before:mr-5 before:text-slate-600"
            aria-hidden="true"
          >
            {t('utility.tagline')}
          </span>
        </div>

        <div ref={rootRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`${t('utility.language')} — ${meta.label}`}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-200 hover:bg-white/5 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D]"
          >
            <Globe2 size={12} className="text-slate-400" aria-hidden="true" />
            <span className="text-base leading-none" aria-hidden="true">
              {meta.flag}
            </span>
            <span className="font-medium tracking-wide">{meta.code}</span>
            <ChevronDown
              size={12}
              aria-hidden="true"
              className={`text-slate-400 motion-safe:transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>

          <ul
            role="listbox"
            aria-label={t('utility.language')}
            onKeyDown={handleListKey}
            className={`absolute right-0 top-full mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_1px_0_0_rgb(15_23_42/0.04),0_20px_40px_-12px_rgb(15_23_42/0.24)] overflow-hidden z-50 motion-safe:transition-all motion-safe:duration-150 ${
              open
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-1 pointer-events-none'
            }`}
          >
            {LOCALES.map((lang, i) => {
              const selected = lang.code === locale;
              return (
                <li key={lang.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    ref={(el) => {
                      optionRefs.current[i] = el;
                    }}
                    onClick={() => select(lang.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-slate-100 dark:focus-visible:bg-white/10 ${
                      selected
                        ? 'bg-[#0A3A6B]/5 dark:bg-white/5 text-[#0A3A6B] dark:text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="text-base leading-none" aria-hidden="true">
                      {lang.flag}
                    </span>
                    <span className="flex flex-col leading-tight flex-1 min-w-0 text-left">
                      <span className="font-medium tracking-tight truncate">
                        {lang.native}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-500 truncate">
                        {lang.label}
                      </span>
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.12em] text-slate-400">
                      {lang.code}
                    </span>
                    {selected && (
                      <Check
                        size={14}
                        className="text-[#1E6FD9]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopUtilityBar;
