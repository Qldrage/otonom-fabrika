'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export interface ContactBlockProps {
  title: string;
  address: string;
  phone: string;
  email?: string;
}

export function ContactBlock({ title, address, phone, email }: ContactBlockProps) {
  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {title}
              </h2>
              <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                Bize ulaşın, en uygun fiyat ve ücretsiz keşif hizmetimizle yardımcı olalım.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-900/50 border border-indigo-700/50 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Telefon</p>
                  <p className="text-lg font-bold text-white mt-0.5">{phone}</p>
                </div>
              </div>

              {email && (
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-purple-900/50 border border-purple-700/50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">E-posta</p>
                    <p className="text-lg font-bold text-white mt-0.5">{email}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Adres</p>
                  <p className="text-base font-medium text-slate-200 mt-0.5">{address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-950/80 backdrop-blur-2xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6"
          >
            <h3 className="text-2xl font-bold text-white">Hızlı İletişim Formu</h3>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label htmlFor="full-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="full-name"
                  required
                  placeholder="Ahmet Yılmaz"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div>
                <label htmlFor="phone-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Telefon Numaranız *
                </label>
                <input
                  type="tel"
                  id="phone-input"
                  required
                  placeholder="0555 123 45 67"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>İletişim Talebi Gönder</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
