export interface CardTypes {
  id: number;
  title: string;
  value: string;
}

export const cards = (item: { active: number; ended: number }) => [
  {
    id: 1,
    title: "Total Compensation Cycles",
    value: `${item?.active + item?.ended}`,
  },
  {
    id: 2,
    title: "Active Compensation Cycles",
    value: item?.active ?? '--', 
  },
  {
    id: 3,
    title: "Completed Compensation Cycles",
    value: item?.ended ?? '--',
  },
];

