import { useGetCRMEventsForTableQuery } from "@services/crm/events/crm-events-api";
import { useState } from "react";

export function useViewEvents() {
  const [params, setParams] = useState<{ page: number; offset: number }>({
    page: 1,
    offset: 0,
  });
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetCRMEventsForTableQuery({
      params: { limit: 10, offset: params.offset },
    });

  return {
    openings: data?.data?.events || [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    totalPages: data?.data?.meta?.pages ?? 0,
    currentPage: data?.data?.meta?.page ?? 1,
    setParams,
  };
}
