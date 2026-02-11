import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { CustomChip, TableIconActions } from "common";
import { MenuItem, Typography, Box } from "@mui/material";
import { renderUserImage } from "@root/utils/render-user-image";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { useGetOneOnOnesListQuery } from "@services/one-on-ones/one-on-ones-api";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";

import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE._1_ON_1S._1_ON_1S;

interface ReturnType {
  tableData: CustomTableProps;
  handleSearch: (search: string) => void;
  initialData?: any;
}
interface Filter {
  limit: number;
  offset: number;
  search?: string;
}

export function useOneOnOnes(): ReturnType {
  const route = useRouter();
  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<Filter>(filterValues);
  const [initialData, setInitialData] = useState(null);

  // GET ONE ON ONES LIST
  const {
    data: oneOneOnesDATA,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetOneOnOnesListQuery(filter);

  useEffect(() => {
    setInitialData(oneOneOnesDATA);
  }, []);

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  function handleSearch(search: string): void {
    setFilter({ ...filter, search });
  }

  const columns = [
    {
      accessorFn: ({ _id }) => _id,
      id: "oneOnOneWith",
      cell: ({ row: { original } }: any) => {
        const firstName = original?.userDetail?.firstName;
        const lastName = original?.userDetail?.lastName;
        const employeeTitle = original?.userDetail?.employeeTitle;
        const profileImage = original?.userDetail?.profileImage;
        return (
          <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
            {renderUserImage({ profileImage, firstName, lastName })}
            <Box>
              {firstName} {lastName}
              <Typography variant="subtitle2" fontWeight={400} color="text.secondary">
                {employeeTitle}
              </Typography>
            </Box>
          </Box>
        );
      },
      header: () => <span>1 on 1 with...</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row?.pastOccurrence,
      id: "pastOccurrence",
      cell: ({ row: { original } }) =>
        original?.pastOccurrence ? dayjs(original.pastOccurrence).format("D MMMM YYYY") : "-",
      header: () => <span>Last 1-on-1</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row?.nextOccurrence,
      id: "nextOccurrence",
      cell: ({ row: { original } }) => (
        <CustomChip
          variant={original?.nextOccurrence === null ? "warning" : "success"}
          ChipProps={{
            label: original?.nextOccurrence
              ? dayjs(original.nextOccurrence).format("D MMMM YYYY")
              : "Not scheduled",
          }}
        />
      ),
      header: () => <span>next 1-on-1</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row._id,
      header: () => <span>Actions</span>,
      id: "Actions",
      cell: ({ row: { original } }) => {
        return (
          <TableIconActions icon={<TableActionsIcon />}>
            <PermissionProtected permission={PERMISSION.VIEW}>
              <MenuItem
                onClick={() => {
                  route.push(`/one-on-ones/view-history?id=${original?._id}`);
                }}
              >
                View History
              </MenuItem>
            </PermissionProtected>
          </TableIconActions>
        );
      },
    },
  ];

  const tableData: CustomTableProps = {
    data: oneOneOnesDATA?.data?.oneOnOnes,
    columns,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    onPageChange,
    currentPage: oneOneOnesDATA?.data?.meta?.page,
    totalPages: oneOneOnesDATA?.data?.meta?.pages,
  };

  return {
    tableData,
    handleSearch,
    initialData,
  };
}
