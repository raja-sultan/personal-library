import { useLazyGetJobListQuery } from "@services/candidate/add-candidate/add-candidate-api";
import {
  useGetNotificationCountQuery,
  useGetOverallJobQuery,
} from "@services/jobs/job-details/notifications/notifications-api";
import { useForm } from "react-hook-form";

export function useJobSection(): any {
  const methods = useForm({
    defaultValues: { selectJob: null },
  });
  const getJobListQuery = useLazyGetJobListQuery();
  const {
    handleSubmit,
    // reset,
    formState: { isSubmitting },
    watch,
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
  const job: any = watch("selectJob");
  const jobId = job?._id;
  const { data } = useGetOverallJobQuery(
    {
      jobId,
      stepName: "interviewPlan",
    },
    { skip: !jobId }
  );
  const { data: NotificationsCountList } = useGetNotificationCountQuery(
    {
      jobId,
    },
    { skip: !jobId }
  );

  return {
    methods,
    onSubmit,
    isSubmitting,
    getJobListQuery,
    job,
    data,
    NotificationsCountList,
  };
}
