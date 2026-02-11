import { useForm } from "react-hook-form";
import type { FormValues } from "./job-kickoff.types";
import {
  useLazyGetUsersEmailListQuery,
  useLazyGetUsersListQuery,
  useUpdateJobKickOffMutation,
} from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { JobKickOffFormData } from "./job-kickoff.data";
import { useTheme } from "@emotion/react";

export function useJobKickOff({ nextStepHandler, jobKickOff }: any): any {
  const theme = useTheme();
  const [UpdateJobKickOff] = useUpdateJobKickOffMutation();
  const getUsersListQuery = useLazyGetUsersListQuery();
  const getUsersEmailListQuery = useLazyGetUsersEmailListQuery();


  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const emailHiringManager = jobKickOff?.kickoff?.emailHiringManager ?? {};
  const section = jobKickOff?.kickoff?.section ?? {};
  const methods = useForm({
    defaultValues: {
      from: emailHiringManager?.from ?? null,
      sendTo: emailHiringManager?.sendTo ?? null,
      subject: emailHiringManager?.subject ?? "",
      availableToken: emailHiringManager?.availableToken ?? "",
      body: emailHiringManager?.body ?? "",
      section: {
        name: section?.name ?? "",
        description: section?.description ?? "",
        questions: section?.questions ?? [],
      },
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: FormValues) => {
    const formData = {
      emailHiringManager: {
        from: data.from,
        sendTo: data.sendTo,
        subject: data.subject,
        body: data.body,
        availableToken: data.availableToken,
      },
      section: {
        name: data.section.name,
        description: data.section.description,
        questions: data.section.questions,
      },
    };
    try {
      const res: any = await UpdateJobKickOff({
        formData: { kickoff: formData },
        jobId,
      });
      toast.success(res?.data?.message ?? `Update Successfully!`);
      nextStepHandler();
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  });

  const jobKickOffFormData = JobKickOffFormData({
    getUsersListQuery,
    getUsersEmailListQuery,
  });

  return {
    jobKickOffFormData,
    onSubmit,
    methods,
    isSubmitting,
    theme,
  };
}
