import { db, tenants, pages } from '@otonom-fabrika/database';
import { eq, and } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { BlockRenderer, Block } from '@/components/BlockRenderer';

export default async function TenantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // 1. Tenant'ı bul
  const tenantData = await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1);
  if (tenantData.length === 0) {
    notFound();
  }
  const tenant = tenantData[0];

  // 2. Ana sayfayı bul (slug = 'home')
  const pageData = await db.select().from(pages).where(
    and(eq(pages.tenantId, tenant.id), eq(pages.slug, 'home'))
  ).limit(1);

  if (pageData.length === 0) {
    // Sayfa yoksa boş veya varsayılan göster
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">Bu işletme için henüz bir ana sayfa oluşturulmamış.</p>
      </div>
    );
  }

  const page = pageData[0];
  const blocks = page.blocks as Block[];

  return (
    <div>
      {/* Otonom Fabrika Mimari Kuralı: AI SEO meta etiketleri head içine eklenecek (Faz 4) */}
      <BlockRenderer blocks={blocks} />
    </div>
  );
}
