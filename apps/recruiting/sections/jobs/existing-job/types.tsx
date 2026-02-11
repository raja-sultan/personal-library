interface Field {
  type: "select" | "search";
  FieldProps: {
    name: string;
    label?: string;
    placeholder?: string;
  };
  options?: {
    label: string;
    value: string;
  }[];
}

export const tableDataSelectField: Field[] = [
  {
    type: "select",
    FieldProps: {
      name: "jobStatus",
      label: "Job Status",
    },
    options: [
      { label: "Open", value: "Open" },
      { label: "Admin Coordinator", value: "Admin Coordinator" },
    ],
  },
  {
    type: "select",
    FieldProps: {
      name: "department",
      label: "Department",
    },
    options: [
      { label: "All Departments", value: "All Departments" },
      { label: "Human Resource", value: "Human Resource" },
    ],
  },
  {
    type: "select",
    FieldProps: {
      name: "office",
      label: "Office",
    },
    options: [
      { label: "All Offices", value: "All Offices" },
      { label: "UX bridge, London", value: "UX bridge, London" },
    ],
  },
  {
    type: "search",
    FieldProps: {
      name: "search",
      placeholder: "Search",
    },
  },
];
