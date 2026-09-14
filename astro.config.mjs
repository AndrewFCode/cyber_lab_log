import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Replace `USERNAME` once the GitHub Pages repo exists. Keeping the repo named
// `USERNAME.github.io` is what lets `base` stay at the default `/`.
export default defineConfig({
  site: 'https://USERNAME.github.io',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
