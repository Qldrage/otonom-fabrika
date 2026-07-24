import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'otonom-fabrika-super-secret-key-2026'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';

  // 1. Admin Rotaları Koruması (/admin/*)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // 2. API Gateway Koruması (/api/v1/*)
  if (pathname.startsWith('/api/v1')) {
    if (
      pathname.startsWith('/api/v1/auth') ||
      pathname.startsWith('/api/v1/webhooks') ||
      pathname.startsWith('/api/v1/tenants/domain')
    ) {
      return NextResponse.next();
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim. Authorization: Bearer <api_key> başlığı gerekli.' },
        { status: 401 }
      );
    }

    const apiKey = authHeader.split(' ')[1];
    if (apiKey !== 'sk_test_123456789') {
      return NextResponse.json(
        { success: false, error: 'Geçersiz API Anahtarı.' },
        { status: 401 }
      );
    }
  }

  // 3. Custom Domain Rewriting (e.g. ahmettesisat.com -> /ahmet-tesisat)
  const isMainDomain =
    host.includes('localhost') ||
    host.includes('127.0.0.1') ||
    host.includes('otonomfabrika.com') ||
    host.includes('.vercel.app');

  if (!isMainDomain && !pathname.startsWith('/api') && !pathname.startsWith('/admin') && !pathname.startsWith('/_next')) {
    try {
      const domainLookupUrl = new URL(`/api/v1/tenants/domain?host=${encodeURIComponent(host)}`, request.url);
      const res = await fetch(domainLookupUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.slug) {
          // Rewrite user's custom domain to the target tenant slug
          return NextResponse.rewrite(new URL(`/${data.slug}${pathname === '/' ? '' : pathname}`, request.url));
        }
      }
    } catch (err) {
      console.error('Custom domain rewrite error:', err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
