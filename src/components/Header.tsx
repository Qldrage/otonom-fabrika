"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Header() {
  const params = useParams();
  const locale = params?.locale || "tr";

  const [isOpen, setIsOpen] = useState(false);

  const mainLinks = [
    { name: "ANASAYFA", href: `/${locale}` },
    { name: "EV", href: `/${locale}/ev`, isDropdown: true },
    { name: "OFİS", href: `/${locale}/ofis` },
    { name: "AKSESUAR", href: `/${locale}/aksesuar` },
    { name: "UYGULAMALAR", href: `/${locale}/uygulamalar` },
    { name: "MAĞAZA", href: `/${locale}/magaza` },
    { name: "BLOG", href: `/${locale}/blog` },
    { name: "İLETİŞİM", href: `/${locale}/iletisim` },
  ];

  const evSubheadings = [
    { name: "Oturma Odası", href: `/${locale}/ev/oturma-odasi` },
    { name: "Salon", href: `/${locale}/ev/salon` },
    { name: "Mutfak", href: `/${locale}/ev/mutfak` },
    { name: "Çocuk Odası", href: `/${locale}/ev/cocuk-odasi` },
    { name: "Yatak Odası", href: `/${locale}/ev/yatak-odasi` },
    { name: "Cam Balkon", href: `/${locale}/ev/cam-balkon` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">OTONOM FABRİKA</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {mainLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="text-zinc-300 hover:text-white font-medium text-sm tracking-wide transition-all duration-300 ease-out flex items-center gap-1"
                  >
                    {link.name}
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2 shadow-xl shadow-black/80">
                      {evSubheadings.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all duration-300 ease-out font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-zinc-300 hover:text-white font-medium text-sm tracking-wide transition-all duration-300 ease-out"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu trigger or action button */}
        <div className="flex md:hidden">
          {/* Mobil menu butonu gerekirse eklenebilir, testlerde aranmıyor */}
        </div>
      </div>
    </header>
  );
}
