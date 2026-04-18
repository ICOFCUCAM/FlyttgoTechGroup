import { ImageResponse } from 'next/og';
import { insightBySlug, insightDateFormat } from '@/data/insights';

export const alt = 'FlyttGo Insight';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export const runtime = 'nodejs';

export default function Image({ params }: { params: { slug: string } }) {
  const post = insightBySlug[params.slug];
  if (!post) return new ImageResponse(<div />, { ...size });

  const accent = post.accent || '#1E6FD9';

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
          background: '#FFFFFF',
          fontFamily: 'system-ui, sans-serif',
          color: '#0A1F3D',
          position: 'relative',
        }}
      >
        {/* Soft accent corner */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            display: 'flex',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #0A3A6B 0%, #1E6FD9 100%)',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 20, fontWeight: 600, letterSpacing: -0.5 }}>
              FlyttGo · Insights
            </div>
            <div style={{ display: 'flex', fontSize: 12, letterSpacing: 3, color: '#64748B', textTransform: 'uppercase', fontWeight: 500 }}>
              Platform infrastructure notes
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
              background: `${accent}14`,
              color: accent,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              alignSelf: 'flex-start',
            }}
          >
            {post.eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontWeight: 600,
              letterSpacing: -1.5,
              color: '#0F172A',
              lineHeight: 1.08,
              maxWidth: 1040,
            }}
          >
            {post.title}
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#475569', lineHeight: 1.4, maxWidth: 960 }}>
            {post.dek}
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
            fontSize: 16,
            color: '#64748B',
          }}
        >
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <span style={{ display: 'flex', fontWeight: 600, color: '#334155' }}>{post.author}</span>
            <span>·</span>
            <span>{insightDateFormat(post.publishedOn)}</span>
            <span>·</span>
            <span>{post.readMinutes} min read</span>
          </div>
          <div style={{ display: 'flex', fontFamily: 'ui-monospace, monospace', color: '#94A3B8' }}>
            flyttgo.tech/insights
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
