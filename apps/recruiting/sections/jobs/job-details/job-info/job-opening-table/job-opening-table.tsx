import { SeeJobsTable } from "./data";

import { CustomTable } from "common";
import { useJobOpening } from "./use-job-opening-table";

export function JobOpeningTable(): JSX.Element {
  const { SeeJobsColumns } = SeeJobsTable();
  const { openings, isLoading, isFetching, isError, isSuccess } =
    useJobOpening();
  return (
    <CustomTable
      columns={SeeJobsColumns}
      data={openings}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      isSuccess={isSuccess}
      isPagination={false}
    />
  );
}
