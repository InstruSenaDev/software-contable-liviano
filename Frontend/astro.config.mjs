import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import "./src/styles/global.css";
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';


export default defineConfig({

  site: 'https://lexingtonthemes.com',
  integrations: [tailwind(), sitemap(), react()],
  plugins: [react()],
  output: 'server',
  adapter: vercel(),

});
