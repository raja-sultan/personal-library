interface Field {
  type: "select" | "search";
  FieldProps: {
    name: string;
    label?: string;
    placeholder?: string;
  };
  options?: {
    value: string;
    name: string;
    id: number;
    label: string;
  }[];
}

export interface TasksTypes {
  category: string;
  taskDescription: string;
  assigneeName: string;
  dueDate: string;
}

export const tableDataSelectField: Field[] = [
  {
    type: "select",
    FieldProps: {
      name: "task",
      label: "Select Option",
    },
    options: [
      {
        id: 1,
        name: "AllcompleteTasks",
        value: "all complete task",
        label: "All Complete Tasks",
      },
      {
        id: 2,
        name: "OverdueTasks",
        value: "overdue task",
        label: "Overdue Tasks",
      },
      {
        id: 3,
        name: "UpcomingTasks",
        value: "upcoming task",
        label: "Upcoming Tasks",
      },
      {
        id: 4,
        name: "all incomplete task",
        value: "all incomplete task",
        label: "All InCompleted Tasks",
      },
      {
        id: 5,
        name: "AllTasks",
        value: "all task",
        label: "All Tasks",
      },
    ],
  },
  {
    type: "search",
    FieldProps: {
      name: "search",
      placeholder: "Search Tasks",
    },
  },
];

export const updateData = {
  category: "",
  taskDescription: "",
  dueDate: "",
  assigneeName: "",
  assigneeId: "",
  complete: false,
};
