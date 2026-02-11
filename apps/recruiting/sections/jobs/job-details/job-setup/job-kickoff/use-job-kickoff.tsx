import { useUpdateJobKickOffMutation } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { defaultValues } from "./job-kickoff.data";
import toast from "react-hot-toast";
import { useTheme } from "@emotion/react";
import { useGetJobDetailsAPiQuery } from "@services/jobs/create-jobs/job-details-api";

export function useJobKickOffSetUp(): any {
  const [fieldDisabled, setFieldDisabled] = useState(false);

  const theme: any = useTheme();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data: getJobKickOff, isLoading }: any = useGetJobDetailsAPiQuery({
    jobId,
  });
  const [UpdateJobKickOff] = useUpdateJobKickOffMutation();
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  const sectionData = getJobKickOff?.data?.kickoff?.section;

  const closeModal = (): void => {
    setShowBusinessModal(false);
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: "questions",
  });

  const submitHandler = handleSubmit(async (data) => {
    const formData = {
      section: {
        name: sectionData?.name,
        description: sectionData?.description,
        ...data,
      },
    };
    try {
      const res: any = await UpdateJobKickOff({
        formData: { kickoff: formData },
        jobId,
      });
      toast.success(res?.data?.message ?? `Update Successfully!`);
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  });

  useEffect(() => {
    reset({
      questions: sectionData?.questions ?? [{ question: "", answer: "" }],
    });
  }, [reset, sectionData?.questions]);
  return {
    getJobKickOff,
    sectionData,
    fields,
    isLoading,
    methods,
    isSubmitting,
    submitHandler,
    showBusinessModal,
    setShowBusinessModal,
    closeModal,
    theme,
    fieldDisabled,
    setFieldDisabled,
  };
}
