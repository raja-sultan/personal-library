import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@services/profile/profile-api";
import { useGetCompanyLocationQuery } from "@services/company-locations-api";
import { useGetDepartmentQuery } from "@services/department/department-api";

interface UseProfileTypes {
  router: any;
  getProfileData: any;
  departments: any;
  companyLocations: any;
  isDrawerOpen: string | null;
  handleDrawer: (id: string | null) => void;
  isLoading: boolean;
}

export function useProfile(): UseProfileTypes {
  const [isDrawerOpen, setIsDrawerOpen] = useState<string | null>(null);
  const { data: getProfileData, isLoading } = useGetProfileQuery({});
  const { data: departments } = useGetDepartmentQuery({
    limit: 100,
    offset: 0,
  });


  const { data: companyLocations } = useGetCompanyLocationQuery({});

  const router = useRouter();


  const handleDrawer = (id: string | null): void => {
    setIsDrawerOpen(id);
  };


  return {
    router,
    getProfileData,
    departments,
    companyLocations,
    isDrawerOpen,
    handleDrawer,
    isLoading
  };
}
