'use client';

import React, { useEffect, useState } from 'react';

/**
 * Top-edge reading-progress indicator. Sits as a 2px bar at y=0, tracks
 * scroll fraction across the page, fades out at 0% / 100%. Respects
 * prefers-reduced-motion (no transitions when disabled). Contributes
 * roughly 1 KB to the client bundle and pure-CSS otherwise.
 */
const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY ?? doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, scrollTop / scrollHeight));
      setProgress(ratio);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Hide the bar at the very top + bottom — purely cosmetic, avoids the
  // illusion that something is "stuck" at 100% when the user is at the
  // end of the page.
  const visible = progress > 0.005 && progress < 0.995;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[#1E6FD9] via-[#0FB5A6] to-[#9ED0F9] motion-safe:transition-all motion-safe:duration-150 ease-out"
        style={{
          width: `${progress * 100}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
};

export default ReadingProgress;
