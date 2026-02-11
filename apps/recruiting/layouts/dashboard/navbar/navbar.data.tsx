import { onBoardingUrl, performanceUrl } from "@root/config";
import {
  DropdownBuzzhr,
  DropdownClocklog,
  DropdownOnboarding,
  DropdownPerformance,
} from "common";

export const recruitingData = [
  {
    id: 1,
    title: "Performance",
    link: `${performanceUrl}`,
    image: <DropdownPerformance width="32px" />,
    comingSoon: false,
  },
  {
    id: 2,
    title: "On Boarding",
    link: `${onBoardingUrl}`,
    image: <DropdownOnboarding width="32px" />,
    comingSoon: false,
  },
  {
    id: 3,
    title: "ClockLog",
    link: "",
    image: <DropdownClocklog width="32px" />,
    comingSoon: true,
  },
  {
    id: 3,
    title: "BuzzHR",
    link: "",
    image: <DropdownBuzzhr width="32px" />,
    comingSoon: true,
  },
];
