import { performanceUrl, recruitingUrl } from "@root/config";
import {
  DropdownBuzzhr,
  DropdownClocklog,
  DropdownPerformance,
  DropdownRecruiting,
} from "common";

export const onboardingData = [
  {
    id: 1,
    title: "Performance",
    link: `${performanceUrl}`,
    image: <DropdownPerformance width="32px" />,
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
