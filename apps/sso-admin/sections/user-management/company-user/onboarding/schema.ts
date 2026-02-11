import * as Yup from "yup";

export const defaultValues: any = {
  dashboard: {
    dashboard: false,
    view: false,
    edit: false,
    delete: false,
  },
  newHire: {
    newHire: false,
    view: false,
    edit: false,
    delete: false,
  },
  tasks: {
    tasks: false,
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
};

export const schema = Yup.object({
  dashboard: Yup.object({
    dashboard: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  newHire: Yup.object({
    newHire: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  tasks: Yup.object({
    tasks: Yup.boolean(),
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
});
