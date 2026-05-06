import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * Apple touch icon — renders the FlyttGo F-mark in the brand gradient
 * at 180×180 px on a white rounded card. Generated via Next.js
 * ImageResponse so the output is crisp at the iOS home-screen size
 * and avoids serving the multi-hundred-KB master PNG.
 */
export default function AppleIcon() {
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
          borderRadius: 38,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 138,
            letterSpacing: -7,
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
