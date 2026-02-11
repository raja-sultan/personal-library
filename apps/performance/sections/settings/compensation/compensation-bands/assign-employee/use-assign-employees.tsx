import { Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import {
  useAssignEmployeesMutation,
  useGetBandMembersByIdQuery,
  useRemoveEmployeesMutation,
} from "@services/compensation/compensation-bands/compensation-bands-api";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { GlobalAvatar } from "@components/global-avatar";

interface ReturnType {
  onBack: () => void;
  tableProps: CustomTableProps;
  selectedIds: string[];
  bandName: string | null;
  addEmployeeModalOpen: boolean;
  setAddEmployeeModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedMembers: any[];
  setSelectedMembers: Dispatch<any>;
  handleSearch: (value: string) => void;
  handleAssignEmployees: (employees: string[]) => Promise<void>;
  handleRemoveEmployees: () => Promise<void>;
}

interface Filters {
  limit: number;
  offset: number;
  isAMember: boolean;
  search?: string;
}

export default function useAssignedEmployee(): ReturnType {
  const bandId = useSearchParams().get("id");
  const bandName = useSearchParams().get("band-name");

  const router = useRouter();

  const [filters, setFilters] = useState<Filters>({
    limit: 10,
    offset: 0,
    isAMember: true,
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] =
    useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<any>([]);

  const {
    data: employeesData,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetBandMembersByIdQuery({
    id: bandId,
    params: filters,
  });

  const [assignEmployees] = useAssignEmployeesMutation();
  const [removeEmployees] = useRemoveEmployeesMutation();

  function handleSelectEmployeesById(checked: boolean, id: string): void {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds?.filter((_id) => _id !== id));
    }
  }

  function handleSelectAllEmployees(checked: boolean): void {
    setSelectedIds(
      checked ? employeesData?.data?.users?.map(({ _id }) => _id) : []
    );
  }

  function handleSearch(value: string): void {
    setFilters({ ...filters, search: value });
  }

  const handleOffset = (value: number): void => {
    setFilters({ ...filters, offset: (value - 1) * filters?.limit });
  };

  const handleAssignEmployees = async (
    employeeIds: string[]
  ): Promise<void> => {
    try {
      await assignEmployees({ id: bandId, employeeIds }).unwrap();
      toast.success("Employees assigned successfully.");
      setAddEmployeeModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleRemoveEmployees = async (): Promise<void> => {
    try {
      await removeEmployees({ id: bandId, employeeIds: selectedIds }).unwrap();
      toast.success("Employees removed successfully.");
      setSelectedIds([]);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const columns = [
    {
      accessorFn: (row) => row.name,
      id: "name",
      cell: ({ row: { original } }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Checkbox
            checked={selectedIds.includes(original?._id)}
            onChange={({ target }) => {
              handleSelectEmployeesById(target.checked, original?._id);
            }}
          />
          <GlobalAvatar
            width={40}
            height={40}
            imgUrl={original?.profileImage}
            firstName={original?.firstName}
            lastName={original?.lastName}
          />
          {/* <Avatar alt={original?.firstName} src={awsBaseUrl + original?.profileImage} /> */}
          <span>{`${original?.firstName} ${original?.lastName}`}</span>
        </Box>
      ),
      header: () => (
        <Box display="flex" alignItems="center" gap="10px">
          <Checkbox
            onChange={({ target }) => {
              handleSelectAllEmployees(target.checked);
            }}
            checked={
              employeesData?.data?.users?.length &&
              selectedIds?.length === employeesData?.data?.users?.length
            }
          />
          <span>Employee</span>
        </Box>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.employeeTitle,
      id: "employeeTitle",
      cell: (info) => (info.getValue() ? info.getValue() : "--"),
      header: () => <span>Title</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.department,
      id: "department",
      cell: ({
        row: {
          original: { department },
        },
      }) => (department ? department?.departmentName : "--"),
      header: () => <span>Department</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.manager,
      id: "manager",
      cell: ({
        row: {
          original: { manager },
        },
      }) => (manager ? `${manager?.firstName} ${manager?.lastName}` : "--"),
      header: () => <span>Manager</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.startDate,
      id: "startDate",
      cell: ({ row: { original } }) =>
        dayjs(original?.employmentStartDate)?.format("D MMM YYYY"),
      header: () => <span>Start Date</span>,
      isSortable: false,
    },
  ];

  const onBack = (): void => {
    router.push("/settings/compensation/compensation-bands");
  };

  const tableProps: CustomTableProps = {
    data: employeesData?.data?.users,
    isPagination: true,
    totalPages: employeesData?.data?.meta?.totalPages,
    currentPage: employeesData?.data?.meta?.page,
    columns,
    isSuccess,
    isLoading,
    isFetching,
    onPageChange: (onPageData: number) => {
      handleOffset(onPageData);
    },
  };

  return {
    onBack,
    tableProps,
    selectedIds,
    bandName,
    addEmployeeModalOpen,
    setAddEmployeeModalOpen,
    selectedMembers,
    setSelectedMembers,
    handleSearch,
    handleAssignEmployees,
    handleRemoveEmployees,
  };
}
