import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  createESignatureTemplateDefaultValues,
  createESignatureTemplateValidationSchema,
} from "./e-signature-template.data";

export function useESignatureTemplateModal(): any {
  const methods = useForm({
    resolver: yupResolver(createESignatureTemplateValidationSchema),
    defaultValues: createESignatureTemplateDefaultValues,
  });
  const {
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

  return {
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
