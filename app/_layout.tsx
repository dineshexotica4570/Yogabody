import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  if (!appIsReady) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="login" />
        )}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
