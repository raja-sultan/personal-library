import {
  RHFAutocompleteAsync,
  // RHFAutocompleteSync,
  RHFTelInput,
  RHFTextField,
  // RHFUploadSingleFileWithPreview,
} from "common";

import * as Yup from "yup";

export const AddFormData = (tagQuery) => {
  return [
    {
      id: 1,
      grid: 6,
      RhfValue: {
        name: "firstName",
        fullWidth: true,
        label: "FirstName",
      },
      component: RHFTextField,
    },
    {
      id: 2,
      grid: 6,
      RhfValue: {
        name: "lastName",
        fullWidth: true,
        label: "Last Name",
      },
      component: RHFTextField,
    },
    {
      id: 3,
      grid: 12,
      RhfValue: {
        name: "email",
        fullWidth: true,
        label: "Email",
      },
      component: RHFTextField,
    },
    {
      id: 4,
      grid: 12,
      RhfValue: {
        name: "phoneNumber",
        fullWidth: true,
        label: "Phone No",
      },
      component: RHFTelInput,
    },
    // {
    //   id: 4,
    //   grid: 12,
    //   RhfValue: {
    //     name: "image",
    //     accept: { "image/*": [], "video/*": [] },
    //     type: "image",
    //   },
    //   component: RHFUploadSingleFileWithPreview,
    // },
    {
      id: 5,
      grid: 12,
      RhfValue: {
        multiple: true,
        name: "interviewerTags",
        fullWidth: true,
        outerLabel: "Add Interviewer Tags",
        placeholder: "Select",
        apiQuery: tagQuery,
        transformResponse: (data) => data?.data?.interviewerTags,
        getOptionLabel: (option: any) => option.interviewerTag,
        externalParams: {
          limit: 100000000000,
          offset: 0,
        },
      },
      component: RHFAutocompleteAsync,
    },
  ];
};
export const formSchemaModel = Yup.object().shape({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  email: Yup.string().required("required"),
  interviewerTags: Yup.array().required("required"),
  phoneNumber: Yup.string()
    .required("Invalid Entry")
    .min(7, "Invalid Phone number"),
});
export const AddFormDataValue: any = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};
