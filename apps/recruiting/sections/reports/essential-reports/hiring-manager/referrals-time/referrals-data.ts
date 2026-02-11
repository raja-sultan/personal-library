export const breadcrumbs = [
  { key: "1", value: "Home", link: "/dashboard" },
  { key: "2", value: "Reports", link: "/reports" },
  { key: "3", value: "Essential Reports", link: "" },
];

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

// Function to convert month number to month name
export const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[monthNumber - 1] || "-";
};
