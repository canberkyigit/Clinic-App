import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const theme = {
  colors: {
    background: ['#1a2b1e', '#16281e', '#0a0f0c'],
    card: '#181f1a',
    primary: '#6fff8a',
    text: '#fff',
    subtext: '#b0b0b0',
    accent: '#1a2b1e',
    border: '#222',
  },
};

export default function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
} 