import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { CustomChip, TableIconActions } from "common";
import { MenuItem, Typography, Box } from "@mui/material";
import { renderUserImage } from "@root/utils/render-user-image";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import { useMyTeamOneOnOnesQuery } from "@services/my-team/my-team-api";

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

export function useOneOnOnesTeam(): ReturnType {
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
  } = useMyTeamOneOnOnesQuery(filter);

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
        const firstName = original?.firstName;
        const lastName = original?.lastName;
        const employeeTitle = original?.employeeTitle;
        const profileImage = original?.profileImage;
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
      accessorFn: ({ row }) => row?.lastOneOneDate,
      id: "lastOneOneDate",
      cell: ({ row: { original } }) =>
        original?.lastOneOneDate ? dayjs(original.lastOneOneDate).format("D MMMM YYYY") : "-",
      header: () => <span>Last 1-on-1</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row?.nextOneOneDate,
      id: "nextOneOneDate",
      cell: ({ row: { original } }) => (
        <CustomChip
          variant={original?.nextOneOneDate === null ? "warning" : "success"}
          ChipProps={{
            label: original?.nextOneOneDate
              ? dayjs(original.nextOneOneDate).format("D MMMM YYYY")
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
            <MenuItem
              onClick={() => {
                route.push(`/one-on-ones/view-history?userId=${original?._id}&type=team-history`);
              }}
            >
              View History
            </MenuItem>
          </TableIconActions>
        );
      },
    },
  ];

  const tableData: CustomTableProps = {
    data: oneOneOnesDATA?.data?.users,
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
