import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useLazyGetDepartmentListQuery } from "@services/settings/emails/emails-api";
import {
  CreateSetRulesData,
  setRulesDefaultValues,
  setRulesValidationSchema,
} from "./set-rules.data";

export function useSetRulesModal(): any {
  const getDepartmentListQuery = useLazyGetDepartmentListQuery();
  const methods = useForm({
    resolver: yupResolver(setRulesValidationSchema),
    defaultValues: setRulesDefaultValues,
  });
  const {
    watch,
    handleSubmit,
    // reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async () => {
    // try {
    //   const res: any = await postData({
    //     body: {
    //       postDetails: { ...formData?.postDetails },
    //       postDescription: {
    //         descriptionIntroduction:
    //           formData?.postDescription.descriptionIntroduction,
    //         body: formData?.body,
    //         descriptionConclusion:
    //           formData?.postDescription?.descriptionConclusion,
    //       },
    //       basicApplicationInformation: {
    //         ...formData?.basicApplicationInformation,
    //       },
    //       customApplicationQuestions: {
    //         ...formData?.customApplicationQuestions,
    //       },
    //       setting: { ...formData?.setting },
    //       publishToFreeJobBoards: { ...formData?.publishToFreeJobBoards },
    //     },
    //     jobId,
    //   }).unwrap();
    //   toast.success(res?.message ?? `Update Successfully!`);
    //   if (!action) {
    //     nextStepHandler();
    //   }
    // } catch (error: any) {
    //   const errMsg = error?.data?.message;
    //   toast.error(errMsg ?? "Something Went Wrong!");
    // } finally {
    //   // nextStepHandler();
    // }
  });
  const [departments] = watch(["departmentsMatches"]);
  const CreateSetRulesFormData = CreateSetRulesData({
    getDepartmentListQuery,
    getJobListQueryParams: {
      departments: departments === null ? "" : departments,
    },
  });
  return {
    CreateSetRulesFormData,
    // getOfficeListQuery,
    methods,
    onSubmit,
    isSubmitting,
    // isError,
    // isSuccess,
    // isLoading,
    // data,
  };
}
