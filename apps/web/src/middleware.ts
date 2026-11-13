import { defineMiddleware } from "astro:middleware";

/**
 * Enforcing CSP for every Astro response.
 *
 * Runtime origins (audited from pages/components + Logo usages + `dist`):
 * - img: self, data:, plus remote logo/screenshot hosts used by
 *   branded_items / MDX (picapi, ufs.sh, stackshare, icons8, npmmirror,
 *   gstatic, pandas, wikimedia, githubusercontent, wingware)
 * - scripts/styles: self + unsafe-inline (JSON-LD, homepage inline
 *   <script type="module">, Astro Font @font-face <style>)
 * - fonts: self (fontsource Inter via Astro Font, copied into /_astro)
 * - connect/form-action: self (contact form POSTs to /api/contact_web;
 *   Resend is server-side only)
 * - no iframes, embeds, analytics, or external fonts/scripts
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://picapi.janharkonen.fi https://i4ndcxhbcg.ufs.sh https://img.stackshare.io https://img.icons8.com https://registry.npmmirror.com https://encrypted-tbn0.gstatic.com https://pandas.pydata.org https://upload.wikimedia.org https://user-images.githubusercontent.com https://wingware.com",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** Baseline security headers for every Astro response. */
const SECURITY_HEADERS: ReadonlyArray<readonly [string, string]> = [
  ["Strict-Transport-Security", "max-age=31536000; includeSubDomains"],
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Frame-Options", "DENY"],
  ["Content-Security-Policy", CONTENT_SECURITY_POLICY],
  [
    "Permissions-Policy",
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  ],
];

/**
 * Attach security headers to every response produced by the Astro server
 * (HTML pages, 404, and API routes). Skips a header when the response
 * already has that name so we never overwrite a more specific value.
 */
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();

  for (const [name, value] of SECURITY_HEADERS) {
    if (!response.headers.has(name)) {
      response.headers.set(name, value);
    }
  }

  return response;
});
