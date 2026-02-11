"use client";
import { useState } from "react";
import { Box, MenuItem, useTheme } from "@mui/material";
import type { Theme } from "@mui/material";
import { TableIconActions, CustomChip } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { useGetFeedbackLogQuery } from "@services/settings/feedback/log/feedback-api";
import dayjs from "dayjs";
import { downloadCSVFile } from "@root/utils";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";

interface UseFeedbackType {
  tableData?: CustomTableProps;
  isViewOpenModal: boolean;
  handleViewModal?: () => void;
  feedbackObj: any;
  theme: Theme;
  handleSearch?: (val: string) => void;
  handleDownloadCSV?: () => void;
  handleTimeRangeChange?: (item: any) => void;
  handleVisibilityChange?: (values: string[]) => void;
}
interface Filter {
  startDate?: string;
  endDate?: string;
  visibility?: string[];
  search?: string;
  limit?: number;
  offset?: number;
}
interface TimeRange {
  startDate?: string;
  endDate?: string;
}

export function useFeedback(): UseFeedbackType {
  const theme = useTheme();
  const [isViewOpenModal, setIsViewOpenModal] = useState(false);
  const [feedbackObj, setFeedbackObj] = useState({});
  const [filter, setFilter] = useState<Filter>({ limit: 10,offset: 0 });

  const {
    data: getFeedbackLogData,
    isError,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetFeedbackLogQuery(filter);

  function handleOffset(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  function handleTimeRangeChange({ startDate, endDate }: TimeRange): void {
    setFilter({ ...filter, startDate, endDate });
  }

  function handleViewModal(): void {
    setIsViewOpenModal(!isViewOpenModal);
  }

  function handleVisibilityChange(values: string[]): void {
    setFilter({ ...filter, visibility: values });
  }

  function handleSearch(search: any): void {
    setFilter({ ...filter, search });
  }

  function handleDownloadCSV(): void {
    const { limit: _, ...filteredFilter }: any = filter;
    filteredFilter.visibility = filteredFilter.visibility?.join(",");
    downloadCSVFile("feedback-logs/download", "feedback-logs", filteredFilter);
  }

  const renderChipVariant = {
    public: "started",
    private: "success",
    "manager only": "warning",
    "private + manager": "",
  };

  const columns = [
    {
      accessorFn: ({ date }) => date,
      id: "date",
      cell: ({ row }) => dayjs(row?.original?.date)?.format("DD MMM, YYYY - hh:mm A"),
      header: () => <span>Date</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ feedbackTo }) => feedbackTo,
      id: "feedbackTo",
      cell: ({ row }) =>
        `${row?.original?.receiver?.firstName ?? "-"} ${row?.original?.receiver?.lastName ?? "-"}`,
      header: () => <span>Feedback to</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ feedbackFrom }) => feedbackFrom,
      id: "feedbackFrom",
      cell: ({ row }) =>
        `${row?.original?.sender?.firstName ?? "-"} ${row?.original?.sender?.lastName ?? "-"}`,
      header: () => <span>Feedback from</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ visibility }) => visibility,
      id: "visibility",
      cell: ({ getValue }) => (
        <CustomChip
          variant={renderChipVariant[getValue().toLowerCase()]}
          ChipProps={{ label: getValue() }}
        />
      ),
      header: () => <span>Visibility</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ id }) => id,
      header: () => <span>Actions</span>,
      id: "Actions",
      cell: (item: any) => {
        return (
          <Box>
            <TableIconActions icon={<TableActionsIcon />}>
              <MenuItem
                onClick={() => {
                  setIsViewOpenModal(true);
                  setFeedbackObj(item?.row?.original);
                }}
              >
                View
              </MenuItem>
            </TableIconActions>
          </Box>
        );
      },
    },
  ];

  const tableData: CustomTableProps = {
    columns,
    data: getFeedbackLogData?.data?.feedbackLogs,
    isError,
    isSuccess,
    isLoading,
    isFetching,
    currentPage: getFeedbackLogData?.data?.meta?.page,
    totalPages: getFeedbackLogData?.data?.meta?.pages,
    onPageChange: handleOffset,
  };

  return {
    tableData,
    handleViewModal,
    isViewOpenModal,
    feedbackObj,
    theme,
    handleSearch,
    handleDownloadCSV,
    handleTimeRangeChange,
    handleVisibilityChange,
  };
}
