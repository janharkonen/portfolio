import type { BrandedItemKey } from "./branded_items";

export type PdfDocument = {
  href: string;
  description: string;
};

export type Education = {
  logo: { key: BrandedItemKey; height: number; width: number };
  degree: string;
  school: string;
  period: string;
  description: string;
  documents?: PdfDocument[];
};

export const educations: Education[] = [
  {
    logo: { key: "AALTOSCI", height: 50, width: 50 },
    degree: "Master's degree",
    school: "Aalto University School of Science",
    period: "2018-2020",
    description: "Major: mathematics, minor: engineering physics",
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
    logo: { key: "KAIST", height: 60, width: 60 },
    degree: "Exchange studies",
    school: "Korea Advanced Institute of Science and Technology (KAIST)",
    period: "2016-2017",
    description: "School of Computing",
  },
  {
    logo: { key: "AALTOSCI", height: 50, width: 50 },
    degree: "Bachelor's degree",
    school: "Aalto University School of Science",
    period: "2014-2018",
    description:
      "Major: engineering physics and mathematics, minor: electrical engineering",
    documents: [
      {
        href: "/pdf/Jan_Harkonen_Bachelors_thesis.pdf",
        description: "Bachelor's thesis on spherical maximal function",
      },
    ],
  },
];

export default educations;
