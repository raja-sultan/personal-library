import { useState } from "react";
import { downloadCSVFile } from "@root/utils";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { useGetEmployeesFeedbackLogQuery } from "@services/settings/feedback/log/feedback-api";

interface DateRange {
  startDate: string, endDate: string
}
interface GetSelectedOptions { name: string, optionsIds: string[] }[]

interface useEmployeesTypes {
  filterData: any
  selectedFilter: any;
  setSelectedFilter: any;
  openFilterDrawer: boolean;
  tableData: CustomTableProps;
  handleDownloadCSV?: () => void;
  handleOpenFilterDrawer: () => void;
  handleClearAllFilters: () => void;
  handleSearch?: (val: string) => void;
  handleDateRange?: (values: DateRange) => void;
  handleApplyFilter: (options: GetSelectedOptions[]) => void;
  handleRadioChange: (obj: { startDate?: string, endDate?: string }) => void;
}

interface Filter {
  limit: number,
  offset: number,
  search?: string,
  endDate?: string,
  startDate?: string,
  manager?: string[],
  department?: string[],
}

export function useEmployees(): useEmployeesTypes {
  const filterValues = { limit: 10, offset: 0 };
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [filter, setFilter] = useState<Filter>(filterValues);
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: "", endDate: "" });

  // get employee feedback log
  const { data: getEmployeesFeedbackData, isError, isFetching, isLoading, isSuccess } = useGetEmployeesFeedbackLogQuery(filter);

  // get departments
  const { data: getDepartments } = useGetReferenceDataLookupQuery({ type: "departments", });
  const departments = getDepartments?.data?.map(({ value, text }: { value: string; text: string }) => ({ id: value, name: text }))

  // get managers
  const { data: getMangers } = useGetReferenceDataLookupQuery({ type: "managers", });
  const managers = getMangers?.data?.map(({ value, text }: { value: string; text: string }) => ({ id: value, name: text }));

  function handleSearch(search: string): void {
    setFilter({ ...filter, search })
  }

  // date range filter 
  function handleRadioChange(obj: DateRange): void {
    setDateRange(obj)
  }

  function handleDateRange(values: DateRange): void {
    setDateRange(values);
  }

  // download CSV
  function handleDownloadCSV(): void {
    downloadCSVFile("feedback-logs/employees/download", "feedback-employees", {
      ...(filter?.search && { search: filter?.search }),
      ...(filter?.manager && { manager: filter?.manager?.join(',') }),
      ...(filter?.department && { department: filter?.department?.join(',') }),
      ...(filter?.startDate && { startDate: filter?.startDate }),
      ...(filter?.endDate && { endDate: filter?.endDate }),
    });
  }

  function handleOpenFilterDrawer(): void {
    setOpenFilterDrawer(!openFilterDrawer)
  }

  function handleOffset(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  function handleClearAllFilters(): void {
    setFilter(filterValues);
    setDateRange({ startDate: "", endDate: "" });
  }

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

  // drawer list
  const filterData = [
    {
      title: 'Managers',
      options: managers
    },
    {
      title: 'Department',
      options: departments
    },
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
  ]

  // table columns
  const employeeTabColumns = [
    {
      accessorFn: ({ row }) => row.name,
      id: "name",
      cell: ({ row }) => (
        <span>{`${row?.original?.firstName ?? '-'} ${row?.original?.lastName ?? ''}`}</span>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row.manager,
      id: "manager",
      cell: ({ row }) => (
        <span>{`${row?.original?.manager?.firstName ?? '-'} ${row?.original?.manager?.lastName ?? ''}`}</span>
      ),
      header: () => <span>Manager</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row.department,
      id: "department",
      cell: ({ row }) => (
        <span>{`${row?.original?.department?.departmentName ?? '-'}`}</span>
      ),
      header: () => <span>Department</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row.feedbackGiven,
      id: "feedbackGiven",
      cell: ({ row }) => <span>{`${row?.original?.feedbacksGiven ?? '-'}`}</span>,
      header: () => <span>Feedback Given</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row.feedbackReceived,
      id: "feedbackReceived",
      cell: ({ row }) => <span>{`${row?.original?.feedbacksReceived ?? '-'}`}</span>,
      header: () => <span>Feedback Received</span>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    columns: employeeTabColumns,
    data: getEmployeesFeedbackData?.data?.employees,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    currentPage: getEmployeesFeedbackData?.data?.meta?.page,
    totalPages: getEmployeesFeedbackData?.data?.meta?.pages,
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
    handleRadioChange,
    handleClearAllFilters,
    handleOpenFilterDrawer,
  };
}
