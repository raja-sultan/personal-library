import { RHFCheckbox, RHFSwitch } from "common";

export const recruitingData = [
  {
    id: 1,
    parentData: {
      otherOptions: {
        name: "dashboard.dashboard",
        label: "Dashboard",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "dashboard.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "dashboard.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "dashboard.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
  {
    id: 2,
    parentData: {
      otherOptions: {
        name: "jobs.jobs",
        label: "Jobs",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "jobs.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "jobs.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "jobs.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
  {
    id: 3,
    parentData: {
      otherOptions: {
        name: "candidates.candidates",
        label: "Candidates",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "candidates.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "candidates.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "candidates.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
  {
    id: 4,
    parentData: {
      otherOptions: {
        name: "crm.crm",
        label: "Crm",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "crm.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "crm.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "crm.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
  {
    id: 5,
    parentData: {
      otherOptions: {
        name: "reports.reports",
        label: "Reports",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "reports.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "reports.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "reports.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
  {
    id: 6,
    parentData: {
      otherOptions: {
        name: "configuration.configuration",
        label: "Configuration",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "configuration.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "configuration.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "configuration.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
];
