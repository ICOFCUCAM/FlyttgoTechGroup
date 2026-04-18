import { NextResponse, type NextRequest } from 'next/server';

// Kept in-sync with src/lib/i18n/locales.ts. Duplicated here so middleware
// stays pure-runtime (no bundler transforms).
const SUPPORTED = ['en', 'no', 'fr', 'de', 'es', 'sv', 'da', 'nl', 'pt', 'ar'] as const;
type Locale = (typeof SUPPORTED)[number];
const DEFAULT: Locale = 'en';
const COOKIE = 'NEXT_LOCALE';

const isSupported = (v: string): v is Locale =>
  (SUPPORTED as readonly string[]).includes(v);

// Paths we never rewrite — these shouldn't be locale-scoped.
const SKIP = [
  /^\/_next\//,
  /^\/api\//,
  /^\/sitemap\.xml$/,
  /^\/robots\.txt$/,
  /^\/manifest\.webmanifest$/,
  /^\/favicon\.ico$/,
  /^\/(icon|apple-icon|opengraph-image|twitter-image)/,
];

function pickAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT;
  // Parse "en-GB,en;q=0.9,nb;q=0.8,fr;q=0.7"
  const parts = header
    .split(',')
    .map((p) => p.trim())
    .map((p) => {
      const [tag, qRaw] = p.split(';');
      const q = qRaw ? parseFloat(qRaw.split('=')[1] ?? '1') : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of parts) {
    const primary = tag.split('-')[0];
    // Norwegian comes through as nb/nn; map both to "no".
    const normalized = primary === 'nb' || primary === 'nn' ? 'no' : primary;
    if (isSupported(normalized)) return normalized;
  }
  return DEFAULT;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (SKIP.some((re) => re.test(pathname))) {
    return NextResponse.next();
  }

  // 1) Does the URL already start with a supported locale segment?
  const firstSeg = pathname.split('/')[1] ?? '';
  if (isSupported(firstSeg)) {
    const stripped = pathname.slice(firstSeg.length + 1) || '/';
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = stripped;
    const res = NextResponse.rewrite(rewriteUrl);
    res.cookies.set(COOKIE, firstSeg, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
    // Hint for downstream (metadata, layout) — Server Components can read
    // this via headers().
    res.headers.set('x-flyttgo-locale', firstSeg);
    return res;
  }

  // 2) No prefix — use the cookie if present, else Accept-Language, and
  //    pass the chosen locale down via a request header. No redirect so
  //    we don't force ugly URLs on users who arrive at "/".
  const chosen =
    (req.cookies.get(COOKIE)?.value as Locale | undefined) ??
    pickAcceptLanguage(req.headers.get('accept-language'));
  const res = NextResponse.next({
    request: {
      headers: new Headers({
        ...Object.fromEntries(req.headers),
        'x-flyttgo-locale': chosen,
      }),
    },
  });
  res.headers.set('x-flyttgo-locale', chosen);
  if (!req.cookies.get(COOKIE)) {
    res.cookies.set(COOKIE, chosen, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return res;
}

export const config = {
  // Exclude API + static asset paths at the matcher level too, so middleware
  // isn't invoked unnecessarily.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|icon|apple-icon|opengraph-image|twitter-image).*)',
  ],
};
