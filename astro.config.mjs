// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Repo is named AndrewFCode.github.io, so the site is served from the
  // domain root and needs no `base` prefix on internal links.
  site: 'https://andrewfcode.github.io',
  vite: {
    plugins: [tailwindcss()]
  }
});
