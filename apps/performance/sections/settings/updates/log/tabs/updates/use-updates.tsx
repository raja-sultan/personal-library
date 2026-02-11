import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { GlobalAvatar } from "@components/global-avatar";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";
import { Box, MenuItem, Typography } from "@mui/material";
import { downloadCSVFile } from "@root/utils";
import { useGetLookupDataQuery } from "@services/compensation/employee-pay/employee-pay-api";
import {
  useGetUpdateByIdQuery,
  useUpdatesListQuery,
} from "@services/settings/updates/updates-log/updates-api";
import { TableIconActions } from "common";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import dayjs from "dayjs";
import { useState } from "react";

interface DateRange {
  startDate: string;
  endDate: string;
}
interface GetSelectedOptions {
  name: string;
  optionsIds: string[];
}
[];

interface ReturnType {
  openDownloadModal?: boolean;
  handleDownloadModal?: () => void;
  handleDownloadCSV?: () => void;
  tableData?: CustomTableProps;
  openViewDetailModal: { open: boolean; data: object | any };
  handleViewDetailModal?: () => void;
  filterData: any;
  selectedFilter: any;
  setSelectedFilter: any;
  openFilterDrawer: boolean;
  handleOpenFilterDrawer: () => void;
  handleClearAllFilters: () => void;
  handleSearch?: (val: string) => void;
  handleDateRange?: (values: DateRange) => void;
  handleApplyFilter: (options: GetSelectedOptions[]) => void;
  handleRadioChange: (obj: { startDate?: string; endDate?: string }) => void;
  selectedEmoji?: any;
  handleReaction?: (title: string) => void;
  ViewUpadateData?: any;
  from?: any;
  to?: any;
  emojiHandle?: any;
  reviewed?: any;
  publish?: any;
  user?: any;
}
interface Filter {
  limit: number;
  offset: number;
  search?: string;
  endDate?: string;
  startDate?: string;
  manager?: string[];
  department?: string[];
  updateLogType?: any;
}

