import { RHFTextField } from "common";

export interface ICreateGroupTypes {
  groupName: string;
  description: string;
  members: string[];
}

export const defaultValues = {
  groupName: "",
  description: "",
  members: [],
};

export const createFormData = [
  {
    id: "1",
    head: "Group Information",
    subText: "Enter the group details",
    divider: true,
    fields: [
      {
        id: "1",
        componentProps: {
          name: "groupName",
          outerLabel: "Name",
          placeholder: "Enter name",
        },
        component: RHFTextField,
      },
      {
        id: "2",
        componentProps: {
          name: "description",
          outerLabel: "Description",
          placeholder: "Enter a description",
          maxRows: 4,
          minRows: 3,
          multiline: true,
        },
        component: RHFTextField,
      },
    ],
  },
];
