import type { BrandedItemKey } from "./branded_items";
import type { PdfDocument } from "./education";

export type Experience = {
  logo: { key: BrandedItemKey; height: number; width: number };
  role: string;
  company: string;
  period: string;
  description: string;
  tech: BrandedItemKey[];
  documents?: PdfDocument[];
};

export const experiences: Experience[] = [
  {
    logo: { key: "TAITOUNITED", height: 120, width: 160 },
    role: "Software Developer",
    company: "Taito United Oy",
    period: "2025–present",
    description: "Product data management software development",
    tech: [
      "REACT",
      "TANSTACK_ROUTER",
      "GRAPHQL",
      "NODEJS_OLD",
      "POSTGRESQL",
      "DOCKER",
      "KUBERNETES",
      "GCP",
    ],
  },
  {
    logo: { key: "PIONBLANC", height: 40, width: 40 },
    role: "CEO / Software Developer",
    company: "Pion Blanc Oy",
    period: "2024–2025",
    description:
      "Helping small businesses navigate their massive product data pipelines and automating their sales processes",
    tech: [
      "NEXTJS",
      "REACT",
      "PYTHON",
      "GOLANG",
      "POSTGRESQL",
      "REDIS",
      "DOCKER",
      "HETZNER",
    ],
  },
  {
    logo: { key: "POLYCON", height: 120, width: 160 },
    role: "Software Developer",
    company: "Polycon Oy",
    period: "2021–2024",
    description:
      "Developing and maintaining software and databases for handling mobility aid items for Finnish hospital districts",
    tech: ["DELPHI", "MSSQLSERVER"],
  },
  {
    logo: { key: "SEMANTUM", height: 36, width: 36 },
    role: "Software Developer / Data Analyst",
    company: "Semantum Oy",
    period: "Feb 2020–Sep 2020",
    description: "LCA dashboard for environmental impact assessment",
    tech: ["JAVA", "INFLUXDB", "DOCKER", "HASKELL"],
  },
  {
    logo: { key: "AALTOSCI", height: 50, width: 50 },
    role: "Research Assistant",
    company: "Aalto University School of Science",
    period: "Jun 2019–Dec 2019",
    description:
      "Simulating and calculating the annihilating electron-positron pair momentum density in a solid in the atomic scale using quantum Monte Carlo methods",
    tech: ["FORTRAN", "QUANTUMESPRESSO", "CASINO", "CSCMAHTI"],
    documents: [
      {
        href: "/pdf/Jan_Harkonen_Masters_thesis.pdf",
        description:
          "Master's thesis: computing positron annihilation momentum densities in solids with quantum Monte Carlo",
      },
      {
        href: "/pdf/Research_paper_as_co_author.pdf",
        description:
          "Peer-reviewed research paper I co-authored on positron annihilation simulations",
      },
    ],
  },
  {
    logo: { key: "AALTOSCI", height: 50, width: 50 },
    role: "Research Assistant",
    company: "Aalto University School of Science",
    period: "Summer 2018",
    description: "Semiconductor enhancement factor simulation",
    tech: ["FORTRAN", "QUANTUMESPRESSO", "CASINO", "CSCMAHTI"],
    documents: [
      {
        href: "/pdf/Jan_Harkonen_Special_Assignment.pdf",
        description:
          "Special assignment report on semiconductor enhancement factor simulation",
      },
    ],
  },
];

export default experiences;
