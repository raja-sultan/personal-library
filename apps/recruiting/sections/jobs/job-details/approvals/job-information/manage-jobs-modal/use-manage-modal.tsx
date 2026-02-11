import { useUpdateJobInformationApprovalsMutation } from "@services/jobs/job-details/approvals/job-info-approvals-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export const UseManageModal = ({ setOpenCategory, manageJobData }): any => {
  const searchParams = useSearchParams();
  const jobsId = searchParams.get("jobId");

  const [updateCategory, { isLoading }] =
    useUpdateJobInformationApprovalsMutation();

  //Submit Function
  const onSubmit = async (data) => {
    const payload = {
      body: {
        jobId: jobsId,
        requisitionId: manageJobData?.requisitionId,
        department: data?.department._id,
        office: data?.office._id,
        employmentType: data?.employmentType,
      },
    };

    try {
      const { message } = await updateCategory(payload).unwrap();
      setOpenCategory(false);
      toast.success(message || "job information edit  successfully");
    } catch (error) {
      toast.error(error.data.message || "error occur");
    }
  };

  const handleCancel = (): void => {
    setOpenCategory(false);
  };

  return {
    onSubmit,
    handleCancel,
    isLoading,
  };
};
