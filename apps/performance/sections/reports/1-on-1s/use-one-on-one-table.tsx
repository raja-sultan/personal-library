import { useState } from "react";
import { Rating } from "@mui/material";
// import type { Columns } from "@sections/reports/1-on-1s/one-on-one-table/one-on-one-table-types";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import dayjs from 'dayjs';
import { downloadCSVFile } from "@root/utils";
import { useGetOneOnOneReportsQuery } from "@services/reports/reports-api";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import type { Columns, IFilter, UseFullReportTypes } from "./one-on-one-reports.types";


export function useOneOnOneReport(): UseFullReportTypes {
  const [open, setOpen] = useState(false);
  const filterValues = { limit: 10, offset: 0 };
  const [filter, setFilter] = useState<IFilter>(filterValues);

  // get api here
  const { data, isLoading, isFetching, isSuccess, isError, } = useGetOneOnOneReportsQuery(filter);

  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value });
  }

  function handleTimeRangeChange({ startDate, endDate }: IFilter): void {
    setFilter({ ...filter, startDate, endDate })
  }

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 })
  }

  const filledStar = (
    <StarRoundedIcon style={{ color: "gold" }} fontSize="inherit" />
  );
  const unfilledStar = (
    <StarRoundedIcon style={{ color: "#E7E6EA" }} fontSize="inherit" />
  );

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  function handleDownloadCSV(): void {
    downloadCSVFile("reports/one-on-one/download", "oneOneOnes", filter);
  }

  const columns: Columns[] = [
    {
      accessorFn: (row) => row?.date,
      id: "meetingDate&Time",
      cell: ({ row: { original } }) => {
        const formattedDate = dayjs(original?.date).format('D MMM YYYY');
        const formattedTime = dayjs(original?.date).format('hh:ss a'); // Adjust the format as needed
        return `${formattedDate} - ${formattedTime}`;
      },
      header: () => <span>Meeting Date & Time</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => `${row?.organizer?.firstName} ${row?.organizer?.lastName}`,
      id: "organiser",
      cell: (info) => info.getValue(),
      header: () => <span>Organiser</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => `${row?.attendee?.firstName} ${row?.attendee?.lastName}`,
      id: "attendee",

      cell: (info) => info.getValue(),
      header: () => <span>Attendee</span>, 
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.frequency,
      id: "frequency",
      cell: (info) => info.getValue(),
      header: () => <span>Frequency</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.totalDiscussionPoints,
      id: "discussionPoints",
      cell: (info) => info.getValue(),
      header: () => <span>Discussion Points</span>,
      isSortable: false,
    },

    {
      accessorFn: (row) => row?.totalActionItems,
      id: "previousActionItems",
      cell: (info) => info.getValue(),
      header: () => <span>Previous Action Items</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.totalNewActionItems,
      id: "newActionsItems",
      cell: (info) => info.getValue(),
      header: () => <span>New Actions Items</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.organizerRating,
      id: "organiserRating",
      cell: (info) => {
        return (
          <Rating
            name="text-feedback"
            value={info?.getValue()}
            size="large"
            emptyIcon={unfilledStar}
            icon={filledStar}
            readOnly
          />
        );
      },
      header: () => <span>Organiser Rating</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.attendeeRating,
      id: "attendeeRating",
      cell: (info) => {
        return (
          <Rating
            name="text-feedback"
            value={info?.getValue()}
            size="large"
            emptyIcon={unfilledStar}
            icon={filledStar}
            readOnly
          />
        );
      },
      header: () => <span>Attendee Rating</span>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: data?.data?.list,
    columns,
    isLoading, isError, isFetching, isSuccess,
    onPageChange,
    totalPages: data?.data?.meta?.pages,
    currentPage: data?.data?.meta?.page,
  };

  return {
    open,
    toggleDrawer,
    handleSearch,
    handleDownloadCSV,
    tableData,
    handleTimeRangeChange,
    data
  }

}
