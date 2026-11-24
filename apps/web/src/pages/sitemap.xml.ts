import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { APIRoute } from "astro";

/** Public page modules at the pages root (home + case studies). */
const pageModules = import.meta.glob(["./*.{astro,mdx}"]);

/**
 * Always omit from the sitemap even when not marked noindex.
 * Thank-you is a post-submit page; keep it listed here explicitly.
 * (404 is also caught by the generic noindex check below.)
 */
const EXCLUDED = new Set(["thanks"]);

/**
 * Resolve page files from the web package root (`astro build` cwd), not
 * `import.meta.url` — Vite bundles this endpoint so that URL points at a
 * chunk under dist/, not src/pages/.
 */
const pagesDir = join(process.cwd(), "src/pages");

type SitemapEntry = { loc: string; lastmod: string | null };

function modulePathToEntry(
  modulePath: string,
  origin: string,
): SitemapEntry | null {
  const file = modulePath.replace(/^\.\//, "").replace(/\.(astro|mdx)$/, "");
  if (EXCLUDED.has(file)) return null;

  const absPath = join(pagesDir, modulePath.replace(/^\.\//, ""));
  if (declaresNoindex(absPath)) return null;

  const loc = file === "index" ? `${origin}/` : `${origin}/${file}`;
  return { loc, lastmod: lastmodFor(absPath) };
}

/**
 * True when the page source opts out of indexing.
 * - .mdx: YAML frontmatter `noindex: true`
 * - .astro: a `noindex` prop passed to the layout (bare or with a value)
 */
function declaresNoindex(absPath: string): boolean {
  let source: string;
  try {
    source = readFileSync(absPath, "utf8");
  } catch {
    return false;
  }

  if (absPath.endsWith(".mdx")) {
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return false;
    return /^noindex:\s*true\s*$/m.test(match[1]);
  }

  // Bare boolean prop (`noindex`) or valued (`noindex={...}` / `noindex="..."`).
  return /(?:^|\s)noindex(?:\s*=|\s*\/?>|\s*$)/m.test(source);
}

/**
 * Last git commit date for the page file (W3C YYYY-MM-DD), or null when git
 * history is unavailable (e.g. Docker/Railway images without `.git`). Do not
 * fall back to filesystem mtime or the build date — inaccurate lastmod values
 * are worse than omitting the element.
 */
function lastmodFor(absPath: string): string | null {
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
  return null;
}

function urlXml(entry: SitemapEntry): string {
  const lines = [`  <url>`, `    <loc>${entry.loc}</loc>`];
  if (entry.lastmod) {
    lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
  }
  lines.push(`  </url>`);
  return lines.join("\n");
}

/** Build-time static sitemap so crawlers get a fast XML response. */
export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL("https://janharkonen.fi")).origin;

  const entries = Object.keys(pageModules)
    .map((path) => modulePathToEntry(path, origin))
    .filter((entry): entry is SitemapEntry => entry !== null)
    .sort((a, b) => a.loc.localeCompare(b.loc));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(urlXml).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
