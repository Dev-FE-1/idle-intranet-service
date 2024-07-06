import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/idle-intranet-service/',
  server: {
    proxy: {
      '/api': {
        target: process.env.SERVER_URL || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
