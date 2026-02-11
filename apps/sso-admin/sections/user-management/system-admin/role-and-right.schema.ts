import { RHFSwitch } from "common";
import * as Yup from "yup";

export const defaultValues: any = {
  dashboard: false,
  userManagement: false,
  companyManagement: false,
  auditLogs: false,
  backUps: false,
  chat: false,
};

export const schema = Yup.object({
  dashboard: Yup.boolean().required("required"),
  userManagement: Yup.boolean().required("required"),
  companyManagement: Yup.boolean().required("required"),
  auditLogs: Yup.boolean().required("required"),
  backUps: Yup.boolean().required("required"),
  chat: Yup.boolean().required("required"),
});

export const systemAdminData = [
  {
    id: 1,
    componentProps: {
      name: "dashboard",
      label: "Dashboard",
    },
    component: RHFSwitch,
  },
  {
    id: 2,
    componentProps: {
      name: "userManagement",
      label: "User Management",
    },
    component: RHFSwitch,
  },
  {
    id: 3,
    componentProps: {
      name: "companyManagement",
      label: "Company Management",
    },
    component: RHFSwitch,
  },
  {
    id: 4,
    componentProps: {
      name: "auditLogs",
      label: "Audit Logs",
    },
    component: RHFSwitch,
  },
  {
    id: 5,
    componentProps: {
      name: "backUps",
      label: "BackUps",
    },
    component: RHFSwitch,
  },
  {
    id: 6,
    componentProps: {
      name: "chat",
      label: "chat",
    },
    component: RHFSwitch,
  },
];
