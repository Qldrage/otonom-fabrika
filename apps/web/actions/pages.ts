'use server';

import { db, pages, tenants } from '@otonom-fabrika/database';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updatePageBlocksAction(tenantSlug: string, newBlocks: any[]) {
  try {
    // Find tenant
    const tenantRes = await db.select().from(tenants).where(eq(tenants.slug, tenantSlug)).limit(1);
    if (tenantRes.length === 0) return { error: 'İşletme bulunamadı.' };

    const tenant = tenantRes[0];

    // Update page
    await db
      .update(pages)
      .set({
        blocks: newBlocks,
        updatedAt: new Date(),
      })
      .where(and(eq(pages.tenantId, tenant.id), eq(pages.slug, 'home')));

    // Revalidate public page
    revalidatePath(`/${tenantSlug}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Güncelleme başarısız.' };
  }
}
