import type { BrandedItemKey } from "./branded_items";

export type Project = {
  name: string;
  imageUrl: string;
  year: string;
  description: string;
  tech: BrandedItemKey[];
  initiallyHidden: boolean;
};

export const projects: Project[] = [
  {
    name: "SyncSpace",
    imageUrl: "https://picapi.janharkonen.fi/api/pics/743aaa9e749842d589d26abf4cfef026.png?BGc=grey&BG=130",
    year: "2025",
    description:
    "Simple list+checkbox based tool for collaborative task management with real-time synchronization",
    tech: ["NEXTJS", "CONVEX", "CLERK", "DOCKER", "HETZNER"],
    initiallyHidden: false,
  },
  {
    name: "Piggybank",
    imageUrl: "https://picapi.janharkonen.fi/api/pics/1d4685d428ef40e88362bf6fff5e2883.png?BGc=grey&BG=140",
    year: "2025",
    description: "Personal finance tracker",
    tech: ["NEXTJS", "CONVEX", "GOLANG", "NEON", "POSTGRESQL"],
    initiallyHidden: false,
  },
  {
    name: "ÉclairDB",
    imageUrl: "https://picapi.janharkonen.fi/api/pics/dfc3ddcb9eb44c1ab760920c4d36610a.png?BGc=grey&BG=125",
    year: "2025",
    description:
      "Lightning-fast PostgreSQL database exploration with intuitive search and filtering capabilities",
    tech: ["VUE", "GOLANG", "GITHUBACTIONS", "AWS"],
    initiallyHidden: false,
  },
  {
    name: "One source of truth",
    imageUrl: "https://picapi.janharkonen.fi/api/pics/3a055a19c26743a2a2fc18bf41b41cbf.png?BGc=grey&BG=125",
    year: "2025",
    description:
      "A tool to search and filter a vast array of products blazingly fast",
    tech: ["NEXTJS", "GOLANG", "REDIS", "LUA", "DOCKER", "HETZNER"],
    initiallyHidden: false,
  },
  {
    name: "cdx",
    imageUrl: "https://picapi.janharkonen.fi/api/pics/e7d1b08fd20847abb202b427a8e8f2ba.png?BGc=grey&BG=125",
    year: "2025",
    description: "Bash CLI tool to cd into directories 10x faster",
    tech: ["BASH"],
    initiallyHidden: false,
  },
  {
    name: "PICAPI",
    imageUrl: "https://picapi.janharkonen.fi/api/pics/d40795b1bb8b4987b965e11d241bbf78.png?BGc=grey&BG=120",
    year: "2025",
    description:
    "API for manipulating images directly from URL parameters + platform to save own pictures in the cloud",
    tech: ["VANILLAJS", "PYTHON", "SQLITE", "HETZNER"],
    initiallyHidden: false,
  },
  {
    name: "Progress tracker",
    imageUrl: "https://picapi.janharkonen.fi/api/pics/6cbf8b836d0c4d3c89c2c4d23dba1281.png?BGc=grey&BG=130",
    year: "2025",
    description:
    "Web application to track the progress level of listed items for each user in real time using websockets",
    tech: ["SVELTE", "BUN", "REDIS", "DOCKER", "GITHUBACTIONS", "AZURE"],
    initiallyHidden: false,
  },
  {
    name: "Offer generator",
    imageUrl: 'https://picapi.janharkonen.fi/api/pics/3f7e838a1aad493ab7f7176bbb203620.png?BGc=grey&BG=120',
    year: "2024–2025",
    description:
      "Product data synchronization and sales processes automation tool as a web app aimed at small businesses",
    tech: ["REACT", "PYTHON", "POSTGRESQL", "DOCKER", "HETZNER"],
    initiallyHidden: false,
  },
  {
    name: "Portfolio site",
    year: "2024–2025",
    imageUrl: "https://picapi.janharkonen.fi/api/pics/0cebe3a64ade44858fd946e58dd6b540.png?BGc=grey&BG=120",
    description: "This very website. A personal full stack developer portfolio",
    tech: ["ASTRO", "TAILWIND"],
    initiallyHidden: false,
  },
  {
    name: "Progress tracker",
    imageUrl: "https://picapi.janharkonen.fi/api/pics/4f345e3cad804de5b8dd7cb204aa99ad.png",
    year: "2021",
    description: "Mobile application progress tracker",
    tech: ["JAVA"],
    initiallyHidden: false,
  },
  {
    name: "Lens and mirror simulator",
    imageUrl: 'https://picapi.janharkonen.fi/api/pics/2dce025429824c5595654267c848d3de.png?BGc=grey&BG=140',
    year: "2015",
    description:
      "Desktop GUI for simulating the trajectory of a laser beam through curved lenses and mirrors",
    tech: ["PYTHON"],
    initiallyHidden: false,
  },
];

export default projects;
