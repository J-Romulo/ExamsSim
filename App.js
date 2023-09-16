import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/routes/app.routes';
import { StorageProvider } from './src/contexts/StorageContext';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StorageProvider>
        <AppRoutes/>
      </StorageProvider>
    </NavigationContainer>
  );
}