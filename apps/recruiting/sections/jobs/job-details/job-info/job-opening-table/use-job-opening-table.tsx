import { useGetJobInfoQuery } from "@services/jobs/create-jobs/job-info/job-info-api";
import { useSearchParams } from "next/navigation";

export function useJobOpening() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetJobInfoQuery({ jobId });
  return {
    openings: data?.data?.jobInfo?.openings || [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
  };
}
