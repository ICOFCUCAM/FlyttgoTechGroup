import { ImageResponse } from 'next/og';
import { platforms } from '@/data/platforms';

export const alt = 'FlyttGo platform';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export const runtime = 'nodejs';

export default function Image({ params }: { params: { slug: string } }) {
  const p = platforms[params.slug];
  if (!p) return new ImageResponse(<div />, { ...size });

  const accent = p.color || '#1E6FD9';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#0A1F3D',
          fontFamily: 'system-ui, sans-serif',
          color: '#F8FAFC',
          position: 'relative',
        }}
      >
        {/* Radial accent glow tinted by the platform colour */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: `radial-gradient(900px 500px at 25% 15%, ${accent}55, transparent 60%), radial-gradient(700px 400px at 80% 90%, ${accent}22, transparent 60%)`,
          }}
        />
        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            opacity: 0.35,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #0A3A6B 0%, #1E6FD9 100%)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, letterSpacing: -0.5 }}>
              FlyttGo
            </div>
            <div style={{ display: 'flex', fontSize: 12, letterSpacing: 3, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 500 }}>
              Technologies Group
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              borderRadius: 999,
              background: `${accent}1F`,
              border: `1px solid ${accent}55`,
              color: accent,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              alignSelf: 'flex-start',
            }}
          >
            {p.subtitle}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: -3,
              color: '#F8FAFC',
              lineHeight: 1,
            }}
          >
            {p.name}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#CBD5E1', maxWidth: 960, lineHeight: 1.4 }}>
            {p.tagline || p.description || ''}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
            fontSize: 18,
            color: '#94A3B8',
          }}
        >
          <div style={{ display: 'flex', gap: 24 }}>
            <span>Platform Infrastructure</span>
            <span>EU · AF · MENA</span>
          </div>
          <div style={{ display: 'flex', fontFamily: 'ui-monospace, monospace' }}>
            flyttgo.tech/platforms/{p.slug}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
