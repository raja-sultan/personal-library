import { GlobalAvatar } from "@components/global-avatar";
import { Box, Switch, Typography } from "@mui/material";
import { downloadCSVFile } from "@root/utils";
import { useGetLookupDataQuery } from "@services/compensation/employee-pay/employee-pay-api";
import {
  useIndividualStatusMutation,
  useUpdatesListQuery,
} from "@services/settings/updates/updates-log/updates-api";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import dayjs from "dayjs";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

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
  handleDownloadCSV?: () => void;
  tableData?: CustomTableProps;
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
  handleTurnOnForAll?: () => void;
  isOpenTurnOnModal?: boolean;
  setIsOpenTurnOnModal: Dispatch<SetStateAction<boolean>>;
  individualStatus?: any;
}

interface Filter {
  limit: number;
  offset: number;
  search?: string;
  endDate?: string;
  startDate?: string;
  manager?: string[];
  department?: string[];
}

export function useIndividualLogTable(): ReturnType {
  const filterValues = { limit: 10, offset: 0, updateLogType: "individual" };
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [filter, setFilter] = useState<Filter>(filterValues);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });

  const [isOpenTurnOnModal, setIsOpenTurnOnModal] = useState(false);

  const { data: individualList } = useUpdatesListQuery(filter);

  const [individualStatus] = useIndividualStatusMutation();

  const { data: managersData } = useGetLookupDataQuery({
    type: "managers",
  });
  const { data: departmentsData } = useGetLookupDataQuery({
    type: "departments",
  });

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
    downloadCSVFile("update-logs/download", "individuals", filter);
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

  function handleTurnOnForAll(): void {
    setIsOpenTurnOnModal(!isOpenTurnOnModal);
  }

  const formatFilterData = (
    options: { text: string; value: string }[]
  ): { id: string; name: string }[] => {
    return options?.map(({ text, value }) => ({ id: value, name: text })) ?? [];
  };
  const filterData = [
    {
      title: "manager",
      options: formatFilterData(managersData?.data),
    },
    {
      title: "department",
      options: formatFilterData(departmentsData?.data),
    },
  ];

  const columns = [
    {
      accessorFn: ({ employeeName }) => employeeName,
      id: "employeeName",
      cell: ({ row: { original } }: any) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <GlobalAvatar
              imgUrl={original?.profileImg}
              firstName={original?.firstName}
              lastName={original?.lastName}
            />
          </Box>
          <Box>
            {`${original?.firstName} ${original?.lastName}`}
            <Typography
              variant="subtitle2"
              fontWeight="400"
              color="neutral.500"
              textTransform="capitalize"
            >
              {original?.employeeTitle}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => <>Employee Name</>,
      isSortable: false,
    },
    {
      accessorFn: ({ manager }) => manager,
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
      header: () => <>Manager</>,
      isSortable: false,
    },
    {
      accessorFn: ({ frequency }) => frequency,
      id: "frequency",
      cell: ({ row: { original } }: any) => (
        <Box>{original?.frequency ? original?.frequency : "--"}</Box>
      ),
      header: () => <>Frequency </>,
      isSortable: false,
    },
    {
      accessorFn: ({ avgSentiment }) => avgSentiment,
      id: "avgSentiment",
      cell: ({ row: { original } }: any) => (
        <Box>{original?.avgSentiment ? original?.avgSentiment : "--"}</Box>
      ),
      header: () => <>Avg. Sentiment</>,
      isSortable: false,
    },
    {
      accessorFn: ({ lastUpdate }) => lastUpdate,
      id: "lastUpdate",
      cell: ({ getValue }) => dayjs(getValue()).format("D MMMM, YYYY, hh:mm A"),
      header: () => <>Last Update </>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "status",
      cell: ({ row: { original } }) => (
        <Switch
          checked={original?.status}
          onChange={async () => {
            try {
              await individualStatus({
                userId: original?._id,
                status: !original?.status,
              });
              toast.success("Status updated successfully.");
            } catch (error) {
              toast.error("Something went wrong!");
            }
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
      header: () => <>Status</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    data: individualList?.data?.users,
    columns,
    isSuccess: true,
    isPagination: true,
    isLoading: !individualList?.data?.users?.length,
    currentPage: individualList?.data?.meta?.page,
    totalPages: individualList?.data?.meta?.pages,
    onPageChange: handleOffset,
  };
  return {
    tableData,
    filterData,
    handleSearch,
    selectedFilter,
    handleDateRange,
    openFilterDrawer,
    handleDownloadCSV,
    handleApplyFilter,
    setSelectedFilter,
    handleOpenFilterDrawer,
    handleClearAllFilters,
    handleRadioChange,
    handleTurnOnForAll,
    isOpenTurnOnModal,
    setIsOpenTurnOnModal,
    individualStatus,
  };
}
