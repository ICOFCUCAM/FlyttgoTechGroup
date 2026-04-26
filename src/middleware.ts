import { NextResponse, type NextRequest } from 'next/server';
import {
  isSupportedLocale as isSupported,
  pickAcceptLanguage,
  type MiddlewareLocale as Locale,
} from '@/lib/i18n/accept-language';
import {
  PROTECTED_PREFIXES,
  requiredRoleForPath,
  hasAtLeastRole,
  defaultLandingPath,
  isPlatformRole,
  type PlatformRole,
} from '@/lib/auth/roles';

const COOKIE = 'NEXT_LOCALE';

const HTML_CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=86400';

const SKIP = [
  /^\/_next\//,
  /^\/api\//,
  /^\/sitemap\.xml$/,
  /^\/robots\.txt$/,
  /^\/manifest\.webmanifest$/,
  /^\/favicon\.ico$/,
  /^\/(icon|apple-icon|opengraph-image|twitter-image)/,
];

const NO_CACHE = [
  /^\/contact(\/|$|\?)/,
  /^\/accounting(\/|$|\?)/,
  /^\/audit(\/|$|\?)/,
  /^\/admin(\/|$|\?)/,
];

function applyCachePolicy(res: NextResponse, pathname: string) {
  if (NO_CACHE.some((re) => re.test(pathname))) {
    res.headers.set('Cache-Control', 'private, no-store');
    return;
  }
  if (!res.headers.has('Cache-Control')) {
    res.headers.set('Cache-Control', HTML_CACHE_CONTROL);
  }
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

/**
 * Resolve session role inside Edge middleware. We avoid hitting the DB
 * here because middleware runs on every request — the role is read from
 * a non-httpOnly companion cookie that the server sets on login. The
 * server-side `getSession()` helper re-reads the canonical role from
 * users_roles for any actual authorization decision.
 */
function readRoleHint(req: NextRequest): PlatformRole | null {
  const value = req.cookies.get('flyttgo_role')?.value;
  return isPlatformRole(value) ? value : null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (SKIP.some((re) => re.test(pathname))) {
    return NextResponse.next();
  }

  // -- Protected prefixes: /accounting, /audit, /admin --------------------
  // The /sign-in page no longer exists. Each role-specific URL renders
  // its own inline sign-in form via the layout when there is no
  // session. We still steer authenticated mismatches to their own
  // workspace here so the deep link doesn't leak the route hierarchy.
  if (isProtectedPath(pathname)) {
    const baseRes = NextResponse.next();
    baseRes.headers.set('Cache-Control', 'private, no-store');

    const role = readRoleHint(req);
    const required = requiredRoleForPath(pathname);
    if (role && required && !hasAtLeastRole(role, required)) {
      const correct = req.nextUrl.clone();
      correct.pathname = defaultLandingPath(role);
      correct.search = '';
      return NextResponse.redirect(correct);
    }
    return baseRes;
  }

  // -- Locale logic for public pages --------------------------------------
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
    res.headers.set('x-flyttgo-locale', firstSeg);
    res.headers.set('Vary', 'x-flyttgo-locale, Accept-Language, Cookie');
    applyCachePolicy(res, pathname);
    return res;
  }

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
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|icon|apple-icon|opengraph-image|twitter-image).*)',
  ],
};
