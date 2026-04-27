import React from 'react';
import { Quote } from 'lucide-react';
import type { InsightBlock } from '@/data/insights';

const InsightBlocks: React.FC<{ blocks: InsightBlock[] }> = ({ blocks }) => {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return (
              <p
                key={i}
                className="text-[17px] text-slate-700 dark:text-slate-300 leading-[1.75]"
              >
                {b.text}
              </p>
            );
          case 'h2':
            return (
              <h2
                key={i}
                className="mt-10 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white"
              >
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={i}
                className="mt-6 text-lg md:text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
              >
                {b.text}
              </h3>
            );
          case 'ul':
            return (
              <ul
                key={i}
                className="space-y-2.5 text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#1E6FD9] flex-shrink-0"
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <figure
                key={i}
                className="my-10 border-l-2 border-[#1E6FD9] pl-6"
              >
                <Quote
                  size={16}
                  aria-hidden="true"
                  className="text-[#1E6FD9]/70"
                />
                <blockquote className="mt-2 text-xl md:text-2xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                  {b.text}
                </blockquote>
                {b.cite && (
                  <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-500">
                    — {b.cite}
                  </figcaption>
                )}
              </figure>
            );
          case 'callout':
            return (
              <aside
                key={i}
                className="my-8 p-6 rounded-2xl bg-[#F7FAFD] dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A3A6B] dark:text-[#9ED0F9]">
                  {b.title}
                </div>
                <p className="mt-2 text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  {b.text}
                </p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default InsightBlocks;
