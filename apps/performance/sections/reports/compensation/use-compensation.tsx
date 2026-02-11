import { useState } from "react";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { CustomChip } from "common";
import { useCompensationsListQuery } from "@services/reports/reports-api";
import { downloadCSVFile } from "@root/utils";
import dayjs from "dayjs";
interface CompensationProps {
  tableData?: CustomTableProps;
  handleSearch: (value: string) => void;
  handleDownloadCSV: () => void;
  handleTimeRangeChange?: (item: any) => void;
  data?: any
}
interface IFilter {
  startDate?: string,
  endDate?: string,
  search?: string,
  limit?: number,
  offset?: number
}
const renderChipVariant = {
  Completed: "started",
  Active: "success",
};

export function useCompensation(): CompensationProps {
  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<IFilter>(filterValues);
  const { data, isLoading, isError, isFetching, isSuccess } = useCompensationsListQuery(filter);

  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value });
  }

  function handleTimeRangeChange({ startDate, endDate }: IFilter): void {
    setFilter({ ...filter, startDate, endDate })
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 })
  }

  const columns = [
    {
      accessorFn: ({ name }) => name,
      id: "name",
      cell: ({ getValue }) => (getValue() ? getValue() : "--"),
      header: () => <span>Cycle Name</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ effectiveDate }) => effectiveDate,
      id: "effectiveDate",
      cell: ({ getValue }) => (dayjs(getValue()).format('MMM DD, YYYY')) ?? "--",
      header: () => <span>Effective Date</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ eligibleEmployees }) => eligibleEmployees,
      id: "eligibleEmployees",
      cell: ({ getValue }) => (getValue() ? getValue() : "--"),
      header: () => <span>Eligible Employees</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ promotions }) => promotions,
      id: "promotions",
      cell: ({ getValue }) => (getValue() ? getValue() : "--"),
      header: () => <span>Promotions</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ totalBudget }) => totalBudget,
      id: "totalBudget",
      cell: ({ getValue }) => (getValue() ? `£ ${getValue()}` : "--"),
      header: () => <span>Total Budget</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ distributedBudget }) => distributedBudget,
      id: "distributedBudget",
      cell: ({ getValue }) => (getValue() ? `£ ${getValue()}` : "--"),
      header: () => <span>Distributed Budget</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ status }) => status,
      id: "status",
      cell: ({ getValue }) =>
        getValue() ? (
          <CustomChip
            variant={renderChipVariant[getValue()]}
            ChipProps={{
              label: getValue().charAt(0).toUpperCase() + getValue().slice(1),
            }}
          />
        ) : (
          "--"
        ),
      header: () => <span>Status</span>,
      isSortable: false,
    },


  ];

  function handleDownloadCSV(): void {
    const { endDate, search, startDate } = filter;
    downloadCSVFile("reports/compensations/download", "reports", { endDate, search, startDate });
  }

  const tableData: CustomTableProps = {
    data: data?.data?.list,
    columns,
    isLoading, isError, isFetching, isSuccess,
    onPageChange,
    totalPages: data?.data?.meta?.pages,
    currentPage: data?.data?.meta?.page,
  };

  return {
    tableData,
    handleSearch,
    handleDownloadCSV,
    handleTimeRangeChange,
    data
  };
}
