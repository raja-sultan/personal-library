import { RHFTextField } from "common";
import type { UserAttributesFormData } from "./user-attributes.types";

export const defaultValues: UserAttributesFormData = {
  type: "",
  name: "",
  visibility: "",
  options:[],
};

export const editDefaultValues: UserAttributesFormData = {
  type: "",
  name: "",
  visibility: "",
};

export const createFormData = [
  {
    id: "1",
    head: "Details",
    subText: "Enter the details of the selected attribute.",
    divider: true,
    fields: [
      {
        id: "1",
        componentProps: {
          name: "name",
          placeholder: "Enter name",
          outerLabel: "Name",
        },
        component: RHFTextField,
      },
      {
        id: "2",
        componentProps: {
          name: "visibility",
          select: true,
          outerLabel: "Visibility",
        },
        options: [
          { value: "Admin Only", label: "Admin only" },
          { value: "Admin and Manager", label: "Admin + Manager" },
          { value: "Everyone", label: "Admin + Manager + Employee" },
        ],
        component: RHFTextField,
      },
      
    ],
  },
];
