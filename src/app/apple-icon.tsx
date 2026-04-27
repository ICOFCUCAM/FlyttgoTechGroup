import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// 180x180 Apple touch icon — canonical F-symbol with iOS squircle
// chrome (radius/width = 22.4% per docs/brand/symbol-spec.md §3).
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
          background: 'linear-gradient(135deg, #0A3A6B 0%, #1E6FD9 100%)',
          borderRadius: 40,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <path
            d="M 4 2 H 22 V 7 H 9 V 10 H 18 V 15 H 9 V 22 H 4 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
