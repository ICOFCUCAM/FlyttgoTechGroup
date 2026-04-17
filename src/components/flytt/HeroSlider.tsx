import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Globe2 } from 'lucide-react';

const slides = [
  {
    tag: 'Logistics Infrastructure',
    title: 'Deploy Smart Logistics Platforms Across Cities and Regions',
    caption: 'Enable driver coordination, dispatch intelligence and multi-zone delivery orchestration using FlyttGo logistics infrastructure modules.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776360965901_956dd2fd.png',
  },
  {
    tag: 'Education Intelligence',
    title: 'Build National-Scale Education Intelligence Systems',
    caption: 'Deploy analytics-enabled education monitoring platforms across schools, districts and ministries using EduPro AI infrastructure.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361007461_c29963f8.png',
  },
  {
    tag: 'Government & Municipal',
    title: 'Power Digital Government Service Platforms',
    caption: 'Enable municipal analytics, permit systems, transport coordination dashboards and citizen service platforms using GovStack infrastructure.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361047212_157a0e34.jpg',
  },
  {
    tag: 'White-Label Marketplace',
    title: 'Launch Your Own Marketplace Platform in Weeks',
    caption: 'Deploy branded logistics, service or workforce marketplaces using MarketStack infrastructure modules without building backend systems from scratch.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361027671_eebffd68.jpg',
  },
  {
    tag: 'Fleet Intelligence',
    title: 'Transform Fleet Operations with AI Platform Intelligence',
    caption: 'Enable route optimization, vehicle telemetry tracking and operations analytics using FleetStack enterprise fleet intelligence infrastructure.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361070291_5b36825e.png',
  },
];

const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FC] via-white to-[#F0F5FA]">
      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Platform Infrastructure · Europe · Africa · Middle East
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-[56px] leading-[1.05] font-semibold tracking-tight text-slate-900">
              Smart Digital Infrastructure for{' '}
              <span className="text-[#0A3A6B]">Logistics, Education,</span>{' '}
              <span className="bg-gradient-to-r from-[#1E6FD9] to-[#0FB5A6] bg-clip-text text-transparent">
                Government & Enterprise
              </span>{' '}
              Systems
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              FlyttGo Technologies Group builds modular AI-powered platform infrastructure that enables
              organizations to launch logistics systems, education intelligence platforms, government service
              layers and digital marketplaces using scalable deployment architecture.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('whitelabel')}
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] transition-all shadow-lg shadow-blue-900/10"
              >
                Launch Your Platform
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('platforms')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 font-semibold rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Explore Platform Ecosystem
              </button>
            </div>

            {/* trust badges */}
            <div className="mt-10 pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-semibold text-slate-900 tracking-tight">5</div>
                <div className="text-xs text-slate-500 mt-0.5">Infrastructure Platforms</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-slate-900 tracking-tight">18+</div>
                <div className="text-xs text-slate-500 mt-0.5">Deployment Modules</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-slate-900 tracking-tight">3</div>
                <div className="text-xs text-slate-500 mt-0.5">Continents Ready</div>
              </div>
            </div>
          </div>

          {/* Visual Column — image slider with overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-white">
              {slides.map((s, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                    <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-[#0A3A6B] rounded-md">
                      {s.tag}
                    </span>
                    <h3 className="mt-3 text-white text-xl lg:text-2xl font-semibold leading-snug max-w-lg">
                      {s.title}
                    </h3>
                  </div>
                </div>
              ))}

              {/* Floating telemetry card */}
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Activity size={16} className="text-emerald-600" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Deployments</div>
                  <div className="text-sm font-semibold text-slate-900">Active · Multi-Region</div>
                </div>
              </div>

              {/* Floating region card */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Globe2 size={16} className="text-[#1E6FD9]" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Regions</div>
                  <div className="text-sm font-semibold text-slate-900">EU · AF · MENA</div>
                </div>
              </div>

              {/* slider controls */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-slate-900 shadow-md transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-slate-900 shadow-md transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* slide dots */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-8 bg-[#0A3A6B]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logo strip */}
      <div className="relative border-t border-slate-200/70 bg-white/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-medium">
            Comparable Structural Positioning
          </p>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {['Stripe · Infrastructure', 'Shopify · Marketplace', 'Palantir · Foundry', 'AWS · Marketplace', 'Uber · Movement'].map(
              (n) => (
                <div key={n} className="text-center text-sm font-medium text-slate-400 tracking-tight">
                  {n}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
