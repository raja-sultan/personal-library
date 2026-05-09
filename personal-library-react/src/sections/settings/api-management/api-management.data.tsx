import { RHFAutocompleteSync } from "common";
// import * as Yup from "yup";

export const AddFormData = [
  {
    id: 1,
    grid: 12,
    RhfValue: {
      multiple: false,
      name: "name",
      fullWidth: true,
      label: "Name",
      require: true,
      //   groupBy: (option) => option.firstLetter,
      options: [],
    },
    component: RHFAutocompleteSync,
  },
];

export const DefValue = {
  name: null,
};
