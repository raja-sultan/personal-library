import { useGetSingleCareerPlanQuery } from "@services/career/plans/plans-api";

interface ReturnType {
  singleCareerPlan: any;
  isLoading: any;
}

export function usePlanContent({ _id }): ReturnType {
  const { data: singleCareerPlan, isLoading } = useGetSingleCareerPlanQuery(
    { _id },
    { skip: _id === null }
  );

  return {
    singleCareerPlan,
    isLoading,
  };
}
