'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Globe2 } from 'lucide-react';
import { imagery } from '@/lib/imagery';

type Slide = {
  tag: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    tag: 'Logistics Marketplace',
    title: 'Logistics Marketplace Infrastructure',
    caption:
      'Deploy branded logistics marketplaces with dispatch intelligence, driver coordination and multi-zone delivery orchestration across cities and regions.',
    image: imagery.hero.logistics.src,
    alt: imagery.hero.logistics.alt,
  },
  {
    tag: 'Student Relocation',
    title: 'Student Relocation Platform Stack',
    caption:
      'Coordinate university, campus-housing and intercity student relocations on the same modular infrastructure that powers national deployments.',
    image: imagery.hero.student.src,
    alt: imagery.hero.student.alt,
  },
  {
    tag: 'Government Service Layer',
    title: 'Government Service Layer Deployment',
    caption:
      'Stand up municipal dashboards, permit workflows and transport oversight for cities, ministries and regulators — as ready-to-deploy infrastructure.',
    image: imagery.hero.office.src,
    alt: 'City architecture representing a government service layer deployment',
  },
  {
    tag: 'White-Label Workforce',
    title: 'White-Label Workforce Marketplace Engine',
    caption:
      'Launch tenant-isolated workforce and service marketplaces with branding, operator dashboards and modular expansion — without building backend systems.',
    image: imagery.hero.marketplace.src,
    alt: imagery.hero.marketplace.alt,
  },
];

const AUTOPLAY_MS = 6500;

const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [],
  );
  const goTo = useCallback((i: number) => setIndex(i % slides.length), []);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, prefersReducedMotion]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(slides.length - 1);
    }
  };

  const current = slides[index];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FC] via-white to-[#F0F5FA]"
    >
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />
      <div
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full bg-gradient-to-br from-[#1E6FD9]/15 via-[#0FB5A6]/10 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-28 lg:pt-28 lg:pb-36">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6 motion-safe:animate-[fadeUp_0.9s_ease-out_both]">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden="true" />
              Platform Infrastructure · Europe · Africa · Middle East
            </p>

            <h1
              id="hero-heading"
              className="mt-7 text-[40px] sm:text-5xl lg:text-[64px] xl:text-[72px] leading-[1.02] font-semibold tracking-tight text-slate-900"
            >
              Launch National-Scale{' '}
              <span className="text-[#0A3A6B]">Digital Platforms</span>
              <br className="hidden sm:block" />{' '}
              <span className="bg-gradient-to-r from-[#1E6FD9] to-[#0FB5A6] bg-clip-text text-transparent">
                Without Building Infrastructure
              </span>{' '}
              From Scratch
            </h1>

            <p className="mt-7 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
              FlyttGo Technologies Group provides modular deployment infrastructure for logistics
              marketplaces, education intelligence platforms, government service layers and enterprise
              ecosystems.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] motion-safe:transition-all shadow-lg shadow-blue-900/15 hover:shadow-xl hover:shadow-blue-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
              >
                Deploy Your Platform
                <ArrowRight size={18} className="motion-safe:transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="#infrastructure-modules"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white text-slate-900 font-semibold rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
              >
                Explore Infrastructure Modules
              </Link>
            </div>

            <dl className="mt-14 pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-6">
              <div>
                <dt className="sr-only">Infrastructure platforms</dt>
                <dd className="text-3xl font-semibold text-slate-900 tracking-tight">5</dd>
                <p className="text-xs lg:text-sm text-slate-500 mt-1">Infrastructure Platforms</p>
              </div>
              <div>
                <dt className="sr-only">Deployment modules</dt>
                <dd className="text-3xl font-semibold text-slate-900 tracking-tight">18+</dd>
                <p className="text-xs lg:text-sm text-slate-500 mt-1">Deployment Modules</p>
              </div>
              <div>
                <dt className="sr-only">Continents ready</dt>
                <dd className="text-3xl font-semibold text-slate-900 tracking-tight">3</dd>
                <p className="text-xs lg:text-sm text-slate-500 mt-1">Continents Ready</p>
              </div>
            </dl>
          </div>

          <div
            ref={regionRef}
            className="lg:col-span-6 relative motion-safe:animate-[fadeUp_1.1s_ease-out_both]"
            role="region"
            aria-roledescription="carousel"
            aria-label="FlyttGo platform deployment scenes"
            tabIndex={0}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={onKeyDown}
          >
            <div
              className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-white ring-1 ring-slate-200/40"
              aria-live={paused ? 'polite' : 'off'}
            >
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <div
                    key={s.image}
                    className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-1000 ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${slides.length}: ${s.tag}`}
                    aria-hidden={!active}
                  >
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/15 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-8">
                      <span className="inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-white/95 text-[#0A3A6B] rounded-md">
                        {s.tag}
                      </span>
                      <h2 className="mt-4 text-white text-2xl lg:text-3xl font-semibold leading-snug tracking-tight max-w-lg">
                        {s.title}
                      </h2>
                      <p className="mt-3 text-sm lg:text-base text-white/80 max-w-md leading-relaxed">{s.caption}</p>
                    </div>
                  </div>
                );
              })}

              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-white flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center" aria-hidden="true">
                  <Activity size={16} className="text-emerald-600" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Deployments</div>
                  <div className="text-sm font-semibold text-slate-900">Active · Multi-Region</div>
                </div>
              </div>

              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-white flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center" aria-hidden="true">
                  <Globe2 size={16} className="text-[#1E6FD9]" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Regions</div>
                  <div className="text-sm font-semibold text-slate-900">EU · AF · MENA</div>
                </div>
              </div>

              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="w-10 h-10 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-slate-900 shadow-md motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="w-10 h-10 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-slate-900 shadow-md motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Select slide">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.tag}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Go to slide ${i + 1}: ${s.tag}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] ${
                      active ? 'w-10 bg-[#0A3A6B]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                );
              })}
            </div>

            <p className="sr-only" aria-live="polite">
              Slide {index + 1} of {slides.length}: {current.tag} — {current.title}
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-slate-200/70 bg-white/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <p className="text-center text-xs uppercase tracking-[0.22em] text-slate-500 font-medium">
            Comparable Structural Positioning
          </p>
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-6 items-center list-none">
            {[
              'Stripe · Infrastructure',
              'Shopify · Marketplace',
              'Palantir · Foundry',
              'AWS · Marketplace',
              'Uber · Movement',
            ].map((n) => (
              <li key={n} className="text-center text-sm font-medium text-slate-400 tracking-tight">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
