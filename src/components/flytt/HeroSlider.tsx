'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSlider: React.FC = () => {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#0A1F3D] text-white"
    >
      {/* Base gradient mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 600px at 18% 20%, rgba(30,111,217,0.55) 0%, transparent 60%),' +
            'radial-gradient(900px 500px at 85% 15%, rgba(15,181,166,0.28) 0%, transparent 60%),' +
            'radial-gradient(900px 600px at 70% 85%, rgba(124,92,230,0.22) 0%, transparent 60%),' +
            'linear-gradient(180deg, #0A1F3D 0%, #081937 55%, #050F22 100%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 30% 40%, black 35%, transparent 85%)',
        }}
      />

      {/* Connection graph SVG — subtle infrastructure motif */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#9ED0F9" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#9ED0F9" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#9ED0F9" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Arcs */}
        {[
          'M100,720 C400,560 800,560 1120,620',
          'M200,820 C560,700 1040,660 1500,720',
          'M1180,180 C1340,260 1420,380 1500,540',
          'M80,120 C260,180 420,240 600,220',
        ].map((d, i) => (
          <path key={i} d={d} stroke="url(#line)" strokeWidth="1.25" fill="none" />
        ))}
        {/* Nodes */}
        {[
          [120, 720, 6],
          [1120, 620, 6],
          [1500, 720, 5],
          [1500, 540, 5],
          [600, 220, 4],
          [80, 120, 4],
          [1180, 180, 5],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={Number(r) * 3} fill="url(#node)" opacity="0.45" />
            <circle cx={x} cy={y} r={r} fill="#9ED0F9" />
          </g>
        ))}
      </svg>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 xl:py-36">
        <div className="max-w-3xl motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/15 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 motion-safe:animate-ping opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
            </span>
            Platform Infrastructure · EU · AF · MENA
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-[34px] sm:text-[40px] md:text-5xl lg:text-[56px] xl:text-[60px] leading-[1.05] font-semibold tracking-tight text-white max-w-3xl"
          >
            Deploy national-scale digital infrastructure{' '}
            <span className="text-[#9ED0F9]">without building systems from scratch.</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl font-normal">
            FlyttGo Technologies Group designs modular platforms for mobility coordination,
            workforce systems, education intelligence and government service delivery.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/platforms"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#0A3A6B] text-sm font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
            >
              Explore Platform Ecosystem
              <ArrowRight
                size={16}
                className="motion-safe:transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/contact?intent=partnership"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
            >
              <Sparkles size={15} aria-hidden="true" />
              Request Partnership Discussion
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
};

export default HeroSlider;
