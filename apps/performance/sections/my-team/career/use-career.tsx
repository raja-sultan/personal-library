import { CareerDevelopmentIcon, CareerGrowthAreaIcon, CareerVisionIcon } from "@assets/icons";
import type { CarrerProps, HeaderCardDataType } from "./career-types";

export function useCareer(): CarrerProps {
  const headerCardData: HeaderCardDataType[] = [
    {
      id: 1,
      icon: <CareerVisionIcon />,
      title: "Career vision exercises",
      description: "Coach your reports in zooming out and clarifying their career objectives",
    },
    {
      id: 2,
      icon: <CareerDevelopmentIcon />,
      title: "Development 1:1s",
      description: "Faciliate more impactful career conversations with 1:1 templates",
    },
    {
      id: 3,
      icon: <CareerGrowthAreaIcon />,
      title: "Growth Areas",
      description: "Support your reports as they identify and track progress on areas of focus",
    },
  ];

  return {
    headerCardData,
  };
}
