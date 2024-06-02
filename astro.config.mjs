import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import playformFormat from "@playform/format";
import playformInline from "@playform/inline";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), svelte(), tailwind(), playformCompress(), playformFormat(), playformInline(), icon(), robotsTxt()],
  output: "server",
  adapter: netlify()
});