'use client';

import { useEffect, useState } from 'react';
import { WORKSPACE_LANGS, WORKSPACE_LANG_LABEL, isWorkspaceLang, type WorkspaceLang } from '@/lib/i18n/workspace-strings';

const COOKIE = 'flyttgo_workspace_lang';

function readCookie(): WorkspaceLang {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]*)`));
  const v = match ? decodeURIComponent(match[1]) : 'en';
  return isWorkspaceLang(v) ? v : 'en';
}

function writeCookie(value: WorkspaceLang) {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<WorkspaceLang>('en');

  useEffect(() => {
    setLang(readCookie());
  }, []);

  function pick(value: WorkspaceLang) {
    setLang(value);
    writeCookie(value);
    // Reload so the next render of any localized labels (e.g. workspace
    // nav after sign-in) reads the freshly-set cookie.
    if (typeof window !== 'undefined') window.location.reload();
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mr-1">
        Language
      </span>
      {WORKSPACE_LANGS.map((code) => (
        <button
          type="button"
          key={code}
          onClick={() => pick(code)}
          className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-[0.18em] border ${
            lang === code
              ? 'bg-[#0A3A6B] text-white border-[#0A3A6B]'
              : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
          }`}
        >
          {code === 'en' ? 'EN' : code === 'no' ? 'NO' : code === 'en-GB' ? 'EN-GB' : 'EN-US'}
        </button>
      ))}
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 ml-2">
        {WORKSPACE_LANG_LABEL[lang]}
      </span>
    </div>
  );
}
