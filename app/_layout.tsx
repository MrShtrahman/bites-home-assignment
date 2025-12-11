import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { hydrateCartRequest } from './_features/cart/cartSlice';
import { store } from './_store';
import { useAppDispatch } from './_store/hooks';
import { ThemeProvider } from './_theme';

const InitialSetup = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateCartRequest());
  }, [dispatch]);

  return null;
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  
  return (
    <Provider {...{ store }}>
      <ThemeProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <InitialSetup />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
};

export default RootLayout;