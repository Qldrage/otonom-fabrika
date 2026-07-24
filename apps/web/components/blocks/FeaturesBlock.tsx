'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, ThumbsUp, Star, Zap, CheckCircle2 } from 'lucide-react';

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

const iconMap: Record<string, any> = {
  shield: ShieldCheck,
  award: Award,
  thumbs: ThumbsUp,
  star: Star,
  zap: Zap,
  default: CheckCircle2,
};

export function FeaturesBlock({ title, subtitle, features }: FeaturesBlockProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features && features.map((feature, index) => {
            const IconComponent = iconMap[feature.iconName?.toLowerCase() || ''] || iconMap.default;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-slate-800/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/60 hover:border-indigo-500/80 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
