import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import './src/styles/global.css';

export default defineConfig({
  site: 'https://lexingtonthemes.com',
  integrations: [tailwind(), sitemap(), react()],
  output: 'server',
  adapter: vercel(),
});
