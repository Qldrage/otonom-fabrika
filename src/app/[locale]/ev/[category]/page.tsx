import Link from "next/link";
import { products } from "../../../../data/products";

const CATEGORY_NAMES: Record<string, string> = {
  "oturma-odasi": "Oturma Odası",
  "salon": "Salon",
  "mutfak": "Mutfak",
  "cocuk-odasi": "Çocuk Odası",
  "yatak-odasi": "Yatak Odası",
  "cam-balkon": "Cam Balkon"
};

function formatCategoryName(slug: string) {
  return CATEGORY_NAMES[slug] || slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const SEO_CONTENT: Record<string, { title: string; paragraphs: string[] }[]> = {
  "oturma-odasi": [
    {
      title: "Oturma Odası Perde Modelleri",
      paragraphs: [
        "Oturma odanız için en modern ve şık perde modellerini keşfedin. Geniş renk ve kumaş seçenekleriyle yaşam alanınızı güzelleştirin.",
        "Her tarza uygun oturma odası perdeleri ile mekanınızda sıcak ve konforlu bir atmosfer yaratın."
      ]
    },
    {
      title: "Klasik Oturma Odası Perdeleri",
      paragraphs: [
        "Zarif detaylar ve zengin dokularla bezenmiş klasik oturma odası perdeleri, evinizde asil bir görünüm sağlar.",
        "Geleneksel şıklığı modern dokunuşlarla birleştiren tasarımlarımızla tanışın."
      ]
    },
    {
      title: "Modern Oturma Odası Perdeleri",
      paragraphs: [
        "Minimalist ve çağdaş tasarımlar arayanlar için modern oturma odası perdeleri mükemmel bir tercihtir.",
        "Fonksiyonelliği ve estetiği bir arada sunan perde çözümlerimizle oturma odanıza modern bir dokunuş yapın."
      ]
    }
  ],
  "salon": [
    {
      title: "Salon Perde Modelleri",
      paragraphs: [
        "Evinizin en göz alıcı alanı olan salonunuz için tasarlanmış özel perde modellerimizi inceleyin.",
        "Salon perdelerimiz, kaliteli kumaşları ve zarif dökümleri ile evinizin şıklığını tamamlar."
      ]
    },
    {
      title: "Fon Perde Tasarımları",
      paragraphs: [
        "Salon dekorasyonunun vazgeçilmezi olan fon perdeler, mekana derinlik ve zenginlik katar.",
        "Farklı renk ve desen alternatifleriyle salonunuza özel fon perde modellerini tasarlıyoruz."
      ]
    },
    {
      title: "Premium Salon Perdeleri",
      paragraphs: [
        "Lüks ve konforu bir arada sunan premium salon perdeleri ile ayrıcalıklı bir atmosfer yaratın.",
        "En yüksek kalite standartlarında üretilen perdelerimizle salonunuza değer katın."
      ]
    }
  ],
  "mutfak": [
    {
      title: "Mutfak Perde Modelleri",
      paragraphs: [
        "Mutfak dekorasyonunuza ferahlık ve şıklık katacak perde alternatiflerini keşfedin.",
        "Kolay temizlenebilir ve leke tutmaz mutfak perdeleri ile hayatınızı kolaylaştırın."
      ]
    },
    {
      title: "Stor ve Zebra Mutfak Perdeleri",
      paragraphs: [
        "Pratik kullanımı ve modern görünümüyle stor ve zebra perdeler mutfaklar için en popüler çözümlerdir.",
        "Işık kontrolünü kolayca sağlayabileceğiniz mutfak perdelerimizle konforu yaşayın."
      ]
    },
    {
      title: "Rustik Mutfak Perdeleri",
      paragraphs: [
        "Mutfaklarında samimi ve doğal bir hava yaratmak isteyenler için rustik perde tasarımları.",
        "Doğal kumaşlar ve ahşap detaylarla bezeli perdelerimizle sıcak bir mutfak ortamı hazırlayın."
      ]
    }
  ],
  "cocuk-odasi": [
    {
      title: "Çocuk Odası Perde Modelleri",
      paragraphs: [
        "Çocuklarınızın odası için rengarenk, eğlenceli ve güvenli perde modelleri.",
        "Onların hayal gücünü besleyecek desenler ve anti-alerjik kumaş seçenekleriyle en sağlıklı ürünleri sunuyoruz."
      ]
    },
    {
      title: "Genç Odası Perde Modelleri",
      paragraphs: [
        "Gençlerin dinamik ruhunu yansıtan, modern ve fonksiyonel genç odası perdeleri.",
        "Kendi tarzlarını yansıtabilecekleri modern tasarımlar ve karartma perdesi seçenekleri burada."
      ]
    },
    {
      title: "Erkek Çocuğu Perde Modelleri",
      paragraphs: [
        "Erkek çocuk odaları için özel olarak tasarlanmış tematik ve şık perdeler.",
        "Spor, uzay, macera gibi popüler temalarla hazırlanan perde koleksiyonumuzu inceleyin."
      ]
    }
  ],
  "yatak-odasi": [
    {
      title: "Yatak Odası Perde Modelleri",
      paragraphs: [
        "Huzurlu ve dinlendirici bir uyku ortamı için yatak odası perde modellerimizi inceleyin.",
        "Göz yormayan renk tonları ve şık tasarımlar yatak odanıza çok yakışacak."
      ]
    },
    {
      title: "Karartma (Blackout) Yatak Odası Perdeleri",
      paragraphs: [
        "Dışarıdan gelen ışığı tamamen engelleyen karartma perdeleri ile uyku kalitenizi artırın.",
        "Isı ve ışık yalıtımı sağlayan blackout perdeler yatak odalarının vazgeçilmezidir."
      ]
    },
    {
      title: "Modern Yatak Odası Perdeleri",
      paragraphs: [
        "Sade çizgiler ve modern dökümlerle tasarlanmış yatak odası perdeleri ile odanızı yenileyin.",
        "Şıklığı ve işlevselliği bir arada sunan modellerimizle konforu bir yatak odası tasarımı oluşturun."
      ]
    }
  ],
  "cam-balkon": [
    {
      title: "Cam Balkon Perde Modelleri",
      paragraphs: [
        "Balkonlarınızı yılın her mevsimi keyifle kullanabilmeniz için cam balkon perde çözümleri.",
        "Kullanışlı yapısı ve şık tasarımıyla cam balkonunuza modern bir görünüm kazandırın."
      ]
    },
    {
      title: "Plise Cam Balkon Perdeleri",
      paragraphs: [
        "İstediğiniz seviyede durdurarak ışık kontrolü sağlayabileceğiniz plise perdeler cam balkonlar için idealdir.",
        "İnce yapısı ve kolay temizlenebilir kumaşlarıyla balkon keyfinizi ikiye katlayın."
      ]
    },
    {
      title: "Katlamalı Balkon Perdeleri",
      paragraphs: [
        "Geleneksel katlamalı perde estetiğini modern balkon tasarımlarıyla buluşturuyoruz.",
        "Farklı renk ve desen alternatifleriyle balkonunuzu şık bir yaşam alanına dönüştürün."
      ]
    }
  ]
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "tr";
  const categorySlug = resolvedParams.category;
  const categoryName = formatCategoryName(categorySlug);

  // Filter products by category if needed, or show default ones
  const filteredProducts = products.filter(
    (p) => p.link.includes(`/${categorySlug}`) || String(p.id).startsWith(categorySlug)
  );
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  const seoBlocks = SEO_CONTENT[categorySlug] || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-zinc-900/40 rounded-full blur-3xl -z-10" />

      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto text-center space-y-8 z-10 mb-20">
        <Link
          href={`/${locale}/ev`}
          className="inline-flex items-center text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium tracking-wide uppercase"
        >
          ← Koleksiyona Dön
        </Link>
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white drop-shadow-sm">
          {categoryName}
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
          {categoryName} alanınız için özenle tasarlanmış premium perde çözümlerimiz. Yaşam alanınızın ruhunu değiştirecek, size özel tasarımları keşfedin.
        </p>
      </div>

      {/* Product Grid Section */}
      <div className="w-full max-w-7xl mx-auto z-10 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {displayProducts.map((product) => (
            <div key={product.id} className="group flex flex-col bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              
              {/* Content */}
              <div className="p-5 md:p-6 flex flex-col flex-grow justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{categoryName}</p>
                  <h4 className="text-zinc-100 font-medium leading-snug line-clamp-2">
                    {product.title}
                  </h4>
                </div>
                
                <Link
                  href={`/${locale}${product.link}`}
                  className="inline-flex items-center justify-between w-full text-sm text-zinc-400 group-hover:text-white transition-colors duration-300"
                >
                  <span className="font-medium">Ürünü İncele</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic SEO Text Block */}
      {seoBlocks.length > 0 && (
        <div className="w-full max-w-7xl mx-auto border-t border-zinc-800 pt-16 mt-16 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seoBlocks.map((block, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-xl font-medium tracking-tight text-white">
                  {block.title}
                </h2>
                <div className="space-y-3">
                  {block.paragraphs.map((p, pIndex) => (
                    <p key={pIndex} className="text-sm text-zinc-400 leading-relaxed font-light">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="w-full max-w-7xl mx-auto text-center mt-24 z-10">
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-white text-zinc-950 font-medium text-lg hover:bg-zinc-200 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
        >
          Ücretsiz Keşif Al
        </Link>
      </div>
    </div>
  );
}
