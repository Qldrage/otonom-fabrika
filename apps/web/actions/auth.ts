'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db, users, tenants } from '@otonom-fabrika/database';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'otonom-fabrika-super-secret-key-2026';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const slug = formData.get('slug') as string;

  if (!email || !password || !slug) {
    return { error: 'Lütfen tüm alanları doldurun!' };
  }

  try {
    // 1. Tenant var mı kontrol et
    const tenantRes = await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1);
    if (tenantRes.length === 0) {
      return { error: 'Geçersiz işletme kodu (slug)!' };
    }
    const tenant = tenantRes[0];

    // 2. Kullanıcıyı bul
    const userRes = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (userRes.length === 0) {
      return { error: 'E-posta veya şifre hatalı!' };
    }
    const user = userRes[0];

    // Kullanıcı bu tenant'a mı ait?
    if (user.tenantId !== tenant.id) {
      return { error: 'Bu kullanıcı belirtilen işletmeye yetkili değil!' };
    }

    // 3. Bcrypt şifre kontrolü
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return { error: 'E-posta veya şifre hatalı!' };
    }

    // 4. JWT Token İmzala ve Cookie'ye At
    const token = jwt.sign(
      {
        userId: user.id,
        tenantId: tenant.id,
        slug: tenant.slug,
        role: user.role,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 saat
    });

    redirect(`/admin/pages?slug=${slug}`);
  } catch (err: any) {
    // Next.js redirect fırlatırsa yakalama
    if (err.digest?.startsWith('NEXT_REDIRECT')) throw err;
    return { error: err.message || 'Giriş işlemi sırasında bir hata oluştu.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
