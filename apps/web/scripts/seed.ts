import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function seed() {
  const { db, tenants, pages } = await import('@otonom-fabrika/database');
  console.log('🌱 Seeding database...');

  try {
    const { users, pages, plugins, tenants } = await import('@otonom-fabrika/database');
    await db.delete(users);
    await db.delete(pages);
    await db.delete(plugins);
    await db.delete(tenants);

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
          imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1920'
        }
      },
      {
        type: 'GalleryBlock',
        props: {
          title: 'Öne Çıkan Perde Koleksiyonlarımız',
          subtitle: 'Kadıköy mağazamızda sergilenen popüler modellerimiz',
          items: [
            { title: 'Çift Katlı Zebra Stor Perde', category: 'Stor Perde', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600', description: 'Güneş ışığını tam kontrol eden motorlu veya zincirli mekanizma.' },
            { title: 'Lüks Kadife Fon Perde', category: 'Fon Perde', imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600', description: 'İthal İtalyan kadife kumaş, özel dikim imkanı.' },
            { title: 'Motorlu Dikey Tül Perde', category: 'Tül Perde', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600', description: 'Akıllı ev sistemlerine uyumlu modern salon perdeleri.' }
          ]
        }
      },
      {
        type: 'FeaturesBlock',
        props: {
          title: 'Neden Elit Perde?',
          subtitle: '20 yıllık tecrübe ile Kadıköy halkına sunduğumuz ayrıcalıklar',
          features: [
            { title: 'Ücretsiz Adreste Ölçü', description: 'Kumaş kartelamızla adresinize gelip sıfır hatayla ölçü alıyoruz.' },
            { title: 'Aynı Gün Temiz Montaj', description: 'Atölyemizde dikilen perdelerinizi 48 saat içinde titizlikle monte ediyoruz.' },
            { title: '2 Yıl Garantili Mekanizma', description: 'Tüm stor ve zebra perde mekanizmalarımız 2 yıl birebir değişim garantilidir.' }
          ]
        }
      },
      {
        type: 'ContactBlock',
        props: {
          title: 'Ücretsiz Ölçü ve Keşif Talebi',
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

    // 4. Admin Kullanıcısını Ekle (bcryptjs ile)
    const bcrypt = await import('bcryptjs');
    const passwordHash = await bcrypt.hash('admin123', 10);

    await db.insert(users).values({
      tenantId: tenant.id,
      email: 'admin@elit-perde.com',
      passwordHash,
      role: 'owner',
    });

    console.log(`✅ Kullanıcı oluşturuldu: admin@elit-perde.com / admin123`);

    // 5. Test Plugin Secret (API Gateway Auth) Ekle
    await db.insert(plugins).values({
      tenantId: tenant.id,
      name: 'Default Test Plugin',
      webhookUrl: 'http://localhost:3000/api/v1/webhooks/event',
      secret: 'sk_test_123456789',
      events: ['contact.form.submitted'],
    });

    console.log(`✅ Test Plugin kaydı oluşturuldu: Secret = sk_test_123456789`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
  
  process.exit(0);
}

seed();
