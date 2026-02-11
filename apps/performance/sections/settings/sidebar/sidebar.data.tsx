import { PeopleIcon } from "@assets/icons/people-icon";
import type { SIDEBAR } from "./sidebar.interface";
import { CompanyIcon } from "@assets/icons/company-icon";
import { SettingsIcon } from "@assets/icons/settings-icon";
import { ReviewsIcon } from "@assets/icons/reviews-icon";
import { CompensationIcon } from "@assets/icons/compensation-icon";
import { CareersIcon } from "@assets/icons/careers-icon";
import { OneOnOnesIcon } from "@assets/icons/one-on-one-icon";
import { UpdatesIcon } from "@assets/icons/updates-icon";
import { GoalsIcon } from "@assets/icons/settings-goals-icon";
import { FeedbackIcon } from "@assets/icons/settings-feedback-icon";
import { PERMISSIONS } from "@enums/permissions";

const {
  PERFORMANCE: {
    SETTING: {
      PEOPLE: {
        id: PEOPLE_MENU_ID,
        PEOPLE: EMPLOYEES,
        DEPARTMENTS,
        GROUPS,
        IMPERSONATIONS,
        PERMISSIONS: ROLES,
        USER_ATTRIBUTES,
      },
      COMPANY: { COMPANY },
      SETTINGS: {
        id: SETTINGS_MENU_ID,
        SETTINGS: { PERMISSION: settingsPermission },
      },
      REVIEWS: { id: REVIEWS_MENU_ID, REVIEW_CYCLES, TEMPLATES, QUESTIONS },
      CAREER: {
        id: CAREER_MENU_ID,
        CAREER_PLANS,
        // CAREER_GROUPS,
        // TEMPLATES:careerTemplates,
        SKILLS,
        // CATEGORY,
        // LIBRARY
      },
    },
  },
} = PERMISSIONS;

export const sidebarData: SIDEBAR[] = [
  {
    id: "1",
    heading: "Organisation",
    subData: [
      {
        id: "1",
        name: "People",
        permissionId: PEOPLE_MENU_ID,
        icon: <PeopleIcon sx={{ color: "#98A2B3" }} />,
        subLinks: [
          {
            id: "1",
            name: "Employees",
            link: "/settings/employees",
            permissionId: EMPLOYEES.id,
          },
          {
            id: "2",
            name: "Departments",
            link: "/settings/departments",
            permissionId: DEPARTMENTS.id,
          },
          {
            id: "3",
            name: "Groups",
            link: "/settings/groups",
            permissionId: GROUPS.id,
          },
          {
            id: "4",
            name: "Impersonation",
            link: "/settings/impersonation",
            permissionId: IMPERSONATIONS.id,
          },
          {
            id: "5",
            name: "Permissions",
            link: "/settings/permissions",
            permissionId: ROLES.id,
          },
          {
            id: "6",
            name: "User Attributes",
            link: "/settings/user-attributes",
            permissionId: USER_ATTRIBUTES.id,
          },
        ],
      },
      {
        id: "2",
        name: "Company",
        permissionId: COMPANY.id,
        icon: <CompanyIcon sx={{ color: "#98A2B3" }} />,
        link: "/settings/company",
      },
      {
        id: "3",
        name: "Settings",
        permissionId: SETTINGS_MENU_ID,
        icon: <SettingsIcon sx={{ color: "#98A2B3" }} />,
        subLinks: [
          // {
          //   id: "1",
          //   name: "Integration",
          //   link: "/settings/integration",
          //   permissionId: settingsPermission.INTEGRATION.id,
          // },
          // {
          //   id: "2",
          //   name: "Notifications",
          //   link: "/settings/notifications",
          //   permissionId: settingsPermission.NOTIFICATIONS.id,
          // },
          {
            id: "3",
            name: "Terms of service",
            link: "/settings/account-status",
            permissionId: settingsPermission.ACCOUNT.id,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    heading: "Products",
    subData: [
      {
        id: "4",
        name: "Reviews",
        permissionId: REVIEWS_MENU_ID,
        icon: <ReviewsIcon sx={{ color: "#98A2B3" }} />,
        subLinks: [
          {
            id: "1",
            name: "Review Cycles",
            link: "/settings/reviews/review-cycles",
            permissionId: REVIEW_CYCLES.id,
          },
          {
            id: "2",
            name: "Templates",
            link: "/settings/reviews/templates",
            permissionId: TEMPLATES.id,
          },
          {
            id: "3",
            name: "Questions",
            link: "/settings/reviews/questions",
            permissionId: QUESTIONS.id,
          },
        ],
      },
      {
        id: "5",
        name: "Career",
        icon: <CareersIcon sx={{ color: "#98A2B3" }} />,
        permissionId: CAREER_MENU_ID,
        subLinks: [
          {
            id: "1",
            name: "Plans",
            link: "/settings/career/plans",
            permissionId: CAREER_PLANS.id,
          },
          {
            id: "2",
            name: "Skills",
            link: "/settings/career/skills",
            permissionId: SKILLS.id,
          },
          {
            id: "3",
            name: "Permissions",
            link: "/settings/career/permissions",
            // permissionId: CAREER_GROUPS.id,
          },
        ],
      },
      {
        id: "6",
        name: "Goals",
        icon: <GoalsIcon sx={{ color: "#98A2B3" }} />,
        subLinks: [
          {
            id: "1",
            name: "Goals Cycles",
            link: "/settings/goals/goals-cycles",
          },
        ],
      },
      {
        id: "7",
        name: "Compensation",
        icon: <CompensationIcon sx={{ color: "#98A2B3" }} />,
        subLinks: [
          {
            id: "1",
            name: "Employees Pay",
            link: "/settings/compensation/employees-pay",
          },
          {
            id: "2",
            name: "Compensation Bands",
            link: "/settings/compensation/compensation-bands",
          },
          { id: "3", name: "Compensation Cycles", link: "/settings/compensation/compensation-cycle" },
        ],
      },
      {
        id: "8",
        name: "1 on 1 s",
        icon: <OneOnOnesIcon sx={{ color: "#98A2B3" }} />,
        subLinks: [
          { id: "1", name: "1 on 1 logs", link: "/settings/one-on-ones/logs" },
          {
            id: "2",
            name: "Templates",
            link: "/settings/one-on-ones/templates",
          },
          { id: "3", name: "Settings", link: "/settings/one-on-ones/settings" },
        ],
      },
      {
        id: "9",
        name: "Feedback",
        icon: <FeedbackIcon sx={{ color: "#98A2B3" }} />,
        subLinks: [
          { id: "1", name: "Feedback Log", link: "/settings/feedback/logs" },
          { id: "2", name: "Settings", link: "/settings/feedback/settings" },
        ],
      },
      {
        id: "10",
        name: "Updates",
        icon: <UpdatesIcon sx={{ color: "#98A2B3" }} />,
        subLinks: [
          { id: "1", name: "Updates log", link: "/settings/updates/log" },
          { id: "2", name: "Settings", link: "/settings/updates/settings" },
        ],
      },
    ],
  },
];
