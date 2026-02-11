"use client";

import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { useCompensation } from "@sections/compensation/use-compensation";
import CustomCard from "@components/custom-card";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

export function Compensation(): JSX.Element {
  const { tableData, handleSearch } = useCompensation();
  const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.COMPENSATION.COMPENSATION;
  return (
    <>
      <CustomCard
        cardProps={{ sx: { mb: 2.4 } }}
        subHeader
        cardSubHeader={{
          title: "Compensation Cycles",
          description: "Create Goal Cycles for your Company",
        }}
      />
  <PermissionProtected permission={PERMISSION.VIEW_OWN}>
      <CustomTableWithHeader
        key="Compensation"
        secondaryHeader
        secondaryHeaderProps={{
          handleSearch,
        }}
        tableProps={tableData}
      />
      </PermissionProtected>
    </>
  );
}
