export type Education = {
  degree: string;
  school: string;
  period: string;
  description: string;
  documents: string[];
};

export const educations: Education[] = [
  {
    degree: "Master's degree",
    school: "Aalto University School of Science",
    period: "2018-2020",
    description: "Major: mathematics, minor: engineering physics",
    documents: [""],
  },
  {
    degree: "Exchange studies",
    school: "Korea Advanced Institute of Science and Technology (KAIST)",
    period: "2016-2017",
    description: "School of Computing",
    documents: [""],
  },
  {
    degree: "Bachelor's degree",
    school: "Aalto University School of Science",
    period: "2014-2018",
    description:
      "Major: engineering physics and mathematics, minor: electrical engineering",
    documents: [""],
  },
];

export default educations;
