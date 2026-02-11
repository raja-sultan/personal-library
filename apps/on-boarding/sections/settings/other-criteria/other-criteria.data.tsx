import { RHFAutocompleteSync, RHFTextField } from "common";
// import * as Yup from "yup";

export const AddFormData = [
  {
    id: 1,
    grid: 12,
    RhfValue: {
      name: "criteriaName",
      fullWidth: true,
      label: "Criteria Name",
    },
    component: RHFTextField,
  },

  {
    id: 2,
    grid: 12,
    RhfValue: {
      multiple: false,
      name: "recrutingFeild",
      fullWidth: true,
      label: "Personnel Library Recruiting Field",
      groupBy: (option) => option.firstLetter,
      options: [
        {
          id: 1,
          firstLetter: "Job",
          name: "Employment Type",
          value: "Job",
        },
        {
          id: 2,
          firstLetter: "Offer",
          name: "Employment Type",
          value: "Offer",
        },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 2,
    grid: 12,
    RhfValue: {
      multiple: true,
      name: "recrutingValues",
      fullWidth: true,
      label: "Values",
      options: [
        {
          id: 1,
          name: "Full Time",
          value: "Full Time",
        },
        {
          id: 2,
          name: "Part Time",
          value: "Part Time",
        },
        {
          id: 3,
          name: "Intern",
          value: "Intern",
        },
        {
          id: 4,
          name: "Contract",
          value: "Contract",
        },
        {
          id: 5,
          name: "Temporary",
          value: "Temporary",
        },
      ],
    },
    component: RHFAutocompleteSync,
  },
];

export const DefValue = {
  criteriaName: null,
  recrutingFeild: null,
  recrutingValues: [],
};
