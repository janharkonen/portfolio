import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { join } from "node:path";
import type { APIRoute } from "astro";

/** Public page modules at the pages root (home + case studies). */
const pageModules = import.meta.glob(["./*.{astro,mdx}"]);

/** Not indexable: error page and post-submit thank-you. API routes live under ./api/. */
const EXCLUDED = new Set(["404", "thanks"]);

/**
 * Resolve page files from the web package root (`astro build` cwd), not
 * `import.meta.url` — Vite bundles this endpoint so that URL points at a
 * chunk under dist/, not src/pages/.
 */
const pagesDir = join(process.cwd(), "src/pages");

/** Build calendar day used when neither git nor filesystem mtime is available. */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

function modulePathToEntry(
  modulePath: string,
  origin: string,
): { loc: string; lastmod: string } | null {
  const file = modulePath.replace(/^\.\//, "").replace(/\.(astro|mdx)$/, "");
  if (EXCLUDED.has(file)) return null;

  const loc = file === "index" ? `${origin}/` : `${origin}/${file}`;
  const absPath = join(pagesDir, modulePath.replace(/^\.\//, ""));
  return { loc, lastmod: lastmodFor(absPath) };
}

/**
 * Prefer the page file's last git commit date (W3C YYYY-MM-DD).
 * Docker/Railway builds copy sources without `.git`, so fall back to
 * filesystem mtime, then the build calendar day.
 */
function lastmodFor(absPath: string): string {
  try {
    const date = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", absPath],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
        cwd: process.cwd(),
      },
    ).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  } catch {
    // No git, shallow history without this path, or git unavailable in image.
  }

  try {
    return statSync(absPath).mtime.toISOString().slice(0, 10);
  } catch {
    return BUILD_DATE;
  }
}

/** Build-time static sitemap so crawlers get a fast XML response. */
export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL("https://janharkonen.fi")).origin;

  const entries = Object.keys(pageModules)
    .map((path) => modulePathToEntry(path, origin))
    .filter((entry): entry is { loc: string; lastmod: string } => entry !== null)
    .sort((a, b) => a.loc.localeCompare(b.loc));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
