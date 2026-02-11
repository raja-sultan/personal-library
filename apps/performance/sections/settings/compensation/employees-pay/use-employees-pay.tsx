"use client";

import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Box, MenuItem } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";

import { TableIconActions } from "common";
import { downloadCSVFile } from "@root/utils";
import { GlobalAvatar } from "@components/global-avatar";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import {
  useDeleteEmployeePayMutation,
  useGetEmployeePayDataQuery,
  useGetLookupDataQuery,
  useUploadEmployeePayMutation,
} from "@services/compensation/employee-pay/employee-pay-api";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

interface FilterType {
  limit: number;
  offset: number;
  search?: string;
  employees?: string[];
  managers?: string[];
  departments?: string[];
}

const initialFilterValues = {
  limit: 10,
  offset: 0,
};
const { PERMISSION: COMPENSATION_PERMISSION } =
  PERMISSIONS.PERFORMANCE.SETTING.COMPENSATION.EMPLOYEE_PAY;

  // const { PERMISSION: PEOPLE_PERMISSION } =
  // PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.PEOPLE;
export function useEmployeesPay(): any {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [filterDrawer, setFilterDrawer] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<FilterType>(initialFilterValues);

  const { data: employeePayData, isLoading, isFetching } = useGetEmployeePayDataQuery(filterValues);
  const { data: employeeData } = useGetLookupDataQuery({
    type: "employees",
  });

  const { data: managersData } = useGetLookupDataQuery({
    type: "managers",
  });
  const { data: departmentsData } = useGetLookupDataQuery({
    type: "departments",
  });

  const [uploadEmployeePay] = useUploadEmployeePayMutation();
  const [deleteEmployeePay] = useDeleteEmployeePayMutation();

  const methods = useForm({
    defaultValues: {
      csv: null,
    },
  });
  const selectedFile: any = methods.watch("csv");

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFilterDrawer = (): void => {
    setFilterDrawer(!filterDrawer);
  };

  const handleOffset = (value: number): void => {
    setFilterValues({ ...filterValues, offset: (value - 1) * filterValues?.limit });
  };

  // download CSV
  function handleExportCSV(): void {
    downloadCSVFile("employee-pay/export", "employee-pays", {});
  }

  function handleDeleteEmployee(id: string | null): void {
    id && setEmployeeId(id);
    setIsDeleteModalOpen(Boolean(id));
  }
  const handleSearch = (value: string): void => {
    setFilterValues({ ...filterValues, offset: 0, search: value });
  };

  const handleApplyFilter = (options: any): void => {
    const employees = options?.find((option) => option.name === "employee")?.optionsIds ?? [];
    const managers = options?.find((option) => option.name === "manager")?.optionsIds ?? [];
    const departments = options?.find((option) => option.name === "department")?.optionsIds ?? [];
    if (employees?.length > 0 || managers.length > 0 || departments.length > 0) {
      setFilterValues({
        ...filterValues,
        offset: 0,
        managers: managers.length > 0 ? managers : undefined,
        departments: departments.length > 0 ? departments : undefined,
        employees: employees.length > 0 ? employees : undefined,
      });
    } else {
      setFilterValues({ ...initialFilterValues });
    }
  };

  const handleClearAllFilters = (): void => {
    setFilterValues({ ...initialFilterValues });
  };

  //Upload Employee pay data API
  const uploadEmployeePayHandler = async (): Promise<void> => {
    const formData = new FormData();
    formData.append("employeePay", selectedFile);
    try {
      await uploadEmployeePay(formData).unwrap();
      toast.success("Employee Pay uploaded successfully.");
      setIsModalOpen(!isModalOpen);
      methods.reset();
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  //Delete Employee pay API
  const handleDeleteEmployeePay = async (): Promise<void> => {
    try {
      await deleteEmployeePay(employeeId).unwrap();
      toast.success("Record Deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

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
    {
      title: "department",
      options: formatFilterData(departmentsData?.data),
    },
  ];

  const currencySign = {
    "AUD $": "$",
    "USD $": "$",
    "GBP £": "£",
  };
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.group({
      id: "employeeInfo",
      header: () => <span>Employee Information</span>,
      columns: [
        columnHelper.accessor("name", {
          id: "name",
          cell: ({ row: { original } }: any) => (
            <Box display="flex" gap="10px" alignItems="center">
              <GlobalAvatar
                imgUrl={original?.employee?.profileImage}
                firstName={original?.employee?.firstName}
                lastName={original?.employee?.lastName}
              />
              {original?.employee?.fullName}
            </Box>
          ),
          header: () => <span>Name</span>,
        }),
        columnHelper.accessor("title", {
          id: "title",
          cell: ({ row: { original } }: any) => original?.employee?.employeeTitle,
          header: () => <span>Title</span>,
        }),
        columnHelper.accessor("department", {
          id: "department",
          cell: ({ row: { original } }: any) => original?.departmentData?.departmentName,
          header: () => <span>Department</span>,
        }),
        columnHelper.accessor("jobLevel", {
          id: "jobLevel",
          cell: ({ row: { original } }: any) => original?.employee?.jobLevel,
          header: () => <span>Job Level</span>,
        }),
        columnHelper.accessor("manager", {
          id: "manager",
          cell: ({
            row: {
              original: { managerData },
            },
          }: any) => (managerData ? `${managerData?.firstName} ${managerData?.lastName}` : "--"),
          header: () => <span>Manager</span>,
        }),
        columnHelper.accessor("location", {
          id: "location",
          cell: ({ row: { original } }: any) => original?.locationData?.address,
          header: () => <span>Location</span>,
        }),
      ],
    }),
    columnHelper.group({
      id: "compensationDetails",
      header: () => <span>Compensation Details</span>,
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("compensationBand", {
          id: "compensationBand",
          cell: (info) => (info.getValue() ? info.getValue() : "--"),
          header: () => <span>Compensation Band</span>,
        }),
        columnHelper.accessor("payType", {
          id: "payType",
          cell: (info) => info.getValue(),
          header: () => <span>Pay Type</span>,
        }),
        columnHelper.accessor("currency", {
          id: "currency",
          cell: (info) => info.getValue(),
          header: () => <span>Currency</span>,
        }),
        columnHelper.accessor("basePay", {
          id: "basePay",
          cell: ({ row: { original } }: any) =>
            currencySign[original?.currency] + original?.basePay,
          header: () => <span>Base Pay</span>,
        }),
        columnHelper.accessor("payEffectiveDate", {
          id: "payEffectiveDate",
          cell: (info) => dayjs(info.getValue()).format("DD-MM-YYYY"),
          header: () => <span>Pay Effective</span>,
        }),
        columnHelper.accessor("actions", {
          id: "actions",
          cell: ({ row: { original } }: any) => (
            <Box display="flex" justifyContent="center">
              <TableIconActions icon={<TableActionsIcon />}>
              <PermissionProtected permission={COMPENSATION_PERMISSION.EDIT}>
                <MenuItem
                  onClick={() => {
                    router.push(
                      `/settings/compensation/employees-pay/details/?id=${original?._id}&action=edit`
                    );
                  }}
                >
                  Edit
                </MenuItem>
                </PermissionProtected>
                <PermissionProtected permission={COMPENSATION_PERMISSION.DELETE}>
                <MenuItem 
                  onClick={() => {
                    handleDeleteEmployee(original?._id);
                  }}
                >
                  Delete
                </MenuItem>
                </PermissionProtected>
              </TableIconActions>
            </Box>
          ),
          header: () => <>Actions</>,
        }),
      ],
    }),
  ];

  const tableData = {
    isLoading,
    isFetching,
    data: employeePayData?.data?.employeePay ?? [],
    totalPages: employeePayData?.data?.meta?.pages,
    currentPage: employeePayData?.data?.meta?.page,
    columns,
    onPageChange: (onPageData: number) => {
      handleOffset(onPageData);
    },
  };

  return {
    methods,
    tableData,
    filterData,
    filterValues,
    isModalOpen,
    filterDrawer,
    isDeleteModalOpen,
    handleToggleModal,
    uploadEmployeePayHandler,
    setIsDeleteModalOpen,
    handleSearch,
    handleDeleteEmployeePay,
    handleExportCSV,
    handleFilterDrawer,
    handleDeleteEmployee,
    handleApplyFilter,
    handleClearAllFilters,
  };
}
