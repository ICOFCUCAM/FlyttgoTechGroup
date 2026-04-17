'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
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

const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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
      className="relative isolate min-h-[calc(100svh-5rem)] lg:min-h-[calc(100vh-5rem)] overflow-hidden bg-[#0A1F3D] text-white focus-visible:outline-none"
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
          );
        })}
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D]/90 via-[#0A1F3D]/60 to-[#0A1F3D]/85"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#05122A] via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-soft-light"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 90%)',
        }}
      />

      {slides.map((s, i) => (
        <h2 key={s.image} className="sr-only" aria-hidden={i !== index}>
          {`Slide ${i + 1} of ${slides.length}: ${s.tag} — ${s.title}`}
        </h2>
      ))}

      <div className="relative min-h-[calc(100svh-5rem)] lg:min-h-[calc(100vh-5rem)] max-w-7xl mx-auto px-6 lg:px-8 pt-24 lg:pt-32 pb-48 flex flex-col justify-center">
        <div className="max-w-4xl motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-semibold uppercase tracking-[0.15em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden="true" />
            Platform Infrastructure · EU · AF · MENA
          </p>

          <h1
            id="hero-heading"
            className="mt-8 text-[44px] sm:text-5xl lg:text-7xl xl:text-[84px] leading-[0.98] font-semibold tracking-tight"
          >
            Launch National-Scale{' '}
            <span className="bg-gradient-to-r from-white via-white to-[#9ED0F9] bg-clip-text text-transparent">
              Digital Platforms
            </span>{' '}
            Without Building Infrastructure From Scratch
          </h1>

          <p className="mt-8 text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl font-normal">
            FlyttGo Technologies Group provides modular deployment infrastructure for logistics
            marketplaces, education intelligence platforms, government service layers and enterprise
            ecosystems.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-white text-[#0A3A6B] font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D]"
            >
              Deploy Your Platform
              <ArrowRight
                size={18}
                className="motion-safe:transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 backdrop-blur border border-white/25 text-white font-semibold rounded-lg hover:bg-white/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D]"
            >
              <Sparkles size={16} aria-hidden="true" />
              Explore Infrastructure Modules
            </Link>
          </div>
        </div>
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
                      className={`h-1.5 rounded-full motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D] ${
                        active ? 'w-10 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 flex items-center justify-center text-white motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D]"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 flex items-center justify-center text-white motion-safe:transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D]"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {slides.length}: {current.tag} — {current.title}
      </p>
    </section>
  );
};

export default HeroSlider;
