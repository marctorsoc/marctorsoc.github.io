import React, { createContext, useContext, useState } from 'react';

interface HeaderIndexContextType {
  getNextIndex: () => number;
  reset: () => void;
}

const HeaderIndexContext = createContext<HeaderIndexContextType | null>(null);

export function HeaderIndexProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getNextIndex = () => {
    const index = currentIndex;
    setCurrentIndex(prev => prev + 1);
    return index;
  };

  const reset = () => setCurrentIndex(0);

  return (
    <HeaderIndexContext.Provider value={{ getNextIndex, reset }}>
      {children}
    </HeaderIndexContext.Provider>
  );
}

export function useHeaderIndex() {
  const context = useContext(HeaderIndexContext);
  if (!context) {
    throw new Error('useHeaderIndex must be used within a HeaderIndexProvider');
  }
  return context;
}
