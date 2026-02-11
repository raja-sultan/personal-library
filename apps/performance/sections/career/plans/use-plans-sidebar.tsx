import { useGetCareerPlansQuery } from "@services/settings/career/plans/plans-api";


interface ReturnType {
  PlansData: any;
  isLoading: any;
}
export function usePlan(): ReturnType {
  const filterValues = { limit: 1000, offset: 0, listingType: "plans" };
  const { data: PlansData, isLoading } = useGetCareerPlansQuery(filterValues, {
    skip: !filterValues,
  });
  return { PlansData, isLoading };
}
