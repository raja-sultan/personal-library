import { useState } from "react";
import { type CustomTableProps } from "common/components/custom-table/custom-table.types";
import { downloadCSVFile } from "@root/utils";
import { useGetFeedbacksQuery } from "@services/reports/reports-api";
import type { Dispatch, SetStateAction } from "react";
import { departmentFeedbackColumns, individualFeedbackColumns, managerFeedbacksColumns, roleFeedbacksColumns } from "./feedback-columns";


interface UseFeedbackReturnType {
  filters: Filters
  selectedValue: string;
  tableData: CustomTableProps;
  setSelectedValue?: Dispatch<SetStateAction<string>>;
  handleDownload: () => void;
  handleTimeRange: (val: any) => void;
  handleSearch: (val: string) => void;
  handleGroupBy: (val: string) => void;
  handleMenuItemClick: (value: string) => void;
  badgeData:{
    title:string;
    value:string;
    id:string;
  }[]
}

interface Filters {
  groupBy: string,
  limit: number,
  offset: number,
  search?: string,
  startDate?: string,
  endDate?: string
}
export function useFeedback(): UseFeedbackReturnType {

  const [selectedValue, setSelectedValue] = useState<string>("Individual");
  const filterValues = { limit: 10, offset: 0, groupBy: 'Individual' };
  const [filters, setFilters] = useState<Filters>(filterValues)
  const { data: isData, isError, isLoading, isFetching, isSuccess } = useGetFeedbacksQuery(filters);

  const badgeData = [
    {
      id:"1",
      title: 'Given',
      value: isData?.data?.totalGiven,
    }, {
      id:"2",
      title: 'Received',
      value: isData?.data?.totalReceived,
    }]


    const handleMenuItemClick = (value: string): void => {
      setSelectedValue(value);
    };
  
    const onPageChange = (value: number): void => {
      setFilters({ ...filters, offset: (value - 1) * 10 });
    };
  
    const handleSearch = (search: string): void => {
      setFilters({ ...filters, search });
    };
  
    const handleGroupBy = (groupBy: string): void => {
      setFilters({ ...filters, groupBy });
    };

    const handleTimeRange = (ranges: { startDate: string, endDate: string }): void => {
      setFilters({ ...filters, startDate: ranges?.startDate, endDate: ranges?.endDate });
    };

  const handleDownload = async (): Promise<void> => {
    await downloadCSVFile('reports/feedbacks/download', 'reports-feedback', filters);
  }

  let columns: CustomTableProps['columns'] = individualFeedbackColumns;
  if (filters.groupBy  === 'Individual') 
    {
      columns = individualFeedbackColumns;
    }
    
  if (filters.groupBy  === 'Department') 
    {
      columns = departmentFeedbackColumns;
    } 
  
   if (filters.groupBy  === 'Manager') {
      columns = managerFeedbacksColumns;
  } 
  
   if (filters.groupBy  === 'Role') {
      columns = roleFeedbacksColumns;
  }
  const tableData: CustomTableProps = {
    columns,
    data: isData?.data?.list,
    isError, isLoading, isFetching, isSuccess,
    onPageChange,
    totalPages: isData?.data?.meta?.pages,
    currentPage: isData?.data?.meta?.page,
  }

  return {
    handleMenuItemClick,
    selectedValue,
    tableData,
    handleSearch,
    handleGroupBy,
    handleTimeRange,
    handleDownload,
    filters,
    badgeData
    
  };
}