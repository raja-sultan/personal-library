export interface jobNameTypes {
  id: number;
  name: string;
  value: string;
}

export interface jobStageTypes {
  id: number;
  name: string;
  value: string;
}

export const jobNameData: jobNameTypes[] = [
  {
    id: 1,
    name: "Duplicate",
    value: "duplicate",
  },
  {
    id: 2,
    name: "Lacking skills / qualifications",
    value: "lackingSkills",
  },
  {
    id: 3,
    name: "Not a culture fit",
    value: "cultureFit",
  },
];

export const jobStageData: jobStageTypes[] = [
  {
    id: 1,
    name: "Duplicate",
    value: "duplicate",
  },
  {
    id: 2,
    name: "Lacking skills / qualifications",
    value: "lackingSkills",
  },
  {
    id: 3,
    name: "Not a culture fit",
    value: "cultureFit",
  },
];
