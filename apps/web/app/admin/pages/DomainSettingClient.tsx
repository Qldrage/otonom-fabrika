'use client';

import { useState } from 'react';
import { updateTenantDomainAction } from '@/actions/tenant';
import { Globe, Check, AlertCircle } from 'lucide-react';

export default function DomainSettingClient({
  tenantSlug,
  initialDomain,
}: {
  tenantSlug: string;
  initialDomain?: string | null;
}) {
  const [domain, setDomain] = useState(initialDomain || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await updateTenantDomainAction(tenantSlug, domain);
    setLoading(false);

    if (res.error) {
      setMessage({ type: 'error', text: res.error });
    } else {
      setMessage({ type: 'success', text: 'Özel alan adı başarıyla kaydedildi!' });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-white space-y-4 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">Özel Alan Adı Bağla (Custom Domain)</h3>
          <p className="text-xs text-slate-400">Kendi satın aldığınız alan adını (örn: elitperde.com) yazarak sitenize bağlayın.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="www.isletmeniz.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 font-semibold text-sm rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
        >
          {loading ? 'Kaydediliyor...' : 'Alan Adını Kaydet'}
        </button>
      </form>

      {message && (
        <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-red-950/80 text-red-300 border border-red-800'}`}>
          {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
}
