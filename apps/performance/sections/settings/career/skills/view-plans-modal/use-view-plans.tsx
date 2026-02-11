import {
  useGetCareerPlansIdQuery,
  useViewCareerSkillQuery,
} from "@services/settings/career/skills/skills-api";
import { useState } from "react";

interface UseFullReportTypes {
  expandedAccordion?: string;
  handleAccordionChange: (itemId: any) => void;
  data?: any;
  careerPlansData?: any;
  isLoadingData?: boolean;
  isLoadingCareerPlans?: boolean;
}

export function useViewPlans(getCareerSkillsId): UseFullReportTypes {
  const [expandedAccordion, setExpandedAccordion] = useState<string>("");
  const handleAccordionChange = (itemId): void => {
    setExpandedAccordion(itemId === expandedAccordion ? null : itemId);
  };

  const { data } = useViewCareerSkillQuery({
    id: getCareerSkillsId,
  });
  const { data: careerPlansData, isLoading: isLoadingCareerPlans } =
    useGetCareerPlansIdQuery(
      { id: expandedAccordion },
      { skip: !expandedAccordion }
    );
  // 65deca1d083c334250bff61a
  return {
    handleAccordionChange,
    expandedAccordion,
    data,
    careerPlansData,
    isLoadingCareerPlans,
  };
}
