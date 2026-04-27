import { ImageResponse } from 'next/og';

export const alt =
  'FlyttGo Technologies Group — Smart Digital Infrastructure for Logistics, Education, Government & Enterprise';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
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
          background:
            'linear-gradient(135deg, #F5F8FC 0%, #FFFFFF 45%, #F0F5FA 100%)',
          fontFamily: 'system-ui, sans-serif',
          color: '#0A1F3D',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            opacity: 0.45,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, zIndex: 1 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #0A3A6B 0%, #1E6FD9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 34, fontWeight: 600, letterSpacing: -0.5, color: '#0A1F3D' }}>
              FlyttGo
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 16,
                letterSpacing: 3,
                color: '#64748B',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Technologies Group
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1, gap: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 500,
              color: '#334155',
              alignSelf: 'flex-start',
            }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: 999, background: '#10B981', display: 'flex' }}
            />
            Platform Infrastructure · EU · AF · MENA
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: '#0F172A',
              maxWidth: 1000,
            }}
          >
            Smart Digital Infrastructure for Logistics, Education, Government &amp; Enterprise
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#475569', maxWidth: 960, lineHeight: 1.4 }}>
            Modular AI-powered platform infrastructure — deploy logistics marketplaces, education
            analytics, municipal dashboards and white-label systems at regional scale.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
            borderTop: '1px solid #E2E8F0',
            paddingTop: 24,
            fontSize: 18,
            color: '#64748B',
          }}
        >
          <div style={{ display: 'flex', gap: 28 }}>
            <span>Transify</span>
            <span>Workverge</span>
            <span>Civitas</span>
            <span>EduPro</span>
            <span>Identra</span>
            <span>Payvera</span>
            <span>Ledgera</span>
          </div>
          <div style={{ display: 'flex', fontFamily: 'ui-monospace, monospace', color: '#94A3B8' }}>
            flyttgo.tech
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
