import { RHFDatePicker, RHFTimePicker } from "@root/../../packages/common";

export const formData = [
  {
    id: "1",
    components: [
      {
        id: "02",
        componentProps: {
          name: "launchDate",
          variant: "outlined",
          outerLabel: "Launch Date",
          disablePast: true,
        },
        component: RHFDatePicker,
      },
      {
        id: "03",
        componentProps: {
          name: "launchTime",
          variant: "outlined",
          outerLabel: "Launch Time",
          disablePast: true,
        },
        component: RHFTimePicker,
      },
    ],
  },
  {
    id: "2",
    components: [
      {
        id: "04",
        componentProps: {
          name: "reminder",
          variant: "outlined",
          outerLabel: "Reminder",
          disablePast: true,
        },
        component: RHFDatePicker,
      },
      {
        id: "05",
        componentProps: {
          name: "reminderTime",
          variant: "outlined",
          outerLabel: "Reminder Time",
          disablePast: true,
        },
        component: RHFTimePicker,
      },
    ],
  },
  {
    id: "3",
    components: [
      {
        id: "06",
        componentProps: {
          name: "endDate",
          variant: "outlined",
          outerLabel: "End Date",
          disablePast: true,
        },
        component: RHFDatePicker,
      },
      {
        id: "07",
        componentProps: {
          name: "endTime",
          variant: "outlined",
          outerLabel: "End Time",
          disablePast: true,
        },
        component: RHFTimePicker,
      },
    ],
  },
];
