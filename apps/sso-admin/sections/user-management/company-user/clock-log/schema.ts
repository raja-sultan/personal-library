import * as Yup from "yup";

export const defaultValues: any = {
  dashboard: {
    dashboard: false,
    view: false,
    edit: false,
    delete: false,
  },
  screenCasts: {
    screenCasts: false,
    view: false,
    edit: false,
    delete: false,
  },
  scheduleReports: {
    scheduleReports: false,
    view: false,
    edit: false,
    delete: false,
  },
  workSchedule: {
    workSchedule: false,
    view: false,
    edit: false,
    delete: false,
  },
  projectTasks: {
    projectTasks: false,
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
  screenCasts: Yup.object({
    screenCasts: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  scheduleReports: Yup.object({
    scheduleReports: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  workSchedule: Yup.object({
    workSchedule: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
  projectTasks: Yup.object({
    projectTasks: Yup.boolean(),
    view: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
  }),
});
