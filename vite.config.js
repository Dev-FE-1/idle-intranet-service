import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  base: '/idle-intranet-service/',
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_SERVER_URL || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
