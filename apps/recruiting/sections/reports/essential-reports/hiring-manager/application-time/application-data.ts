export const breadcrumbs = [
  { key: "1", value: "Home", link: "/dashboard" },
  { key: "2", value: "Reports", link: "/reports" },
  { key: "3", value: "Essential Reports", link: "" },
];

export const creatingAreaOptions: any = (color) => {
  return {
    chart: {
      height: 200,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    menu: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
      width: [0, 2],
    },
    grid: {
      show: false,
    },
    yaxis: {
      show: true,
      lines: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
      },
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
    colors: [color],
  };
};

export const monthsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const filtersData: any = [
  {
    type: "select",
    FieldProps: {
      name: "rows",
      label: "Rows",
    },
    options: [
      {
        label: "User",
        value: "Department",
      },
    ],
  },
  {
    type: "select",
    FieldProps: {
      name: "date",
      label: "Activity Date",
    },
    options: [
      {
        label: "Current Year",
        value: "currentYear",
      },
      {
        label: "Previous Quarter",
        value: "previousQuarter",
      },
      {
        label: "Current Quarter",
        value: "currentQuarter",
      },
    ],
  },
  {
    type: "select",
    FieldProps: {
      name: "activityType",
      label: "Activity Type",
    },
    options: [
      {
        label: "Candidates added",
        value: "candidatesAdded",
      },
      {
        label: "Prospects",
        value: "prospectsAdded",
      },
    ],
  },
  {
    type: "select",
    FieldProps: {
      name: "frequency",
      label: "Frequency",
    },
    options: [
      {
        label: "Daily",
        value: "daily",
      },
      {
        label: "Weekly",
        value: "weekly",
      },
    ],
  },
  {
    type: "select",
    FieldProps: {
      name: "user",
      label: "User Filter",
    },
    options: [
      {
        label: "Faisal Naeem",
        value: "Amira Nadeem",
      },
    ],
  },
];
