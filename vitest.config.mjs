import react from '@vitejs/plugin-react';
import reactNative from 'vitest-react-native';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [reactNative(), react()]
});
