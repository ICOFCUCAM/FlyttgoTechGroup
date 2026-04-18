'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Activity,
  Globe2,
  Pause,
  Play,
} from 'lucide-react';
import { imagery } from '@/lib/imagery';

type Slide = {
  tag: string;
  title: string;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    tag: 'Logistics Marketplace',
    title: 'Logistics Marketplace Infrastructure',
    image: imagery.hero.logistics.src,
    alt: imagery.hero.logistics.alt,
  },
  {
    tag: 'Student Relocation',
    title: 'Student Relocation Platform Stack',
    image: imagery.hero.student.src,
    alt: imagery.hero.student.alt,
  },
  {
    tag: 'Government Service Layer',
    title: 'Government Service Layer Deployment',
    image: imagery.hero.office.src,
    alt: 'City architecture representing a government service layer deployment',
  },
  {
    tag: 'White-Label Workforce',
    title: 'White-Label Workforce Marketplace Engine',
    image: imagery.hero.marketplace.src,
    alt: imagery.hero.marketplace.alt,
  },
];

const AUTOPLAY_MS = 7000;

const trustLogos = [
  { label: 'Nordic Transport Authority' },
  { label: 'Ministry of Education' },
  { label: 'Metro Logistics Group' },
  { label: 'PanEU Fleet Alliance' },
  { label: 'AfriMove Networks' },
  { label: 'Gulf Service Authority' },
];

const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.4 });
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

  // Reset the progress bar animation every time the slide changes
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

  const onPointerMove = (e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setPointer({ x, y });
  };

  const current = slides[index];
  const progressActive = !paused && !userPaused && !prefersReducedMotion;

  return (
    <section
      id="top"
      ref={regionRef}
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      aria-label="FlyttGo platform infrastructure scenes"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onPointerMove={onPointerMove}
      className="relative isolate min-h-[66vh] lg:min-h-[70vh] overflow-hidden bg-[#0A1F3D] text-white focus-visible:outline-none"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.image}
              className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-[1400ms] ${
                active ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`relative w-full h-full motion-safe:transition-transform motion-safe:duration-[1200ms] motion-safe:ease-out ${
                  active ? 'scale-100' : 'scale-105'
                }`}
              >
                <Image
                  src={s.image}
                  alt=""
                  role="presentation"
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

      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0A1F3D]/85 via-[#0A1F3D]/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A1F3D]/55 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-70 motion-safe:transition-[background] motion-safe:duration-500"
        aria-hidden="true"
        style={{
          background: `radial-gradient(720px 520px at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(30,111,217,0.22) 0%, rgba(15,181,166,0.08) 45%, transparent 70%)`,
        }}
      />

      <div className="relative min-h-[66vh] lg:min-h-[70vh] max-w-7xl mx-auto px-6 lg:px-8 pt-14 lg:pt-16 pb-44 flex flex-col justify-center">
        <div className="max-w-4xl motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-semibold uppercase tracking-[0.15em]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 motion-safe:animate-ping opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
            </span>
            4 active deployments · EU · AF · MENA
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-[34px] sm:text-[40px] md:text-5xl lg:text-[56px] xl:text-[60px] leading-[1.05] font-semibold tracking-tight text-white max-w-3xl"
          >
            Infrastructure for{' '}
            <span className="text-white/90">National-Scale</span>{' '}
            Digital Platforms
          </h1>

          <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl font-normal">
            FlyttGo Technologies provides modular deployment infrastructure for logistics
            marketplaces, education intelligence platforms, government service layers and enterprise
            ecosystems.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-white text-[#0A3A6B] font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
            >
              Deploy Your Platform
              <ArrowRight
                size={18}
                className="motion-safe:transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/infrastructure"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 backdrop-blur border border-white/25 text-white font-semibold rounded-lg hover:bg-white/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
            >
              <Sparkles size={16} aria-hidden="true" />
              Explore Infrastructure Modules
            </Link>
          </div>
        </div>

        <aside
          aria-label="Live platform telemetry"
          className="hidden md:flex absolute right-6 lg:right-10 top-24 lg:top-28 w-[260px] flex-col gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]"
        >
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 shadow-[0_1px_0_0_rgb(255_255_255/0.08),0_24px_48px_-16px_rgb(4_16_31/0.55)]">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/15 flex items-center justify-center text-emerald-300" aria-hidden="true">
                  <Activity size={14} strokeWidth={1.75} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold">Live</div>
              </div>
              <span className="text-[10px] font-mono text-emerald-200/80">· tenants</span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="text-3xl font-semibold tracking-tight text-white">18</div>
              <div className="text-[11px] text-white/70 pb-1">operator tenants</div>
            </div>
            <div className="mt-3 flex items-end gap-1 h-8">
              {[0.35, 0.55, 0.48, 0.7, 0.6, 0.82, 0.74, 0.95, 0.88, 0.96, 0.92, 1].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 bg-gradient-to-t from-emerald-400/30 via-emerald-400/60 to-emerald-200 rounded-[2px]"
                  style={{ height: `${h * 100}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 shadow-[0_1px_0_0_rgb(255_255_255/0.08),0_24px_48px_-16px_rgb(4_16_31/0.55)]">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-400/15 flex items-center justify-center text-blue-200" aria-hidden="true">
                <Globe2 size={14} strokeWidth={1.75} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold">Regions</div>
            </div>
            <div className="mt-3 text-sm font-semibold text-white">EU · AF · MENA</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Stockholm', 'Oslo', 'Berlin', 'Lagos', 'Dubai'].map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 border border-white/15 rounded-md text-[10px] text-white/80"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-300" aria-hidden="true" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 lg:pb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pointer-events-auto">
            <div className="max-w-md motion-safe:transition-opacity">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-semibold">
                Now Showing
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#9ED0F9]">
                {current.tag}
              </p>
              <p className="mt-1.5 text-base md:text-lg font-medium text-white tracking-tight max-w-sm leading-snug">
                {current.title}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Select slide">
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
                      className={`h-1.5 rounded-full motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D] ${
                        active ? 'w-10 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Resume slideshow' : 'Pause slideshow'}
                aria-pressed={userPaused}
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 flex items-center justify-center text-white motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
              >
                {userPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 flex items-center justify-center text-white motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 flex items-center justify-center text-white motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div
            className="mt-6 h-[2px] rounded-full bg-white/15 overflow-hidden pointer-events-auto"
            role="progressbar"
            aria-label="Current slide progress"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={slides.length}
          >
            <div
              key={cycleId}
              className={`h-full bg-gradient-to-r from-[#9ED0F9] via-white to-[#9ED0F9] ${
                progressActive ? 'motion-safe:animate-[progressBar_7s_linear_both]' : 'w-0'
              }`}
              style={progressActive ? undefined : { width: userPaused ? `${((index + 1) / slides.length) * 100}%` : undefined }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {slides.length}: {current.tag} — {current.title}
      </p>

      <div className="relative z-[1] bg-[#04101F]/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center gap-5">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-semibold flex-shrink-0">
            Trusted by operators and institutions across EU · AF · MENA
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center flex-1 list-none">
            {trustLogos.map((l) => (
              <li
                key={l.label}
                className="text-center text-[11px] uppercase tracking-[0.18em] font-semibold text-white/60"
              >
                {l.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
