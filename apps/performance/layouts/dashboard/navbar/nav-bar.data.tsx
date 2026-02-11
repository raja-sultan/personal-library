import { onBoardingUrl, recruitingUrl } from "@root/config";
import {
  DropdownBuzzhr,
  DropdownClocklog,
  DropdownOnboarding,
  DropdownRecruiting,
} from "common";

export const performanceData = [
  {
    id: 1,
    title: "On Boarding",
    link: `${onBoardingUrl}`,
    image: <DropdownOnboarding width="32px" />,
    comingSoon: false,
  },
  {
    id: 2,
    title: "Recruiting",
    link: `${recruitingUrl}`,
    image: <DropdownRecruiting width="32px" />,
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
