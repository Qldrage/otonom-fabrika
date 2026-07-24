'use server';

import { db, tenants } from '@otonom-fabrika/database';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateTenantDomainAction(slug: string, customDomain: string) {
  try {
    const cleanDomain = customDomain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');

    await db
      .update(tenants)
      .set({ customDomain: cleanDomain || null })
      .where(eq(tenants.slug, slug));

    revalidatePath(`/admin/pages`);
    return { success: true, customDomain: cleanDomain };
  } catch (err: any) {
    if (err.message?.includes('unique') || err.message?.includes('duplicate')) {
      return { error: 'Bu alan adı başka bir işletme tarafından kullanılıyor.' };
    }
    return { error: err.message || 'Alan adı güncellenirken bir hata oluştu.' };
  }
}
