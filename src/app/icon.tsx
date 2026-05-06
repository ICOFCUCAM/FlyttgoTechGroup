import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Browser favicon — renders the FlyttGo F-mark in the brand gradient
 * at exactly 32×32 px. Generated via Next.js ImageResponse so the
 * output is crisp at favicon size, ~1 KB, and edge-runtime served.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFFFFF',
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: -1.4,
            color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, #0A3A6B 0%, #1E6FD9 50%, #0FB5A6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            lineHeight: 1,
          }}
        >
          F
        </div>
      </div>
    ),
    { ...size },
  );
}
