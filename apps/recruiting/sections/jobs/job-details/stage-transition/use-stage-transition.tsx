import { useGetStagesRuleQuery } from "@services/jobs/job-details/stage-transition/stage-transition-api";
import { useSearchParams } from "next/navigation";

export const useStageTransition = () => {
  const jobId = useSearchParams().get("jobId");
  console.log(jobId);

  const { data, isLoading, isError, isFetching } = useGetStagesRuleQuery({
    jobId,
  });

  return {
    data: data?.data,
    isLoading,
    isError,
    isFetching,
    jobId,
  };
};
