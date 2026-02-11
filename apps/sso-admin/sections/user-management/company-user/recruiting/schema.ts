import * as Yup from "yup";

export const defaultValues: any = {
  dashboard: {
    dashboard: false,
    view: false,
    edit: false,
    delete: false,
  },
  jobs: {
    jobs: false,
    view: false,
    edit: false,
    delete: false,
  },
  candidates: {
    candidates: false,
    view: false,
    edit: false,
    delete: false,
  },
  crm: {
    crm: false,
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
  configuration: {
    configuration: false,
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
  jobs: Yup.object({
    jobs: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  candidates: Yup.object({
    candidates: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  crm: Yup.object({
    crm: Yup.boolean(),
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
  configuration: Yup.object({
    configuration: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
});
