import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { Box, MenuItem, Typography } from "@mui/material";
import { renderUserImage } from "@root/utils/render-user-image";
import { TableIconActions } from "common";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RenderUserInfo } from "../render-user-detail";
import { downloadCSVFile } from "@root/utils";
import { useGetOneOnOneLogsQuery } from "@services/settings/one-on-ones/one-on-one-log-api";
import dayjs from "dayjs";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { awsBaseUrl } from "@root/config";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING._1_ON_1S._1_ON_1_LOGS;

interface DateRange {
  startDate: string, endDate: string
}
interface GetSelectedOptions { name: string, optionsIds: string[] }[]
interface ReturnType {
  tableData: CustomTableProps;
  selectedFilter: any;
  setSelectedFilter: any;
  openFilterDrawer: boolean;
  handleDownloadCSV: () => void;
  handleSearch?: (value: string) => void;
  filterData: any
  handleDateRange?: (values: DateRange) => void;
  handleApplyFilter: (options: GetSelectedOptions[]) => void;
  handleRadioChange: (obj: { startDate?: string, endDate?: string }) => void;
  handleOpenFilterDrawer: () => void;
  handleClearAllFilters: () => void;

}
interface Filters {
  OneOnOneType: string,
  search?: string,
  endDate?: string,
  startDate?: string,
  manager?: string[],
  department?: string[],
  limit?: number;
  offset: number;
}

export function useIndividual(): ReturnType {
  const router = useRouter();
  const filterValues = { limit: 10, offset: 0, OneOnOneType: "individual" }
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filter, setFilter] = useState<Filters>(filterValues);
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: "", endDate: "" });
  const { data: individualData, isSuccess, isLoading, isError, isFetching } = useGetOneOnOneLogsQuery(filter);
  // get departments
  const { data: getDepartments } = useGetReferenceDataLookupQuery({ type: "departments", });
  const departments = getDepartments?.data?.map(({ value, text }: { value: string; text: string }) => ({ id: value, name: text }))

  // get managers
  const { data: getMangers } = useGetReferenceDataLookupQuery({ type: "managers", });
  const managers = getMangers?.data?.map(({ value, text }: { value: string; text: string }) => ({ id: value, name: text }));



  const handleOpenFilterDrawer = (): void => {
    setOpenFilterDrawer(!openFilterDrawer);
  };

  // date range filter 
  function handleRadioChange(obj: DateRange): void {
    setDateRange(obj)
  }
  function handleDateRange(values: DateRange): void {
    setDateRange(values);
  }
  // download CSV
  function handleDownloadCSV(): void {
    downloadCSVFile('one-on-one-logs/download', 'individual', filter)
  }

  // handleSearch 
  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value })
  }
  // handlePagination
  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 })
  }

  // handleApplyFilter

  function handleApplyFilter(options: GetSelectedOptions[]): void {
    const manager = options?.find((option) => option.name === 'Managers')?.optionsIds ?? [];
    const department = options?.find((option) => option.name === 'Department')?.optionsIds ?? [];
    if (manager.length > 0 || department.length > 0 || (dateRange.startDate && dateRange.endDate)) {
      setFilter({
        ...filter,
        manager: manager.length > 0 ? manager : undefined,
        department: department.length > 0 ? department : undefined,
        startDate: dateRange.startDate || filter.startDate,
        endDate: dateRange.endDate || filter.endDate,
      });
    } else {
      setFilter({ ...filterValues });
    }
  }
  // handleClearFilter
  function handleClearAllFilters(): void {
    setFilter(filterValues);
    setDateRange({ startDate: "", endDate: "" });
  }

  // drawer list
  const filterData = [
    {
      title: 'Time Range',
      radio: true,
      hideSearchBar: true,
      options: [
        {
          id: '1',
          name: 'All Time',
        },
        {
          id: '2',
          name: 'Last 30 Days',
          value: 30,
        },
        {
          id: '3',
          name: 'Last 90 Days',
          value: 90,
        },
        {
          id: '4',
          name: 'Last 365 Days',
          value: 365,
        },
        {
          id: '5',
          name: 'custom'
        },
      ]
    },
    {
      title: 'Managers',
      options: managers
    },
    {
      title: 'Department',
      options: departments
    },
  ]

  const columns = [
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => <RenderUserInfo
        profileImage={original?.user?.profileImage ? awsBaseUrl + original?.user?.profileImage : "N/A"}
        firstName={original?.user?.firstName ?? 'N/A'}
        lastName={original?.user?.lastName ?? 'N/A'}
        userRole={original?.user?.employeeTitle ? original?.user?.employeeTitle : 'N/A'}
      />,
      header: () => <>name</>,
      isSortable: false,
    },
    {
      accessorFn: ({ lastOneOneDate }) => lastOneOneDate,
      id: "lastOneOneDate",
      cell: ({ getValue }) => getValue() ? dayjs(getValue()).format('DD MMM, YYYY') : 'N/A',
      header: () => <>last Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ nextOneOneDate }) => nextOneOneDate,
      id: "nextOneOneDate",
      cell: ({ getValue }) => getValue() ? dayjs(getValue()).format('DD MMM, YYYY') : 'N/A',
      header: () => <>next Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => renderUserImage({
        profileImage: original?.user?.manager?.profileImage ? awsBaseUrl + original?.user?.manager?.profileImage : "N/A",
        firstName: original?.user?.manager?.firstName ? original?.user?.manager?.firstName : 'N/A',
        lastName: original?.user?.manager?.lastName ? original?.user?.manager?.lastName : 'N/A',
      }),
      header: () => <>manager</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ row: { original } }) => <Box display='flex' alignItems='center' gap='2px'>
        <Typography variant="subtitle2">{original?.percentage.toFixed(2)}%</Typography>
        <Typography variant="subtitle2" color='neutral.400'>({original?.participatedTrueCount}/{original?.totalCount})</Typography>
      </Box>,
      header: () => <>participation</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({ row: { original } }) => <TableIconActions icon={<TableActionsIcon />}>
        <PermissionProtected permission={PERMISSION.VIEW_INDIVIDUAL}>
          <MenuItem onClick={() => { router.push(`/settings/one-on-ones/history?id=${original?._id}`) }}>View Detail</MenuItem>
        </PermissionProtected>
      </TableIconActions>,
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: individualData?.data?.users,
    columns,
    isError, isLoading, isSuccess, isFetching,
    isPagination: true,
    onPageChange,
    totalPages: individualData?.data?.meta?.pages,
    currentPage: individualData?.data?.meta?.page,
  }

  return {
    tableData,
    openFilterDrawer,
    selectedFilter,
    setSelectedFilter,
    handleOpenFilterDrawer,
    handleDownloadCSV,
    handleSearch,
    filterData,
    handleClearAllFilters,
    handleApplyFilter,
    handleDateRange,
    handleRadioChange
  }
}