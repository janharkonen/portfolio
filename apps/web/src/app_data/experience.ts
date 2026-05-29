export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
};

export const experiences: Experience[] = [
  {
    role: "Software Developer",
    company: "Taito United Oy",
    period: "2025–present",
    description: "Product data management software development",
    tech: ["React", "GraphQL", "Node.js", "PostgreSQL", "Docker", "Google Cloud"],
  },
  {
    role: "CEO / Software Developer",
    company: "Pion Blanc Oy",
    period: "2024–2025",
    description:
      "Helping small businesses navigate their massive product data pipelines and automating their sales processes",
    tech: [
      "Next.js",
      "React",
      "Python",
      "Golang",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Hetzner",
    ],
  },
  {
    role: "Software Developer",
    company: "Polycon Oy",
    period: "2021–2024",
    description:
      "Developing and maintaining software and databases for handling mobility aid items for Finnish hospital districts",
    tech: ["Delphi", "Microsoft SQL Server"],
  },
  {
    role: "Software Developer / Data Analyst",
    company: "Semantum Oy",
    period: "Feb 2020–Sep 2020",
    description: "LCA dashboard for environmental impact assessment",
    tech: ["Java", "InfluxDB", "Docker", "Haskell"],
  },
  {
    role: "Research Assistant",
    company: "Aalto University School of Science",
    period: "Jun 2019–Dec 2019",
    description:
      "Simulating and calculating the annihilating electron-positron pair momentum density in a solid in the atomic scale using quantum Monte Carlo methods",
    tech: ["Fortran", "Quantum ESPRESSO", "CASINO", "CSC Mahti"],
  },
  {
    role: "Research Assistant",
    company: "Aalto University School of Science",
    period: "Summer 2018",
    description: "Semiconductor enhancement factor simulation",
    tech: ["Fortran", "Quantum ESPRESSO", "CASINO", "CSC Mahti"],
  },
];

export default experiences;
