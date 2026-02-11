import { OneOnOnes } from "@sections/reports/1-on-1s";
import { Career } from "@sections/reports/career";
import { Compensation } from "@sections/reports/compensation";
import { Feedback } from "@sections/reports/feedback";
import { Goals } from "@sections/reports/goals";
import { Review } from "@sections/reports/review";

interface tabsTypes {
  id: string;
  comp: React.ReactNode;
}
interface ReturnType {
  tabsComponentData: tabsTypes[]
}

export function useReports(): ReturnType {

  const tabsComponentData = [
    {
      id: "1-on-1s",
      comp: <OneOnOnes />
    },
    {
      id: "Feedback",
      comp: <Feedback />
    },
    {
      id: "Career",
      comp: <Career />
    },
    {
      id: "Goals",
      comp: <Goals />
    },
    {
      id: "Review",
      comp: <Review />
    },
    {
      id: "Compensation",
      comp: <Compensation />
    },
  ];
  return {
    tabsComponentData,
  };
}
