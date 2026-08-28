import node from "@astrojs/node";
import mdx from "@astrojs/mdx";
// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [mdx()],
  site: "https://janharkonen.fi",
  security: {
    // Trust Railway/Cloudflare forwarded headers so Origin (https)
    // matches Astro's request URL. Without this, form POSTs get 403.
    allowedDomains: [{ hostname: "janharkonen.fi", protocol: "https" }],
  },
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.fontsource(),
      weights: ["100 900"], // variable range; page uses 300–900 (extrabold/black)
      styles: ["normal"],
      subsets: ["latin", "latin-ext"], // Härkönen / Finnish
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
