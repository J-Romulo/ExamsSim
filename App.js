import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { ThemeProvider } from 'styled-components';

import { ColorThemeProvider } from './src/contexts/ColorThemeContext';
import { DialogModalProvider } from './src/contexts/DialogModalContext';
import { StorageProvider } from './src/contexts/StorageContext';
import { lightTheme, darkTheme } from './src/global/styles/theme';
import { useColorMode } from './src/hooks/useColorMode';
import AppRoutes from './src/routes/app.routes';

const theme_paper = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  ...DefaultTheme.colors,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: '#145BFC',
  },
};

export default function App() {
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StorageProvider>
        <ColorThemeProvider toggleTheme={toggleTheme}>
          <DialogModalProvider>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
              <PaperProvider theme={theme_paper}>
                <AppRoutes />
              </PaperProvider>
            </ThemeProvider>
          </DialogModalProvider>
        </ColorThemeProvider>
      </StorageProvider>
    </NavigationContainer>
  );
}
