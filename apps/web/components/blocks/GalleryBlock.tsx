'use client';

import { motion } from 'framer-motion';

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
    <section className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items && items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              <div className="p-6 relative z-10 -mt-16">
                {item.category && (
                  <span className="inline-block px-3 py-1 bg-indigo-900/60 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-700/50 uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                )}
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
