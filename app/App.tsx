import 'react-native-gesture-handler';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import { AuthProvider, useAuth } from './src/hooks/auth'
import { Routes } from './src/routes';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  const { userStoragedLoading } = useAuth();

  useEffect(() => {
    if (!fontsLoaded) {
      async function prepare() {
        try {
          // Artificially delay for two seconds to simulate a slow loading
          // experience. Please remove this if you copy and paste the code!
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.warn(e);
        } finally {
          setAppIsReady(true);
        }
      }
      prepare();
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || userStoragedLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onLayout={onLayoutRootView}>
        <LottieView autoPlay
          loop
          style={{
            width: 200,
            height: 200,
          }}
          source={require('./src/assets/lottie/Animated-Splash')}
        />
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {appIsReady &&
        <AuthProvider>
          <Routes />
        </AuthProvider>
      }
    </ThemeProvider>
  );
}

