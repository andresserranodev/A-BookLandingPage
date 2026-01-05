import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: process.env.NODE_ENV === 'production' ? "https://andresserranodev.github.io" : undefined,
  base: process.env.NODE_ENV === 'production' ? "/A-BookLandingPage" : undefined,
  integrations: [react(), tailwind()],

});
