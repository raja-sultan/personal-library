import { useViewEventsColumns } from "./data";

import { CustomTable } from "common";
import { useViewEvents } from "./use-view-events-table";

export function ViewEventsTable(): JSX.Element {
  const { viewEventsTableColumns } = useViewEventsColumns();
  const {
    openings,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    totalPages,
    currentPage,
    setParams,
  } = useViewEvents();
  return (
    <CustomTable
      columns={viewEventsTableColumns}
      data={openings}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      isSuccess={isSuccess}
      isPagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={(onPageData: any) => {
        setParams({
          page: onPageData,
          offset: (onPageData - 1) * 10,
        });
      }}
    />
  );
}
