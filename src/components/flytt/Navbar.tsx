'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

type NavLink = {
  label: string;
  href: string;
  sectionId: string;
};

const links: NavLink[] = [
  { label: 'Platforms', href: '/platforms', sectionId: 'platforms' },
  { label: 'Solutions', href: '/solutions', sectionId: 'government' },
  { label: 'Industries', href: '/industries', sectionId: 'industries' },
  { label: 'Technology', href: '/technology', sectionId: 'technology' },
  { label: 'White-Label', href: '/white-label', sectionId: 'whitelabel' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
];

const isRouteActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
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

  // Section tracking on the homepage only
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null);
      return;
    }
    const ids = links.map((l) => l.sectionId);
    const elements = ids
      .map((id) => (typeof document !== 'undefined' ? document.getElementById(id) : null))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const activeFor = (link: NavLink) => {
    if (pathname === '/') return activeSection === link.sectionId;
    return isRouteActive(pathname, link.href);
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 supports-[backdrop-filter]:bg-white/70"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link
          href="/"
          aria-label="FlyttGo Technologies Group — home"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-md"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] flex items-center justify-center" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-slate-900 tracking-tight text-[15px]">FlyttGo</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-medium">Technologies Group</span>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = activeFor(l);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 ${
                  active
                    ? 'text-[#0A3A6B] bg-slate-100'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
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
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
          >
            Sign In
          </Link>
          <Link
            href="/white-label"
            className="px-5 py-2.5 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md hover:bg-[#0a2f57] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
          >
            Launch Your Platform
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="lg:hidden p-2 text-slate-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        hidden={!open}
        className="lg:hidden border-t border-slate-200 bg-white"
      >
        <nav aria-label="Mobile primary" className="px-6 py-4 flex flex-col gap-1">
          {links.map((l) => {
            const active = activeFor(l);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                onClick={closeMenu}
                className={`px-3 py-3 text-sm font-medium rounded-md ${
                  active ? 'text-[#0A3A6B] bg-slate-100' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/white-label"
            onClick={closeMenu}
            className="mt-2 px-5 py-3 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md text-center"
          >
            Launch Your Platform
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
