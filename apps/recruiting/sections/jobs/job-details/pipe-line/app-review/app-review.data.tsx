import type { accordionTypes, detailsMenuTypes } from "./app-review.types";
import { ApplicationHistory } from "./application-history";
import { CustomQuestion } from "./custom-questions";
import { ReferralDetails } from "./referral-details";
import { FeedBackComponent } from "./feedback";

export const accordionData: accordionTypes[] = [
  {
    id: 1,
    title: "Feedback",
    component: <FeedBackComponent />,
  },
  {
    id: 2,
    title: "Referral Details",
    component: <ReferralDetails />,
  },
  {
    id: 3,
    title: "Custom application questions",
    component: <CustomQuestion />,
  },
  {
    id: 4,
    title: "Application History",
    component: <ApplicationHistory />,
  },
];

export const detailsMenu: detailsMenuTypes[] = [
  {
    id: 1,
    title: "Transfer to a different job",
    modal: "differentJob",
  },
  {
    id: 2,
    title: "Send Email",
    modal: "sendEmail",
  },
  // {
  //   id: 3,
  //   title: "Reject as Spam",
  //   modal: "reject",
  // },
];
