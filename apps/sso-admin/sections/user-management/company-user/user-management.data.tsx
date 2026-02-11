import { RHFAutocompleteSync, RHFTextField } from "common";
import * as Yup from "yup";

export const tabs = [
  {
    id: 1,
    label: "Performance",
  },
  {
    id: 2,
    label: "Recruiting",
  },
  {
    id: 3,
    label: "Clock Log",
  },
  {
    id: 4,
    label: "Onboarding",
  },
];

export const AddFormData = [
  {
    id: 1,
    grid: 12,
    RhfValue: {
      name: "firstName",
      fullWidth: true,
      label: "FirstName",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    grid: 12,
    RhfValue: {
      name: "lastName",
      fullWidth: true,
      label: "Last Name",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    grid: 12,
    RhfValue: {
      name: "email",
      fullWidth: true,
      label: "Email",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    grid: 12,
    RhfValue: {
      name: "defaultRole",
      fullWidth: true,
      label: "Role",
      options: [
        { id: 1, name: "SUPER ADMIN", value: "SUPER_ADMIN" },
        { id: 2, name: "COMPANY ADMIN", value: "COMPANY_ADMIN" },
        { id: 3, name: "MANAGER", value: "MANAGER" },
        {
          id: 4,
          name: "ONBOARDING COORDINATOR",
          value: "ONBOARDING_COORDINATOR",
        },
        { id: 5, name: "SITE ADMIN", value: "SITE_ADMIN" },
        { id: 6, name: "JOB ADMIN", value: "JOB_ADMIN" },
        { id: 7, name: "EMPLOYEE", value: "EMPLOYEE" },
      ],
    },
    component: RHFAutocompleteSync,
  },
];
export const AddFormDataValue = {
  firstName: "",
  lastName: "",
  email: "",
  defaultRole: null,
};
export const formSchemaModel: any = Yup.object().shape({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  email: Yup.string().required("required"),
  defaultRole: Yup.object().required("required"),
});
export const AddUserFormData = [
  {
    id: 1,
    grid: 12,
    RhfValue: {
      name: "firstName",
      fullWidth: true,
      label: "FirstName",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    grid: 12,
    RhfValue: {
      name: "lastName",
      fullWidth: true,
      label: "Last Name",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    grid: 12,
    RhfValue: {
      name: "email",
      fullWidth: true,
      label: "Email",
      disabled: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    grid: 12,
    RhfValue: {
      name: "companyName",
      fullWidth: true,
      label: "Company Name",
      disabled: true,
    },
    component: RHFTextField,
  },
  {
    id: 5,
    grid: 12,
    RhfValue: {
      multiple: true,
      name: "allowedCompany",
      fullWidth: true,
      label: "Product",
      options: [
        { id: 1, name: "Performance", value: "PERFORMANCE" },
        { id: 2, name: "Onboarding", value: "ONBOARDING" },
        { id: 3, name: "Recruiting", value: "RECRUITMENT" },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 6,
    grid: 12,
    RhfValue: {
      name: "status",
      fullWidth: true,
      label: "status",
      options: [
        { id: 1, name: "Active", value: "Active" },
        { id: 2, name: "InActive", value: "InActive" },
      ],
    },
    component: RHFAutocompleteSync,
  },
];

export const AddUserFormValue = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  allowedCompany: [],
  status: null,
};

export const formSchemaModelTwo: any = Yup.object().shape({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  email: Yup.string().required("required"),
  companyName: Yup.string().required("required"),
  allowedCompany: Yup.array().required("required"),
  status: Yup.object().required("required"),
});
