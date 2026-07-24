'use client';

import { useState } from 'react';
import { registerBusinessAction } from '@/actions/onboarding';

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    specialty: 'Stor ve Zebra Perde',
    city: 'İstanbul',
    district: 'Kadıköy',
    phone: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ slug: string; tenantName: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await registerBusinessAction(formData);

    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else if (res.success && res.slug) {
      setResult({ slug: res.slug, tenantName: res.tenantName || formData.businessName });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 rounded-full border border-indigo-800/60 mb-4">
          ✨ Yapay Zeka Destekli Otonom SaaS
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          İşletmenizi 30 Saniyede Dijitalleştirin
        </h1>
        <p className="mt-3 text-slate-400 text-sm">
          İşletme bilgilerinizi girin, AI motorumuz SEO uyumlu web sitenizi anında üretsin.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          {result ? (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Tebrikler! Siteniz Hazır 🎉</h2>
              <p className="text-slate-300 text-sm">
                <span className="font-semibold text-indigo-400">{result.tenantName}</span> için yapay zeka tarafından özel web sitesi ve yönetim paneli oluşturuldu.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`/${result.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition duration-150"
                >
                  Canlı Web Sitenizi Görün →
                </a>
                <a
                  href={`/admin/pages?slug=${result.slug}`}
                  className="w-full flex justify-center py-3 px-4 rounded-xl border border-slate-700 text-sm font-medium text-slate-300 hover:bg-slate-800 transition duration-150"
                >
                  İşletme Paneline Git →
                </a>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  İşletme Adı *
                </label>
                <input
                  type="text"
                  name="businessName"
                  required
                  placeholder="Örn: Elit Perde Tasarım"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Şehir *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Örn: İstanbul"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    İlçe *
                  </label>
                  <input
                    type="text"
                    name="district"
                    required
                    placeholder="Örn: Kadıköy"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Uzmanlık / Hizmet Alanı *
                </label>
                <input
                  type="text"
                  name="specialty"
                  required
                  placeholder="Örn: Stor ve Zebra Perde Montajı"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  İletişim Telefonu
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="0555 123 45 67"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="admin@isletme.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Panel Şifresi *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition duration-150 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Yapay Zeka Sitenizi Üretiyor...
                  </>
                ) : (
                  '🚀 Ücretsiz Sitemi Yapay Zekayla Üret'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
