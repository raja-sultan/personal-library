import { useGetProfileQuery } from "@services/profile/profile-api";

export function useCompanyProfile(): any {
  const { data: companyProfileObj, isLoading } = useGetProfileQuery({});
  const companyProfile = companyProfileObj?.data?.company;
  return { companyProfile, isLoading };
}
