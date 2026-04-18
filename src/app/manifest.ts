import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FlyttGo Technologies Group',
    short_name: 'FlyttGo Tech',
    description:
      'Modular platform infrastructure for mobility, workforce, government, education, identity, payments and financial operations — deployed across EU, AF and MENA.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A1F3D',
    theme_color: '#0A1F3D',
    lang: 'en',
    categories: ['business', 'productivity', 'developer'],
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
