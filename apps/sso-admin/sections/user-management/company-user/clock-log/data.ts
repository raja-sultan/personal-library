import { RHFCheckbox, RHFSwitch } from "common";

export const clockLogData = [
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
        name: "screenCasts.screenCasts",
        label: "Screen Casts",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "screenCasts.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "screenCasts.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "screenCasts.delete",
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
        name: "scheduleReports.scheduleReports",
        label: "Schedule Reports",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "scheduleReports.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "scheduleReports.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "scheduleReports.delete",
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
        name: "workSchedule.workSchedule",
        label: "Work Schedule",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "workSchedule.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "workSchedule.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "workSchedule.delete",
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
        name: "projectTasks.projectTasks",
        label: "Project Tasks",
      },
      component: RHFSwitch,
    },
    childData: [
      {
        otherOptions: {
          name: "projectTasks.view",
          label: "View",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "projectTasks.edit",
          label: "Edit",
        },
        component: RHFCheckbox,
      },
      {
        otherOptions: {
          name: "projectTasks.delete",
          label: "Delete",
        },
        component: RHFCheckbox,
      },
    ],
  },
];
