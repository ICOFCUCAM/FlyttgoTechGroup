'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Globe2 } from 'lucide-react';

type Slide = {
  tag: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    tag: 'Logistics Infrastructure',
    title: 'Deploy Smart Logistics Platforms Across Cities and Regions',
    caption:
      'Enable driver coordination, dispatch intelligence and multi-zone delivery orchestration using FlyttGo logistics infrastructure modules.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776360965901_956dd2fd.png',
    alt: 'FlyttGo logistics truck operating in a Scandinavian urban delivery corridor',
  },
  {
    tag: 'Student Relocation',
    title: 'Seamless Student Moving & Campus Logistics',
    caption:
      'Coordinate student moves across universities and campus housing using the same logistics infrastructure that powers national deployments.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361007461_c29963f8.png',
    alt: 'Student relocation scene with movers loading belongings into a transport vehicle',
  },
  {
    tag: 'Office Relocation',
    title: 'Enterprise-Grade Office Relocation Logistics',
    caption:
      'Plan, coordinate and track office relocations at scale with dispatch intelligence, route optimization and real-time status dashboards.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361047212_157a0e34.jpg',
    alt: 'Professional office relocation in progress with crews handling commercial office equipment',
  },
  {
    tag: 'White-Label Marketplace',
    title: 'Launch Your Own Marketplace Platform in Weeks',
    caption:
      'Deploy branded logistics, service or workforce marketplaces using MarketStack infrastructure modules without building backend systems from scratch.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361027671_eebffd68.jpg',
    alt: 'Marketplace operator dashboard illustrating white-label platform configuration',
  },
  {
    tag: 'Fleet Intelligence',
    title: 'Transform Fleet Operations with AI Platform Intelligence',
    caption:
      'Enable route optimization, vehicle telemetry tracking and operations analytics using FleetStack enterprise fleet intelligence infrastructure.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361070291_5b36825e.png',
    alt: 'Fleet telemetry dashboard visualizing live vehicle routes and operational metrics',
  },
];

const AUTOPLAY_MS = 6000;

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

  // Autoplay with pause on hover/focus and reduced-motion respect
  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, prefersReducedMotion]);

  // Keyboard navigation when slider region is focused
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
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden="true" />
              Platform Infrastructure · Europe · Africa · Middle East
            </p>

            <h1
              id="hero-heading"
              className="mt-6 text-4xl md:text-5xl lg:text-[56px] leading-[1.05] font-semibold tracking-tight text-slate-900"
            >
              Smart Digital Infrastructure for{' '}
              <span className="text-[#0A3A6B]">Logistics, Education,</span>{' '}
              <span className="bg-gradient-to-r from-[#1E6FD9] to-[#0FB5A6] bg-clip-text text-transparent">
                Government &amp; Enterprise
              </span>{' '}
              Systems
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              FlyttGo Technologies Group builds modular AI-powered platform infrastructure that enables
              organizations to launch logistics systems, education intelligence platforms, government service
              layers and digital marketplaces using scalable deployment architecture.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/#whitelabel"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] transition-all shadow-lg shadow-blue-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
              >
                Launch Your Platform
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/#platforms"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 font-semibold rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
              >
                Explore Platform Ecosystem
              </Link>
            </div>

            <dl className="mt-10 pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-6">
              <div>
                <dt className="sr-only">Infrastructure platforms</dt>
                <dd className="text-2xl font-semibold text-slate-900 tracking-tight">5</dd>
                <p className="text-xs text-slate-500 mt-0.5">Infrastructure Platforms</p>
              </div>
              <div>
                <dt className="sr-only">Deployment modules</dt>
                <dd className="text-2xl font-semibold text-slate-900 tracking-tight">18+</dd>
                <p className="text-xs text-slate-500 mt-0.5">Deployment Modules</p>
              </div>
              <div>
                <dt className="sr-only">Continents ready</dt>
                <dd className="text-2xl font-semibold text-slate-900 tracking-tight">3</dd>
                <p className="text-xs text-slate-500 mt-0.5">Continents Ready</p>
              </div>
            </dl>
          </div>

          <div
            ref={regionRef}
            className="lg:col-span-6 relative"
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
              className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-white"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-[#0A3A6B] rounded-md">
                        {s.tag}
                      </span>
                      <h2 className="mt-3 text-white text-xl lg:text-2xl font-semibold leading-snug max-w-lg">
                        {s.title}
                      </h2>
                      <p className="mt-2 text-sm text-white/80 max-w-md leading-relaxed">{s.caption}</p>
                    </div>
                  </div>
                );
              })}

              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center" aria-hidden="true">
                  <Activity size={16} className="text-emerald-600" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Deployments</div>
                  <div className="text-sm font-semibold text-slate-900">Active · Multi-Region</div>
                </div>
              </div>

              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center" aria-hidden="true">
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
                  aria-controls="hero-slides"
                  className="w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-slate-900 shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  aria-controls="hero-slides"
                  className="w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-slate-900 shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className="mt-5 flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Select slide"
            >
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
                    className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] ${
                      active ? 'w-8 bg-[#0A3A6B]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-medium">
            Comparable Structural Positioning
          </p>
          <ul className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-6 items-center list-none">
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
