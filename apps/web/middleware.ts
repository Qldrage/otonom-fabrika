import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'otonom-fabrika-super-secret-key-2026'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
      // Token geçersiz veya süresi dolmuşsa login'e at
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // 2. API Gateway Koruması (/api/v1/*)
  if (pathname.startsWith('/api/v1')) {
    // Auth login ve webhook harici API'ler Bearer Token (API Key) bekler
    if (pathname.startsWith('/api/v1/auth') || pathname.startsWith('/api/v1/webhooks')) {
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
    // Test API Key doğrulaması (sk_test_123456789)
    if (apiKey !== 'sk_test_123456789') {
      return NextResponse.json(
        { success: false, error: 'Geçersiz API Anahtarı.' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/v1/:path*'],
};
