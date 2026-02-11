import { useState } from "react";
import { CustomChip } from "common";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { useReviewListQuery } from "@services/reports/reports-api";
import dayjs from "dayjs";
import { Box } from "@mui/material";
interface CompensationProps {
  tableData?: CustomTableProps;
  handleSearch: (value: string) => void;
  handleFilter: (value: string) => void;
}
interface IFilter {
  limit: number;
  offset: number;
  search?: string;
  launchStatus?: string;
}

const renderChipVariant = {
  Ended: "started",
  Active: "success",
};

export function useReview(): CompensationProps {
  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<IFilter>(filterValues);
  const { data, isLoading, isError, isFetching, isSuccess } = useReviewListQuery(filter);

  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value });
  }

  function handleFilter(value: string): void {
    if (value !== 'all stages')
      setFilter({ ...filterValues, launchStatus: value.toUpperCase() })
    else {
      setFilter({ ...filterValues })
    }
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  const columns = [
    {
      accessorFn: ({ name }) => name,
      id: "name",
      cell: ({ getValue }) => getValue(),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ launchDate }) => launchDate,
      id: "launchDate",
      cell: ({ getValue }) => (dayjs(getValue()).format('MMM DD, YYYY - hh:mm A')) ?? "--",
      header: () => <span>Launch date</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ launchStatus }) => launchStatus,
      id: "launchStatus",
      cell: ({ getValue }) =>
        getValue() ? (
          <Box sx={{ textTransform: 'capitalize' }}>
            <CustomChip
              variant={renderChipVariant[getValue()]}
              ChipProps={{
                label: getValue().toLowerCase(),
              }}
            />
          </Box>
        ) : (
          "--"
        ),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ reviewees }) => reviewees,
      id: "reviewees",
      cell: ({ getValue }) => (getValue()?.length) ?? "--",
      header: () => <span>Members reviewed</span>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: data?.data?.Reviews,
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
    tableData,
    handleSearch,
    handleFilter
  };
}
