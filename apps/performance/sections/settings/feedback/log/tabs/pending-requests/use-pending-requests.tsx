"use client";
import { useState } from "react";
import dayjs from "dayjs";
import type { Theme } from "@mui/material";
import { downloadCSVFile } from "@root/utils";
import { TableIconActions, CustomChip } from "common";
import { Box, MenuItem, useTheme } from "@mui/material";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { useGetPendingFeedbackLogQuery } from "@services/settings/feedback/log/feedback-api";

interface Filter {
  startDate?: string,
  endDate?: string,
  visibility?: string[],
  search?: string,
  limit?: number,
  offset?: number
}

interface TimeRange {
  startDate: string, endDate: string
}
interface PendingRequestProps {
  theme?: Theme,
  pendingFeedbackObj?: any;
  isViewOpenModal?: boolean;
  handleViewModal?: () => void;
  tableData?: CustomTableProps;
  handleDownloadCSV?: () => void;
  handleSearch?: (val: string) => void;
  handleTimeRangeChange?: (item: TimeRange) => void;
  handleVisibilityChange?: (values: string[]) => void;
}

export function usePendingRequests(): PendingRequestProps {
  const theme = useTheme();
  const [isViewOpenModal, setIsViewOpenModal] = useState(false);
  const [pendingFeedbackObj, setPendingFeedbackObj] = useState({});
  const [filter, setFilter] = useState<Filter>({ limit: 10, offset: 0 });

  // get pending feedback
  const { data: getPendingFeedbackLog, isError, isFetching, isLoading, isSuccess, } = useGetPendingFeedbackLogQuery(filter);

  function handleOffset(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  function handleTimeRangeChange({ startDate, endDate }: TimeRange): void {
    setFilter({ ...filter, startDate, endDate })
  }

  function handleViewModal(): void { setIsViewOpenModal(!isViewOpenModal) };

  function handleVisibilityChange(values: string[]): void {
    setFilter({ ...filter, visibility: values })
  }

  function handleSearch(search: any): void {
    setFilter({ ...filter, search })
  }

  function handleDownloadCSV(): void {
    downloadCSVFile("feedback-logs/pending/download", "feedback-pending-requests", filter);
  }

  const renderChipVariant = {
    'public': 'primary',
    'private': 'success',
    'manager only': 'warning',
    'private + manager': 'danger',
  };

  const columns = [
    {
      accessorFn: ({ date }) => date,
      id: "date",
      cell: ({ row }) => dayjs(row?.original?.date)?.format('DD MMM, YYYY - hh:mm A'),
      header: () => <span>Date</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ feedbackTo }) => feedbackTo,
      id: "feedbackTo",
      cell: ({ row }) => `${row?.original?.receiver?.firstName ?? '- '} ${row?.original?.receiver?.lastName ?? ''}`,
      header: () => <span>Feedback to</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ feedbackFrom }) => feedbackFrom,
      id: "feedbackFrom",
      cell: ({ row }) => `${row?.original?.sender?.firstName ?? '- '} ${row?.original?.sender?.lastName ?? ''}`,
      header: () => <span>Feedback from</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ requestor }) => requestor,
      id: "requester",
      cell: ({ row }) => `${row?.original?.requester?.firstName ?? '- '} ${row?.original?.requester?.lastName ?? ''}`,
      header: () => <span>Requester</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ visibility }) => visibility,
      id: "visibility",
      cell: ({ getValue }) => (
        <CustomChip
          variant={renderChipVariant[getValue()?.toLowerCase()]}
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
              <MenuItem onClick={() => { setIsViewOpenModal(true); setPendingFeedbackObj(item?.row?.original) }}>
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
    data: getPendingFeedbackLog?.data?.feedbackLogs,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    currentPage: getPendingFeedbackLog?.data?.meta?.page,
    totalPages: getPendingFeedbackLog?.data?.meta?.pages,
    onPageChange: handleOffset,
  };

  return {
    theme,
    tableData,
    handleSearch,
    isViewOpenModal,
    handleViewModal,
    handleDownloadCSV,
    pendingFeedbackObj,
    handleTimeRangeChange,
    handleVisibilityChange,
  };
}
