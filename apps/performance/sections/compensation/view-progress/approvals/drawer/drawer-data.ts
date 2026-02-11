import dayjs from "dayjs";

export const drawerData = (data: any) => {
  return [
    {
      id: 1,
      title: data?.user?.employeeTitle ?? '--',
      content: [
        { id: 1, subTitle: "Level", subContent: data?.user?.jobLevel ?? "--" },
        { id: 2, subTitle: "Location", subContent: data?.user?.location ?? "--" },
        { id: 3, subTitle: "Start Date", subContent: data?.user?.employmentStartDate ? dayjs(data?.user?.employmentStartDate).format('D/M/YYYY') : "--" },
        { id: 4, subTitle: "Last pay change", subContent: data?.user?.lastPayChange ? dayjs(data?.user?.lastPayChange).format('DD MMM YYYY') : '--' },
        { id: 5, subTitle: "Performance rating", subContent: data?.user?.rating ?? '--' },
        { id: 6, subTitle: "Promotion", subContent: data?.isPromoted ? 'Yes' : 'No' },
      ],
    },
    {
      id: 2,
      title: "Salary",
      content: [
        { id: 1, subTitle: "Current", subContent: data?.user?.currentSalary ? `£ ${data?.user?.currentSalary}` : '--' },
        { id: 2, subTitle: "Guidance", subContent: data?.user?.guidance ? `£ ${data?.user?.guidance}` : '--' },
      ],
    },
  ];
}

export const marks = [
  { value: 5000, label: "5,000" },
  { value: 10000, label: "10,000" },
  { value: 20000, label: "20,000" },
];
