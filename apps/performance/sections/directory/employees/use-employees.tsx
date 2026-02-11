"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { CustomChip } from "common";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import dayjs from "dayjs";
import { useState } from "react";
import { EyeIcon } from "@assets/icons/eye-icon";
import { useRouter } from "next/navigation";
import { useGetEmployeesListQuery } from "@services/directory/directory.api";
import { renderUserImage } from "@root/utils/render-user-image";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

interface EmployeesTypes {
  handleSearch?: (value: string) => void;
  tableData: CustomTableProps;
}
interface Filters {
  limit: number;
  offset: number;
  search?: string;
}

const renderStatusChip = {
  'active': "success",
  'invited': "primary",
  'deactivated': 'warning'
};

const { PERMISSION: DIRECTORY_PERMISSION } =
  PERMISSIONS.PERFORMANCE.MODULE.DIRECTORY.DIRECTORY;
export function useEmployeesDirectory(): EmployeesTypes {
  const router = useRouter();
  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<Filters>(filterValues);

  const { data, isLoading, isError, isFetching, isSuccess } = useGetEmployeesListQuery(filter);

  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value });
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  const columns = [
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => (
        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          {renderUserImage({
            profileImage: original?.profileImage ?? '',
            firstName: original?.firstName ?? '-',
            lastName: original?.lastName ?? '-'
          })}
          <Box>
            {original?.firstName ?? '-'} {original?.lastName ?? '-'}
            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="text.secondary"
            >{original?.description}</Typography>
          </Box>
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },

    {
      accessorFn: ({ role }) => role,
      id: "role",
      cell: ({ getValue }) => <Box textTransform='capitalize'>
        {getValue()?.toLowerCase() ?? "--"}
      </Box>,
      header: () => <span>Department</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ manager }) => manager,
      id: "manager",
      cell: ({ getValue }) => `${getValue()?.firstName ?? '-'} ${getValue()?.lastName ?? '-'}`,
      header: () => <span>Manager</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ createdAt }) => createdAt,
      id: "createdAt",
      cell: ({ getValue }) =>
        getValue() ? dayjs(getValue()).format("DD MMMM, YYYY") : '--',
      header: () => <span>Start Date</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ employeeStatus }) => employeeStatus,
      id: "employeeStatus",
      cell: ({ getValue }) => (
        <CustomChip
          variant={renderStatusChip[getValue()?.toLowerCase()]}
          ChipProps={{ label: getValue() }}
        />
      ),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      header: () => <span>Actions</span>,
      id: "actions",
      cell: ({ getValue }) => {
        return (
          <PermissionProtected permission={DIRECTORY_PERMISSION.VIEW_PROFILE}>
          <IconButton onClick={() => {
            router.push(`/directory/detail?id=${getValue()}`);
          }}>
            <EyeIcon />
          </IconButton>
          </PermissionProtected>
        );
      },
    },
  ];

  const tableData: CustomTableProps = {
    data: data?.data?.employees,
    columns,
    isLoading, isError, isFetching, isSuccess,
    onPageChange,
    totalPages: data?.data?.meta?.pages,
    currentPage: data?.data?.data?.meta?.page,
  };
  return {
    tableData,
    handleSearch,
  };
}
