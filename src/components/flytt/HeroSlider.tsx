'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';
import { imagery } from '@/lib/imagery';

type Slide = {
  slug: string;
  name: string;
  category: string;
  sub: string;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    slug: 'transify',
    name: 'Transify',
    category: 'Mobility Infrastructure',
    sub: 'Coordinate fleets, dispatch and regional movement at city scale.',
    image: imagery.platforms.transify.hero,
    alt: 'Fleet telemetry and dispatch operators coordinating mobility across a Scandinavian region',
  },
  {
    slug: 'workverge',
    name: 'Workverge',
    category: 'Workforce Coordination',
    sub: 'Verify, onboard and deploy workforce programmes across regions.',
    image: imagery.platforms.workverge.hero,
    alt: 'A distributed workforce team reviewing certifications and onboarding workflows on shared screens',
  },
  {
    slug: 'civitas',
    name: 'Civitas',
    category: 'Government Services',
    sub: 'Deploy permit workflows, dashboards and citizen services as modular infrastructure.',
    image: imagery.platforms.civitas.hero,
    alt: 'Modern government architecture representing a municipal service layer deployment',
  },
  {
    slug: 'edupro',
    name: 'EduPro',
    category: 'Education Intelligence',
    sub: 'Run admissions, scholarships and institutional analytics for ministries and universities.',
    image: imagery.platforms.edupro.hero,
    alt: 'University campus environment with students using education intelligence dashboards',
  },
  {
    slug: 'flyttgo',
    name: 'FlyttGo',
    category: 'Smart Moving Marketplace',
    sub: 'The FlyttGo marketplace connects customers with verified drivers on Transify infrastructure.',
    image: imagery.platforms.flyttgo.hero,
    alt: 'Professional mover with handheld device coordinating a customer relocation pickup',
  },
];

const AUTOPLAY_MS = 7000;

const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [cycleId, setCycleId] = useState(0);
  const regionRef = useRef<HTMLElement>(null);

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
    if (paused || userPaused || prefersReducedMotion) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, userPaused, prefersReducedMotion]);

  useEffect(() => {
    setCycleId((c) => c + 1);
  }, [index]);

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
  const progressActive = !paused && !userPaused && !prefersReducedMotion;

  return (
    <section
      id="top"
      ref={regionRef}
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      aria-label="FlyttGo Technologies Group platform branches"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      className="relative isolate overflow-hidden bg-[#050F22] text-white focus-visible:outline-none"
    >
      {/* Background slides with crossfade + subtle parallax */}
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.slug}
              className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-[1400ms] ${
                active ? 'opacity-100' : 'opacity-0'
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.name}`}
              aria-hidden={!active}
            >
              <div
                className={`relative w-full h-full motion-safe:transition-transform motion-safe:duration-[1200ms] motion-safe:ease-out ${
                  active ? 'scale-100' : 'scale-105'
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Unified dark overlay — guarantees legibility and on-brand feel regardless of photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#050F22]/92 via-[#0A1F3D]/72 to-[#050F22]/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#04101F]/85 via-transparent to-transparent"
      />
      {/* Subtle grid fades over the overlay — adds tech depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 25% 45%, black 35%, transparent 85%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 xl:py-36">
        <div className="max-w-3xl">
          {/* Rotating eyebrow — signals current branch */}
          <div className="min-h-[28px]">
            <p
              key={`eyebrow-${cycleId}`}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/15 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] motion-safe:animate-fade-up"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden="true" />
              {current.name} · {current.category}
            </p>
          </div>

          {/* Static headline — stays stable as the carousel rotates */}
          <h1
            id="hero-heading"
            className="mt-6 text-[34px] sm:text-[40px] md:text-5xl lg:text-[56px] xl:text-[60px] leading-[1.05] font-semibold tracking-tight text-white max-w-3xl"
          >
            Deploy national-scale digital infrastructure{' '}
            <span className="text-[#9ED0F9]">without building systems from scratch.</span>
          </h1>

          {/* Rotating sub-line tied to the slide */}
          <p
            key={`sub-${cycleId}`}
            className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl font-normal min-h-[56px] motion-safe:animate-fade-up"
          >
            {current.sub}
          </p>

          {/* CTAs — primary rotates per branch, secondary stays static */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              key={`cta-${cycleId}`}
              href={`/platforms/${current.slug}`}
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#0A3A6B] text-sm font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
            >
              See {current.name}
              <ArrowRight
                size={16}
                className="motion-safe:transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/platforms"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
            >
              <Sparkles size={15} aria-hidden="true" />
              Explore Platform Ecosystem
            </Link>
          </div>
        </div>
      </div>

      {/* Controls strip */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 lg:pb-10 pointer-events-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-2" role="tablist" aria-label="Select platform slide">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Slide ${i + 1}: ${s.name}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D] ${
                      active ? 'w-10 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Resume slideshow' : 'Pause slideshow'}
                aria-pressed={userPaused}
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 flex items-center justify-center text-white motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
              >
                {userPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 flex items-center justify-center text-white motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 flex items-center justify-center text-white motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="mt-5 h-[2px] rounded-full bg-white/15 overflow-hidden"
            role="progressbar"
            aria-label="Current slide progress"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={slides.length}
          >
            <div
              key={`progress-${cycleId}`}
              className={`h-full bg-gradient-to-r from-[#9ED0F9] via-white to-[#9ED0F9] ${
                progressActive ? 'motion-safe:animate-[progressBar_7s_linear_both]' : 'w-0'
              }`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Screen-reader live announcer */}
      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {slides.length}: {current.name} — {current.category}. {current.sub}
      </p>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
};

export default HeroSlider;
