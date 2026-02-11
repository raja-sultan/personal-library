import type {
  applicationReviewsTypes,
  // jobStagesTypes,
  pipeLineTypes,
} from "./pipe-line.types";

export const applicationReviews: applicationReviewsTypes[] = [
  {
    id: 1,
    status: "Referral",
    title: "Darrell Steward",
    feedback: "Collect Feedback",
    day: "1d",
    link: false,
    slot: "application-review",
  },
  {
    id: 2,
    status: "Referral",
    title: "Arlene McCoy",
    feedback: "Collect Feedback",
    day: "2d",
    link: false,
    slot: "application-review",
  },
  {
    id: 3,
    status: "Referral",
    title: "Ronald Richards",
    feedback: "Collect Feedback",
    day: "4d",
    link: false,
    slot: "offer",
  },
  {
    id: 4,
    status: "Referral",
    title: "Theresa Webb",
    feedback: "Collect Feedback",
    day: "3d",
    link: false,
    slot: "application-review",
  },
];

export const visualPipeline: pipeLineTypes = {
  type: "select",
  FieldProps: {
    name: "",
    label: "Sort By: Priority",
  },
  options: [
    {
      label: "Sort by: Last Activity (new to old)",
      value: "LAST_ACTIVITY_NEW_TO_OLD",
    },
    {
      label: "Sort by: Last Activity (old to new)",
      value: "LAST_ACTIVITY_OLD_TO_NEW",
    },
    { label: "Sort by: Priority (A - Z)", value: "NAME_A_TO_Z" },
    { label: "Sort by: Priority (Z - A)", value: "NAME_Z_TO_A" },
    {
      label: "Sort by: Date Applied (old to new)",
      value: "DATE_APPLIED_OLD_TO_NEW",
    },
    {
      label: "Sort by: Date Applied (new to old)",
      value: "DATE_APPLIED_NEW_TO_OLD",
    },
  ],
};
// export const jobStages: jobStagesTypes[] = [
//   {
//     id: 0,
//     title: "Application Review - ",
//     numbers: "00",
//     slot: "application-review",
//   },
//   {
//     id: 1,
//     title: "Preliminary Phone Screen - ",
//     numbers: "00",
//     slot: "preliminary-phone-screen",
//   },
//   {
//     id: 2,
//     title: "Background Check - ",
//     numbers: "00",
//     slot: "background-check",
//   },
//   {
//     id: 3,
//     title: "Phone Interview - ",
//     numbers: "00",
//     slot: "phone-interview",
//   },
//   {
//     id: 4,
//     title: "Face to Face - ",
//     numbers: "00",
//     slot: "face-to-face",
//   },
//   {
//     id: 5,
//     title: "Offer - ",
//     numbers: "00",
//     slot: "offer",
//   },
// ];
