import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  base: "/book_landing_page",
  integrations: [react(), tailwind()],

});
