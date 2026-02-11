import { useEffect, useState } from "react";
import { displayErrorMessage } from "@sections/jobs/job-info/utils";
import { useGetJobInfoQuery } from "@services/jobs/create-jobs/job-info/job-info-api";
import { useUpdateJobInfoTemplateStatusMutation } from "@services/jobs/job-details/job-setup/job-info/job-info-details-api";
import { useSearchParams } from "next/navigation";

export const useJobInfoDetails = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { data, isLoading, isFetching, isError, error } = useGetJobInfoQuery({
    jobId,
  });
  const [jobInfoDetailCon, setJobInfoDetailCon] = useState({
    isTemplate: data?.data?.isTemplate || false,
  });

  const [veiwAndManageInfoCon, setViewAndManageInfoCon] = useState({
    manageOpeningModal: false,
  });

  useEffect(() => {
    if (typeof data?.data?.isTemplate === "boolean") {
      setJobInfoDetailCon((pre) => ({
        ...pre,
        isTemplate: data?.data?.isTemplate,
      }));
    }
  }, [data?.data?.isTemplate]);

  const [updateJobInfoTemplateStatus] =
    useUpdateJobInfoTemplateStatusMutation();

  const jobTemplateHan = async () => {
    try {
      setJobInfoDetailCon((pre) => ({
        ...pre,
        isTemplate: !jobInfoDetailCon.isTemplate,
      }));
      await updateJobInfoTemplateStatus({
        payload: { isTemplate: !jobInfoDetailCon.isTemplate },
        jobId,
      }).unwrap();
    } catch (err) {
      setJobInfoDetailCon((pre) => ({
        ...pre,
        isTemplate: jobInfoDetailCon.isTemplate,
      }));
      displayErrorMessage(err);
    }
  };

  const viewManageModelToggle = () => {
    setViewAndManageInfoCon((pre) => ({
      ...pre,
      manageOpeningModal: !veiwAndManageInfoCon?.manageOpeningModal,
    }));
  };
  return {
    isLoading,
    isFetching,
    isError,
    error,
    jobTemplateHan,
    jobInfoDetailCon,
    veiwAndManageInfoCon,
    viewManageModelToggle,
    jobInfo: {
      ...data?.data?.jobInfo,
      note: data?.data?.approvals?.note,
      status: data?.data?.status,
      requisitionId: data?.data?.requisitionId,
    },
  };
};
