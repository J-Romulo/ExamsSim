import { useContext } from 'react';

import { ColorThemeContext } from '../contexts/ColorThemeContext';

export function useColorMode() {
  const context = useContext(ColorThemeContext);

  return context;
}
