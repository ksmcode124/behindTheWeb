import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('session')?.value;

  const result = handleAuth({
    pathname,
    request,
    sessionToken,
  });

  return result ?? NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};

function handleAuth({
  pathname,
  request,
  sessionToken,
}: {
  pathname: string;
  request: Request & { url: string };
  sessionToken?: string;
}) {
  const adminRoutes = ['/admin'];
  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAdminRoute && !sessionToken) {
    console.warn('[AUTH] Unauthorized admin access', {
      path: pathname,
    });

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/login' && sessionToken) {
    return NextResponse.redirect(
      new URL('/admin/dashboard', request.url)
    );
  }

  return null;
}
