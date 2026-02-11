import type { AuditLogTypes } from "./audit-log.types";

export const auditLog: AuditLogTypes[] = [
  {
    type: "search",
    FieldProps: {
      name: "search",
      placeholder: "Username",
    },
  },
  {
    type: "select",
    FieldProps: {
      name: "accountType",
      label: "Account Type",
    },
    options: [
      { label: "Company Admin", value: "COMPANY_ADMIN" },
      { label: "Super Admin", value: "SUPER_ADMIN" },
      { label: "Manager", value: "MANAGER" },
      { label: "Onboarding Coordinator", value: "ONBOARDING_COORDINATOR" },
      { label: "Site Admin", value: "SITE_ADMIN" },
      { label: "Job Admin", value: "JOB_ADMIN" },
      { label: "Employee", value: "EMPLOYEE" },
    ],
  },
];
