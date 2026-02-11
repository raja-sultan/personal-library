import {
  AccountantsPactIcon,
  AirAppleCartIcon,
  BuzzHrIcon,
  ClockLogIcon,
  FiatSignIcon,
  LearningIcon,
  OnBoardingIcon,
  PerformanceIcon,
  RecruitingIcon,
} from "common/assets/logo";
import type { HcmCardDataType } from "./hcm-card.types";

export const hcmCardData: HcmCardDataType[] = [
  {
    parentId: 1,
    name: "Talent Management",
    data: [
      {
        childId: 1,
        name: "Performance",
        checked: false,
        Icon: PerformanceIcon,
        value: "PERFORMANCE",
      },
      {
        childId: 2,
        name: "Recruiting",
        checked: false,
        Icon: RecruitingIcon,
        value: "RECRUITMENT",
      },
      {
        childId: 3,
        name: "Onboarding",
        checked: false,
        Icon: OnBoardingIcon,
        value: "ONBOARDING",
      },
      {
        childId: 4,
        name: "Learning",
        checked: false,
        Icon: LearningIcon,
        value: "",
        disabled: true,
      },
    ],
  },
  {
    parentId: 2,
    name: "HRIS",
    data: [
      {
        childId: 1,
        name: "BuzzHR",
        checked: false,
        Icon: BuzzHrIcon,
        disabled: true,
        value: "",
      },
    ],
  },
  {
    parentId: 3,
    name: "Workforce Management",
    data: [
      {
        childId: 1,
        name: "Air Applecart",
        checked: false,
        Icon: AirAppleCartIcon,
        disabled: true,
        value: "",
      },
      {
        childId: 2,
        name: "ClockLog",
        checked: false,
        Icon: ClockLogIcon,
        disabled: true,
        value: "",
      },
      {
        childId: 3,
        name: "Accountants Pact",
        checked: false,
        Icon: AccountantsPactIcon,
        disabled: true,
        value: "",
      },
      {
        childId: 4,
        name: "Fiat Sign",
        checked: false,
        Icon: FiatSignIcon,
        disabled: true,
        value: "",
      },
    ],
  },
];
