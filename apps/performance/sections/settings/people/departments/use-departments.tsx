"use client";
import { MenuItem } from "@mui/material";
import { TableIconActions } from "common";
import type { IColumns, IFormValues, IUseEmployeesReturnType, IFilters } from "./departments.types";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { useEffect, useState } from "react";
import {
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useDeleteHeadsDepartmentsMutation,
  useEmployeeLookUpQuery,
  useGetDepartmentQuery,
  useSetDepartmentHeadsMutation,
} from "@services/department/department-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import { CustomUserAvatar } from "@components/custom-users-multiple-avatar";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

const { PERMISSION: PEOPLE_PERMISSION } =
  PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.DEPARTMENTS;

export function useDepartments(): IUseEmployeesReturnType {
  const [isSetDepartmentsModal, setIsSetDepartmentsModal] = useState(false);
  const [isDeleteDepartment, setIsDeleteDepartment] = useState(false);
  const [mutationLoading, setMutationsLoading] = useState<boolean>(false);
  const [isAddDepartment, setIsAddDepartment] = useState(false);
  const [getDepartmentObj, setGetDepartmentObj] = useState<any>({});
  const [filter, setFilter] = useState<IFilters>({ search: "", limit: 10, offset: 0 });
  const [actionType, setActionType] = useState("add");

  const router = useRouter();
  // api call
  const [createDepartment] = useAddDepartmentMutation();
  const {
    data: getDepartment,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetDepartmentQuery(filter);
  const [deleteDepartment] = useDeleteDepartmentMutation({});
  const { data: employeesData } = useEmployeeLookUpQuery({
    includeFields: ["profileImage", "employeeTitle"],
  });
  const [addSetHeadsDepartment] = useSetDepartmentHeadsMutation();
  const [deleteSetHeadsDepartment] = useDeleteHeadsDepartmentsMutation();

  const headersData =
    employeesData?.data?.map((item: any) => ({
      id: item.value,
      name: item.text,
      fields: item.additionalFields,
    })) ?? [];

  const methods = useForm<IFormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string()
          .required("Field is required.")
          // .matches(/^[A-Za-z0-9\s]*$/, "Only alphanumeric characters are allowed")
          .max(50, "Name must be at most 50 characters long"),
        description: Yup.string().max(100, "Description must be at most 100 characters long"),
      })
    ),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onPageChange(value: number): void {
    setFilter({ ...filter, offset: (value - 1) * 10 });
  }

  function handleSearch(value: string): void {
    setFilter({ ...filter, search: value });
  }

  const { handleSubmit, reset, setValue } = methods;

  const handleDeleteDepartment = async (): Promise<void> => {
    setMutationsLoading(true);
    try {
      await deleteDepartment({
        id: getDepartmentObj?._id,
      }).unwrap();
      toast.success("Department deleted successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Department deleted unsuccessfully");
    } finally {
      setMutationsLoading(false);
      setIsDeleteDepartment(false);
    }
  };

  const handleAddDepartment = async (values: {
    name: string;
    description: string;
  }): Promise<void> => {
    setMutationsLoading(true);
    try {
      await createDepartment({
        departmentName: values.name,
        description: values.description,
      }).unwrap();
      toast.success("Add department successful!");
      reset();
    } catch (error) {
      toast.error("Add department not successful!");
    } finally {
      setMutationsLoading(false);
      setIsAddDepartment(false);
    }
  };

  const handleAddHeadsDepartment = async (values: any): Promise<void> => {
    const getIds = values?.title?.map((obj: any) => obj?.id);
    setMutationsLoading(true);
    try {
      await addSetHeadsDepartment({
        id: getDepartmentObj?._id,
        userId: getIds,
      }).unwrap();
      toast.success("Set Department Heads successful!");
    } catch (error) {
      toast.error(error?.message || "An error occurred while adding the department.");
    } finally {
      setMutationsLoading(false);
      setIsSetDepartmentsModal(false);
    }
  };

  const handleDeleteDepartmentsHead = async (): Promise<void> => {
    try {
      await deleteSetHeadsDepartment({
        id: getDepartmentObj?._id,
      }).unwrap();
      toast.success("Delete Heads department successful!");
    } catch (error) {
      toast.error(error?.data?.message || "Delete Heads department not successful!");
    } finally {
      setIsSetDepartmentsModal(false);
    }
  };

  const handleCloseDepartment = (): void => {
    setIsAddDepartment(!isAddDepartment);
    setGetDepartmentObj({});
    reset();
  };

  const columns: IColumns[] = [
    {
      accessorFn: (row) => row.departmentName,
      id: "departmentName",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.membersCount,
      id: "Member",
      cell: (info) => info.getValue(),
      header: () => <span>Members</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.heads,
      id: "heads",
      cell: ({ getValue }) => <CustomUserAvatar data={getValue()} count={2} />,
      header: () => <span>Department Heads</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.goals,
      id: "goals",
      cell: (info) => info.getValue() || "-",
      header: () => <span>Goals</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.id,
      header: () => <span>Actions</span>,
      id: "Actions",
      cell: (item: any) => {
        return (
          <TableIconActions icon={<TableActionsIcon />}>
             <PermissionProtected permission={PEOPLE_PERMISSION.SET_HEAD}>
            <MenuItem
              onClick={() => {
                setIsSetDepartmentsModal(true);
                setGetDepartmentObj(item?.row?.original);
              }}
            >
              Set Department heads
            </MenuItem>
            </PermissionProtected>
            <PermissionProtected permission={PEOPLE_PERMISSION.EDIT}>
            <MenuItem
              onClick={() => {
                setGetDepartmentObj(item?.row?.original);
                router.push(
                  `/settings/departments/edit-departments/?id=${item?.row?.original
                    ?._id}&action=edit`
                );
              }}
            >
              Edit
            </MenuItem>
            </PermissionProtected>
            <PermissionProtected permission={PEOPLE_PERMISSION.VIEW}>
            <MenuItem
              onClick={() => {
                setGetDepartmentObj(item?.row?.original);
                setIsAddDepartment(true);
                setActionType("view");
              }}
            >
              View
            </MenuItem>
            </PermissionProtected>
            <PermissionProtected permission={PEOPLE_PERMISSION.DELETE}>
            <MenuItem
              onClick={() => {
                setIsDeleteDepartment(true);
                setGetDepartmentObj(item?.row?.original);
              }}
            >
              Delete
            </MenuItem>
            </PermissionProtected>
          </TableIconActions>
        );
      },
    },
  ];

  const tableData: CustomTableProps = {
    data: getDepartment?.data?.departments,
    columns,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    isPagination: true,
    onPageChange,
    totalPages: getDepartment?.data?.meta?.pages,
    currentPage: getDepartment?.data?.meta?.page,
  };

  useEffect(() => {
    if (actionType === "view") {
      setValue("name", getDepartmentObj?.departmentName);
      setValue("description", getDepartmentObj?.description);
    } else {
      setValue("name", "");
      setValue("description", "");
    }
  }, [actionType, getDepartmentObj]);

  return {
    mutationLoading,
    isSetDepartmentsModal,
    setIsSetDepartmentsModal,
    setIsDeleteDepartment,
    isDeleteDepartment,
    isAddDepartment,
    handleAddDepartment,
    handleSubmit,
    getDepartment,
    handleDeleteDepartment,
    methods,
    headersData,
    handleAddHeadsDepartment,
    getDepartmentObj,
    handleDeleteDepartmentsHead,
    actionType,
    setActionType,
    tableData,
    handleCloseDepartment,
    handleSearch,
  };
}
