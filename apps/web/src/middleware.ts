import { createHash } from "node:crypto";
import { defineMiddleware } from "astro:middleware";

/**
 * Enforcing CSP for every Astro response.
 *
 * Runtime origins (audited from pages/components + Logo usages + `dist`):
 * - img: self, data:, plus picapi.janharkonen.fi (Jan's image API used
 *   on the homepage / branded_items for some logos)
 * - scripts: self only (processed page scripts are external /_astro/*.js
 *   via vite.build.assetsInlineLimit: 0; JSON-LD is a data block, not
 *   executed, so CSP does not need to allow it)
 * - styles: self + per-response sha256 hashes of any remaining inline
 *   <style> bodies (Astro Font @font-face). Component/Tailwind CSS ships
 *   as /_astro/*.css via build.inlineStylesheets: 'never'. No style=""
 *   attributes in the app; CSSOM writes from trusted scripts are fine.
 * - fonts: self (fontsource Inter via Astro Font, copied into /_astro)
 * - connect/form-action: self (contact form POSTs to /api/contact_web;
 *   Resend is server-side only)
 * - no iframes, embeds, analytics, or external fonts/scripts
 */
const CSP_BEFORE_STYLE_SRC = [
  "default-src 'self'",
  "script-src 'self'",
] as const;

const CSP_AFTER_STYLE_SRC = [
  "img-src 'self' data: https://picapi.janharkonen.fi",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
] as const;

/** Canonical public apex; www is 301'd here so search engines see one host. */
const CANONICAL_HOST = "janharkonen.fi";
const WWW_HOST = `www.${CANONICAL_HOST}`;

/** Baseline security headers other than CSP (CSP is built per response). */
const SECURITY_HEADERS: ReadonlyArray<readonly [string, string]> = [
  ["Strict-Transport-Security", "max-age=31536000; includeSubDomains"],
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Frame-Options", "DENY"],
  [
    "Permissions-Policy",
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  ],
];

const STYLE_ELEMENT_RE = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

/** CSP style-src hashes for each inline <style> element's text content. */
function styleSrcHashesFromHtml(html: string): string[] {
  const hashes = new Set<string>();
  for (const match of html.matchAll(STYLE_ELEMENT_RE)) {
    const content = match[1] ?? "";
    const digest = createHash("sha256").update(content, "utf8").digest("base64");
    hashes.add(`'sha256-${digest}'`);
  }
  return [...hashes];
}

function buildContentSecurityPolicy(styleHashes: readonly string[]): string {
  const styleSrc =
    styleHashes.length > 0
      ? `style-src 'self' ${styleHashes.join(" ")}`
      : "style-src 'self'";
  return [...CSP_BEFORE_STYLE_SRC, styleSrc, ...CSP_AFTER_STYLE_SRC].join("; ");
}

function applyBaselineSecurityHeaders(headers: Headers): void {
  for (const [name, value] of SECURITY_HEADERS) {
    if (!headers.has(name)) {
      headers.set(name, value);
    }
  }
}

/**
 * Prefer X-Forwarded-Host (proxy/CDN), then Host, then the URL host.
 * Lowercase and strip any port so comparisons stay exact.
 */
function requestHost(context: {
  request: Request;
  url: URL;
}): string {
  const forwarded = context.request.headers.get("x-forwarded-host");
  const raw =
    (forwarded?.split(",")[0]?.trim() ||
      context.request.headers.get("host") ||
      context.url.host ||
      "").trim();
  return raw.split(":")[0]?.toLowerCase() ?? "";
}

/**
 * Attach security headers to every response produced by the Astro server
 * (HTML pages, 404, and API routes). For text/html, buffer the body once to
 * hash inline <style> contents and set style-src without 'unsafe-inline'
 * (header rewrite only — body is returned unchanged).
 */
export const onRequest = defineMiddleware(async (context, next) => {
  // Only canonicalize www → apex; leave localhost / Railway / apex alone.
  if (requestHost(context) === WWW_HOST) {
    const location = `https://${CANONICAL_HOST}${context.url.pathname}${context.url.search}`;
    const headers = new Headers({ Location: location });
    applyBaselineSecurityHeaders(headers);
    headers.set(
      "Content-Security-Policy",
      buildContentSecurityPolicy([]),
    );
    return new Response(null, { status: 301, headers });
  }

  const response = await next();
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("text/html")) {
    applyBaselineSecurityHeaders(response.headers);
    if (!response.headers.has("Content-Security-Policy")) {
      response.headers.set(
        "Content-Security-Policy",
        buildContentSecurityPolicy([]),
      );
    }
    return response;
  }

  const html = await response.text();
  const styleHashes = styleSrcHashesFromHtml(html);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  applyBaselineSecurityHeaders(headers);
  headers.set("Content-Security-Policy", buildContentSecurityPolicy(styleHashes));

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
