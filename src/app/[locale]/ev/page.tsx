import Link from "next/link";

const CATEGORIES = [
  { id: "oturma-odasi", title: "Oturma Odası", desc: "Rahat ve şık tasarımlar", img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=600&auto=format&fit=crop" },
  { id: "salon", title: "Salon", desc: "Göz alıcı ve premium dokular", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop" },
  { id: "mutfak", title: "Mutfak", desc: "Pratik ve ferah çözümler", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop" },
  { id: "cocuk-odasi", title: "Çocuk Odası", desc: "Eğlenceli ve güvenli", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop" },
  { id: "yatak-odasi", title: "Yatak Odası", desc: "Huzurlu ve dinlendirici", img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=600&auto=format&fit=crop" },
  { id: "cam-balkon", title: "Cam Balkon", desc: "Modern ve kullanışlı", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop" },
];

export default async function EvKoleksiyonuPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "tr";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-24 px-6 md:px-12 selection:bg-zinc-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">
            Seçkin Perde Koleksiyonu
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg md:text-xl font-light">
            Yaşam alanlarınıza estetik ve zarafet katan premium tasarımlarımızı keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/ev/${category.id}`}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50 transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img 
                  src={category.img} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-medium text-white mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                  {category.title}
                </h3>
                <p className="text-zinc-400 text-sm font-light transform transition-all duration-300 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                  {category.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 md:mt-24 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-zinc-800/10 blur-3xl opacity-50 pointer-events-none" />
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-zinc-50 tracking-tight">Yaşam Alanınız İçin Ücretsiz Ölçüm</h2>
            <p className="text-zinc-400 text-lg font-light">Uzman ekibimizle mekanınıza en uygun çözümleri belirlemek için hemen iletişime geçin.</p>
            <div className="pt-4 flex justify-center">
              <Link
                href={`/${locale}/iletisim`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-50 text-zinc-950 font-medium hover:bg-zinc-200 transition-colors duration-300 shadow-lg shadow-black/50"
              >
                İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
