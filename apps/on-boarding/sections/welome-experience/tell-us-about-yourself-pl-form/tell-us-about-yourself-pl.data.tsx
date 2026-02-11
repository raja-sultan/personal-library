import { RHFAutocompleteSync, RHFDatePicker, RHFTextField } from "common";
// import * as Yup from "yup";

export const AddFormData = [
  {
    id: 1,
    grid: 6,
    RhfValue: {
      multiple: false,
      name: "PersonalPronoun",
      fullWidth: true,
      label: "Personal Pronoun",
      options: [],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 2,
    grid: 6,
    RhfValue: {
      multiple: false,
      name: "gender",
      fullWidth: true,
      label: "gender",
      options: [],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 3,
    grid: 6,
    RhfValue: {
      name: "personalEmail",
      fullWidth: true,
      label: "Personal Email",
    },
    component: RHFTextField,
  },
  {
    id: 4,
    grid: 6,
    RhfValue: {
      name: "personalNumber",
      fullWidth: true,
      label: "Phone Number",
    },
    component: RHFTextField,
  },
  {
    id: 5,
    grid: 6,
    RhfValue: {
      name: "dob",
      fullWidth: true,
      label: "Date of Birth",
    },
    component: RHFDatePicker,
  },
  {
    id: 6,
    grid: 6,
    RhfValue: {
      multiple: false,
      name: "timeZone",
      fullWidth: true,
      label: "timeZone",
      options: [],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 7,
    grid: 6,
    RhfValue: {
      multiple: false,
      name: "maritalStatus",
      fullWidth: true,
      label: "Marital Status",
      options: [],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 8,
    grid: 6,
    RhfValue: {
      multiple: false,
      name: "Ethnicity",
      fullWidth: true,
      label: "Ethnicity",
      options: [],
    },
    component: RHFAutocompleteSync,
  },
];

export const DefValue = {
  PersonalPronoun: null,
  gender: null,
  personalEmail: null,
  personalNumber: null,
  dob: null,
  timeZone: null,
  maritalStatus: null,

  Ethnicity: null,
};
