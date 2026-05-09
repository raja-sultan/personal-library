import { RHFCustomSelect, RHFDatePicker, RHFTextField } from "common";

export const previewWelcomeStepTwoDefaultValues = {
  personalPronoun: "",
  gender: "",
  personalEmail: "",
  phone: "",
  dob: new Date(),
  timeZone: "",
  martialStatus: "",
  ethnicity: "",
};

export const previewWelcomeStepTwoFormFields = [
  {
    id: 1,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "personalPronoun",

      placeholder: "Personal Pronoun",
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
    id: 2,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "gender",

      placeholder: "Gender",
      options: [
        { id: 1, label: "Male", value: "male" },
        { id: 2, label: "Female", value: "female" },
        { id: 3, label: "Other", value: "other" },
      ],
    },
    component: RHFCustomSelect,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      size: "small",
      variant: "standard",
      placeholder: "Personal Email",
      name: "personalEmail",
      type: "email",
      readonly: true,
    },

    component: RHFTextField,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "phone",
      type: "number",
      placeholder: "Phone Number",
      readonly: true,
    },

    component: RHFTextField,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "dob",
      placeholder: "Date of Birth",
    },
    component: RHFDatePicker,
    format: (date: any) => {
      return new Date(date);
    },
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "timeZone",
      placeholder: "Time Zone",
      options: [
        { id: 1, label: "Male", value: "male" },
        { id: 2, label: "Female", value: "female" },
        { id: 3, label: "Other", value: "other" },
      ],
    },
    component: RHFCustomSelect,
    md: 6,
  },
  {
    id: 7,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "martialStatus",
      placeholder: "Martial Status",
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
    id: 8,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "ethnicity",
      placeholder: "Ethnicity",
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
];
