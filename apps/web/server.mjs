/**
 * Production entry for the Node standalone build.
 *
 * `@astrojs/node` serves `dist/client` via `send` before SSR/middleware.
 * `send` defaults to `Cache-Control: public, max-age=0`, and the adapter only
 * upgrades `/{assetsDir}/*` (typically `/_astro/*`) to immutable. Cloudflare
 * then rewrites the remaining `max-age=0` responses to its Browser Cache TTL
 * (`public, max-age=14400`).
 *
 * Setting Cache-Control before the handler runs prevents `send` from writing
 * `max-age=0` (`send` only sets the header when absent). HTML, `/pdf/*`,
 * manifests, and text files are left alone.
 */
process.env.ASTRO_NODE_AUTOSTART = "disabled";

import http from "node:http";

const LONG_LIVED_STATIC = /\.(?:svg|png|webp|jpe?g|ico|woff2)$/i;

/** @param {string} pathname */
function cacheControlForPath(pathname) {
  if (pathname.startsWith("/_astro/")) {
    return "public, max-age=31536000, immutable";
  }
  if (pathname.startsWith("/pdf/")) {
    return undefined;
  }
  if (LONG_LIVED_STATIC.test(pathname)) {
    return "public, max-age=604800, stale-while-revalidate=86400";
  }
  return undefined;
}

/**
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 */
function applyCacheHeaders(req, res) {
  let pathname = (req.url ?? "").split("?")[0] ?? "";
  try {
    pathname = decodeURI(pathname);
  } catch {
    // Keep the raw path if decoding fails.
  }

  const value = cacheControlForPath(pathname);
  if (value) {
    res.setHeader("Cache-Control", value);
  }
}

const { handler } = await import("./dist/server/entry.mjs");

const port = Number(process.env.PORT) || 4321;
const host = process.env.HOST || "0.0.0.0";

http
  .createServer((req, res) => {
    applyCacheHeaders(req, res);
    handler(req, res);
  })
  .listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`);
  });
