import { RHFCustomSelect } from "common";

export const defaultValues = {
  rows: [],
  columns: [],
  activityDate: [],
  userFilter: [],
};

export const fieldData = [
  {
    id: 1,
    componentProps: {
      name: "rows",
      outerLabel: "Rows",
      placeholder: "User",
      options: [
        { id: 1, label: "User", value: "user" },
        { id: 2, label: "Department", value: "department" },
      ],
    },

    component: RHFCustomSelect,
    md: 2.5,
  },
  {
    id: 2,
    componentProps: {
      name: "columns",
      outerLabel: "Columns",
      placeholder: "Week",
      options: [
        { id: 1, label: "Week", value: "week" },
        { id: 2, label: "Month", value: "month" },
        { id: 3, label: "Quarter", value: "quarter" },
      ],
    },

    component: RHFCustomSelect,
    md: 2.5,
  },
  {
    id: 3,
    componentProps: {
      name: "activityDate",
      placeholder: "Select Date",
      outerLabel: "Activity Date",
      options: [
        { id: 1, label: "Current Year", value: "currentYear" },
        { id: 2, label: "Previous Quarter", value: "previousQuarter" },
        { id: 3, label: "Current Quarter", value: "currentQuarter" },
        { id: 4, label: "Previous Month", value: "previousMonth" },
        { id: 5, label: "Current Month", value: "currentMonth" },
        { id: 6, label: "Previous Week", value: "previousWeek" },
        { id: 7, label: "Current Week", value: "currentWeek" },
      ],
    },

    component: RHFCustomSelect,
    md: 2.5,
  },
  {
    id: 4,
    componentProps: {
      name: "userFilter",
      placeholder: "All User",
      outerLabel: "User Filter",
      options: [
        { id: 1, label: "Amira Nadeem", value: "amira" },
        { id: 2, label: "Faisal Naeem", value: "faisal" },
      ],
    },

    component: RHFCustomSelect,
    md: 2.5,
  },
];

export const options: any = {
  chart: {
    type: "area",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 0.7,
  },
  toolbar: {
    show: false,
  },
  fill: {
    opacity: 0.6,
    type: "solid",
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yaxis: {
    title: {
      text: "% Attainment",
      style: { fontWeight: 600, fontSize: "16px" },
    },
  },
};
export const series = [
  {
    name: "Attainment",
    color: "#f39677",
    data: [1, 1, 2, 4, 5, 5, 6, 7, 8, 10, 11, 5],
  },
];
