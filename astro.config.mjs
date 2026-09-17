import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { codeCopyPlugin } from './src/lib/code-copy-plugin.ts';
import { imageBasePlugin } from './src/lib/image-base-plugin.ts';

// GitHub Pages project site: https://andrewfcode.github.io/cyber_lab_log/
const siteBase = '/cyber_lab_log';

export default defineConfig({
  site: 'https://andrewfcode.github.io',
  base: siteBase,
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/og/') && !page.includes('/404'),
    }),
  ],
  markdown: {
    processor: satteri({
      hastPlugins: [codeCopyPlugin(), imageBasePlugin(siteBase)],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
