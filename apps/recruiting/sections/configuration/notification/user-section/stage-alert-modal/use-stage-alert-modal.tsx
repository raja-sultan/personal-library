import {
  useGetStageAlertByUserIdQuery,
  useUpdateStageAlertByUserIdMutation,
} from "@services/jobs/job-details/notifications/notifications-api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function useStageAlertModal({
  setOpenStageAlertModal,
  stageId,
  setStageId,
}: any): any {
  const {
    data: modalData,
    isLoading: modalDataLoading,
    isFetching,
  } = useGetStageAlertByUserIdQuery(
    { userId: stageId },
    { skip: stageId === "" }
  );
  const [updateNotification, { isLoading }] =
    useUpdateStageAlertByUserIdMutation();
  const methods = useForm({
    defaultValues: {
      "Application Review": "0",
      "Preliminary Phone Screen": "0",
      "Phone Interview": "0",
      "Hiring Manager Review": "0",
      "Background Check": "0",
      "Face To Face": "0",
      Offer: "0",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...modalData?.data?.stageDuration,
    }));
  }, [modalData, reset]);
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const res: any = await updateNotification({
        body: data,
        userId: stageId,
      }).unwrap();
      setOpenStageAlertModal(false);
      reset({
        "Application Review": "0",
        "Preliminary Phone Screen": "0",
        "Phone Interview": "",
        "Hiring Manager Review": "0",
        "Background Check": "0",
        "Face To Face": "0",
        Offer: "0",
      });
      setStageId("");
      toast.success(res?.message ?? `Update Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    } finally {
      // nextStepHandler();
    }
  });
  return {
    methods,
    onSubmit,
    isSubmitting,
    modalDataLoading,
    reset,
    // isError,
    // isSuccess,
    isLoading,
    isFetching,
    // data,
  };
}
