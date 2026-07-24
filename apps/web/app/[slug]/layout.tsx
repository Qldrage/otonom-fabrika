import { db, tenants } from '@otonom-fabrika/database';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Veritabanından tenant'ı çek
  const tenantData = await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1);

  if (tenantData.length === 0) {
    notFound(); // Tenant yoksa 404 sayfasına yönlendir
  }

  const tenant = tenantData[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* İleride buraya dinamik Header / Navbar gelecek */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold text-gray-800">{tenant.name}</h1>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* İleride buraya dinamik Footer gelecek */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} {tenant.name}. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
