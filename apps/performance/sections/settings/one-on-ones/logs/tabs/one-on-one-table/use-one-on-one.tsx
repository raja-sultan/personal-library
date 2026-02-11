import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { MenuItem } from "@mui/material";
import { downloadCSVFile } from "@root/utils";
import { useGetOneOnOneLogsQuery } from "@services/settings/one-on-ones/one-on-one-log-api";
import { CustomChip, TableIconActions } from "common";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import dayjs from "dayjs";
import { useState } from "react"
import { RenderUserInfo } from "../render-user-detail";
import { awsBaseUrl } from "@root/config";
import { useViewOneOnOneDetailsQuery } from "@services/one-on-ones/one-on-ones-api";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING._1_ON_1S._1_ON_1_LOGS;

interface TimeRange {
  startDate: string, endDate: string
}
interface ReturnType {
  openDownloadModal: boolean;
  handleDownloadModal: () => void;
  handleDownloadCSV: () => void;
  tableData: CustomTableProps;
  openViewDetailModal: boolean;
  handleViewDetailModal: () => void;
  handleStatusChange: (val: string) => void;
  handleSearch?: (value: string) => void;
  handleTimeRangeChange?: (item: TimeRange) => void;
  onOnOneData: any
}

interface Filters {
  OneOnOneType: string,
  search?: string,
  status?: string,
  timeFrame?: string,
  manager?: string[],
  department?: string[],
  startDate?: string,
  endDate?: string,
  limit?: number;
  offset: number;
}


export function useOneOnOne(): ReturnType {
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [openViewDetailModal, setOpenViewDetailModal] = useState(false);
  const filterValues = { limit: 10, offset: 0, OneOnOneType: "one-On-One" }
  const [filter, setFilter] = useState<Filters>(filterValues);
  //api's
  const { data: OneOnOneLogsData, isSuccess, isLoading, isError, isFetching } = useGetOneOnOneLogsQuery(filter);

  const [viewModalDetail, setViewModalDetail] = useState({
    meetingId: '',
    id: '',
  })
  const { data: onOnOneData, } = useViewOneOnOneDetailsQuery({ id: viewModalDetail?.id, meetingId: viewModalDetail?.meetingId });

  function handleDownloadModal(): void {
    setOpenDownloadModal(!openDownloadModal)
  }
  function handleViewDetailModal(): void {
    setOpenViewDetailModal(!openViewDetailModal)
  }
  function handleDownloadCSV(): void {
    downloadCSVFile('one-on-one-logs/download', '1-on1-logs', filter)
    handleDownloadModal();
  }

  function handleTableAction(original: any): void {
    setOpenViewDetailModal(!openViewDetailModal)
    setViewModalDetail({
      meetingId: original?._id,
      id: original?.oneOnOneId,
    })

  }

  // handleStatus Filter
  function handleStatusChange(status: string): void {
    if (status !== 'All')
      setFilter({ ...filterValues, status })
    else {
      setFilter({ ...filterValues })
    }
  }
  // handleSearch 
  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value })
  }
  // handlePagination
  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 })
  }
  //handleTimeRange
  function handleTimeRangeChange({ startDate, endDate }: TimeRange): void {
    setFilter({ ...filter, startDate, endDate })
  }

  const renderStatusChip = {
    'Ended': 'custom',
    'Current': 'warning',
    'Upcoming': 'danger'
  }

  const columns = [
    {
      accessorFn: ({ date }) => date,
      id: "date",
      cell: ({ getValue }) => dayjs(getValue()).format('DD MMM, YYYY'),
      header: () => <>1-on-1 Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => <RenderUserInfo
        profileImage={original?.organizer?.profileImage ? awsBaseUrl + original?.organizer?.profileImage : "N/A"}
        firstName={original?.organizer?.firstName ?? 'N/A'}
        lastName={original?.organizer?.lastName ?? 'N/A'}
        userRole={original?.organizer?.employeeTitle ?? 'N/A'}
      />,
      header: () => <>organizer</>,
      isSortable: false,
    },
    {
      accessorFn: ({ attendee }) => attendee,
      id: "attendee",
      cell: ({ row: { original } }) => <RenderUserInfo
        profileImage={original?.attendee?.profileImage ? awsBaseUrl + original?.attendee?.profileImage : "N/A"}
        firstName={original?.attendee?.firstName ?? 'N/A'}
        lastName={original?.attendee?.lastName ?? 'N/A'}
        userRole={original?.attendee?.employeeTitle ?? 'N/A'}
      />,
      header: () => <>attendee</>,
      isSortable: false,
    },
    {
      accessorFn: ({ status }) => status,
      id: "status",
      cell: ({ getValue }) => <CustomChip
        variant={renderStatusChip[getValue()]}
        ChipProps={{ label: getValue() }} />,
      header: () => <>status</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }) => <TableIconActions icon={<TableActionsIcon />}>
        <PermissionProtected permission={PERMISSION.VIEW_DETAILS}>
          <MenuItem onClick={() => { handleTableAction(original) }}>View Detail</MenuItem>
        </PermissionProtected>
      </TableIconActions>,
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: OneOnOneLogsData?.data?.oneOnOneMeetings,
    columns,
    isError, isLoading, isSuccess, isFetching,
    isPagination: true,
    onPageChange,
    totalPages: OneOnOneLogsData?.data?.meta?.pages,
    currentPage: OneOnOneLogsData?.data?.meta?.page,

  }

  return {
    openDownloadModal,
    handleDownloadModal,
    handleDownloadCSV,
    tableData,
    handleViewDetailModal,
    openViewDetailModal,
    handleStatusChange,
    handleSearch,
    handleTimeRangeChange,
    onOnOneData,
  }
}