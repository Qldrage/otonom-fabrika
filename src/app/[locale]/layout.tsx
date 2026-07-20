import React from "react";
import Header from "../../components/Header";
import "../globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "tr";

  return (
    <html lang={locale}>
      <body className="antialiased min-h-screen bg-zinc-950 text-zinc-50 font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
