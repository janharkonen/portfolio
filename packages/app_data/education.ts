import type { BrandedItemKey } from "./branded_items";

export type Education = {
  logo: { key: BrandedItemKey; height: number; width: number };
  degree: string;
  school: string;
  period: string;
  description: string;
  documents?: string[];
};

export const educations: Education[] = [
  {
    logo: { key: "AALTOSCI", height: 50, width: 50 },
    degree: "Master's degree",
    school: "Aalto University School of Science",
    period: "2018-2020",
    description: "Major: mathematics, minor: engineering physics",
    documents: [
      "/pdf/Jan_Harkonen_Master_Thesis.pdf",
      "/pdf/Research_paper_as_co_author.pdf",
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
    documents: ["/pdf/Jan_Harkonen_Bachelor_Thesis.pdf"],
  },
];

export default educations;
