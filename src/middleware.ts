import { NextResponse, type NextRequest } from 'next/server';
import {
  isSupportedLocale as isSupported,
  pickAcceptLanguage,
  type MiddlewareLocale as Locale,
} from '@/lib/i18n/accept-language';

const COOKIE = 'NEXT_LOCALE';

// Edge cache policy for HTML responses. Combined with the Vary header
// below, every (locale, route) pair is cached independently at the CDN.
// After the first request per variant, subsequent hits are served from
// the edge in <50ms — practical equivalent of per-locale SSG without a
// routing refactor.
//   s-maxage=300          — fresh for 5 min at shared caches
//   stale-while-revalidate=86400 — serve stale up to 24h while revalidating
const HTML_CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=86400';

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

// Paths whose response should NEVER be cached even with Vary (e.g. the
// contact form page renders with intent-specific query copy, and the
// /contact API route is already skipped above).
const NO_CACHE = [/^\/contact(\/|$|\?)/];

function applyCachePolicy(res: NextResponse, pathname: string) {
  if (NO_CACHE.some((re) => re.test(pathname))) {
    res.headers.set('Cache-Control', 'private, no-store');
    return;
  }
  // Only set Cache-Control if upstream hasn't already set something more
  // restrictive. Middleware runs before route handlers, so this is the
  // safe default — route handlers can override if needed.
  if (!res.headers.has('Cache-Control')) {
    res.headers.set('Cache-Control', HTML_CACHE_CONTROL);
  }
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
    // Tell any downstream CDN to cache per-locale, not as a single blob.
    res.headers.set('Vary', 'x-flyttgo-locale, Accept-Language, Cookie');
    applyCachePolicy(res, pathname);
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
  res.headers.set('Vary', 'x-flyttgo-locale, Accept-Language, Cookie');
  applyCachePolicy(res, pathname);
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
