import React from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarClock, Sparkles, Globe2 } from 'lucide-react';

const highlights = [
  { icon: Globe2, label: 'Multi-region · EU · AF · MENA' },
  { icon: Sparkles, label: '5 platforms · 18+ modules' },
  { icon: CalendarClock, label: '2–6 week deployment cycle' },
];

const FinalCTA: React.FC = () => {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-white to-[#F5F8FC]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0A1F3D] via-[#0A3A6B] to-[#1E6FD9] text-white shadow-2xl shadow-slate-900/20">
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
            }}
          />
          <div
            className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-24 w-[460px] h-[460px] rounded-full bg-[#0FB5A6]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative px-8 py-16 lg:px-20 lg:py-28">
            <div className="max-w-3xl mx-auto text-center motion-safe:animate-fade-up">
              <p className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden="true" />
                Ready When You Are
              </p>
              <h2
                id="final-cta-heading"
                className="mt-6 text-4xl md:text-5xl lg:text-[64px] font-semibold tracking-tight leading-[1.05]"
              >
                Start Deploying Your Platform{' '}
                <span className="bg-gradient-to-r from-white via-white to-[#9ED0F9] bg-clip-text text-transparent">
                  Infrastructure Today
                </span>
              </h2>
              <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed">
                Scope a deployment with the FlyttGo platform team — from pilot tenant to national
                rollout, across logistics, education, government and white-label workforce
                platforms.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-4 bg-white text-[#0A3A6B] font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  Deploy Your Platform
                  <ArrowRight
                    size={18}
                    className="motion-safe:transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/contact?intent=demo"
                  className="inline-flex items-center gap-2 px-7 py-4 border border-white/25 text-white font-semibold rounded-lg hover:bg-white/10 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  <CalendarClock size={16} aria-hidden="true" />
                  Schedule Infrastructure Demo
                </Link>
              </div>

              <ul className="mt-14 pt-10 border-t border-white/10 grid sm:grid-cols-3 gap-6">
                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <li key={h.label} className="flex items-center justify-center gap-2.5 text-sm text-white/80">
                      <Icon size={16} className="text-emerald-300" aria-hidden="true" />
                      <span>{h.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
