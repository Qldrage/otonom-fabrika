'use client';

import { useState } from 'react';
import { updatePageBlocksAction } from '@/actions/pages';

const AVAILABLE_BLOCK_TYPES = [
  {
    type: 'HeroBlock',
    label: 'Hero (Manşet)',
    defaultProps: {
      headline: 'Yeni Nesil Perde Tasarımları',
      subheadline: 'Evinize şıklık katan stor ve fon perdeler.',
      ctaText: 'İletişime Geç',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
    },
  },
  {
    type: 'GalleryBlock',
    label: 'Ürün Galerisi',
    defaultProps: {
      title: 'Öne Çıkan Koleksiyonlarımız',
      subtitle: 'En çok tercih edilen perde modellerimiz',
      items: [
        { title: 'Zebra Stor Perde', category: 'Stor', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600', description: 'Güneş ışığını ayarlayabilen çift katmanlı yapı.' },
        { title: 'Kumaş Fon Perde', category: 'Fon', imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600', description: 'Kadife ve keten kumaş seçenekleriyle.' }
      ],
    },
  },
  {
    type: 'FeaturesBlock',
    label: 'Hizmet Avantajları',
    defaultProps: {
      title: 'Ayrıcalıklı Hizmetlerimiz',
      subtitle: 'Müşterilerimize sunduğumuz özel imkanlar',
      features: [
        { title: 'Ücretsiz Keşif & Ölçü', description: 'Adresinize gelip hassas ölçü alıyoruz.' },
        { title: 'Hızlı & Temiz Montaj', description: 'Profesyonel ekibimizle aynı gün montaj.' }
      ],
    },
  },
  {
    type: 'ContactBlock',
    label: 'İletişim & Form',
    defaultProps: {
      title: 'Bize Ulaşın',
      address: 'Caferağa Mah. Moda Cad. No:123 Kadıköy / İstanbul',
      phone: '+90 555 123 45 67',
      email: 'bilgi@elitperde.com',
    },
  },
];

export default function PageEditorClient({
  tenantSlug,
  initialBlocks,
}: {
  tenantSlug: string;
  initialBlocks: any[];
}) {
  const [blocks, setBlocks] = useState(initialBlocks || []);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleBlockChange = (blockIndex: number, propKey: string, value: any) => {
    const updated = [...blocks];
    updated[blockIndex] = {
      ...updated[blockIndex],
      props: {
        ...updated[blockIndex].props,
        [propKey]: value,
      },
    };
    setBlocks(updated);
  };

  const handleAddBlock = (typeObj: typeof AVAILABLE_BLOCK_TYPES[0]) => {
    setBlocks([
      ...blocks,
      {
        type: typeObj.type,
        props: JSON.parse(JSON.stringify(typeObj.defaultProps)),
      },
    ]);
  };

  const handleDeleteBlock = (index: number) => {
    if (confirm('Bu bloğu silmek istediğinizden emin misiniz?')) {
      setBlocks(blocks.filter((_, i) => i !== index));
    }
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setBlocks(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const res = await updatePageBlocksAction(tenantSlug, blocks);
    setSaving(false);

    if (res.error) {
      setMessage({ type: 'error', text: res.error });
    } else {
      setMessage({ type: 'success', text: 'Değişiklikler başarıyla kaydedildi ve yayınlandı!' });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {message && (
        <div
          className={`p-4 rounded-xl text-sm border font-medium ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Blok Listesi */}
      {blocks.map((block, index) => (
        <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 relative">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center text-xs">
                {index + 1}
              </span>
              <h3 className="font-semibold text-lg text-gray-800">
                <span className="text-indigo-600 font-mono">{block.type}</span>
              </h3>
            </div>

            {/* Kontrol Butonları (Yukarı, Aşağı, Sil) */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleMoveBlock(index, 'up')}
                disabled={index === 0}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-30 text-gray-700"
                title="Yukarı Taşı"
              >
                ▲
              </button>
              <button
                onClick={() => handleMoveBlock(index, 'down')}
                disabled={index === blocks.length - 1}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-30 text-gray-700"
                title="Aşağı Taşı"
              >
                ▼
              </button>
              <button
                onClick={() => handleDeleteBlock(index)}
                className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-semibold px-2.5"
                title="Bloğu Sil"
              >
                Sil
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {Object.keys(block.props || {}).map((propKey) => {
              const val = block.props[propKey];
              const isArray = Array.isArray(val);

              return (
                <div key={propKey}>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                    {propKey}
                  </label>

                  {isArray ? (
                    <div className="p-3 bg-gray-50 border rounded-lg text-xs space-y-2">
                      <p className="font-mono text-gray-500">{val.length} elemanlı liste (JSON)</p>
                      <textarea
                        rows={4}
                        value={JSON.stringify(val, null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            handleBlockChange(index, propKey, parsed);
                          } catch (err) {}
                        }}
                        className="w-full font-mono p-2 border rounded text-xs focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ) : typeof val === 'string' && (val.length > 60 || propKey.toLowerCase().includes('sub') || propKey.toLowerCase().includes('address')) ? (
                    <textarea
                      rows={2}
                      value={val || ''}
                      onChange={(e) => handleBlockChange(index, propKey, e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={val || ''}
                      onChange={(e) => handleBlockChange(index, propKey, e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Yeni Blok Ekleme Paneli */}
      <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 text-center">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Sayfaya Yeni Blok Ekle</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {AVAILABLE_BLOCK_TYPES.map((b) => (
            <button
              key={b.type}
              onClick={() => handleAddBlock(b)}
              className="px-4 py-2 bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 font-medium text-xs rounded-lg shadow-sm transition"
            >
              + {b.label} ({b.type})
            </button>
          ))}
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50 text-sm"
        >
          {saving ? 'Kaydediliyor...' : 'Tüm Değişiklikleri Kaydet ve Yayınla'}
        </button>
      </div>
    </div>
  );
}
