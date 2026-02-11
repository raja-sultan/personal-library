import { RHFAutocompleteSync, RHFCustomSelect, RHFTextField } from "common";
import * as Yup from "yup";
import React from "react";

interface PermissionGroup {
  heading: string;
  permissions: string[];
}

export const userPersonalData = [
  {
    id: 1,
    componentProps: {
      name: "firstName",
      outerLabel: (
        <div>
          First name <span style={{ color: "red" }}>*</span>
        </div>
      ),
      size: "small",
    },
    component: RHFTextField,
    md: 4,
    link: null,
  },
  {
    id: 2,
    componentProps: {
      name: "lastName",
      outerLabel: (
        <div>
          Last name <span style={{ color: "red" }}>*</span>
        </div>
      ),
      size: "small",
    },
    component: RHFTextField,
    md: 4,
    link: null,
  },
  {
    id: 3,
    componentProps: {
      name: "email",
      disabled: true,
      outerLabel: (
        <div>
          Email <span style={{ color: "red" }}>*</span>
        </div>
      ),
      size: "small",
    },
    component: RHFTextField,
    md: 4,
    link: null,
  },
];

export const organizationData = [
  {
    id: 4,
    link: null,
    componentProps: {
      name: "employeeId",
      outerLabel: "Employee ID",
      size: "small",
      disabled: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 5,
    link: {
      label: "Configure Interviewer Tags",
      href: "/configuration/custom-options/interviewer-tags",
    },
    componentProps: {
      size: "small",
      name: "interviewerTags",
      outerLabel: "Interview Tags",
      options: [
        { id: 1, label: "Cold Outreach", value: "Cold Outreach" },
        { id: 2, label: "College Recruitment", value: "College Recruitment" },
        { id: 3, label: "Past Applicants", value: "Past Applicants" },
        { id: 4, label: "Past Employees", value: "Past Employees" },
        { id: 5, label: "Talent Community", value: "Talent Community" },
      ],
    },
    component: RHFCustomSelect,
    md: 6,
  },
  {
    id: 6,
    link: null,
    componentProps: {
      name: "department",
      size: "small",
      multiple: false,
      outerLabel: "Department",
      options: [
        { id: 1, label: "Human Resources", value: "Human Resources" },
        { id: 2, label: "Development", value: "Development" },
        { id: 3, label: "UI/UX", value: "UI/UX" },
      ],
    },
    component: RHFAutocompleteSync,
    md: 6,
  },
  {
    id: 7,
    link: null,
    componentProps: {
      name: "location",
      size: "small",
      multiple: true,
      outerLabel: "Office",
      options: [
        { id: 1, label: "Uxibridge, London", value: "Uxibridge, London" },
        { id: 2, label: "Uxibridge, London", value: "Uxibridge, London" },
      ],
    },
    component: RHFAutocompleteSync,
    md: 6,
  },
];
export const defKeys: any = {};

for (const keys of userPersonalData) {
  defKeys[keys.componentProps.name] = true;
}
for (const keys of organizationData) {
  defKeys[keys.componentProps.name] = true;
}
defKeys.department = true;

export const assignedPermissions: PermissionGroup[] = [
  {
    heading: "Developer Permissions",
    permissions: [
      "Manage job board related API Credentials",
      "Manage ALL organization's API Credentials",
      "Manage & configure web hooks",
      "Manage & configure SSO",
    ],
  },
  {
    heading: "Mange Your Company",
    permissions: [
      "Invite new users to Personnel Library & reactivate disabled users",
      "Manage company metadata",
      "Manage company email & social media templates",
      "Invite & deactivate agency recruiters",
    ],
  },
  {
    heading: "Mange Jobs",
    permissions: [
      "Create new jobs & request job approvals",
      "Manage custom fields",
      "Manage unattached prospects",
      "Create new job stage names",
      "Manage job board related API Credentials",
    ],
  },
];
export const schema: any = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("lastName is required"),
  email: Yup.string().required("Email is required"),
  employeeId: Yup.string().required("employeeId is required"),
  interviewerTags: Yup.array().required("interviewerTags is required"),
  department: Yup.object().required("Department is required"),
  location: Yup.object().required("Office is required"),
  // displayName: Yup.string().required("First Name is required"),
  // helpText: Yup.string().required("helpText is required"),
  // fieldType: Yup.object()
  //   .nullable()
  //   .test("check null", "fieldType is required", (value) => value !== null),
  // fieldGroup: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // personalLibrary: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // skipPlan: Yup.boolean(),
  // department: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // location: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // employment: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // criteria: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
});
