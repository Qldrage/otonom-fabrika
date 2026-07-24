import React from 'react';

export interface GalleryItem {
  title: string;
  category?: string;
  imageUrl: string;
  description?: string;
}

export interface GalleryBlockProps {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
}

export function GalleryBlock({ title, subtitle, items }: GalleryBlockProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items && items.map((item, index) => (
            <div key={index} className="group relative bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden h-64">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                {item.category && (
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                    {item.category}
                  </span>
                )}
                <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
