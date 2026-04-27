import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// 32x32 favicon — uses the canonical F-symbol path scaled into the
// containing badge. Per docs/brand/symbol-spec.md §8, full canonical
// geometry is mandatory at 32+ px (only 16 px gets the simplified path).
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
          background: 'linear-gradient(135deg, #0A3A6B 0%, #1E6FD9 100%)',
          borderRadius: 6,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M 4 2 H 22 V 7 H 9 V 10 H 18 V 15 H 9 V 22 H 4 Z"
            fill="#9ED0F9"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
