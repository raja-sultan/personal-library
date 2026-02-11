import {
    RHFAutocompleteSync,
    RHFTextField,
  } from "common";
  import * as Yup from "yup";
  
  export const AddFormData = [
    {
        id: 1,
        grid: 12,
        componentProps: {
          name: "agency",
          fullWidth: true,
          label: "Agency",
          options: [
            { id: 1, name: "Performance", value: "Performance" },
            { id: 2, name: "Onboarding", value: "Onboarding" },
            { id: 3, name: "Recruiting", value: "Recruiting" },
            { id: 3, name: "Clocklog", value: "Clocklog" },
          ],
        },
        component: RHFAutocompleteSync,
      },
    {
      id: 2,
      grid: 12,
      componentProps: {
        name: "name",
        fullWidth: true,
        label: "Name",
        required: true,
      },
      component: RHFTextField,
    },
    {
      id: 3,
      grid: 12,
      componentProps: {
        name: "email",
        fullWidth: true,
        label: "Email Address",
        required: true,
      },
      component: RHFTextField,
    },
    
  ];
  export const AddFormDataValue = {
    name: "",
    email: "",
    agency: null,
  };
  export const formSchemaModel = Yup.object().shape({
    name: Yup.string().required("required"),
    email: Yup.string().required("required"),
    agency: Yup.string().required("required"),
  });