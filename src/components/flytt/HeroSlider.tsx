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
      {/* Radial gradient mesh backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(1200px 600px at 18% 20%, rgba(30,111,217,0.55), transparent 60%),' +
            'radial-gradient(900px 500px at 85% 15%, rgba(15,181,166,0.32), transparent 60%),' +
            'radial-gradient(1000px 600px at 70% 90%, rgba(124,92,230,0.28), transparent 60%)',
        }}
      />

      {/* 64px grid overlay with radial mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 30% 40%, black 35%, transparent 85%)',
        }}
      />

      {/* Connection-graph SVG — arcs + glowing nodes */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9ED0F9" stopOpacity="0.0" />
            <stop offset="45%" stopColor="#9ED0F9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ED0F9" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E6F2FF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#9ED0F9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#9ED0F9" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d="M 80 520 C 300 360, 500 340, 720 420 S 1160 520, 1360 360"
          stroke="url(#line)"
          strokeWidth="1.25"
          fill="none"
        />
        <path
          d="M 120 140 C 320 240, 520 300, 740 260 S 1180 180, 1360 240"
          stroke="url(#line)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 60 320 C 260 260, 500 520, 780 500 S 1200 360, 1400 520"
          stroke="url(#line)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 200 620 C 420 560, 640 500, 900 540 S 1260 640, 1420 580"
          stroke="url(#line)"
          strokeWidth="0.9"
          fill="none"
        />

        {[
          [120, 140],
          [440, 280],
          [740, 420],
          [960, 240],
          [1160, 520],
          [280, 520],
          [1340, 340],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="18" fill="url(#node)" />
            <circle cx={cx} cy={cy} r="2.5" fill="#E6F2FF" />
          </g>
        ))}
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 xl:py-36">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/15 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse"
              aria-hidden="true"
            />
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
              <Sparkles size={15} aria-hidden="true" />
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
              Request Partnership Discussion
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
};

export default HeroSlider;
