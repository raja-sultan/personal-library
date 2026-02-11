import { RHFCustomSelect, RHFEditor, RHFTextField } from "common";

export const sendCalendarInviteDefaultValues = {
  template: [],
  meetingLink: "",
  from: [],
  to: "",
  subjectLine: "",
  body: "",
};

export const sendCalendarInviteSchema = {};

export const sendCalendarInviteFormData = [
  {
    id: 1,
    componentProps: {
      name: "templates",
      outerLabel: "Templates",
      options: [
        { id: 1, label: "Male", value: "male" },
        { id: 2, label: "Female", value: "female" },
      ],
    },

    component: RHFCustomSelect,
    md: 8,
    xs: 12,
    mb: 1.5,
  },
  {
    id: 2,
    componentProps: {
      name: "meetingLink",
      //   outerLabel: (
      //     <>
      //       Last Name <span style={{ opacity: 0.7 }}>(optional)</span>
      //     </>
      //   ),
      outerLabel: "Meeting Link",
    },
    component: RHFTextField,
    md: 8,
    xs: 12,
    mb: 1.5,
  },
  {
    id: 3,
    componentProps: {
      name: "from",
      outerLabel: "From",
      options: [
        { id: 1, label: "Male", value: "male" },
        { id: 2, label: "Female", value: "female" },
      ],
    },

    component: RHFCustomSelect,
    md: 8,
    xs: 12,
    mb: 1.5,
  },
  {
    id: 4,
    componentProps: {
      name: "to",
      //   outerLabel: (
      //     <>
      //       Last Name <span style={{ opacity: 0.7 }}>(optional)</span>
      //     </>
      //   ),
      outerLabel: "To",
    },
    component: RHFTextField,
    md: 8,
    xs: 12,
    mb: 1.5,
  },
  {
    id: 5,
    componentProps: {
      name: "subjectLine",
      outerLabel: (
        <>
          Subject Line <span style={{ color: "red" }}>*</span>
        </>
      ),
    },
    component: RHFTextField,
    md: 8,
    xs: 12,
    mb: 1.5,
  },
  {
    id: 6,
    componentProps: {
      name: "body",
      outerLabel: (
        <>
          Body <span style={{ color: "red" }}>*</span>
        </>
      ),
    },
    component: RHFEditor,
    md: 8,
    xs: 12,
    mb: 1.5,
  },
];
