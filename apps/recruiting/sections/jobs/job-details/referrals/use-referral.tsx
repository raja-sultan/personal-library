import { useState } from "react";
import { useGetReferralApiQuery } from "@services/jobs/job-details/referral/referral-api";
import { useRouter } from "next/navigation";

export function useReferral(): any {
  const router = useRouter();
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const paramsData = {
    search: "",
    limit: 10,
    offset: params.offset,
  };
  const {
    data: getReferralData,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetReferralApiQuery(paramsData);
  return {
    getReferralData,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setParams,
    router,
  };
}
