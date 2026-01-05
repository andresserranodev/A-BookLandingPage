import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: process.env.NODE_ENV === 'production' ? "https://andresserranodev.github.io" : undefined,
  base: process.env.NODE_ENV === 'production' ? "/A-BookLandingPage" : undefined,
  integrations: [react(), tailwind()],
  vite: {
    build: {
      // Improve code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate React runtime
            'react-vendor': ['react', 'react-dom'],
            // Separate carousel (only loads when needed)
            'carousel': ['embla-carousel-react'],
          },
        },
      },
    },
  },
});
