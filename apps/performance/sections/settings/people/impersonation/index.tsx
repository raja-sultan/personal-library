"use client";
import React from "react";
import { useImpersonation } from "@sections/settings/people/impersonation/use-impersonation";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.IMPERSONATIONS;
export function ImpersonationSection(): JSX.Element {
  const {
    columns,
    setSearchValue,
    handleOffset,
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError, } = useImpersonation();
  return (
    <PermissionProtected permission={PERMISSION.VIEW_LOG}>
    <CustomTableWithHeader
      primaryHeader
      primaryHeaderProps={{
        title: "Impersonations",
        description: "Track login activity of impersonated user.",
      }}
      secondaryHeader
      secondaryHeaderProps={{
        handleSearch: (value: string) => {
          setSearchValue(value);
        },
      }}
      tableProps={{
        data: data?.data?.impersonations,
        columns,
        isLoading,
        isFetching,
        isError,
        isSuccess,
        isPagination: true,
        totalPages: data?.data?.meta?.pages,
        currentPage: data?.data?.meta?.page,
        onPageChange: handleOffset,
        onSortByChange: (onSortData: any) => {
          return onSortData;
        },
      }}
    />
      </PermissionProtected>
  );
}
