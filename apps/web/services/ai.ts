export interface AIGenerationInput {
  businessName: string;
  city: string;
  district: string;
  specialty: string;
  phone?: string;
  email?: string;
}

export interface Block {
  type: string;
  props: Record<string, any>;
}

// Unsplash image preset selector based on specialty keywords
function getSpecialtyImages(specialty: string) {
  const specLower = specialty.toLowerCase();
  if (specLower.includes('perde') || specLower.includes('stor') || specLower.includes('zebra')) {
    return {
      hero: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      g1: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      g2: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
      g3: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
    };
  } else if (specLower.includes('tesisat') || specLower.includes('su') || specLower.includes('tıkanıklık')) {
    return {
      hero: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      g1: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
      g2: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
      g3: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    };
  }
  
  // Default clean interior/service images
  return {
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    g1: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=600&q=80',
    g2: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    g3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
  };
}

/**
 * AI Parametric Engine: Injects customer metadata into strict, pre-defined block templates.
 */
export async function generateParametricBlocks(input: AIGenerationInput): Promise<{
  blocks: Block[];
  seo: { title: string; description: string; keywords: string };
}> {
  const { businessName, city, district, specialty, phone = '0555 000 00 00', email = `iletisim@${businessName.toLowerCase().replace(/\s+/g, '')}.com` } = input;
  const imgs = getSpecialtyImages(specialty);

  const seo = {
    title: `${businessName} | ${district} ${specialty} Ustası`,
    description: `${city} ${district} bölgesinde profesyonel ${specialty} hizmetleri. Ücretsiz keşif, uygun fiyat ve garantili işçilik için ${businessName}.`,
    keywords: `${district} ${specialty}, ${city} ${specialty}, ${businessName}, en yakın ${specialty}`,
  };

  const blocks: Block[] = [
    {
      type: 'HeroBlock',
      props: {
        headline: `${district}'nin Güvenilir ${specialty} Adresi: ${businessName}`,
        subheadline: `${city} ${district} bölgesinde ${specialty} konusunda uzman ekibimizle hızlı, temiz ve garantili çözümler sunuyoruz.`,
        ctaText: 'Hemen Teklif / Ücretsiz Keşif Al',
        ctaLink: `tel:${phone}`,
        imageUrl: imgs.hero,
      },
    },
    {
      type: 'FeaturesBlock',
      props: {
        title: `Neden ${businessName}?`,
        subtitle: `${district} ve çevresinde sunduğumuz ayrıcalıklı hizmet standartları`,
        features: [
          {
            icon: 'check',
            title: 'Hızlı & Yerinde Keşif',
            description: `${district} içinde adresinize aynı gün gelerek detaylı ölçü ve tespit yapıyoruz.`,
          },
          {
            icon: 'award',
            title: 'Garantili İşçilik',
            description: 'Kullandığımız tüm malzeme ve sunduğumuz montaj hizmetleri 2 yıl resmi garantilidir.',
          },
          {
            icon: 'clock',
            title: 'Sabit Fiyat Garantisi',
            description: 'Sürpriz maliyetler yok! Başta konuşulan net fiyat üzerinden kaliteli teslimat.',
          },
        ],
      },
    },
    {
      type: 'GalleryBlock',
      props: {
        title: 'Tamamlanan Uygulamalarımız',
        subtitle: `${district} müşteri projelerimizden bazı öne çıkan çalışmalar`,
        items: [
          {
            title: `Lüks ${specialty} Montajı`,
            category: specialty,
            imageUrl: imgs.g1,
            description: `${district} villası için özel ölçü ve tasarım uygulaması.`,
          },
          {
            title: `Modern Ev Uygulaması`,
            category: 'Referans Proje',
            imageUrl: imgs.g2,
            description: 'Uzun ömürlü mekanizma ve birinci sınıf işçilik.',
          },
          {
            title: `Kurumsal Ofis Çalışması`,
            category: 'Ticari Proje',
            imageUrl: imgs.g3,
            description: 'Zamanında teslimat ve kusursuz detay işçiliği.',
          },
        ],
      },
    },
    {
      type: 'ContactBlock',
      props: {
        title: 'Ücretsiz Keşif ve İletişim',
        subtitle: 'Bize telefonla ulaşabilir veya mesaj bırakabilirsiniz.',
        phone: phone,
        email: email,
        address: `${district} Mah. Merkez Cad. No:12/A, ${district} / ${city}`,
        workingHours: 'Pazartesi - Cumartesi: 08:30 - 19:30',
      },
    },
  ];

  return { blocks, seo };
}
