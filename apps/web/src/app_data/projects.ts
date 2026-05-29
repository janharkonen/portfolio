export type Project = {
  name: string;
  year: string;
  description: string;
  tech: string[];
  initiallyHidden: boolean;
};

export const projects: Project[] = [
  {
    name: "SyncSpace",
    year: "2025",
    description:
      "Simple list+checkbox based tool for collaborative task management with real-time synchronization",
    tech: ["Next.js", "Convex", "Clerk", "Docker", "Hetzner"],
    initiallyHidden: false,
  },
  {
    name: "Piggybank",
    year: "2025",
    description: "Personal finance tracker",
    tech: ["Next.js", "Convex", "Golang", "Neon", "PostgreSQL"],
    initiallyHidden: false,
  },
  {
    name: "ÉclairDB",
    year: "2025",
    description:
      "Lightning-fast PostgreSQL database exploration with intuitive search and filtering capabilities",
    tech: ["Vue", "Golang", "Github Actions", "AWS"],
    initiallyHidden: false,
  },
  {
    name: "One source of truth",
    year: "2025",
    description: "A tool to search and filter a vast array of products blazingly fast",
    tech: ["Next.js", "Golang", "Redis", "Lua", "Docker", "Hetzner"],
    initiallyHidden: false,
  },
  {
    name: "cdx",
    year: "2025",
    description: "Bash CLI tool to cd into directories 10x faster",
    tech: ["Bash"],
    initiallyHidden: false,
  },
  {
    name: "PICAPI",
    year: "2025",
    description:
      "API for manipulating images directly from URL parameters + platform to save own pictures in the cloud",
    tech: ["Vanilla Javascript", "Python", "SQLite", "Hetzner"],
    initiallyHidden: false,
  },
  {
    name: "Progress tracker",
    year: "2025",
    description:
      "Web application to track the progress level of listed items for each user in real time using websockets",
    tech: ["Svelte", "Bun", "Redis", "Docker", "Github Actions", "Azure"],
    initiallyHidden: false,
  },
  {
    name: "Offer generator",
    year: "2024–2025",
    description:
      "Product data synchronization and sales processes automation tool as a web app aimed at small businesses",
    tech: ["React", "Python", "PostgreSQL", "Docker", "Hetzner"],
    initiallyHidden: false,
  },
  {
    name: "Portfolio site",
    year: "2024–2025",
    description: "This very website. A personal full stack developer portfolio",
    tech: ["Astro", "Tailwind CSS"],
    initiallyHidden: false,
  },
  {
    name: "Progress tracker",
    year: "2021",
    description: "Mobile application progress tracker",
    tech: ["Java"],
    initiallyHidden: false,
  },
  {
    name: "Lens and mirror simulator",
    year: "2015",
    description:
      "Desktop GUI for simulating the trajectory of a laser beam through curved lenses and mirrors",
    tech: ["Python"],
    initiallyHidden: false,
  },
];

export default projects;
