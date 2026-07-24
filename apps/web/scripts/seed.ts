import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function seed() {
  const { db, tenants, pages } = await import('@otonom-fabrika/database');
  console.log('🌱 Seeding database...');

  try {
    // 1. Örnek Perdeci Tenant'ı
    const [tenant] = await db.insert(tenants).values({
      slug: 'elit-perde',
      name: 'Elit Perde Tasarım',
      sector: 'curtain',
      config: { city: 'İstanbul', district: 'Kadıköy', specialty: 'Stor ve Zebra Perde' },
    }).returning();
    
    console.log(`✅ Tenant oluşturuldu: ${tenant.name} (/elit-perde)`);

    // 2. Ana Sayfa Blokları
    const blocks = [
      {
        type: 'HeroBlock',
        props: {
          headline: 'Evinizin Şıklığı Perdenizde Gizli',
          subheadline: 'Kadıköy bölgesinin en köklü perde tasarım ve montaj atölyesi. Ücretsiz ölçü ve keşif hizmeti ile yanınızdayız.',
          ctaText: 'Ücretsiz Ölçü Alın',
          imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        }
      },
      {
        type: 'ContactBlock',
        props: {
          title: 'Ücretsiz Ölçü ve Keşif',
          address: 'Caferağa Mah. Moda Cad. No:123 Kadıköy / İstanbul',
          phone: '+90 555 123 45 67',
          email: 'bilgi@elitperde.com'
        }
      }
    ];

    // 3. Ana Sayfayı Ekle
    await db.insert(pages).values({
      tenantId: tenant.id,
      slug: 'home',
      title: 'Ana Sayfa',
      blocks,
      published: true,
      seo: { title: 'Elit Perde - Kadıköy Perdeci', description: 'Kadıköy bölgesinin en iyi perde tasarım atölyesi.' }
    });
    
    console.log(`✅ Sayfa oluşturuldu: /elit-perde`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
  
  process.exit(0);
}

seed();
