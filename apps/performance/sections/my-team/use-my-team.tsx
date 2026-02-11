import { useState } from "react";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import { Box, IconButton } from "@mui/material";
import { EyeIcon } from "@assets/icons/eye-icon";
import { useRouter } from "next/navigation";
import { GlobalAvatar } from "@components/global-avatar";
import { useGetMyTeamQuery } from "@services/my-team/my-team-api";

interface ReturnType {
  tableData?: CustomTableProps;
}

export function useMyTeam(): ReturnType {
  const router = useRouter();

  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<any>(filterValues);

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  const { data: myTeamData, isLoading, isFetching } = useGetMyTeamQuery(filter);

  const columns = [
    {
      accessorFn: (row) =>
        `${row?.original?.firstName} ${row?.original?.lastName}`,
      id: "employeeName",
      cell: ({ row: { original } }: any) => (
        <Box display="flex" alignItems="center" gap={2}>
          <GlobalAvatar
            imgUrl={original?.profileImage}
            firstName={original?.firstName}
            lastName={original?.lastName}
          />
          {`${original?.firstName} ${original?.lastName}`}
        </Box>
      ),
      header: () => <span>Employee Name</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ employeeTitle }) => employeeTitle,
      id: "employeeTitle",
      cell: ({ getValue }) => <Box>{getValue() ? getValue() : "--"}</Box>,

      header: () => <>Job Title</>,
      isSortable: false,
    },
    {
      accessorFn: (row) =>
        `${row?.original?.departmentName} ${row?.original?.departmentName}`,
      id: "department",
      cell: ({ row: { original } }: any) => (
        <Box display="flex" alignItems="center" gap={2}>
          {original?.department?.departmentName
            ? original?.department?.departmentName
            : "--"}
        </Box>
      ),
      header: () => <>Department</>,
      isSortable: false,
    },
    {
      accessorFn: (row) =>
        `${row?.original?.manager?.firstName} ${row?.original?.manager?.lastName}`,
      id: "manager",
      cell: ({ row: { original } }: any) => (
        <Box display="flex" alignItems="center" gap={2}>
          <GlobalAvatar
            imgUrl={original?.manager?.profileImage}
            firstName={original?.manager?.firstName}
            lastName={original?.manager?.lastName}
          />
        </Box>
      ),

      header: () => <>manager</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }: any) => (
        <IconButton
          onClick={() => {
            router.push(`/my-team/view?id=${original?._id}`);
          }}
        >
          <EyeIcon />
        </IconButton>
      ),
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: myTeamData?.data?.users,
    columns,
    isSuccess: true,
    isLoading,
    isFetching,
    isPagination: true,
    onPageChange,
    currentPage: myTeamData?.data?.meta?.page,
    totalPages: myTeamData?.data?.meta?.pages,
  };

  return {
    tableData,
  };
}
