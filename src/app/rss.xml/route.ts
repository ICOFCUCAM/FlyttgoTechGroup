import { insights } from '@/data/insights';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * RSS 2.0 feed of /insights articles. Most readers (Feedly, NetNewsWire,
 * Inoreader) parse this directly. The atom:link self-reference helps
 * autodiscovery; <atom:link rel="alternate" hreflang="..."> would need
 * per-locale feeds — deferred until insight content is translated.
 */
export async function GET() {
  const lastBuildDate = new Date().toUTCString();
  const items = insights
    .slice()
    .sort((a, b) => +new Date(b.publishedOn) - +new Date(a.publishedOn))
    .map((post) => {
      const url = `${SITE_URL}/insights/${post.slug}`;
      const pubDate = new Date(post.publishedOn).toUTCString();
      const categories = post.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>noreply@flyttgotech.com (${escapeXml(post.author)})</author>
      <description>${escapeXml(post.dek)}</description>
${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FlyttGo Insights</title>
    <link>${SITE_URL}/insights</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Deployment guides, architecture notes and procurement playbooks from the FlyttGo Technologies Group platform, security and commercial teams.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
    },
  });
}
