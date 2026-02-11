interface ScoreCardTypes {
  id: number;
  title: string;
  attributes: {
    title: string;
  }[];
}

export interface DefaultValuesTypes {
  attributes: string[];
}

export const scoreCard: ScoreCardTypes[] = [
  {
    id: 1,
    title: `Skills`,
    attributes: [
      {
        title: "Communication",
      },
      {
        title: "Manage competing priorities",
      },
      {
        title: "Organization Skills",
      },
    ],
  },
  {
    id: 2,
    title: `Personality Traits`,
    attributes: [
      {
        title: "Communication",
      },
      {
        title: "Manage competing priorities",
      },
      {
        title: "Organization Skills",
      },
    ],
  },
  {
    id: 3,
    title: `Qualifications`,
    attributes: [
      {
        title: `Three to five years of experience`,
      },
    ],
  },
  {
    id: 4,
    title: `Details`,
    attributes: [
      {
        title: `Currently based locally`,
      },
      {
        title: `Fits our salary range`,
      },
      {
        title: `Willing to do required travel`,
      },
    ],
  },
];

interface removeCategoryTypes {
  id: number;
  title: string;
}

export const removeCategory: removeCategoryTypes[] = [
  {
    id: 1,
    title: `Ability to meet deadlines`,
  },
  {
    id: 2,
    title: `Ability to function independently and in team environment`,
  },
  {
    id: 3,
    title: `Account Management`,
  },
  {
    id: 4,
    title: `Applicant Tracking Systems`,
  },
  {
    id: 5,
    title: `Basic familiarity with software & programming`,
  },
  {
    id: 6,
    title: `Brand Marketing`,
  },
];
