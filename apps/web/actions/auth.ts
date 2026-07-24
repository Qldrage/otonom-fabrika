'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const slug = formData.get('slug') as string;

  // Simple validation for MVP/Demo
  if (password === 'admin123' && slug) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', JSON.stringify({ slug, authenticated: true }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    redirect(`/admin/pages?slug=${slug}`);
  }

  return { error: 'Geçersiz işletme kodu veya şifre!' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
