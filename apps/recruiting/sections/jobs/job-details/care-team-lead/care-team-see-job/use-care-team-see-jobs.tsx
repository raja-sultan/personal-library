import { useGetWhoCanSeeThisJobQuery } from "@services/jobs/create-jobs/hiring-team/hiring-team-api";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CareTeamSeeJobsTable } from "./care-team-see-jobs-data";

export function UseCareTeamSeeJobs(): any {
  const { columns } = CareTeamSeeJobsTable();
  const [search, setSearch] = useState<any>();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { data, isLoading, isFetching, isSuccess, isError }: any =
    useGetWhoCanSeeThisJobQuery({
      jobId,
      params: {
        ...search,
      },
    });
  // let filterValue: any;
  // if (!isLoading) {
  //   const filterData = Object?.values(
  //     careTeamSeeJobs?.data?.hiringTeam?.jobVisibilityLevel ?? []
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
    careTeamSeeJobs: data?.data[0]?.hiringTeam?.responsiblePersons,
  };
}
