'use client';

import { useState } from 'react';
import { updatePageBlocksAction } from '@/actions/pages';

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

  const handleBlockChange = (blockIndex: number, propKey: string, value: string) => {
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
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg text-sm border ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {blocks.map((block, index) => (
        <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-semibold text-lg text-gray-800">
              Blok #{index + 1}: <span className="text-indigo-600 font-mono">{block.type}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {Object.keys(block.props || {}).map((propKey) => (
              <div key={propKey}>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  {propKey}
                </label>
                {propKey.toLowerCase().includes('sub') || propKey.toLowerCase().includes('address') ? (
                  <textarea
                    rows={2}
                    value={block.props[propKey] || ''}
                    onChange={(e) => handleBlockChange(index, propKey, e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={block.props[propKey] || ''}
                    onChange={(e) => handleBlockChange(index, propKey, e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Tümünü Kaydet ve Yayınla'}
        </button>
      </div>
    </div>
  );
}
