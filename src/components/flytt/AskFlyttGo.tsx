'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight, Mic, MicOff, Sparkles, X, Zap } from 'lucide-react';
import { KNOWLEDGE_BASE, scoreKb, type KbEntry } from '@/lib/ai/knowledge-base';

/**
 * Ask FlyttGo (⌘J) — embedded assistant panel.
 *
 * Scope today: a curated knowledge-base scorer with a polished modal
 * UI and the ⌘J keyboard shortcut wired site-wide. Honest disclosure
 * in the footer that the LLM-backed retrieval-augmented mode lands in
 * a future release. The answer surface is shaped to drop in a
 * streaming /api/ai/ask response without any UI restructuring.
 *
 * Mounted once at the root via <AskFlyttGoProvider>. Anywhere in the
 * tree can call `useAskFlyttGo().toggle()` to open/close it (the
 * navbar surfaces this as a button next to the ⌘K command palette).
 */

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
};

const AskCtx = createContext<Ctx | null>(null);

export function useAskFlyttGo(): Ctx {
  const ctx = useContext(AskCtx);
  if (!ctx) {
    return { open: false, setOpen: () => {}, toggle: () => {} };
  }
  return ctx;
}

const SUGGESTED_PROMPTS = [
  'What is Ledgera?',
  'How long does a deployment take?',
  'Do you support SAF-T?',
  'Which regions do you operate in?',
  'How does the audit log work?',
  'Can I deploy just one module?',
];

export function AskFlyttGoProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // ⌘J / Ctrl+J — open / close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        toggle();
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, toggle]);

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  return (
    <AskCtx.Provider value={value}>
      {children}
      {open && <AskFlyttGoPanel onClose={() => setOpen(false)} />}
    </AskCtx.Provider>
  );
}

function AskFlyttGoPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const voice = useVoiceInput((spoken) => setQuery(spoken));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => scoreKb(query, 3), [query]);
  const showResults = query.trim().length >= 2;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-flyttgo-title"
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-20 pb-10 bg-slate-950/40 backdrop-blur-sm motion-safe:animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_20px_60px_-20px_rgb(15_23_42/0.45)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-200/80 dark:border-slate-800/60">
          <span
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] text-white flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <Sparkles size={14} strokeWidth={2} />
          </span>
          <div className="flex-1 min-w-0">
            <div
              id="ask-flyttgo-title"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500"
            >
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AI.00</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Ask FlyttGo
            </div>
            <div className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
              What do you want to know?
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800/60">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                voice.listening
                  ? 'Listening — speak now…'
                  : 'Ask about platforms, deployment modes, compliance, or pricing…'
              }
              className="w-full pl-3 pr-28 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[15px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
              autoComplete="off"
              spellCheck={false}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {voice.supported && (
                <button
                  type="button"
                  onClick={voice.toggle}
                  aria-label={voice.listening ? 'Stop voice input' : 'Start voice input'}
                  aria-pressed={voice.listening}
                  className={`p-1.5 rounded-md motion-safe:transition-colors ${
                    voice.listening
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 motion-safe:animate-pulse'
                      : 'text-slate-500 hover:text-[#0A3A6B] hover:bg-slate-100 dark:hover:bg-slate-800/60 dark:hover:text-[#9ED0F9]'
                  }`}
                >
                  {voice.listening ? (
                    <MicOff size={14} aria-hidden="true" />
                  ) : (
                    <Mic size={14} aria-hidden="true" />
                  )}
                </button>
              )}
              <kbd className="font-mono text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">
                ⌘J
              </kbd>
            </div>
          </div>
          {voice.error && (
            <p className="mt-2 text-[12px] text-rose-600 dark:text-rose-400 font-mono">
              {voice.error}
            </p>
          )}
        </div>

        {/* Body — results or suggestions */}
        <div className="max-h-[60vh] overflow-y-auto">
          {showResults ? (
            <ResultsList results={results} query={query} />
          ) : (
            <Suggestions onPick={setQuery} />
          )}
        </div>

        {/* Footer disclosure */}
        <div className="px-5 py-3 border-t border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 inline-flex items-center gap-2">
            <Zap size={11} className="text-amber-500" aria-hidden="true" />
            Local knowledge base · LLM-backed retrieval lands in a future release
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
            {KNOWLEDGE_BASE.length} entries
          </span>
        </div>
      </div>
    </div>
  );
}

