'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

type NavLink = {
  label: string;
  href: string;
};

const primaryLinks: NavLink[] = [
  { label: 'Platforms', href: '/platforms' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Industries', href: '/industries' },
  { label: 'Technology', href: '/technology' },
  { label: 'Developers', href: '/developers' },
  { label: 'Company', href: '/company' },
];

const isRouteActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeMenu]);

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 bg-white/90 supports-[backdrop-filter]:bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 lg:h-[68px] flex items-center justify-between gap-8">
        <Link
          href="/"
          aria-label="FlyttGo Technologies — home"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-md"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] flex items-center justify-center" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </svg>
          </div>
          <span className="text-[15px] tracking-tight text-slate-900">
            <span className="font-semibold">FlyttGo</span>
            <span className="hidden sm:inline font-medium text-slate-500"> Technologies</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {primaryLinks.map((l) => {
            const active = isRouteActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`px-4 py-2 text-sm font-medium rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 ${
                  active
                    ? 'text-[#0A3A6B] bg-slate-100/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-md px-2"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md hover:bg-[#0a2f57] motion-safe:transition-colors shadow-md shadow-[#0A3A6B]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
          >
            Deploy Your Platform
            <ArrowRight size={14} className="motion-safe:transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="lg:hidden p-1.5 text-slate-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        hidden={!open}
        className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl"
      >
        <nav aria-label="Mobile primary" className="px-5 py-4 flex flex-col gap-1">
          {primaryLinks.map((l) => {
            const active = isRouteActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                onClick={closeMenu}
                className={`px-3 py-2.5 text-sm font-medium rounded-md ${
                  active ? 'text-slate-900 bg-slate-900/5' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="mt-2 flex flex-col gap-2 pt-3 border-t border-slate-200">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              Sign in
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md"
            >
              Deploy Your Platform
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
