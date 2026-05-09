import { RHFCustomSelect, RHFTextField } from "common";

export const createTaskDetails = () => {
  return {
    taskDetails: [
      {
        id: 1,
        componentProps: {
          name: "name",
          outerLabel: "Name",
          placeholder: "Task Name",
        },
        component: RHFTextField,
        md: 6,
      },
      {
        id: 2,
        componentProps: {
          name: "description",
          outerLabel: "Description (Optional)",
          placeholder: "Enter a description",
          minRows: 3,
          multiline: true,
        },
        component: RHFTextField,
        md: 6,
      },
      {
        id: 3,
        componentProps: {
          name: "category",
          outerLabel: "Task Category",
          placeholder: "Category",
          options: [
            { id: 1, label: "Build Relationship", value: "relationship" },
            { id: 2, label: "Job Training", value: "training" },
            { id: 3, label: "Know the Company", value: "company" },
            { id: 4, label: "Logistics", value: "logistics" },
          ],
        },
        component: RHFCustomSelect,
        md: 6,
      },
      {
        id: 4,
        componentProps: {
          name: "dueDate",
          outerLabel: "Due Date (Optional)",
          placeholder: "On Start Date",
          options: [
            { id: 1, label: "On Start Date", value: "startDate" },
            { id: 2, label: "On Due Date", value: "dueDate" },
            { id: 3, label: "Custom", value: "custom" },
            { id: 4, label: "Exact Date", value: "exactDate" },
          ],
        },
        component: RHFCustomSelect,
        md: 6,
      },
      {
        id: 5,
        componentProps: {
          name: "assignedTo",
          outerLabel: "Assigned To",
          placeholder: "Select",
          options: [
            { id: 1, label: "Title", value: "title" },
            { id: 2, label: "Description", value: "description" },
          ],
        },
        component: RHFCustomSelect,
        md: 6,
      },
    ],
  };
};
