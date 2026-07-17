import node from "@astrojs/node";
// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  site: "https://janharkonen.fi",
  security: {
    // Trust Railway/Cloudflare forwarded headers so Origin (https)
    // matches Astro's request URL. Without this, form POSTs get 403.
    allowedDomains: [
      { hostname: "janharkonen.fi", protocol: "https" },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
