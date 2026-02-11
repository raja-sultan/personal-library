import { RHFAutocompleteSync, RHFTextField } from "common";
import * as Yup from "yup";

export const FormData = [
  {
    id: 2,
    grid: 12,
    RhfValue: {
      multiple: false,
      name: "rejectionType",
      fullWidth: true,
      label: "Reason Type",
      isOptionEqualToValue: (option: any, newValue: any) =>
        option.value === newValue.value,
      options: [
        { id: 1, name: "They Reject us", value: "They Reject us" },
        { id: 2, name: "We Reject Them", value: "We Reject Them" },
        { id: 3, name: "None specified", value: "None specified" },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 1,
    grid: 12,
    RhfValue: {
      name: "rejectionReason",
      fullWidth: true,
      label: "Name of Rejection Reason",
    },
    component: RHFTextField,
  },
];
export const FormDataValue = {
  rejectionType: null,
  rejectionReason: "",
};

export const formSchemaModel = Yup.object().shape({
  rejectionType: Yup.object().required("required"),
  rejectionReason: Yup.string().required("required"),
});
