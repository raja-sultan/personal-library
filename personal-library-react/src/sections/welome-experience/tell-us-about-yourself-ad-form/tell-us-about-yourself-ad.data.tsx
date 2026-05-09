import { RHFAutocompleteSync, RHFTextField } from "common";
// import * as Yup from "yup";
export const AddFormData = [
  {
    id: 1,
    grid: 6,
    RhfValue: {
      name: "address",
      fullWidth: true,
      label: "Address",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    grid: 6,
    RhfValue: {
      name: "city",
      fullWidth: true,
      label: "City",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    grid: 6,
    RhfValue: {
      name: "state",
      fullWidth: true,
      label: "State",
    },
    component: RHFTextField,
  },
  {
    id: 4,
    grid: 6,
    RhfValue: {
      name: "zipCode",
      fullWidth: true,
      label: "Zip code",
    },
    component: RHFTextField,
  },
  {
    id: 5,
    grid: 6,
    RhfValue: {
      multiple: false,
      name: "Country",
      fullWidth: true,
      label: "country",
      options: [],
    },
    component: RHFAutocompleteSync,
  },
];

export const DefValue = {
  address: null,
  city: null,
  state: null,
  zipCode: null,
  Country: null,
};
