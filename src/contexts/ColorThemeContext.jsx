import React, { createContext } from 'react';

export const ColorThemeContext = createContext({});

export function ColorThemeProvider({ children, toggleTheme }) {
  return (
    <ColorThemeContext.Provider
      value={{
        toggleTheme,
      }}>
      {children}
    </ColorThemeContext.Provider>
  );
}
