import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/routes/app.routes';
import { StorageProvider } from './src/contexts/StorageContext';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';

const theme_paper = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
     ...DefaultTheme.colors,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: '#145BFC'
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StorageProvider>
        <ThemeProvider theme={theme}>
          <PaperProvider theme={theme_paper}>
            <AppRoutes/>
          </PaperProvider>
        </ThemeProvider>
      </StorageProvider>
    </NavigationContainer>
  );
}