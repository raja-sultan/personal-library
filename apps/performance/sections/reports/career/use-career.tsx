"use client";
import { useGetReportsCareerQuery } from "@services/reports/reports-api";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { type CustomTableProps } from "common/components/custom-table/custom-table.types";
import { downloadCSVFile } from "@root/utils";
import { careerPlanColumns, departmentColumns, individualColumns } from "./career-columns";


interface UseEmployeesReturnType {
    filters: Filters
    selectedValue: string;
    tableData: CustomTableProps;
    setSelectedValue?: Dispatch<SetStateAction<string>>;
    handleDownload: () => void;
    handleSearch: (val: string) => void;
    handleGroupBy: (val: string) => void;
    handleMenuItemClick: (value: string) => void;
    title:string;
  }
  interface Filters {
    status: string,
    limit: number,
    offset: number,
    search?: string,
  }
  
// Define the useEmployees custom hook
export function useCareer(): UseEmployeesReturnType {
    const [selectedValue, setSelectedValue] = useState<string>("individual");
  const filterValues = { limit: 10, offset: 0, status: 'individual' };
  const [filters, setFilters] = useState<Filters>(filterValues)
  const { data: reportsCareerData, isLoading, isError, isFetching, isSuccess } = useGetReportsCareerQuery(filters);

  const handleMenuItemClick = (value: string): void => {
    setSelectedValue(value);
  };

  const onPageChange = (value: number): void => {
    setFilters({ ...filters, offset: (value - 1) * 10 });
  };

  const handleSearch = (search: string): void => {
    setFilters({ ...filters, search });
  };

  const handleGroupBy = (status: string): void => {
    setFilters({ ...filters, status });
  };

  const handleDownload = (): void => {
    downloadCSVFile("reports/career/download", `${filters?.status}-career`, {
        status: filters?.status
    });
  };

  let columns: CustomTableProps['columns'] = individualColumns;
  let data: any[] | undefined = [];
  let title = '';
  if (filters.status  === 'individual') {
      columns = individualColumns;
      data = reportsCareerData?.data?.users;
      title =  'Individual';
  } else if (filters.status  === 'department') {
      columns = departmentColumns;
      data = reportsCareerData?.data?.departments
      title ='Department';
  } else if (filters.status  === 'career_plan') {
      columns = careerPlanColumns;
      data = reportsCareerData?.data?.careerPlan;
      title ='Career plan';
  }
  const tableData: CustomTableProps = {
    data,
    columns,
    isLoading, isError, isFetching, isSuccess,
    currentPage: reportsCareerData?.data?.meta?.page,
    totalPages: reportsCareerData?.data?.meta?.pages,
    onPageChange
  }
    return {
        handleMenuItemClick,
        selectedValue,
        tableData,
        handleSearch,
        handleGroupBy,
        handleDownload,
        filters,
        title
    };
}
