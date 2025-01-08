import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-black shadow-md">
        <nav className="sticky top-0 z-50 bg-gradient-to-b from-white to-white/95 dark:from-black dark:to-black/95 shadow-lg backdrop-blur-sm">
          <Navigation />
        </nav>
      </div>
      <main>
        {children}
      </main>
    </div>
  );
} 