export const breadcrumbs = [
  { key: "1", value: "Home", link: "/dashboard" },
  { key: "2", value: "Reports", link: "/reports" },
  { key: "3", value: "Essential Reports", link: "" },
];

export const creatingAreaOptions: any = (color, stageLabels) => {
  return {
    chart: {
      height: 200,
      type: "area",
      zoom: {
        // enabled: true,
      },
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
      padding: {
        left: 45,
      },
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
      categories: stageLabels,
    },
    colors: [color],
  };
};

export const filtersData: any = [
  {
    type: "multiselect",
    FieldProps: {
      name: "job",
      label: "Job",
    },
    options: [
      {
        label: "User",
        value: "user",
      },
      {
        label: "Department",
        value: "department",
      },
    ],
  },
  {
    type: "select",
    FieldProps: {
      name: "jobStatus",
      label: "Job Status",
    },
    options: [
      {
        label: "Open",
        value: "Open",
      },
      {
        label: "Close",
        value: "Close",
      },
      {
        label: "Draft",
        value: "Draft",
      },
    ],
  },
  {
    type: "multiselect",
    FieldProps: {
      name: "department",
      label: "Department",
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
    type: "multiselect",
    FieldProps: {
      name: "office",
      label: "Office",
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
    type: "multiselect",
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
  // {
  //   type: "multiselect",
  //   FieldProps: {
  //     name: "customJobField",
  //     label: "Custom Job Field",
  //   },
  //   options: [
  //     {
  //       label: "Faisal Naeem",
  //       value: "Amira Nadeem",
  //     },
  //   ],
  // },
  // {
  //   type: "select",
  //   FieldProps: {
  //     name: "activityDate",
  //     label: "Activity Date",
  //   },
  //   options: [
  //     {
  //       label: "Current Year",
  //       value: "currentYear",
  //     },
  //     {
  //       label: "Previous Year",
  //       value: "previousYear",
  //     },
  //     {
  //       label: "Current Quarter",
  //       value: "currentQuarter",
  //     },
  //     {
  //       label: "Previous Month",
  //       value: "previousMonth",
  //     },
  //     {
  //       label: "Current Month",
  //       value: "currentMonth",
  //     },
  //     {
  //       label: "Previous Week",
  //       value: "previousWeek",
  //     },
  //     {
  //       label: "Current Week",
  //       value: "currentWeek",
  //     },
  //   ],
  // },
];