export function useUpdatesLogTable(): ReturnType {
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [openViewDetailModal, setOpenViewDetailModal] = useState({
    open: false,
    data: "",
  });
  const [id, setId] = useState<any>();
  const filterValues = { limit: 10, offset: 0, updateLogType: "update" };
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [filter, setFilter] = useState<Filter>(filterValues);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });

  const { data: ViewUpadateData } = useGetUpdateByIdQuery(
    { id },
    { skip: id === null || id === undefined }
  );

  const from = dayjs(ViewUpadateData?.data.from).format("MMMM DD");

  const to = dayjs(ViewUpadateData?.data.to).format("MMMM DD");

  const publish = dayjs(ViewUpadateData?.data.publishedAt).format(
    "MMMM DD, YYYY, @ hh:mm A"
  );
  const reviewed = dayjs(ViewUpadateData?.data.reviewedAt).format(
    "MMMM DD, YYYY, @ hh:mm A"
  );

  const emojiHandle = (value: any) => {
    switch (value) {
      case 4:
        return "Good";
      case 1:
        return "Terrible";
      case 2:
        return "Bad";
      case 3:
        return "Okay";
      case 5:
        return "Great";
      default:
        return "";
    }
  };

  const { data: updatesList } = useUpdatesListQuery(filter);

  const user = updatesList?.data?.updates[0]?.user;

  const { data: employeeData } = useGetLookupDataQuery({
    type: "employees",
  });

  const { data: managersData } = useGetLookupDataQuery({
    type: "managers",
  });

  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleReaction = (title: any): void => {
    setSelectedEmoji(title);
  };

  function handleDownloadModal(): void {
    setOpenDownloadModal(!openDownloadModal);
  }
  function handleViewDetailModal(): void {
    setOpenViewDetailModal({ open: !openViewDetailModal.open, data: "" });
  }

  function handleTableAction(original: any): void {
    setOpenViewDetailModal({ open: !openViewDetailModal.open, data: original });
  }

  function handleSearch(search: string): void {
    setFilter({ ...filter, search });
  }

  // date range filter
  function handleRadioChange(obj: DateRange): void {
    setDateRange(obj);
  }

  function handleDateRange(values: DateRange): void {
    setDateRange(values);
  }

  // download CSV
  function handleDownloadCSV(): void {
    downloadCSVFile("update-logs/download", "updates", filter);
  }

  function handleOpenFilterDrawer(): void {
    setOpenFilterDrawer(!openFilterDrawer);
  }

  function handleClearAllFilters(): void {
    setFilter(filterValues);
    setDateRange({ startDate: "", endDate: "" });
  }
  function handleOffset(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  function handleApplyFilter(options: GetSelectedOptions[]): void {
    const manager =
      options?.find((option) => option.name === "Managers")?.optionsIds ?? [];
    const department =
      options?.find((option) => option.name === "Department")?.optionsIds ?? [];
    if (
      manager.length > 0 ||
      department.length > 0 ||
      (dateRange.startDate && dateRange.endDate)
    ) {
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

  const formatFilterData = (
    options: { text: string; value: string }[]
  ): { id: string; name: string }[] => {
    return options?.map(({ text, value }) => ({ id: value, name: text })) ?? [];
  };
  const filterData = [
    {
      title: "employee",
      options: formatFilterData(employeeData?.data),
    },
    {
      title: "manager",
      options: formatFilterData(managersData?.data),
    },
  ];

  const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.UPDATES.UPDATES_LOG

  const columns = [
    {
      accessorFn: ({ publishedAt }) => publishedAt,
      id: "publishedAt",
      cell: ({ getValue }) => dayjs(getValue()).format("MMM DD,YYYY"),
      header: () => <>Publish Date </>,
      isSortable: false,
    },
    {
      accessorFn: (row) => `${row?.user?.firstName} ${row?.user?.lastName}`,
      id: "employeeName",
      cell: ({ row: { original } }: any) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <GlobalAvatar
              imgUrl={original?.user?.profileImg}
              firstName={original?.user?.firstName}
              lastName={original?.user?.lastName}
            />
          </Box>
          <Box>
            {`${original?.user?.firstName} ${original?.user?.lastName}`}
            <Typography
              variant="subtitle2"
              fontWeight="400"
              color="neutral.500"
              textTransform="capitalize"
            >
              {original?.user?.employeeTitle}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => <span>Employee Name</span>,
      isSortable: false,
    },

    {
      accessorFn: (row) => `${row?.firstName} ${row?.lastName}`,
      id: "manager",
      cell: ({ row: { original } }: any) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <GlobalAvatar
              imgUrl={original?.manager?.profileImage}
              firstName={original?.manager?.firstName}
              lastName={original?.manager?.lastName}
            />
          </Box>
          <Box>
            {`${original?.manager?.firstName} ${original?.manager?.lastName}`}
            <Typography
              variant="subtitle2"
              fontWeight="400"
              color="neutral.500"
              textTransform="capitalize"
            >
              {original?.manager?.employeeTitle}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => <span>Manager</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ sentimentScore }) => sentimentScore,
      id: "sentimentScore",
      cell: ({ getValue }) => getValue(),
      header: () => <>Sentiment</>,
      isSortable: false,
    },
    {
      accessorFn: ({ reviewedAt }) => reviewedAt,
      id: "reviewedAt",
      cell: ({ getValue }) => dayjs(getValue()).format("D MMMM, YYYY, hh:mm A"),
      header: () => <>Reviewed </>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "action",
      cell: ({
        row: {
          original: { _id },
        },
      }) => (
        <TableIconActions icon={<TableActionsIcon />}>
          <PermissionProtected permission={PERMISSION.VIEW_DETAIL}>
            <MenuItem
              onClick={() => {
                handleTableAction(_id);
                setId(_id);
              }}
            >
              View Update
            </MenuItem>
          </PermissionProtected>
        </TableIconActions>
      ),
      header: () => <>Action</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: updatesList?.data?.updates,
    columns,
    isSuccess: true,
    isPagination: true,
    isLoading: !updatesList?.data?.updates.length,
    currentPage: updatesList?.data?.meta?.page,
    totalPages: updatesList?.data?.meta?.pages,
    onPageChange: handleOffset,
  };

  return {
    openDownloadModal,
    handleDownloadModal,
    handleDownloadCSV,
    tableData,
    handleViewDetailModal,
    openViewDetailModal,
    filterData,
    handleSearch,
    selectedFilter,
    handleDateRange,
    openFilterDrawer,
    handleApplyFilter,
    setSelectedFilter,
    handleOpenFilterDrawer,
    handleClearAllFilters,
    handleRadioChange,
    selectedEmoji,
    handleReaction,
    ViewUpadateData,
    from,
    to,
    emojiHandle,
    reviewed,
    publish,
    user,
  };
}
