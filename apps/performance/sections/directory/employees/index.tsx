"use client";

import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { CustomLoader } from "@components/loader";
import { useEmployeesDirectory } from "./use-employees";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.DIRECTORY.DIRECTORY;
export function EmployeesDirectory(): JSX.Element {
  const { tableData, handleSearch } = useEmployeesDirectory();
  return (
    <PermissionProtected permission={PERMISSION.VIEW_LIST}>
    <CustomTableWithHeader
      secondaryHeader
      secondaryHeaderProps={{
        handleSearch,
      }}
      tableProps={tableData}
      hideTable={tableData?.isLoading}
    >
      {tableData?.isLoading && <CustomLoader />}
      </CustomTableWithHeader>
      </PermissionProtected>
  );
}
