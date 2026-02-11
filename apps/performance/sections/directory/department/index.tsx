"use client";

import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { CustomLoader } from "@components/loader";
import { useDepartmentDirectory } from "./use-department";

export function DepartmentDirectory(): JSX.Element {
  const { tableData, handleSearch } = useDepartmentDirectory();
  return (
    <CustomTableWithHeader
      secondaryHeader
      secondaryHeaderProps={{
        handleSearch,
      }}
      hideTable={tableData?.isLoading}
      tableProps={tableData}
    >
      {tableData?.isLoading && <CustomLoader />}
      </CustomTableWithHeader>
  );
}
