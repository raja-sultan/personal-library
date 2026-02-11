import {
  RHFAutocompleteSync,
  RHFCheckbox,
  RHFEditor,
  RHFTextField,
  RHFUploadSingleFileWithPreview,
} from "common";
// import * as Yup from "yup";

export const AddFormData = [
  {
    id: 1,
    grid: 6,
    RhfValue: {
      name: "Name",
      fullWidth: true,
      label: "Name",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    grid: 12,
    RhfValue: {
      name: "body",
      outerLabel: "Body",
    },
    component: RHFEditor,
  },
  {
    id: 2,
    grid: 6.5,
    RhfValue: {
      multiple: false,
      name: "taskCategory",
      fullWidth: true,
      label: "Task Category",
      options: [
        { id: 1, name: "Build Relationships", value: "Build Relationships" },
        { id: 2, name: "Job Training", value: "Job Training" },
        { id: 3, name: "Logistics", value: "Logistics" },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 3,
    grid: 6.5,
    RhfValue: {
      multiple: false,
      name: "dueDate",
      fullWidth: true,
      label: "Due Date",
      options: [
        { id: 1, name: "On start date", value: "Build Relationships" },
        { id: 2, name: "Custom", value: "Custom" },
        { id: 3, name: "Exact Date", value: "Exact Date" },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 4,
    grid: 6.5,
    RhfValue: {
      multiple: false,
      name: "startDate",
      fullWidth: true,
      label: "Start Date",
      options: [
        { id: 1, name: "before", value: "before" },
        { id: 2, name: "After", value: "After" },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 5,
    grid: 9.5,
    RhfValue: {
      name: "assignedTo",
      fullWidth: true,
      label: "Assigned To",
    },
    component: RHFTextField,
  },
  {
    id: 7,
    grid: 12,
    RhfValue: {
      name: "attachment",
    },
    Component: RHFUploadSingleFileWithPreview,
  },
  {
    id: 7,
    grid: 6.5,
    RhfValue: {
      name: "requireAttachment",
    },
    component: RHFCheckbox,
  },
];

export const DefValue = {
  Name: null,
  body: null,
  taskCategory: null,
  dueDate: null,
  startDate: null,
  assignedTo: null,
  attachment: null,
  requireAttachment: null,
};
