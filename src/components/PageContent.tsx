import React, { ReactNode } from 'react';

interface PageContentProps {
  children: ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
} 