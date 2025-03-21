import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    commonjsOptions: {
      include: []
    }
  },
  // Skip parent directory config files
  configFile: false,
  envFile: false
});
