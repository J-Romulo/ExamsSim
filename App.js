import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { ThemeProvider } from 'styled-components';

import { ColorThemeProvider } from './src/contexts/ColorThemeContext';
import { DialogModalProvider } from './src/contexts/DialogModalContext';
import { StorageProvider } from './src/contexts/StorageContext/StorageContext';
import { lightTheme, darkTheme } from './src/global/styles/theme';
import AppRoutes from './src/routes/app.routes';

const theme_paper = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  ...DefaultTheme.colors,
};

export default function App() {
  const defaultTheme = useColorScheme();
  const [theme, setTheme] = useState(defaultTheme ?? 'light');

  async function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    await AsyncStorage.setItem('@theme', newTheme);
    setTheme(newTheme);
  }

  const themed_paper = {
    ...theme_paper,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      primary: theme === 'light' ? '#095FD9' : '#838998',
    },
  };

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem('@theme');

      if (savedTheme) setTheme(savedTheme);
    })();

    return () => {};
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StorageProvider>
        <ColorThemeProvider toggleTheme={toggleTheme} theme={theme}>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <PaperProvider theme={themed_paper}>
              <DialogModalProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <AppRoutes />
                </GestureHandlerRootView>
              </DialogModalProvider>
            </PaperProvider>
          </ThemeProvider>
        </ColorThemeProvider>
      </StorageProvider>
    </NavigationContainer>
  );
}
