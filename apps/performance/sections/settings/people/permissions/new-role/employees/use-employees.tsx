import { useEffect, useState } from "react";
import {
  useDeleteEmployeeByRoleMutation,
  useGetEmployeesByRoleQuery,
  useUpdateEmployeesByRoleMutation,
} from "@services/settings/people/permissions-api";
import type { CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";
import { useSearchParams } from "next/navigation";
import { DeleteTrashIcon } from "@assets/icons";
import { Box, IconButton } from "@mui/material";
import { toast } from "react-hot-toast";
import { renderUserImage } from "@root/utils/render-user-image";

interface ReturnType {
  handleDeleteModal?: () => void;
  handleAddEmployeeModal?: () => void;
  handleSearch?: (value: string) => void;
  addEmployeeModal?: boolean;
  openDeleteModal?: boolean;
  tableData?: CustomTableProps;
  handleDeleteEmployee?: () => void;
  handleAddEmployeeIds?: (ids: string[]) => void;
  selectedMember: any;
}

export function useEmployees(): ReturnType {
  const id = useSearchParams().get("id");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState([]);
  const [search, setSearch] = useState("");
  const [tableId, setTableId] = useState("");
  const [offset, setOffset] = useState(0);


  const {
    data: employeesData,
    isError,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetEmployeesByRoleQuery({
    id,
    search,
    limit: 10,
    offset,
  });
  const [deleteEmployeeByRoleMutation] = useDeleteEmployeeByRoleMutation();

  const [updateEmployeesByIdMutation] = useUpdateEmployeesByRoleMutation();

  async function handleAddEmployeeIds(ids: string[]): Promise<void> {
    try {
      await updateEmployeesByIdMutation({ id, employeeIds: ids }).unwrap();
      toast.success("Employees added successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Error while adding employees");
    }
  }
  function handleDeleteModal(): void {
    setOpenDeleteModal(!openDeleteModal);
  }

  async function handleDeleteEmployee(): Promise<void> {
    try {
      await deleteEmployeeByRoleMutation({ id, employeeId: tableId }).unwrap();
      handleDeleteModal();
      toast.success("Employee deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Error while deleting employee");
    }
  }

  useEffect(() => {
    if (employeesData?.data?.employees?.length) {
      setSelectedMember(employeesData.data.employees);
    }
  }, [employeesData?.data]);

  function handleAddEmployeeModal(): void {
    setAddEmployeeModal(!addEmployeeModal);
  }

  function handleSearch(value: string): void {
    setSearch(value);
  }

  function onPageChange(value: number): void {
    setOffset((value - 1) * 10);
  }

  const columns = [
    {
      accessorFn: ({ firstName, lastName }) => firstName + lastName,
      id: "name",
      cell: ({
        row: {
          original: { firstName, lastName, profileImage },
        },
      }) => (
        <Box display="flex" alignItems="center" gap="10px">
          {renderUserImage({
            profileImage,
            firstName: firstName?.toUpperCase(),
            lastName: lastName?.toUpperCase(),
          })}
          <span>
            {firstName} {lastName}
          </span>
        </Box>
      ),
      header: () => <>Name</>,
      isSortable: false,
    },
    {
      accessorFn: ({ employeeTitle }) => employeeTitle,
      id: "jobTitle",
      cell: ({ getValue }) => getValue(),
      header: () => <>job Title</>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "department",
      cell: ({
        row: {
          original: { department },
        },
      }) => department?.departmentName ?? "--",
      header: () => <>department</>,
      isSortable: false,
    },
    {
      accessorFn: ({ manager }) => manager,
      id: "manager",
      cell: ({
        row: {
          original: { manager },
        },
      }) =>
        manager ? (
          <Box display="flex" alignItems="center">
            {renderUserImage({
              profileImage: manager?.profileImage,
              firstName: manager?.firstName?.toUpperCase(),
              lastName: manager?.lastName?.toUpperCase(),
            })}
          </Box>
        ) : (
          "--"
        ),
      header: () => <>manager</>,
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
        <IconButton
          size="small"
          onClick={() => {
            handleDeleteModal();
            setTableId(_id);
          }}
        >
          <DeleteTrashIcon />
        </IconButton>
      ),
      header: () => <>action</>,
      isSortable: false,
    },
  ];

  const tableData: CustomTableProps = {
    columns,
    data: employeesData?.data?.employees,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    isPagination: true,
    onPageChange,
    totalPages: employeesData?.data?.meta?.pages,
    currentPage: employeesData?.data?.meta?.page,
  };

  return {
    handleDeleteModal,
    handleAddEmployeeModal,
    addEmployeeModal,
    openDeleteModal,
    tableData,
    handleSearch,
    handleDeleteEmployee,
    selectedMember,
    handleAddEmployeeIds,
  };
}
