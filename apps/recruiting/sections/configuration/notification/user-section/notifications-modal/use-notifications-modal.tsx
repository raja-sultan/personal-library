import {
  useGetNotificationsByUserIdQuery,
  useUpdateNotificationsByUserIdMutation,
} from "@services/jobs/job-details/notifications/notifications-api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function useNotificationModal({
  userId,
  setOpenNotificationsModal,
  setUserId,
}: any): any {
  const { data: modalData, isLoading: modalDataLoading } =
    useGetNotificationsByUserIdQuery({ userId }, { skip: userId === "" });
  const [updateNotification, { isLoading }] =
    useUpdateNotificationsByUserIdMutation();
  const methods = useForm({
    defaultValues: {
      newApplicantEmails:
        modalData?.data[0]?.notifications?.newApplicantsCount > 0,
      newInternalApplicantEmails:
        modalData?.data[0]?.notifications?.newInternalApplicantsCount > 0,
      newReferralEmails:
        modalData?.data[0]?.notifications?.newReferralsCount > 0,
      newAgencySubmissionEmails:
        modalData?.data[0]?.notifications?.newApplicantsCount > 0,
      approvedToStartRecruitingEmails:
        modalData?.data[0]?.notifications?.startRecruitingCount > 0,
      offerFullyApprovedEmails:
        modalData?.data[0]?.notifications?.offerFullyApprovedCount > 0,
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
      newApplicantEmails:
        modalData?.data[0]?.notifications?.newApplicantsCount > 0,
      newInternalApplicantEmails:
        modalData?.data[0]?.notifications?.newInternalApplicantsCount > 0,
      newReferralEmails:
        modalData?.data[0]?.notifications?.newReferralsCount > 0,
      newAgencySubmissionEmails:
        modalData?.data[0]?.notifications?.newApplicantsCount > 0,
      approvedToStartRecruitingEmails:
        modalData?.data[0]?.notifications?.startRecruitingCount > 0,
      offerFullyApprovedEmails:
        modalData?.data[0]?.notifications?.offerFullyApprovedCount > 0,
    }));
  }, [modalData, reset]);
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const res: any = await updateNotification({
        body: {
          newApplicants: data?.newApplicantEmails,
          newInternalApplicants: data?.newInternalApplicantEmails,
          newReferrals: data?.newReferralEmails,
          offerFullyApproved: data?.newAgencySubmissionEmails,
          startRecruiting: data?.approvedToStartRecruitingEmails,
          weeklyRecruitingReport: data?.offerFullyApprovedEmails,
        },
        userId,
      }).unwrap();
      setOpenNotificationsModal(false);
      reset();
      setUserId("");
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
    data: modalData,
    modalDataLoading,
    reset,
    // isError,
    // isSuccess,
    isLoading,
    // data,
  };
}
