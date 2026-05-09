import {
  RHFTextField,
  RHFCustomSelect,
  RHFPhoneInput,
  RHFDatePicker,
} from "common";

export const newHireDetails = [
  {
    id: 1,
    componentProps: {
      name: "firstName",
      outerLabel: "First Name",
      placeholder: "Enter first name",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      name: "lastName",
      outerLabel: "Last Name",
      placeholder: "Enter last name",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: "email",
      outerLabel: "Personal Email (optional)",
      placeholder: "Enter personal email",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      name: "contactNumber",
      placeholder: "+xx xxxx xxxxxx",
      outerLabel: "Phone Number (optional)",
    },
    component: RHFPhoneInput,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      name: "gender",
      outerLabel: "Gender (optional)",
      options: [
        { id: 1, label: "Male", value: "male" },
        { id: 2, label: "Female", value: "female" },
        { id: 3, label: "Other", value: "other" },
      ],
    },
    component: RHFCustomSelect,
    md: 6,
  },
];

export const workInformationDetails = [
  {
    id: 1,
    componentProps: {
      name: "employeeId",
      outerLabel: "Employee ID (optional)",
      placeholder: "Enter employee ID",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      name: "workEmail",
      outerLabel: "Work Email",
      placeholder: "Enter work email",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: "startDate",
      outerLabel: "Start Date (optional)",
      autoConvert: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 4,
    componentProps: {
      name: "title",
      outerLabel: "Title (optional)",
      placeholder: "Enter title",
    },
    component: RHFTextField,
    md: 6,
  },
];

export const employmentData = [
  {
    id: 1,
    label: "Contact",
    value: "Contact",
  },
  {
    id: 2,
    label: "Full Time",
    value: "Full Time",
  },
  {
    id: 3,
    label: "Part Time",
    value: "Part Time",
  },
  {
    id: 4,
    label: "Temporary",
    value: "Temporary",
  },
  {
    id: 5,
    label: "Intern",
    value: "intern",
  },
  {
    id: 6,
    label: "Terminated",
    value: "terminated",
  },
];
