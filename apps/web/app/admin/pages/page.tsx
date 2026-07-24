import { db, tenants, pages } from '@otonom-fabrika/database';
import { eq, and } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import PageEditorClient from './PageEditorClient';
import DomainSettingClient from './DomainSettingClient';

export default async function AdminPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug: urlSlug } = await searchParams;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  let slug = urlSlug;

  if (!slug && sessionCookie) {
    try {
      const parsed = JSON.parse(sessionCookie.value);
      slug = parsed.slug;
    } catch (e) {}
  }

  if (!slug) {
    redirect('/admin/login');
  }

  const tenantRes = await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1);
  if (tenantRes.length === 0) {
    notFound();
  }
  const tenant = tenantRes[0];

  const pageRes = await db
    .select()
    .from(pages)
    .where(and(eq(pages.tenantId, tenant.id), eq(pages.slug, 'home')))
    .limit(1);

  if (pageRes.length === 0) {
    return <div className="p-4 bg-yellow-50 text-yellow-800 border rounded">Bu işletme için sayfa kaydı bulunamadı.</div>;
  }

  const page = pageRes[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{tenant.name} - Ana Sayfa Düzenleyici</h2>
          <p className="text-sm text-gray-500">Değişiklikleri kaydederek canlı sayfayı (`/{tenant.slug}`) güncelleyebilirsiniz.</p>
        </div>
        <a
          href={`/${tenant.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-medium rounded-lg transition"
        >
          Canlı Sitede Gör ↗
        </a>
      </div>

      <PageEditorClient tenantSlug={tenant.slug} initialBlocks={page.blocks as any[]} />

      <div className="pt-6 border-t border-gray-200">
        <DomainSettingClient tenantSlug={tenant.slug} initialDomain={tenant.customDomain} />
      </div>
    </div>
  );
}
