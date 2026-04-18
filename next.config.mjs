/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
  async redirects() {
    return [
      // Legacy platform slugs renamed during the Transify / Workverge / Civitas / Identra / Payvera repositioning.
      { source: '/platforms/govstack', destination: '/platforms/civitas', permanent: true },
      { source: '/platforms/marketstack', destination: '/platforms/flyttgo', permanent: true },
      { source: '/platforms/fleetstack', destination: '/platforms/transify', permanent: true },
    ];
  },
};

export default nextConfig;
