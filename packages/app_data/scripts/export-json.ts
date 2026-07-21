// Exports the shared portfolio data to dist/data.json for consumers that
// can't import TypeScript (the Go TUI embeds this file via go:embed).
// The committed copy at apps/tui/data/data.json is regenerated on every build.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { brandedItems, type BrandedItemKey } from "../branded_items";
import { coreStack } from "../core_stack";
import { educations } from "../education";
import { experiences } from "../experience";
import { profile } from "../profile";
import { projects } from "../projects";

const SITE = "https://janharkonen.fi";

function displayNames(keys: BrandedItemKey[]): string[] {
  return keys.map((key) => brandedItems[key].displayName);
}

// Emoji (e.g. the 🇫🇮 flag's regional-indicator pair) have unreliable cell
// widths in terminals and break box alignment in the TUI.
function stripEmoji(value: string): string {
  return value
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}]/gu, "")
    .trim();
}

function absolutize(url: string): string {
  return url.startsWith("/") ? `${SITE}${url}` : url;
}

const data = {
  profile: {
    name: profile.name,
    role: profile.role,
    location: stripEmoji(profile.location),
    line: profile.line,
    email: profile.email,
    phone: profile.phone,
    github: profile.github,
    linkedin: profile.linkedin,
    scholar: profile.scholar,
    cv: absolutize(profile.cv),
  },
  coreStack: displayNames(coreStack),
  experience: experiences.map(
    ({ role, company, period, description, tech }) => ({
      role,
      company,
      period,
      description,
      tech: displayNames(tech),
    }),
  ),
  education: educations.map(({ degree, school, period, description }) => ({
    degree,
    school,
    period,
    description,
  })),
  projects: projects.map(({ name, year, description, tech, featured }) => ({
    name,
    year,
    description,
    tech: displayNames(tech),
    featured,
  })),
};

const outFile = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "dist",
  "data.json",
);
await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, JSON.stringify(data, null, 2) + "\n");
console.log(`Wrote ${outFile}`);
