import * as Yup from "yup";

import { RHFCustomSelect, RHFTextField } from "common";

export const schema = Yup.object({
  taskName: Yup.string().required("Task is required"),
  taskCategory: Yup.string().required("Task Category is required"),
  requireAttachments: Yup.boolean(),
});

export const defaultValues = {
  taskName: "",
  description: "",
  taskCategory: "",
  assignedTo: "",
  taskNotification: "",
  file: "",
  dueDate: "",
  requireAttachments: false,
};

export const addNewTaskFieldData = [
  {
    id: 1,
    componentProps: {
      name: "taskName",
      outerLabel: "Task Name",
      placeholder: "Task name",
      size: "medium",
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: "description",
      outerLabel: (
        <>
          Personal Email <span style={{ opacity: 0.7 }}>(Optional)</span>
        </>
      ),
      placeholder: "Enter a description",
      size: "medium",
      multiline: true,
      rows: 3,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: "taskCategory",
      size: "medium",
      placeholder: "Category",
      outerLabel: "Task Category",
      options: [
        {
          id: 1,
          label: "Build Relationship",
          value: "buildRelationship",
        },
        { id: 2, label: "Job Training", value: "jobTraining" },
        { id: 3, label: "Know the Company", value: "knowCompany" },
        { id: 4, label: "Logistics", value: "logistics" },
      ],
    },

    component: RHFCustomSelect,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: "dueDate",
      size: "medium",
      placeholder: "Select",
      outerLabel: (
        <>
          Due Date<span style={{ opacity: 0.7 }}>(optional)</span>
        </>
      ),
      options: [
        {
          id: 1,
          label: "On Start Date",
          value: "onStartDate",
        },
        { id: 2, label: "on Due Date", value: "onDueDate" },
        { id: 3, label: "Custom", value: "custom" },
        { id: 4, label: "Exact Date", value: "exactDate" },
      ],
    },

    component: RHFCustomSelect,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: "assignedTo",
      placeholder: "Select",
      size: "medium",
      outerLabel: (
        <>
          Assigned To <span style={{ opacity: 0.7 }}>(optional)</span>
        </>
      ),
      options: [
        {
          id: 1,
          label: "On Start Date",
          value: "onStartDate",
        },
        { id: 2, label: "on Due Date", value: "onDueDate" },
        { id: 3, label: "Custom", value: "custom" },
        { id: 4, label: "Exact Date", value: "exactDate" },
      ],
    },

    component: RHFCustomSelect,
    md: 12,
  },
];
