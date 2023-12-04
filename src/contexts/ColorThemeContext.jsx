import React, { createContext } from 'react';

export const ColorThemeContext = createContext({});

export function ColorThemeProvider({ children, toggleTheme, theme }) {
  return (
    <ColorThemeContext.Provider
      value={{
        toggleTheme,
        theme,
      }}>
      {children}
    </ColorThemeContext.Provider>
  );
}
