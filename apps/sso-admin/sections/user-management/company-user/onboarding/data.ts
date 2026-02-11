import { RHFCheckbox, RHFSwitch } from "common";

export const onBoardingData = [
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
        name: "newHire.newHire",
        label: "New Hire",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "newHire.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "newHire.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "newHire.delete",
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
        name: "tasks.tasks",
        label: "Tasks",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "tasks.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "tasks.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "tasks.delete",
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
];
