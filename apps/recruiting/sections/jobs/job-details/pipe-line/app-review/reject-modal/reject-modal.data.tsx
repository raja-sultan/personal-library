import type { rejectReasonTypes } from "./reject-modal.types";

export const rejectReason: rejectReasonTypes[] = [
  {
    id: 1,
    label: "Duplicate",
    value: "Duplicate",
  },
  {
    id: 2,
    label: "Lacking skills / qualifications",
    value: "Lacking Skills",
  },
  {
    id: 3,
    label: "Not a culture fit",
    value: "Not a Culture Fit",
  },
  {
    id: 4,
    label: "Didn't like offer",
    value: "Didn't like offer",
  },
  {
    id: 5,
    label: "Other",
    value: "Other",
  },
  {
    id: 6,
    label: "Wasn't available",
    value: "Wasn't available",
  },
];
