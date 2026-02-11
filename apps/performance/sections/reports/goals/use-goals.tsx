import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useGetReportsGoalsQuery } from "@services/reports/reports-api";
import { allColumns, departmentGoals, directReports } from "./goals-columns";
import { type CustomTableProps } from "common/components/custom-table/custom-table.types";
import { downloadCSVFile } from "@root/utils";

interface UseEmployeesReturnType {
  filters: Filters
  selectedValue: string;
  tableData: CustomTableProps;
  setSelectedValue?: Dispatch<SetStateAction<string>>;
  handleDownload: () => void;
  handleTimeRange: (val: any) => void;
  handleSearch: (val: string) => void;
  handleGroupBy: (val: string) => void;
  handleMenuItemClick: (value: string) => void;
}

interface Filters {
  goalType: string,
  limit: number,
  offset: number,
  search?: string,
  startDate?: string,
  endDate?: string
}

export function useGoals(): UseEmployeesReturnType {

  const [selectedValue, setSelectedValue] = useState<string>("all-goals");
  const filterValues = { limit: 10, offset: 0, goalType: 'All' };
  const [filters, setFilters] = useState<Filters>(filterValues)

  const { data: goalsData, isLoading, isError, isFetching, isSuccess } = useGetReportsGoalsQuery(filters);

  const handleMenuItemClick = (value: string): void => {
    setSelectedValue(value);
  };

  const onPageChange = (value: number): void => {
    setFilters({ ...filters, offset: (value - 1) * 10 });
  };

  const handleSearch = (search: string): void => {
    setFilters({ ...filters, search });
  };

  const handleGroupBy = (goalType: string): void => {
    setFilters({ ...filters, goalType });
  };

  const handleTimeRange = (ranges: { startDate: string, endDate: string }): void => {
    setFilters({ ...filters, startDate: ranges?.startDate, endDate: ranges?.endDate });
  };

  const handleDownload = (): void => {
    downloadCSVFile("reports/goals/download", `${filters?.goalType}-goals`, {
      goalType: filters?.goalType
    });
  };

  let columns: CustomTableProps['columns'] = allColumns;

  if (filters.goalType === 'Department') {
    columns = departmentGoals
  }
  if (filters.goalType === 'Direct Reports') {
    columns = directReports
  }


  const tableData: CustomTableProps = {
    data: goalsData?.data?.goals,
    columns,
    isLoading, isError, isFetching, isSuccess,
    currentPage: goalsData?.data?.meta?.page,
    totalPages: goalsData?.data?.meta?.pages,
    onPageChange
  }

  return {
    handleMenuItemClick,
    selectedValue,
    tableData,
    handleSearch,
    handleGroupBy,
    handleTimeRange,
    handleDownload,
    filters
  };
}
