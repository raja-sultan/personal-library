export const AddFormData = [
  {
    id: 1,
    grid: 12,
    RhfValue: {
      variant: "outlined",
      name: "search",
      fullWidth: true,
      label: "search by name or req ID or opening ID",
    },
  },
  {
    id: 2,
    grid: 12,
    RhfValue: {
      name: "status",
      fullWidth: true,
      label: "job status",
      variant: "outlined",
      select: true,
      options: [
        { id: 1, name: "all", value: "--" },
        { id: 2, name: "open", value: "open" },
        { id: 3, name: "close", value: "close" },
        { id: 4, name: "Draft", value: "Draft" },
      ],
    },
  },
  {
    id: 3,
    grid: 12,
    RhfValue: {
      multiple: false,
      variant: "outlined",
      name: "department",
      fullWidth: true,
      label: "department",

      select: true,
      options: [
        { id: 1, name: "Data & BI", value: "Data & BI" },
        { id: 2, name: "Finance", value: "Finance" },
        { id: 3, name: "Human Resource", value: "Human Resource" },
        { id: 4, name: "Infrastructure", value: "Infrastructure" },
        { id: 5, name: "Marketing & Sales", value: "Marketing & Sales" },
      ],
    },
  },
  {
    id: 4,
    grid: 6,
    RhfValue: {
      multiple: false,
      name: "office",
      variant: "outlined",
      fullWidth: true,
      label: "office",

      select: true,
      options: [
        { id: 1, name: "UxBridge, London", value: "UxBridge, London" },
        {
          id: 2,
          name: "Rawalpindi, Pakistan",
          value: "Rawalpindi, Pakistan",
        },
        {
          id: 3,
          name: "Islamabad, Pakistan",
          value: "Islamabad, Pakistan",
        },
        { id: 4, name: "London", value: "London" },
        { id: 5, name: "Lahore, Pakistan", value: "Lahore, Pakistan" },
      ],
    },
  },
  {
    id: 5,
    grid: 6,
    RhfValue: {
      multiple: false,
      name: "user",
      fullWidth: true,
      variant: "outlined",
      label: "user",

      select: true,
      options: [
        { id: 1, name: "faisal naeem", value: "faisal naeem" },
        { id: 2, name: "kamran zafar", value: "kamran zafar" },
        { id: 3, name: "hasan anwar", value: "hasan anwar" },
        { id: 4, name: "muneeb asif", value: "muneeb asif" },
      ],
    },
  },
  {
    id: 5,
    grid: 12,
    RhfValue: {
      multiple: false,
      name: "hiringTeamRole",
      variant: "outlined",
      fullWidth: true,
      label: "hiring team role",

      select: true,
      options: [
        { id: 1, name: "All", value: "All" },
        { id: 2, name: "employee type", value: "employee type" },
      ],
    },
  },
];
