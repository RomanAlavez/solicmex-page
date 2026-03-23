// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://solicmex.com',
  integrations: [react(),sitemap()],
  i18n:{
    defaultLocale: 'es',
    locales: [
      'es','en'
    ],
    routing:{
      prefixDefaultLocale: false,
    }
  }
});