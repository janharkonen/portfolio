import { defineMiddleware } from "astro:middleware";

/** Baseline security headers for every Astro response. */
const SECURITY_HEADERS: ReadonlyArray<readonly [string, string]> = [
  ["Strict-Transport-Security", "max-age=31536000; includeSubDomains"],
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Frame-Options", "DENY"],
  // frame-ancestors only — do not add script-src/style-src (inline scripts,
  // islands, JSON-LD, and font-face styles would break under a full CSP).
  ["Content-Security-Policy", "frame-ancestors 'none'"],
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
