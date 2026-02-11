import { useGetCareerVisionQuery } from "@services/settings/career/permissions/permission-api";

export function useCareerVision(): any {
  const { data } = useGetCareerVisionQuery({});
  return {
    data,
  };
}
