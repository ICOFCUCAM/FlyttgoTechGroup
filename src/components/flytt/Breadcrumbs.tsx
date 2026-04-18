import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
  className?: string;
};

const Breadcrumbs: React.FC<Props> = ({ items, className = '' }) => {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  size={12}
                  className="text-slate-400 dark:text-slate-600"
                  aria-hidden="true"
                />
              )}
              {!last && item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-slate-900 dark:hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? 'text-slate-900 dark:text-white font-medium' : ''}
                  aria-current={last ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
