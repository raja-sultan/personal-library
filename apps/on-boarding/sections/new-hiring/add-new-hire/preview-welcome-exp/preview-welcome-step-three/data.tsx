import { RHFCustomSelect, RHFTextField } from "common";

export const previewWelcomeStepThreeDefaultValues = {
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};

export const previewWelcomeStepThreeFormFields = [
  {
    id: 1,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "address",
      placeholder: "Address",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "city",
      placeholder: "City",
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      size: "small",
      variant: "standard",
      placeholder: "State",
      name: "state",
    },

    component: RHFTextField,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "zipCode",
      placeholder: "Zip Code",
    },
    component: RHFTextField,
    md: 6,
  },

  {
    id: 5,
    componentProps: {
      size: "small",
      variant: "standard",
      name: "country",
      placeholder: "Country",
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
