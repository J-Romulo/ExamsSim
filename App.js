import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { ThemeProvider } from 'styled-components';

import { DialogModalProvider } from './src/contexts/DialogModalContext';
import { StorageProvider } from './src/contexts/StorageContext';
import theme from './src/global/styles/theme';
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
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StorageProvider>
        <DialogModalProvider>
          <ThemeProvider theme={theme}>
            <PaperProvider theme={theme_paper}>
              <AppRoutes />
            </PaperProvider>
          </ThemeProvider>
        </DialogModalProvider>
      </StorageProvider>
    </NavigationContainer>
  );
}
