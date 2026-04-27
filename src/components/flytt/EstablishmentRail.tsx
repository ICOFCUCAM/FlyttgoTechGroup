import React from 'react';

/**
 * Site-wide establishment rail (ER.00). A thin near-black band that
 * sits above the Navbar on every page. Performs the same trust-signal
 * job a luxury / advisory firm header bar does — "established YYYY,
 * global, regulated" — but in FlyttGo's infrastructure language:
 * monospace caps, a warm-brass leading mark, and the sovereign-ready
 * stamp at the trailing edge.
 *
 * Designed to be as restrained as possible: 28px tall, no animation,
 * no links, no JS. It exists to set institutional voice before any
 * platform copy lands.
 */

const EstablishmentRail: React.FC = () => {
  return (
    <div
      role="presentation"
      className="bg-[#070D1A] text-[#F0E0C8] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-7 flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[#D6B575] font-semibold flex-shrink-0">
            FlyttGo Technologies Group AB
          </span>
          <span aria-hidden="true" className="text-white/20 hidden sm:inline">·</span>
          <span className="text-[#F0E0C8]/85 hidden sm:inline truncate">
            Global platform infrastructure
          </span>
          <span aria-hidden="true" className="text-white/20 hidden md:inline">·</span>
          <span className="text-[#F0E0C8]/65 hidden md:inline truncate">
            Public · Enterprise · Sovereign
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-[#F0E0C8]/65 hidden sm:inline">
            EU · NA · AF · MENA · APAC
          </span>
          <span aria-hidden="true" className="text-white/20 hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-1.5 text-[#D6B575]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#D6B575]"
              aria-hidden="true"
            />
            Sovereign-ready
          </span>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentRail;
