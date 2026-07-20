import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-zinc-50 text-zinc-900 transition-all duration-300 ease-out">
      {/* Sidebar */}
      <aside 
        role="navigation" 
        aria-label="Sidebar"
        className="w-64 flex-shrink-0 border-r border-zinc-200/50 bg-white shadow-sm transition-all duration-300 ease-out"
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold tracking-tight">App Name</h2>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-out">
        {/* Header */}
        <header 
          role="banner" 
          aria-label="Header"
          className="flex h-16 flex-shrink-0 items-center border-b border-zinc-200/50 bg-white px-6 shadow-sm transition-all duration-300 ease-out"
        >
          <h1 className="text-xl font-medium tracking-tight">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-sm border border-zinc-200/50 transition-all duration-300 ease-out">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
