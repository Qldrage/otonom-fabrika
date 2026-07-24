export interface ContactBlockProps {
  title: string;
  address: string;
  phone: string;
  email?: string;
}

export function ContactBlock({ title, address, phone, email }: ContactBlockProps) {
  return (
    <section id="contact" className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {title}
            </h2>
            <div className="mt-3">
              <p className="text-lg text-gray-500">
                Bize ulaşın, evinize en uygun perdeleri birlikte seçelim.
              </p>
            </div>
            <div className="mt-9">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>{phone}</p>
                </div>
              </div>
              {email && (
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500">
                    <p>{email}</p>
                  </div>
                </div>
              )}
              <div className="mt-6 flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>{address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 md:mt-0">
            {/* Otonom Fabrika kuralı: İleride Sokratik form veya CRM Webhook entegre edilecek */}
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              İletişim Formu
            </h2>
            <form className="mt-9 grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">İsim Soyisim</label>
                <div className="mt-1">
                  <input type="text" name="full-name" id="full-name" autoComplete="name" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon</label>
                <div className="mt-1">
                  <input type="text" name="phone" id="phone" autoComplete="tel" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <button type="submit" className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
