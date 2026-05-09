import { useForm } from "react-hook-form";
import { EditPreviewData } from "./edit-preview-data";
import {
  useLazyGetCompanyLocationsListQuery,
  useLazyGetDepartmentListQuery,
} from "@services/settings/emails/emails-api";

export function useEditPreview(): any {
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
  const editPreviewData = EditPreviewData({
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
