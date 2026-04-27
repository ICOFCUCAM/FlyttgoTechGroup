/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd64gsuwffb70l.cloudfront.net' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Legacy platform slugs renamed during the Transify / Workverge / Civitas / Identra / Payvera repositioning.
      { source: '/platforms/govstack', destination: '/platforms/civitas', permanent: true },
      { source: '/platforms/marketstack', destination: '/platforms/flyttgo', permanent: true },
      { source: '/platforms/fleetstack', destination: '/platforms/transify', permanent: true },
      // Convenience redirects — people guess these short URLs.
      { source: '/careers', destination: '/company/careers', permanent: true },
      { source: '/press', destination: '/company/press', permanent: true },
      { source: '/leadership', destination: '/company/leadership', permanent: true },
      { source: '/about', destination: '/company', permanent: true },
      { source: '/legal', destination: '/privacy', permanent: false },
      { source: '/docs', destination: '/developers', permanent: false },
      { source: '/api', destination: '/developers', permanent: false },
    ];
  },
};

export default nextConfig;
