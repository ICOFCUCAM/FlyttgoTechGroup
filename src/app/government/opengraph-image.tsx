import { ImageResponse } from 'next/og';

export const alt = 'FlyttGo · Government & public-sector platform infrastructure';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0A1F3D 0%, #0A3A6B 100%)',
          fontFamily: 'system-ui, sans-serif',
          color: '#F8FAFC',
          position: 'relative',
        }}
      >
        {/* Top rail */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
            fontSize: 18,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#94A3B8',
          }}
        >
          <span style={{ color: '#D6B575', fontWeight: 600, display: 'flex' }}>
            FLYTTGO TECHNOLOGIES GROUP AB
          </span>
          <span style={{ opacity: 0.4, display: 'flex' }}>·</span>
          <span style={{ display: 'flex' }}>GV.00 · Public sector</span>
        </div>

        {/* Headline block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: '#FFFFFF',
              fontFamily: '"IBM Plex Serif", Georgia, serif',
              maxWidth: 1000,
            }}
          >
            Modular platform infrastructure for public-sector deployment.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#D6B575',
              lineHeight: 1.15,
              fontFamily: '"IBM Plex Serif", Georgia, serif',
              maxWidth: 1000,
            }}
          >
            Sovereign-ready by construction.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#CBD5E1',
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            Eight modules · FlyttGoTech Core · three deployment modes · sovereign national infrastructure readiness.
          </div>
        </div>

        {/* Bottom rail */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
            fontSize: 16,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#94A3B8',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: '#D6B575',
                display: 'flex',
              }}
            />
            <span style={{ display: 'flex' }}>SaaS · PaaS · IaaS · Sovereign</span>
          </span>
          <span style={{ opacity: 0.4, display: 'flex' }}>·</span>
          <span style={{ display: 'flex' }}>EU · NA · AF · MENA · APAC</span>
          <span style={{ opacity: 0.4, display: 'flex' }}>·</span>
          <span style={{ color: '#9ED0F9', display: 'flex' }}>flyttgo.tech/government</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
