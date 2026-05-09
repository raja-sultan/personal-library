import { RHFTextField } from "common";
export const AddFormData = [
  {
    id: 1,
    grid: 4,
    RhfValue: {
      name: "firstName",
      fullWidth: true,
      placeholder: "Joseph",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    grid: 4,
    RhfValue: {
      name: "midName",
      fullWidth: true,
      placeholder: "M.",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    grid: 4,
    RhfValue: {
      name: "lastName",
      fullWidth: true,
      placeholder: "Andrew",
    },
    component: RHFTextField,
  },
];

export const DefValue = {
  firstName: null,
  midName: null,
  lastName: null,
};
