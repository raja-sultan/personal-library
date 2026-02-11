import { RHFTextField } from "common";
import * as Yup from "yup";
import { ClockIcon } from "@assets/icons/clock-icon";
import type { IFormData,  } from "./updates-setting-types";

export const updateSettingSchma = Yup.object().shape({
  frequency: Yup.string().required("Frequency is required"),
  day: Yup.string().required("Day is required"),
  time: Yup.string().required("Time is required"),
});

export const defaultValues: IFormData = {
  allowManagerOverride: false,
  employeeSentiment: false,
  publicUpdates: false,
  frequency: "",
  day: "",
  time: "",
};
export const formData = [
  {
    id: "1",
    size:"medium",
    componentProps: {
      size: "small",
      name: "frequency",
      select: true,
      outerLabel: <>Frequency</>,
    },
    options: [
      { value: "weekly", label: "Weekly" },
      { value: "bi_weekly", label: "Bi-Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "quarterly", label: "Quarterly" },
    ],
    component: RHFTextField,
  },
  {
    id: "2",
    componentProps: {
      name: "day",
      size: "small",
      select: true,
      outerLabel: <>Day</>,
    },
    options: [
      { value: "monday", label: "Monday" },
      { value: "tuesday", label: "Tuesday" },
      { value: "wednesday", label: "Wednesday" },
      { value: "thursday", label: "Thursday" },
      { value: "friday", label: "Friday" },
      { value: "saturday", label: "Saturday" },
      { value: "sunday", label: "Sunday" },
    ],
    component: RHFTextField,
  },
  {
    id: "3",
    componentProps: {
      name: "time",
      size: "small",
      select: true,
      StartIcon: <ClockIcon sx={{ mr: 1 }} />,
      outerLabel: <>Time</>,
    },
    options: [
      { value: "9:00 AM", label: "9:00 AM" },
      { value: "9:30 AM", label: "9:30 AM" },
      { value: "10:30 AM", label: "10:30 AM" },
      { value: "11:00 AM", label: "11:00 AM" },
      { value: "11:30 AM", label: "11:30 AM" },
      { value: "12:30 AM", label: "12:30 AM" },
    ],
    component: RHFTextField,
  },
];
