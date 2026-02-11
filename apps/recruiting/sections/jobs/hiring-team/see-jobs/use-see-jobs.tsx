import { useState } from "react";
import { seeJobsTable } from "./see-jobs-data";
import { useSearchParams } from "next/navigation";
import { useGetWhoCanSeeThisJobQuery } from "@services/jobs/create-jobs/hiring-team/hiring-team-api";

export function UseSeeJobs(): any {
  const { columns } = seeJobsTable();
  const [search, setSearch] = useState<any>();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetWhoCanSeeThisJobQuery({
      jobId,
      params: {
        ...search,
      },
    });

  // const {
  //   data: seeJobs,
  //   isLoading,
  //   isFetching,
  //   isSuccess,
  //   isError,
  // }: any = useGetHiringTeamQuery(
  //   {
  //     jobId,
  //     params: {
  //       ...search,
  //     },
  //   },
  //   { skip: jobId === null }
  // );

  // let filterValue: any;
  // if (!isLoading) {
  //   const filterData = Object?.values(
  //     seeJobs?.data?.hiringTeam?.jobVisibilityLevel ?? []
  //   );
  //   filterValue = filterData;
  // }

  return {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    columns,
    setSearch,
    seeJobs: data?.data[0]?.hiringTeam?.responsiblePersons,
  };
}
