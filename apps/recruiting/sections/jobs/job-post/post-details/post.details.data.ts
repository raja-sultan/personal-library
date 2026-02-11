import { RHFCustomSelect, RHFTextField } from "common";

export const PostDetailsFormData = [
  {
    id: 1,
    componentProps: {
      name: "postDetails.jobName",
      outerLabel: "Job name",
    },

    component: RHFTextField,
    md: 3,
  },

  {
    id: 3,
    componentProps: { name: "postDetails.location", outerLabel: "Location" },
    component: RHFTextField,
    md: 3,
  },
  {
    id: 4,
    componentProps: {
      name: "postDetails.applicationLanguage",
      outerLabel: "Application Language",
      options: [
        { id: 1, label: "English", value: "English" },
        { id: 2, label: "French ", value: "French " },
        { id: 3, label: "Arabic", value: "Arabic " },
        { id: 4, label: "Urdu", value: "Urdu " },
      ],
    },
    component: RHFCustomSelect,
    md: 3,
  },
];
