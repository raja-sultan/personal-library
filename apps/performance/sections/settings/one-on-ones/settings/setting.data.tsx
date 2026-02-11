import { LimitOneOnOnes } from "./accordion-components/limit-1-on-1s";
import { RecurringDiscussionPoints } from "./accordion-components/recurring-discussion-points";
import { SuggestedDiscussionPoints } from "./accordion-components/suggested-discussion-points";
import { ConfirmationEmail } from "./accordion-components/confirmation-email";
import { PreMeetingReminder } from "./accordion-components/pre-meeting-reminder";
import type { oneOnOneSettingEmailFields } from "./setting.type";
import * as Yup from "yup";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING._1_ON_1S.SETTINGS;


export const settingsData = [
  {
    _id: '1',
    name: "Limit 1 on 1s",
    component: LimitOneOnOnes,
    permission: PERMISSION.LIMIT_SETTINGS,
    // switch: false,
  },
  {
    _id: '2',
    name: "Recurring Discussion points (company default)",
    component: RecurringDiscussionPoints,
    permission: PERMISSION.RECURRING_POINTS,
    // switch: false,
  },
  {
    _id: '3',
    name: "Suggested Discussion points",
    component: SuggestedDiscussionPoints,
    permission: PERMISSION.SUGGESTED_POINTS,
    // switch: false,
  },
  {
    _id: '4',
    name: "Confirmation email",
    component: ConfirmationEmail,
    switch: true,
    type: 'confirm',
    permission: PERMISSION.CONFIRMATION_EMAIL,
  },
  {
    _id: '5',
    name: "Pre-meeting reminder",
    component: PreMeetingReminder,
    switch: true,
    type: 'meeting',
    permission: PERMISSION.DEFAULT_REMINDER,

  },
];
export const modalData = {
  "Confirmation email": {
    name: "Send Email",
    repeatReminder: false,
    subject: "Write Your Subject here!",
    body: "Write Detailed Email.",
  },
  "Pre-meeting reminder": {
    name: "Send Reminder",
    repeatReminder: true,
    subject: "Write Your Subject here!",
    body: "Write Detailed Reminder Email.",
  },
};

export const oneOnOneSettingEmailSchema = Yup.object().shape({
  limitOneOnOne: Yup.string(),
  reminderMailSchedule: Yup.string(),
  subjectField: Yup.string().required("Field is required"),
  bodyField: Yup.string().required("Field is required"),
});

export const defaultValues: oneOnOneSettingEmailFields = {
  limitOneOnOne: '1',
  reminderMailSchedule: "minute before",
  subjectField: "",
  bodyField: "",
};
