// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('session_token')?.value;

  // 1. PUBLIC ROUTES (tidak perlu auth)
  const publicRoutes = [
    '/login',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/display/btw', // Public API untuk frontend
  ];
  
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 2. PROTECTED API ROUTES (perlu auth)
  const protectedApiRoutes = [
    '/api/btw/kepengurusan',
    '/api/btw/anggota',
    '/api/btw/divisi',
    '/api/btw/jabatan',
    '/api/btw/detail',
  ];

  const isProtectedApi = protectedApiRoutes.some((route) => 
    pathname.startsWith(route)
  );

  if (isProtectedApi && !sessionToken) {
    //  Return 401 Unauthorized untuk API
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  // 3. PROTECTED ADMIN PAGES (perlu auth)
  const adminRoutes = ['/admin'];
  const isAdminRoute = adminRoutes.some((route) => 
    pathname.startsWith(route)
  );

  if (isAdminRoute && !sessionToken) {
    //  Redirect ke login untuk pages
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. LOGIN PAGE REDIRECT (kalau sudah login)
  if (pathname === '/login' && sessionToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};