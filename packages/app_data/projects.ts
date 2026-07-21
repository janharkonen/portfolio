import type { BrandedItemKey } from "./branded_items";

export type Project = {
  name: string;
  imageUrl: string;
  year: string;
  description: string;
  tech: BrandedItemKey[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    name: "HSL real time",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/2d0e98319f9f42428c86b2d9cf7eb868.png",
    year: "2026",
    description: "Real-time vehicle locations for Helsinki public transport.",
    tech: ["REACT", "VERCEL"],
    featured: false,
  },
  {
    name: "Speed reader",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/da64d53faf44458eb2d7f08676f05965.png",
    year: "2026",
    description:
      "A lightweight .epub ebook reader with RSVP (Rapid Serial Visual Presentation) capability.",
    tech: ["REACT", "VERCEL"],
    featured: false,
  },
  {
    name: "Wedding site",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/b8afaef81dd542f18eccb28a3a930315.png",
    year: "2026",
    description:
      "Wedding site to inform guests about the wedding details. Includes schedule, sign-up, and other information as well as a photo album",
    tech: ["REACT", "TANSTACK_ROUTER", "BUN", "CONVEX", "VERCEL", "R2"],
    featured: false,
  },
  {
    name: "Secure receipt share",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/9140b5ac8a4240aeb5845e88d05a2c1f.png",
    year: "2026",
    description: "Secure way to share receipts with colleagues.",
    tech: ["TANSTACK_START", "REACT", "BUN", "CONVEX", "BETTERAUTH", "RAILWAY"],
    featured: false,
  },
  {
    name: "AI traveling search engine",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/b0392792a586411ba877c3fa7b18727c.png",
    year: "2025",
    description:
      "AI-powered search engine for Finnish travel destinations with customizable filters and sorting options using RAG-pipeline",
    tech: [
      "TANSTACK_START",
      "REACT",
      "BUN",
      "PYTHON",
      "POSTGRESQL",
      "BETTERAUTH",
      "RAILWAY",
    ],
    featured: true,
  },
  {
    name: "Trip planner",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/2214f68ddb044c35acf74d0f56237128.png",
    year: "2025",
    description:
      "Website for travel details of a 3-day trip for 60 people. Time-table, relevant links and FAQ.",
    tech: ["NEXTJS", "BUN", "CONVEX", "VERCEL"],
    featured: false,
  },
  {
    name: "SyncSpace",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/743aaa9e749842d589d26abf4cfef026.png",
    year: "2025",
    description:
      "Simple list+checkbox based tool for collaborative task management with real-time synchronization",
    tech: ["NEXTJS", "CONVEX", "CLERK", "VERCEL"],
    featured: true,
  },
  {
    name: "Piggybank",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/1d4685d428ef40e88362bf6fff5e2883.png",
    year: "2025",
    description: "Personal finance tracker",
    tech: ["NEXTJS", "CONVEX", "GOLANG", "NEON_OLD", "POSTGRESQL"],
    featured: false,
  },
  {
    name: "ÉclairDB",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/dfc3ddcb9eb44c1ab760920c4d36610a.png",
    year: "2025",
    description:
      "Lightning-fast PostgreSQL database exploration with intuitive search and filtering capabilities",
    tech: ["VUE", "GOLANG", "GITHUBACTIONS", "AWS"],
    featured: true,
  },
  {
    name: "One source of truth",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/3a055a19c26743a2a2fc18bf41b41cbf.png",
    year: "2025",
    description:
      "A tool to search and filter a vast array of products blazingly fast",
    tech: ["NEXTJS", "GOLANG", "REDIS", "LUA", "DOCKER", "HETZNER"],
    featured: true,
  },
  {
    name: "cdx",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/e7d1b08fd20847abb202b427a8e8f2ba.png",
    year: "2025",
    description: "Bash CLI tool to cd into directories 10x faster",
    tech: ["BASH"],
    featured: false,
  },
  {
    name: "PICAPI",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/d40795b1bb8b4987b965e11d241bbf78.png",
    year: "2025",
    description:
      "API for manipulating images directly from URL parameters + platform to save own pictures in the cloud",
    tech: ["VANILLAJS", "PYTHON", "SQLITE", "HETZNER"],
    featured: true,
  },
  {
    name: "Progress tracker",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/6cbf8b836d0c4d3c89c2c4d23dba1281.png",
    year: "2025",
    description:
      "Web application to track the progress level of listed items for each user in real time using websockets",
    tech: ["SVELTE", "BUN", "REDIS", "DOCKER", "GITHUBACTIONS", "AZURE"],
    featured: false,
  },
  {
    name: "Offer generator",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/3f7e838a1aad493ab7f7176bbb203620.png?BGc=grey&BG=120",
    year: "2024–2025",
    description:
      "Product data synchronization and sales processes automation tool as a web app aimed at small businesses",
    tech: ["REACT", "PYTHON", "POSTGRESQL", "DOCKER", "HETZNER"],
    featured: true,
  },
  {
    name: "Portfolio site",
    year: "2024–2026",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/8a9385dbafde4f59869a97005b571241.png",
    description: "This very website. A personal full stack developer portfolio",
    tech: ["ASTRO", "TAILWIND", "RAILWAY"],
    featured: false,
  },
  {
    name: "Progress tracker",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/4f345e3cad804de5b8dd7cb204aa99ad.png",
    year: "2021",
    description: "Mobile application progress tracker",
    tech: ["JAVA"],
    featured: false,
  },
  {
    name: "Lens and mirror simulator",
    imageUrl:
      "https://picapi.janharkonen.fi/api/pics/2dce025429824c5595654267c848d3de.png",
    year: "2015",
    description:
      "Desktop GUI for simulating the trajectory of a laser beam through curved lenses and mirrors",
    tech: ["PYTHON"],
    featured: false,
  },
];

export default projects;
