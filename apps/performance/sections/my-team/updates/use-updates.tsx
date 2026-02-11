import { useState } from "react";
import { type CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import { GoodActiveIcon } from "@assets/icons";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useGetMyTeamUpdatesQuery } from "@services/my-team/updates/updates-api";
import { renderUserImage } from "@root/utils/render-user-image";
import dayjs from "dayjs";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

interface ReturnType {
  handleSearch: (val: string) => void;
  tableData: CustomTableProps;
}

interface Filters {
  limit: number;
  offset: number;
  search?: string;
}

export function useUpdates(): ReturnType {
  const filterValue = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<Filters>(filterValue);

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetMyTeamUpdatesQuery(filter);

  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value });
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE.UPDATES.UPDATES_FOR_TEAM_MEMBERS


  const columns = [
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: () => <GoodActiveIcon width="24px" height="24px" />,
      header: () => <span />,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "update",
      cell: ({ row: { original } }: any) => {
        const fromDate = dayjs(original?.from).format("MMMM, DD");
        const toDate = dayjs(original?.to).format("MMMM, DD");
        return (
          <Box>
            {fromDate} - {toDate}
          </Box>
        );
      },

      header: () => <span>update</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ user }) => user,
      id: "name",
      cell: ({ row: { original } }: any) => {
        const firstName = original?.user?.firstName;
        const lastName = original?.user?.lastName;
        const profileImage = original?.user?.profileImage;
        return (
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            gap={2}
          >
            {renderUserImage({ profileImage, firstName, lastName })}
            <Box>
              {firstName} {lastName}
            </Box>
          </Box>
        );
      },

      header: () => <span>name</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      header: () => <span>status</span>,
      id: "status",
      cell: ({ row: { original } }: any) => {
        const status = original?.status;
        const statusDate =
          status === "Reviewed"
            ? dayjs(original?.reviewedAt).format("MMMM, DD HH:mm A")
            : dayjs(original?.publishedAt).format("MMMM, DD HH:mm A");
        return (
          <Box>
            {status} {statusDate}
          </Box>
        );
      },
    },
    {
      accessorFn: ({ _id }) => _id,
      header: () => <span />,
      id: "_id",
      cell: ({ getValue, row: { original } }) => (
        <Link
          href={`/my-team/update/view?id=${original?._id}`}
        >
          <PermissionProtected permission={original?.status === "Reviewed" ? PERMISSION.VIEW : PERMISSION.REVIEW}>
            <Button size="small" variant="outlined" id={getValue()}>
              {original?.status === "Reviewed" ? "View" : "Review"}
            </Button>
          </PermissionProtected>
        </Link>
      ),
    },
  ];

  const tableData: CustomTableProps = {
    data: data?.data?.updates,
    columns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    onPageChange,
    totalPages: data?.data?.meta?.pages,
    currentPage: data?.data?.meta?.page,
  };

  return {
    handleSearch,
    tableData,
  };
}
