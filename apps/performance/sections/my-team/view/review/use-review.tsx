import { Button } from "@mui/material";
import { useGetUserReviewMemberIdQuery } from "@services/user-review/user-review-api";
import { CustomChip } from "common";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface ReturnType {
  tableData: CustomTableProps;
}

interface Filter {
  limit: number;
  offset: number;
  memberId: string | null;
}

export function useReview(): ReturnType {
  const memberId = useSearchParams().get("id");
  const filterValues = { limit: 10, offset: 0, memberId };
  const [filter, setFilter] = useState<Filter>(filterValues);
  const { data, isError, isFetching, isLoading, isSuccess } = useGetUserReviewMemberIdQuery({ filter });

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  const columns = [
    {
      accessorFn: ({ name }) => name,
      id: "name",
      cell: ({ getValue }) => getValue(),
      header: () => <>Cycle name</>,
      isSortable: false,
    },
    {
      accessorFn: ({ stage }) => stage,
      id: "stage",
      cell: ({ getValue }) => getValue(),
      header: () => <>stage</>,
      isSortable: false,
    },
    {
      accessorFn: ({ launchStatus }) => launchStatus,
      id: "launchStatus",
      cell: ({ getValue }) => <CustomChip variant="danger" ChipProps={{ label: getValue() }} />,
      header: () => <>status</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: () => <Button variant="outlined">View Details</Button>,
      header: () => <></>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: data?.data?.reviewCycle,
    columns,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    onPageChange,
    currentPage: data?.data?.meta?.page,
    totalPages: data?.data?.meta?.total,
  };

  return {
    tableData,
  };
}