function Suggestions({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="px-5 py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
        Suggested
      </div>
      <ul className="space-y-1.5">
        {SUGGESTED_PROMPTS.map((p) => (
          <li key={p}>
            <button
              type="button"
              onClick={() => onPick(p)}
              className="w-full text-left px-3 py-2 rounded-lg text-[14px] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 motion-safe:transition-colors"
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResultsList({
  results,
  query,
}: {
  results: Array<{ entry: KbEntry; score: number }>;
  query: string;
}) {
  if (results.length === 0) {
    return (
      <div className="px-5 py-10 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
          No matches
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug max-w-md mx-auto">
          Couldn&apos;t find an answer for &quot;{query.trim()}&quot; in the
          local knowledge base. Try a broader phrasing — or open a
          deployment intake at{' '}
          <Link href="/contact" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
            /contact
          </Link>{' '}
          and a solution architect will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
      {results.map(({ entry }, i) => (
        <li key={entry.id} className="px-5 py-4">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
            <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
              {i === 0 ? 'TOP MATCH' : `MATCH ${i + 1}`}
            </span>
            <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[160px]" />
            <span>{entry.category}</span>
          </div>
          <div className="mt-2 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
            {entry.question}
          </div>
          <p className="mt-2 text-[14px] text-slate-700 dark:text-slate-300 leading-[1.6]">
            {entry.answer}
          </p>
          <Link
            href={entry.source.href}
            className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:gap-1.5 motion-safe:transition-all"
          >
            {entry.source.label}
            <ArrowUpRight size={12} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Web Speech API voice-input hook.
 *
 * Lazily checks for SpeechRecognition support (Chromium has it as
 * `webkitSpeechRecognition`; Safari ships it as `SpeechRecognition`;
 * Firefox doesn't ship it yet). When unsupported the hook returns
 * `supported: false` and the mic button hides cleanly.
 *
 * Each toggle starts a fresh recognition session in the visitor's
 * Accept-Language locale (interim results streamed to onTranscript so
 * the input updates as they speak). Errors land in `error`.
 */
type VoiceState = {
  supported: boolean;
  listening: boolean;
  error: string | null;
  toggle: () => void;
};

type SpeechRecognitionEventLike = {
  results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>;
};
type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function useVoiceInput(onTranscript: (text: string) => void): VoiceState {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    setSupported(Boolean(Ctor));
  }, []);

  const toggle = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (recRef.current && listening) {
      recRef.current.stop();
      return;
    }
    setError(null);
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) {
      setError('Voice input is not available in this browser.');
      return;
    }
    const rec = new Ctor();
    rec.lang = (navigator.language || 'en-GB').toLowerCase().startsWith('no')
      ? 'nb-NO'
      : navigator.language || 'en-GB';
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      let text = '';
      for (let i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      onTranscript(text.trim());
    };
    rec.onerror = (e) => {
      const msg = e?.error || 'Voice input failed.';
      setError(
        msg === 'not-allowed'
          ? 'Microphone permission denied.'
          : msg === 'no-speech'
            ? 'No speech detected — try again.'
            : `Voice input error: ${msg}`,
      );
      setListening(false);
    };
    rec.onend = () => {
      setListening(false);
    };
    try {
      rec.start();
      recRef.current = rec;
      setListening(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start voice input.');
    }
  }, [listening, onTranscript]);

  return { supported, listening, error, toggle };
}

/**
 * Lightweight trigger button rendered in the navbar. Sits next to the
 * existing ⌘K command-palette button.
 */
export function AskFlyttGoTrigger() {
  const { toggle } = useAskFlyttGo();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ask FlyttGo"
      className="group inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 text-[13px] text-slate-500 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 rounded-md hover:text-slate-700 dark:text-slate-300 hover:border-slate-300 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
    >
      <Sparkles size={13} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
      <span className="hidden xl:inline">Ask FlyttGo</span>
      <kbd className="ml-1 font-mono text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded px-1.5 py-0.5">
        ⌘J
      </kbd>
    </button>
  );
}
