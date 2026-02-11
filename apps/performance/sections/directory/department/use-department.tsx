"use client";
import { useState } from "react";
import { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { useGetDepartmentsQuery } from "@services/directory/directory.api";
import { CustomUserAvatar } from "@components/custom-users-multiple-avatar";

interface EmployeesTypes {
  handleSearch?: (value: string) => void;
  tableData: CustomTableProps;
}
interface Filters {
  limit: number;
  offset: number;
  search?: string;
}

export function useDepartmentDirectory(): EmployeesTypes {

  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<Filters>(filterValues);

  const { data, isLoading, isError, isFetching, isSuccess } = useGetDepartmentsQuery(filter);

  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value });
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  const columns = [
    {
      accessorFn: ({ departmentName }) => departmentName,
      id: "departmentName",
      cell: ({ getValue }) => getValue() ?? "--",
      header: () => <span>department</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ membersCount }) => membersCount,
      id: "membersCount",
      cell: ({ getValue }) => getValue() ?? "--",
      header: () => <span>Members</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ heads }) => heads,
      id: "heads",
      cell: ({ getValue }) => (<CustomUserAvatar count={2} data={getValue()} />),
      header: () => <span>department Heads</span>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: data?.data?.departments,
    columns,
    isLoading, isError, isFetching, isSuccess,
    onPageChange,
    totalPages: data?.data?.meta?.pages,
    currentPage: data?.data?.meta?.page,
  };
  return {
    tableData,
    handleSearch,
  };
}
