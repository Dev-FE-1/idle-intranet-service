import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/idle-intranet-service/',
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_SERVER_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
