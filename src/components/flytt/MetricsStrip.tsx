'use client';

import React, { useEffect, useRef, useState } from 'react';

const metrics = [
  { label: 'Infrastructure Platforms', value: 5, suffix: '' },
  { label: 'Deployment Modules', value: 24, suffix: '+' },
  { label: 'Supported Industries', value: 7, suffix: '' },
  { label: 'Regional Deployment Readiness', value: 3, suffix: ' Continents' },
];

const Counter: React.FC<{ to: number; suffix: string }> = ({ to, suffix }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const dur = 1400;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min((t - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(eased * to));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
};

const MetricsStrip: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#F5F8FC] to-[#EEF4FA] border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center lg:text-left lg:border-l lg:border-slate-200/80 lg:pl-6 first:lg:border-l-0 first:lg:pl-0">
              <div className="text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-2 text-sm text-slate-600 leading-snug">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsStrip;