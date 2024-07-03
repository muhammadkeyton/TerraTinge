'use client'

import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of your context state
interface NavigationState {
  currentState: string;
  setCurrentState: (state: string) => void;
}

// Create the context with default values
export const PartnerNavigationContext = createContext<NavigationState>({
  currentState: '',
  setCurrentState: () => {},
});

// Create a provider component
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentState, setCurrentState] = useState<string>('PromoCodes');

  return (
    <PartnerNavigationContext.Provider value={{ currentState, setCurrentState }}>
      {children}
    </PartnerNavigationContext.Provider>
  );
};