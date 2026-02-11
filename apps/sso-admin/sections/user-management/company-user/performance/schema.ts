import * as Yup from "yup";

export const defaultValues = {
  dashboard: {
    dashboard: false,
    view: false,
    edit: false,
    delete: false,
  },
  myTeam: {
    myTeam: false,
    view: false,
    edit: false,
    delete: false,
  },
  oneOnOnes: {
    oneOnOnes: false,
    view: false,
    edit: false,
    delete: false,
  },
  feedback: {
    feedback: false,
    view: false,
    edit: false,
    delete: false,
  },
  updates: {
    updates: false,
    view: false,
    edit: false,
    delete: false,
  },
  career: {
    career: false,
    view: false,
    edit: false,
    delete: false,
  },
  goals: {
    goals: false,
    view: false,
    edit: false,
    delete: false,
  },
  reviews: {
    reviews: false,
    view: false,
    edit: false,
    delete: false,
  },
  compensation: {
    compensation: false,
    view: false,
    edit: false,
    delete: false,
  },
  reports: {
    reports: false,
    view: false,
    edit: false,
    delete: false,
  },
  directory: {
    directory: false,
    view: false,
    edit: false,
    delete: false,
  },
};

export const schema = Yup.object({
  dashboard: Yup.object({
    dashboard: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  myTeam: Yup.object({
    myTeam: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  oneOnOnes: Yup.object({
    oneOnOnes: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  feedback: Yup.object({
    feedback: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  updates: Yup.object({
    updates: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  career: Yup.object({
    career: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  goals: Yup.object({
    goals: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  reviews: Yup.object({
    reviews: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  compensation: Yup.object({
    compensation: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  reports: Yup.object({
    reports: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  directory: Yup.object({
    directory: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
});
