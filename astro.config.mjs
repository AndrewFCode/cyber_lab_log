import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { codeCopyPlugin } from './src/lib/code-copy-plugin.ts';

// Replace `USERNAME` once the GitHub Pages repo exists. Keeping the repo named
// `USERNAME.github.io` is what lets `base` stay at the default `/`.
export default defineConfig({
  site: 'https://USERNAME.github.io',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  markdown: {
    processor: satteri({
      hastPlugins: [codeCopyPlugin()],
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
