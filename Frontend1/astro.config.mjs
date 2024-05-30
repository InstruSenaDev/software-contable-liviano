import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import "./src/styles/global.css"
export default defineConfig({


  site: 'https://lexingtonthemes.com',
  integrations: [tailwind(), sitemap()]
});