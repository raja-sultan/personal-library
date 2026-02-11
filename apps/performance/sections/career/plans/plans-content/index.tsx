"use client";
import CustomCard from "@components/custom-card";
import { CustomCareersPlans } from "@components/custom-career-plans";
// import { plansData, columns } from "./plans.data";
import { usePlanContent } from "./use-plan-content";

export function Plans({ _id, handleNextTab, handleClickFromParent }): JSX.Element {
  const { singleCareerPlan, isLoading } = usePlanContent({ _id });

  return (
    <CustomCard>
      <CustomCareersPlans
        isLoading={isLoading}
        data={singleCareerPlan}
        handleNextTab={handleNextTab}
        getData={handleClickFromParent}
      />
    </CustomCard>
  );
}
