import type { BrandedItemKey } from "./branded_items";

export type Project = {
  name: string;
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  year: string;
  description: string;
  tech: BrandedItemKey[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    name: "LINJA",
    imageUrl: "/projects/linja-2026.webp",
    projectUrl: "https://linja.ai",
    year: "2026",
    description:
      "AI-powered tool for managing live music events. Includes artist, event and venue management as well as ticket sales.",
    tech: [
      "TANSTACK_START",
      "REACT",
      "CONVEX",
      "BETTERAUTH",
      "RESEND",
      "RAILWAY",
      "STRIPE",
      "SUPABASE",
    ],
    featured: true,
  },
  {
    name: "HSL real time",
    imageUrl: "/projects/hsl-real-time-2026.webp",
    projectUrl: "https://hslrealtime.pionblanc.fi",
    year: "2026",
    description: "Real-time vehicle locations for Helsinki public transport.",
    tech: ["REACT", "VERCEL"],
    featured: false,
  },
  {
    name: "Speed reader",
    imageUrl: "/projects/speed-reader-2026.webp",
    projectUrl: "https://speedread.pionblanc.fi",
    year: "2026",
    description:
      "A lightweight .epub ebook reader with RSVP (Rapid Serial Visual Presentation) capability.",
    tech: ["REACT", "VERCEL"],
    featured: false,
  },
  {
    name: "Wedding site",
    imageUrl: "/projects/wedding-site-2026.webp",
    year: "2026",
    description:
      "Wedding site to inform guests about the wedding details. Includes schedule, sign-up, and other information as well as a photo album",
    tech: ["REACT", "TANSTACK_ROUTER", "BUN", "CONVEX", "VERCEL", "R2"],
    featured: false,
  },
  {
    name: "matkalla.kotimaassa.fi",
    imageUrl: "/projects/kotimaassa-fi-2025-2026.webp",
    projectUrl: "https://matkalla.kotimaassa.fi",
    year: "2025-2026",
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
    name: "TUI portfolio",
    imageUrl: "/projects/tui-portfolio-2026.webp",
    year: "2026",
    description:
      "Terminal twin of this porfolio site (ssh terminal.janharkonen.fi).",
    tech: ["GOLANG", "BUBBLETEA", "HETZNER"],
    featured: true,
  },
  {
    name: "Secure receipt share",
    imageUrl: "/projects/secure-receipt-share-2026.webp",
    projectUrl: "https://securereceiptshare.janharkonen.fi",
    year: "2026",
    description: "Secure way to share receipts with colleagues.",
    tech: ["TANSTACK_START", "REACT", "BUN", "CONVEX", "BETTERAUTH", "RAILWAY"],
    featured: false,
  },
  {
    name: "Trip planner",
    imageUrl: "/projects/trip-planner-2025.webp",
    year: "2025",
    description:
      "Website for travel details of a 3-day trip for 60 people. Time-table, relevant links and FAQ.",
    tech: ["NEXTJS", "BUN", "CONVEX", "VERCEL"],
    featured: false,
  },
  {
    name: "SyncSpace",
    imageUrl: "/projects/syncspace-2025.webp",
    projectUrl: "https://syncspace.janharkonen.fi",
    year: "2025",
    description:
      "Simple list+checkbox based tool for collaborative task management with real-time synchronization",
    tech: ["NEXTJS", "CONVEX", "CLERK", "VERCEL"],
    featured: true,
  },
  {
    name: "Piggybank",
    imageUrl: "/projects/piggybank-2025.webp",
    year: "2025",
    description: "Personal finance tracker",
    tech: ["NEXTJS", "CONVEX", "GOLANG", "NEON_OLD", "POSTGRESQL"],
    featured: false,
  },
  {
    name: "ÉclairDB",
    imageUrl: "/projects/eclairdb-2025.webp",
    year: "2025",
    description:
      "Lightning-fast PostgreSQL database exploration with intuitive search and filtering capabilities",
    tech: ["VUE", "GOLANG", "GITHUBACTIONS", "AWS"],
    featured: false,
  },
  {
    name: "One source of truth",
    imageUrl: "/projects/one-source-of-truth-2025.webp",
    year: "2025",
    description:
      "A tool to search and filter a vast array of products blazingly fast",
    tech: ["NEXTJS", "GOLANG", "REDIS", "LUA", "DOCKER", "HETZNER"],
    featured: false,
  },
  {
    name: "cdx",
    imageUrl: "/projects/cdx-2025.webp",
    githubUrl: "https://github.com/janharkonen/cdx",
    year: "2025",
    description: "Bash CLI tool to cd into directories 10x faster",
    tech: ["BASH"],
    featured: false,
  },
  {
    name: "PICAPI",
    imageUrl: "/projects/picapi-2025.webp",
    projectUrl: "https://picapi.janharkonen.fi",
    year: "2025",
    description:
      "API for manipulating images directly from URL parameters + platform to save own pictures in the cloud",
    tech: ["VANILLAJS", "PYTHON", "SQLITE", "HETZNER"],
    featured: true,
  },
  {
    name: "Progress tracker",
    imageUrl: "/projects/progress-tracker-2025.webp",
    year: "2025",
    description:
      "Web application to track the progress level of listed items for each user in real time using websockets",
    tech: ["SVELTE", "BUN", "REDIS", "DOCKER", "GITHUBACTIONS", "AZURE"],
    featured: false,
  },
  {
    name: "Offer generator",
    imageUrl: "/projects/offer-generator-2024-2025.webp",
    projectUrl: "https://uusi.tarjousgeneraattori.pionblanc.fi",
    year: "2024–2025",
    description:
      "Product data synchronization and sales processes automation tool as a web app aimed at small businesses",
    tech: ["REACT", "PYTHON", "POSTGRESQL", "DOCKER", "HETZNER"],
    featured: true,
  },
  {
    name: "Portfolio site",
    year: "2024–2026",
    imageUrl: "/projects/portfolio-site-2024-2026.webp",
    description: "This very website. A personal full stack developer portfolio",
    tech: ["ASTRO", "TAILWIND", "RAILWAY"],
    featured: false,
  },
  {
    name: "Progress tracker",
    imageUrl: "/projects/progress-tracker-2021.webp",
    year: "2021",
    description: "Mobile application progress tracker",
    tech: ["JAVA"],
    featured: false,
  },
  {
    name: "Lens and mirror simulator",
    imageUrl: "/projects/lens-and-mirror-simulator-2015.webp",
    year: "2015",
    description:
      "Desktop GUI for simulating the trajectory of a laser beam through curved lenses and mirrors",
    tech: ["PYTHON"],
    featured: false,
  },
];

export default projects;
