import type { APIRoute } from "astro";

/** Public page modules at the pages root (home + case studies). */
const pageModules = import.meta.glob(["./*.{astro,mdx}"]);

const EXCLUDED = new Set(["404", "thanks"]);

function modulePathToLoc(modulePath: string, origin: string): string | null {
  const file = modulePath.replace(/^\.\//, "").replace(/\.(astro|mdx)$/, "");
  if (EXCLUDED.has(file)) return null;
  if (file === "index") return `${origin}/`;
  return `${origin}/${file}`;
}

/** Build-time static sitemap so crawlers get a fast XML response. */
export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL("https://janharkonen.fi")).origin;

  const locs = Object.keys(pageModules)
    .map((path) => modulePathToLoc(path, origin))
    .filter((loc): loc is string => loc !== null)
    .sort((a, b) => a.localeCompare(b));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
