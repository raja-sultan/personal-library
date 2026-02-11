import { RHFCheckbox, RHFSwitch } from "common";

export const performanceData = [
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
        name: "myTeam.myTeam",
        label: "My Team",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "myTeam.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "myTeam.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "myTeam.delete",
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
        name: "oneOnOnes.oneOnOnes",
        label: "1-on-1s",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "oneOnOnes.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "oneOnOnes.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "oneOnOnes.delete",
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
        name: "feedback.feedback",
        label: "Feedback",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "feedback.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "feedback.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "feedback.delete",
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
        name: "updates.updates",
        label: "Updates",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "updates.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "updates.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "updates.delete",
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
        name: "career.career",
        label: "Career",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "career.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "career.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "career.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
  {
    id: 7,
    parentData: {
      otherOptions: {
        name: "goals.goals",
        label: "Goals",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "goals.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "goals.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "goals.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
  {
    id: 8,
    parentData: {
      otherOptions: {
        name: "reviews.reviews",
        label: "Reviews",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "reviews.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "reviews.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "reviews.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
  {
    id: 9,
    parentData: {
      otherOptions: {
        name: "compensation.compensation",
        label: "Compensation",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "compensation.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "compensation.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "compensation.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
  {
    id: 10,
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
    id: 11,
    parentData: {
      otherOptions: {
        name: "directory.directory",
        label: "Directory",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "directory.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "directory.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "directory.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
];
