import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { Box, MenuItem } from "@mui/material";
import { TableIconActions } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import type { Columns } from "./compensation-bands.types";
import {
  useCompensationBandsListQuery,
  useDeleteBandMutation,
} from "@services/compensation/compensation-bands/compensation-bands-api";
import { useGetDepartmentQuery } from "@services/department/department-api";
import { downloadCSVFile } from "@root/utils";
import toast from "react-hot-toast";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

interface Filters {
  limit: number;
  offset: number;
  search?: string;
  departmentId?: string;
}
interface DepartmentFilters {
  id: string;
  departmentName: string;
}

interface UseCompensationBandsReturnType {
  router: any;
  selectedFilter: string;
  handleFilterBands: (filter: DepartmentFilters) => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  tableProps: CustomTableProps;
  handleSearch: (value: string) => void;
  departmentFilters: DepartmentFilters[];
  handleDownloadCSV: () => void;
  handleDeleteBand: () => Promise<void>;
}
const { PERMISSION: COMPENSATION_PERMISSION } =
  PERMISSIONS.PERFORMANCE.SETTING.COMPENSATION.COMPENSATION_BANDS;
export function useCompensationBands(): UseCompensationBandsReturnType {
  const [filters, setFilters] = useState<Filters>({ limit: 10, offset: 0 });

  const {
    data: compensationBandsList,
    isFetching,
    isError,
    isLoading,
    isSuccess,
  } = useCompensationBandsListQuery(filters);
  const { data: departmentsList } = useGetDepartmentQuery({ limit: 10000, offset: 0 });
  const [deleteBand] = useDeleteBandMutation();

  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<string>("");

  const router = useRouter();

  const departmentFilters = [
    { id: "", departmentName: "All" },
    ...(departmentsList?.data?.departments?.map((item) => ({
      id: item?._id,
      departmentName: item?.departmentName,
    })) || []),
  ];

  const currencySign = {
    "AUD $": "$",
    "USD $": "$",
    "GBP £": "£",
  };

  const columns: Columns[] = [
    {
      accessorFn: (row) => row?.name,
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Band Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.department,
      id: "department",
      cell: ({
        row: {
          original: { department },
        },
      }) => department?.departmentName,
      header: () => <span>Department</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.jobLevel,
      id: "jobLevel",
      cell: (info) => info.getValue(),
      header: () => <span>Job Level</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.jobTitle,
      id: "jobTitle",
      cell: (info) => info.getValue(),
      header: () => <span>Title</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.location,
      id: "location",
      cell: ({
        row: {
          original: { location },
        },
      }) => location?.address,
      header: () => <span>Location</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.minBasePay,
      id: "minBasePay",
      cell: ({ row: { original } }) =>
        original?.minBasePay ? currencySign[original?.currency] + original?.minBasePay : "--",
      header: () => <span>Min Base Pay</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.midBasePay,
      id: "midBasePay",
      cell: ({ row: { original } }) =>
        original?.midBasePay ? currencySign[original?.currency] + original?.midBasePay : "--",
      header: () => <span>Mid Base Pay</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.maxBasePay,
      id: "maxBasePay",
      cell: ({ row: { original } }) =>
        original?.maxBasePay ? currencySign[original?.currency] + original?.maxBasePay : "--",
      header: () => <span>Max Base Pay</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.minVariablePay,
      id: "minVariablePay",
      cell: ({ row: { original } }) =>
        original?.minVariablePay
          ? currencySign[original?.currency] + original?.minVariablePay
          : "--",
      header: () => <span>Min Variable Pay</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.midVariablePay,
      id: "midVariablePay",
      cell: ({ row: { original } }) =>
        original?.midVariablePay
          ? currencySign[original?.currency] + original?.midVariablePay
          : "--",
      header: () => <span>Mid Variable Pay</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.maxVariablePay,
      id: "maxVariablePay",
      cell: ({ row: { original } }) =>
        original?.maxVariablePay
          ? currencySign[original?.currency] + original?.maxVariablePay
          : "--",
      header: () => <span>Max Variable Pay</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.id,
      header: () => <span>Actions</span>,
      id: "Actions",
      cell: ({ row: { original } }) => {
        return (
          <Box display="flex" justifyContent="center">
            <TableIconActions icon={<TableActionsIcon />}>
            <PermissionProtected permission={COMPENSATION_PERMISSION.EDIT}>
              <MenuItem
                onClick={() => {
                  router.push(`/settings/compensation/compensation-bands/edit?id=${original?._id}`);
                }}
              >
                Edit
              </MenuItem>
              </PermissionProtected>
              <PermissionProtected permission={COMPENSATION_PERMISSION.DELETE}>
              <MenuItem
                onClick={() => {
                  setRowId(original?._id);
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete
              </MenuItem>
              </PermissionProtected>
              <MenuItem
                onClick={() => {
                  router.push(
                    `/settings/compensation/compensation-bands/assign-employees?id=${original?._id}&band-name=${original?.name}`
                  );
                }}
              >
                Assign Employee
              </MenuItem>
            </TableIconActions>
          </Box>
        );
      },
    },
  ];

  function handleSearch(value: string): void {
    setFilters({ ...filters, search: value, offset: 0 });
  }

  const handleFilterBands = (item): void => {
    setSelectedFilter(item?.id);
    setFilters({ ...filters, departmentId: item?.id, offset: 0 });
  };

  const handleDownloadCSV = (): void => {
    const filteredParams = {
      ...(filters?.search ? { search: filters?.search } : {}),
      ...(filters?.departmentId ? { departmentId: filters?.departmentId } : {}),
    };
    downloadCSVFile("compensation-bands/export", "compensation-bands", {
      ...filteredParams,
    });
  };

  const handleDeleteBand = async (): Promise<void> => {
    try {
      await deleteBand({ id: rowId }).unwrap();
      toast.success("Band deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Error while deleting Band");
    }
  };

  const handleOffset = (value: number): void => {
    setFilters({ ...filters, offset: (value - 1) * filters?.limit });
  };

  const tableProps: CustomTableProps = {
    columns,
    data: compensationBandsList?.data?.compensationBands,
    isPagination: true,
    totalPages: compensationBandsList?.data?.meta?.pages,
    currentPage: compensationBandsList?.data?.meta?.page,
    isFetching,
    isError,
    isLoading,
    isSuccess,
    onPageChange: (onPageData: number) => {
      handleOffset(onPageData);
    },
    rootSX: {
      "& .MuiTableContainer-root::-webkit-scrollbar-thumb": {
        display: "block",
      },
    },
  };
  return {
    router,
    selectedFilter,
    handleFilterBands,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    tableProps,
    handleSearch,
    departmentFilters,
    handleDownloadCSV,
    handleDeleteBand,
  };
}
