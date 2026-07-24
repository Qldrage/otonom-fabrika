import React from 'react';

export interface FeatureItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface FeaturesBlockProps {
  title: string;
  subtitle?: string;
  features: FeatureItem[];
}

export function FeaturesBlock({ title, subtitle, features }: FeaturesBlockProps) {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-300">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features && features.map((feature, index) => (
            <div key={index} className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition duration-300">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 text-xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
