import type { BrandedItemKey } from "./branded_items";

export type Project = {
  name: string;
  year: string;
  description: string;
  tech: BrandedItemKey[];
  initiallyHidden: boolean;
};

export const projects: Project[] = [
  {
    name: "SyncSpace",
    year: "2025",
    description:
      "Simple list+checkbox based tool for collaborative task management with real-time synchronization",
    tech: ["NEXTJS", "CONVEX", "CLERK", "DOCKER", "HETZNER"],
    initiallyHidden: false,
  },
  {
    name: "Piggybank",
    year: "2025",
    description: "Personal finance tracker",
    tech: ["NEXTJS", "CONVEX", "GOLANG", "NEON", "POSTGRESQL"],
    initiallyHidden: false,
  },
  {
    name: "ÉclairDB",
    year: "2025",
    description:
      "Lightning-fast PostgreSQL database exploration with intuitive search and filtering capabilities",
    tech: ["VUE", "GOLANG", "GITHUBACTIONS", "AWS"],
    initiallyHidden: false,
  },
  {
    name: "One source of truth",
    year: "2025",
    description: "A tool to search and filter a vast array of products blazingly fast",
    tech: ["NEXTJS", "GOLANG", "REDIS", "LUA", "DOCKER", "HETZNER"],
    initiallyHidden: false,
  },
  {
    name: "cdx",
    year: "2025",
    description: "Bash CLI tool to cd into directories 10x faster",
    tech: ["BASH"],
    initiallyHidden: false,
  },
  {
    name: "PICAPI",
    year: "2025",
    description:
      "API for manipulating images directly from URL parameters + platform to save own pictures in the cloud",
    tech: ["VANILLAJS", "PYTHON", "SQLITE", "HETZNER"],
    initiallyHidden: false,
  },
  {
    name: "Progress tracker",
    year: "2025",
    description:
      "Web application to track the progress level of listed items for each user in real time using websockets",
    tech: ["SVELTE", "BUN", "REDIS", "DOCKER", "GITHUBACTIONS", "AZURE"],
    initiallyHidden: false,
  },
  {
    name: "Offer generator",
    year: "2024–2025",
    description:
      "Product data synchronization and sales processes automation tool as a web app aimed at small businesses",
    tech: ["REACT", "PYTHON", "POSTGRESQL", "DOCKER", "HETZNER"],
    initiallyHidden: false,
  },
  {
    name: "Portfolio site",
    year: "2024–2025",
    description: "This very website. A personal full stack developer portfolio",
    tech: ["ASTRO", "TAILWIND"],
    initiallyHidden: false,
  },
  {
    name: "Progress tracker",
    year: "2021",
    description: "Mobile application progress tracker",
    tech: ["JAVA"],
    initiallyHidden: false,
  },
  {
    name: "Lens and mirror simulator",
    year: "2015",
    description:
      "Desktop GUI for simulating the trajectory of a laser beam through curved lenses and mirrors",
    tech: ["PYTHON"],
    initiallyHidden: false,
  },
];

export default projects;
