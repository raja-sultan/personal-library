import { useForm } from "react-hook-form";
import {
  useLazyGetCompanyLocationsListQuery,
  useLazyGetDepartmentListQuery,
} from "@services/settings/emails/emails-api";
import { PreviewExperienceData } from "./data";

export function usePreviewExperience(): any {
  const getDepartmentListQuery = useLazyGetDepartmentListQuery();
  const getCompanyLocations = useLazyGetCompanyLocationsListQuery();

  const methods = useForm({
    defaultValues: {
      department: null,
      location: null,
      employmentStatus: "",
      otherCriteria: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  async function onSubmit(): Promise<void> {}
  const editPreviewData = PreviewExperienceData({
    getDepartmentListQuery,
    getCompanyLocations,
  });
  return {
    editPreviewData,
    methods,
    handleSubmit,
    isSubmitting,
    onSubmit,
    reset,
  };
}
