import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { FormSchema, defaultValues } from "./manage-modal.schema";
import type { FormValues } from "./edit-email-modal.schema";
import { useUpdateJobInformationApprovalsMutation } from "@services/jobs/job-details/approvals/job-info-approvals-api";
// import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FormSchema, defaultValues } from "./edit-email-modal.schema";

export const UseEditEmailNotificationModal = ({
  setOpenCategory,
  //   manageJobData,
  //   openCategory,
}): any => {
  const searchParams = useSearchParams();
  const jobsId = searchParams.get("jobId");

  const [updateCategory, { isLoading }] =
    useUpdateJobInformationApprovalsMutation();
  const methods = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  //Submit Function
  const onSubmit = async (data) => {
    const payload = {
      body: {
        jobId: jobsId,
        ...data,
        // requisitionId: manageJobData?.requisitionId,
      },
    };

    try {
      const { message } = await updateCategory(payload).unwrap();
      setOpenCategory(false);
      reset(defaultValues);
      toast.success(message || "job information edit  successfully");
    } catch (error) {
      toast.error(error.data.message || "error occur");
    }
  };

  const handleCancel = (): void => {
    setOpenCategory(false);
  };

  //   useEffect(() => {
  //     reset({
  //       requisitionId: manageJobData?.requisitionId,
  //       department: manageJobData?.department,
  //       office: manageJobData?.office,
  //       employmentType: manageJobData?.employmentType,
  //     });
  //   }, [manageJobData, reset, openCategory]);
  return {
    handleSubmit,
    onSubmit,
    handleCancel,
    methods,
    isLoading,
  };
};
