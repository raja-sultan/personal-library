import { yupResolver } from "@hookform/resolvers/yup";
import React, { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSchema, defaultValues } from "./form-data";
import {
  useLazyGetJobInfoQuery,
  useUpdateJobApprovalInfoMutation,
} from "@services/jobs/create-jobs/job-info/job-info-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
// import { dndUserDataForJobApproval } from "./data";
import { displayErrorMessage, displaySuccessMessage } from "../job-info/utils";

export const JobApprovalContext = createContext<any>("");

export function JobApprovalContextProvider({
  children,
  nextStepHandler,
}): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [getJobInfo] = useLazyGetJobInfoQuery();
  const [updateJobApprovalInfo] = useUpdateJobApprovalInfoMutation();

  const [dNdUsersForJobsApproval, setDNdUsersForJobsApproval] = useState<any>(
    []
  );
  const [dNdUsersForOfferApproval, setDNdUsersForOfferApproval] = useState<any>(
    []
  );

  const [jobApprovalInfoCon, setJobApprovalInfoCon] = useState<{
    isApprovalStepModelOpen: boolean;
    isOfferStepModelOpen: boolean;
    isLoading: boolean;
    approvalsToStartRecruitingOrder: string;
    toExtendOffersToCandidateOrder: string;
    numOfApprovalRequiredForJobApproval: number;
    numOfApprovalRequiredForOfferApproval: number;
  }>({
    isApprovalStepModelOpen: false,
    isOfferStepModelOpen: false,
    isLoading: true,
    approvalsToStartRecruitingOrder: "in_order",
    toExtendOffersToCandidateOrder: "all_at_once",
    numOfApprovalRequiredForJobApproval: 0,
    numOfApprovalRequiredForOfferApproval: 0,
  });

  const methods: any = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues: async () => {
      if (!jobId) {
        setJobApprovalInfoCon((pre) => ({ ...pre, isLoading: false }));
        return defaultValues;
      }
      const { data, isError, error } = await getJobInfo({ jobId }, false);
      const jobApprovalOrder =
        data?.data?.approvals?.jobApprovals?.approvalsToStartRecruiting
          ?.order || "in_order";
      const offerApprovalOrder =
        data?.data?.approvals?.jobApprovals?.toExtendOffersToCandidate?.order ||
        "in_order";
      // setting dnd users for jon approval
      setDNdUsersForJobsApproval(
        data?.data?.approvals?.jobApprovals?.approvalsToStartRecruiting
          ?.approvalSteps ?? []
      );
      setDNdUsersForOfferApproval(
        data?.data?.approvals?.jobApprovals?.toExtendOffersToCandidate
          ?.approvalSteps ?? []
      );
      setJobApprovalInfoCon((pre) => ({
        ...pre,
        isLoading: false,
        approvalsToStartRecruitingOrder: jobApprovalOrder,
        toExtendOffersToCandidateOrder: offerApprovalOrder,
      }));
      if (isError || !data?.data?.jobInfo) {
        const {
          data: { message },
        }: any = error;
        toast.error(message);
        return defaultValues;
      }
      const { employmentType, department, office } = data.data.jobInfo;
      const { requisitionId } = data.data;

      const note = data?.data?.approvals?.note as string;
      return {
        department,
        employmentType,
        office,
        requisitionId,
        note,
      };
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const selectedValue = watch("department", "office");

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const jsonPayload = {
        note: data?.note,
        jobApprovals: {
          approvalsToStartRecruiting: {
            order: jobApprovalInfoCon?.approvalsToStartRecruitingOrder,
            numOfApprovalRequired: 2,
            approvalSteps: dNdUsersForJobsApproval,
          },
          toExtendOffersToCandidate: {
            order: jobApprovalInfoCon?.toExtendOffersToCandidateOrder,
            numOfApprovalRequired: 2,
            approvalSteps: dNdUsersForOfferApproval,
          },
        },
      };
      const res = await updateJobApprovalInfo({
        payload: jsonPayload,
        jobId,
      }).unwrap();
      // const {
      //   data: {
      //     data: { _id },
      //   },
      // }: any = res;
      // router.push(`/create-job?jobId=${_id}`);
      nextStepHandler();
      //   please create a generic util for displaying success or error message
      displaySuccessMessage(res);
    } catch (error: any) {
      displayErrorMessage(error);
    }
  });
  const stages = selectedValue?.stages?.map((stage: string) => {
    return { _id: stage, name: stage };
  });

  console.log("stages", stages);

  const approvalsToStartRecruitingOrderChangeHand = (name: string) => {
    setJobApprovalInfoCon((pre) => ({
      ...pre,
      approvalsToStartRecruitingOrder: name,
    }));
  };

  const toExtendOffersToCandidateOrderChangeHan = (name: string) => {
    setJobApprovalInfoCon((pre) => ({
      ...pre,
      toExtendOffersToCandidateOrder: name,
    }));
  };
  const removeUserFromJobApproval = (index) => {
    const dNdUsersForJobsApprovalCopy = [...dNdUsersForJobsApproval];
    dNdUsersForJobsApprovalCopy.splice(index, 1);
    setDNdUsersForJobsApproval(dNdUsersForJobsApprovalCopy);
  };
  const removeUserFromOfferApproval = (index) => {
    const dNdUsersForOfferApprovalCopy = [...dNdUsersForOfferApproval];
    dNdUsersForOfferApprovalCopy.splice(index, 1);
    setDNdUsersForOfferApproval(dNdUsersForOfferApprovalCopy);
  };
  const openApprovalStepModelToggle = () => {
    setJobApprovalInfoCon((pre) => ({
      ...pre,
      isApprovalStepModelOpen: !jobApprovalInfoCon?.isApprovalStepModelOpen,
    }));
  };

  const openOfferStepModelToggle = () => {
    setJobApprovalInfoCon((pre) => ({
      ...pre,
      isOfferStepModelOpen: !jobApprovalInfoCon.isOfferStepModelOpen,
    }));
  };

  const addUsersTodNdUsersForJobsApproval = (
    numOfApprovalRequired,
    updatedUsers
  ) => {
    setJobApprovalInfoCon((pre) => ({
      ...pre,
      numOfApprovalRequiredForJobApproval: numOfApprovalRequired,
    }));
    setDNdUsersForJobsApproval(updatedUsers);
  };

  const addUsersTodNdUsersForOfferApproval = (
    numOfApprovalRequired,
    updatedUsers
  ) => {
    setJobApprovalInfoCon((pre) => ({
      ...pre,
      numOfApprovalRequiredForOfferApproval: numOfApprovalRequired,
    }));
    setDNdUsersForOfferApproval(updatedUsers);
  };
  return (
    <JobApprovalContext.Provider
      value={{
        jobApprovalInfoCon,
        openApprovalStepModelToggle,
        openOfferStepModelToggle,
        dNdUsersForJobsApproval,
        setDNdUsersForJobsApproval,
        dNdUsersForOfferApproval,
        setDNdUsersForOfferApproval,
        removeUserFromJobApproval,
        removeUserFromOfferApproval,
        approvalsToStartRecruitingOrderChangeHand,
        toExtendOffersToCandidateOrderChangeHan,
        onSubmit,
        methods,
        isSubmitting,
        addUsersTodNdUsersForJobsApproval,
        addUsersTodNdUsersForOfferApproval,
      }}
    >
      {children}
    </JobApprovalContext.Provider>
  );
}
