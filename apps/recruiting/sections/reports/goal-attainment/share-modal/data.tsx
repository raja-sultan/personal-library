import { RHFCustomSelect, RHFTextField, RHFEditor } from "common";

export const fieldDataEmailReport = [
  {
    id: 1,
    componentProps: {
      name: "emailTo",
      outerLabel: "Templates",
      options: [{ id: 1, label: "Male", value: "male" }],
    },

    component: RHFCustomSelect,
  },
  {
    id: 2,
    componentProps: {
      name: "subject",
      placeholder:"Subject"
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: "emailToParagraph",
    },
    component: RHFEditor,
  },
];
