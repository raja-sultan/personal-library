import { RHFTextField } from "common";

export const detailsFormData = [
  {
    id: "1",
    head: "Plan Details",
    subText: "Create a company wide goal setting practice. You will have the ability to send notifications and monitor progress through the term of the goal cycle.",
    divider: true,
    fields: [
      {
        id: "1",
        componentProps: {
          name: "title",
          outerLabel: "Title",
          size: "small",
        },
        component: RHFTextField,
      },
      {
        id: "1",
        componentProps: {
          name: "description",
          outerLabel: "Description",
          minRows: 4,
          multiline: true
        },
        component: RHFTextField,
      },
    ],
  },
  {
    id: "2",
    head: "Add Admin",
    subText: "Create a company wide goal setting practice. You will have the ability to send notifications and monitor progress through the term of the goal cycle.",
  },
];
