"use client";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { CustomChip, TableIconActions } from "common";
import type { Columns } from "./employees.types";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { useRouter } from "next/navigation";
import {
  useEmployeesListQuery,
  useResendInviteMutation,
  useActivateDeactivateEmployeeMutation,
  useResetEmployeePasswordMutation,
} from "@services/settings/people/employees-api";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";
import { downloadCSVFile } from "@root/utils";
// import { useGetDepartmentQuery } from "@services/department/department-api";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { useDispatch, useSelector } from "react-redux";
import { useLoginAsMutation } from "@services/login-as";
import { loginAsAction } from "@root/slices";
import { GlobalAvatar } from "@components/global-avatar";
import { PermissionProtected } from "@guards/permission-protected";
import { PERMISSIONS } from "@enums/permissions";

interface UseEmployeesReturnType {
  columns: Columns[];
  deactivateUser?: boolean;
  handleDeactivateUser?: () => void;
  openResetPasswordModal?: boolean;
  resetPasswordHandle?: () => void;
  resetPasswordModalHandle?: (data?: any) => void;
  openLogin?: boolean;
  loginHandle?: () => void;
  loginModalHandler?: (data?: any) => void;
  openActivateModal?: boolean;
  activateHandle?: (data?: any) => void;
  resendInviteModalHandler?: (data?: any) => void;
  resendInviteModal?: boolean;
  handleOffset: (value: number) => void;
  resendInviteHandler?: () => void;
  router: AppRouterInstance;
  toggleDrawer: () => void;
  changeHandler: (value: string) => void;
  employeesData: any;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  open: boolean;
  employeeStatusHandler?: () => void;
  activateUser?: boolean;
  isUserActivate?: boolean;
  selectedFilter: any;
  filterList: any;
  setSelectedFilter: any;
  handleDownloadCSV?: () => void;
  employeeObject?: any;
  searchValues: string;
  changeFilterHandler: ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => void;
  handleClearAllFilter: () => void;
  handleApplyFilter: (data: any[]) => void;
}

const { PERMISSION: PEOPLE_PERMISSION } =
  PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.PEOPLE;

// Define the useEmployees custom hook
export function useEmployees(): UseEmployeesReturnType {
  const [deactivateUser, setDeactivateUser] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] =
    useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openActivateModal, setOpenActivateModal] = useState<boolean>(false);
  const [resendInviteModal, setResendInviteModal] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [employeeObject, setEmployeeObject] = useState<any>(null);
  const [activateUser, setActivateUser] = useState<boolean>(false);
  const isUserActivate = employeeObject?.isActive;
  const isLoggedInAs = useSelector((state: any) => state?.loginAs?.loginAs);
  // const [loginAsUser] = useLoginAsUserMutation();
  const [resendInvite] = useResendInviteMutation();
  const [employeeResetPassword] = useResetEmployeePasswordMutation();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchValues, setSearchValues] = useState<string>("");
  const dispatch = useDispatch();
  const [loginAsMutation] = useLoginAsMutation();

  const [filterData, setFilterData] = useState<any>(null);

  function changeFilterHandler({ target: { value } }: any): void {
    setSearchValues(value);
  }

  const router = useRouter();
  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  let timer: ReturnType<typeof setTimeout>;

  function changeHandler(value: string): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchValue(value);
    }, 1000);
  }

  function handleApplyFilter(data: any[]): void {
    const managers = data?.find((obj) => obj?.name === "Manager")?.optionsIds;
    const employeeTitle = data?.find(
      (obj) => obj?.name === "Job Title"
    )?.optionsIds;
    const department = data?.find(
      (obj) => obj?.name === "Department"
    )?.optionsIds;
    const employeeStatus = data?.find(
      (obj) => obj?.name === "Status"
    )?.optionsIds;

    if (
      managers?.length > 0 ||
      employeeTitle?.length > 0 ||
      department?.length > 0 ||
      employeeStatus?.length > 0
    ) {
      setFilterData({
        managers: managers?.length > 0 ? managers : undefined,
        employeeTitle: employeeTitle?.length > 0 ? employeeTitle : undefined,
        department: department?.length > 0 ? department : undefined,
        employeeStatus: employeeStatus?.length > 0 ? employeeStatus : undefined,
      });
    }
  }

  function handleClearAllFilter(): void {
    setFilterData(null);
  }

  //***************************************filter data array ***********************************************/
  const { data: getDepartments } = useGetReferenceDataLookupQuery({
    search: searchValues,
    type: "departments",
  });
  const { data: getMangers } = useGetReferenceDataLookupQuery({
    search: searchValues,
    type: "managers",
  });
  const { data: getJobTitle } = useGetReferenceDataLookupQuery({
    search: searchValues,
    type: "job_title",
  });

  const departments = getDepartments?.data?.map((department) => {
    return { id: department.value, name: department.text };
  });
  const managers = getMangers?.data?.map((manager) => {
    return { id: manager.value, name: manager.text };
  });
  const jobsTitle = getJobTitle?.data?.map((jobTitle) => {
    return { id: jobTitle.text, name: jobTitle.text };
  });
  const filterList = [
    {
      title: "Manager",
      options: managers,
    },
    {
      title: "Job Title",
      options: jobsTitle,
    },
    {
      title: "Department",
      options: departments,
    },
    {
      title: "Status",
      hideSearchBar: true,
      options: [
        {
          id: "Invited",
          name: "Invited",
        },
        {
          id: "Active",
          name: "Active",
        },
        {
          id: "Deactivated",
          name: "Deactivated",
        },
      ],
    },
  ];

  // **************************************filter data query ************************************************

  const limit = 10;
  const {
    data: employeesData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useEmployeesListQuery({
    limit,
    offset,
    search: searchValue,
    ...filterData,
  });
  const [activateDeactivateEmployee] = useActivateDeactivateEmployeeMutation();

  function handleDeactivateUser(): void {
    setDeactivateUser(!deactivateUser);
  }

  function handleOffset(value: number): void {
    setOffset((value - 1) * limit);
  }
  const renderStatusChip = {
    Invited: "primary",
    Active: "success",
    Deactivated: "danger",
  };

  const resetPasswordModalHandle = (original): void => {
    setEmployeeObject(original);
    setOpenResetPasswordModal(!openResetPasswordModal);
  };

  const resetPasswordHandle = async (): Promise<void> => {
    const id = employeeObject?._id;
    try {
      await employeeResetPassword(id).unwrap();
      setOpenResetPasswordModal(false);
      toast.success(
        "Password has been successfully reset. Review employee email for further details."
      );
    } catch (error) {
      setOpenResetPasswordModal(false);
      toast.error(error?.data?.message);
    }
  };

  async function loginHandle(): Promise<void> {
    try {
      const res = await loginAsMutation({
        id: employeeObject?._id,
        session: true,
      }).unwrap();
      dispatch(loginAsAction.loginAs(res?.data?.loggedInAs));
      setOpenLogin(!openLogin);
      toast.success(
        `Successfully login as ${employeeObject?.firstName} ${employeeObject?.lastName}`
      );
    } catch (error) {
      toast.error(
        error?.data?.message || "Error while login as user please try again"
      );
    }
  }

  const activateHandle = (original): void => {
    setEmployeeObject(original);
    setOpenActivateModal(!openActivateModal);
  };

  const resendInviteModalHandler = (original): void => {
    setEmployeeObject(original);
    setResendInviteModal(!resendInviteModal);
  };

  const resendInviteHandler = async (): Promise<void> => {
    try {
      await resendInvite(employeeObject?._id).unwrap();
      setResendInviteModal(false);
      toast.success("Invite resent successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Error while sending invite");
    }
  };

  function handleDownloadCSV(): void {
    downloadCSVFile("employees/download-csv", "employees", {
      search: searchValue,
      ...(filterData?.managers && {
        managers: filterData?.managers?.join(","),
      }),
      ...(filterData?.department && {
        department: filterData?.department?.join(","),
      }),
      ...(filterData?.employeeTitle && {
        employeeTitle: filterData?.employeeTitle?.join(","),
      }),
      ...(filterData?.employeeStatus && {
        employeeStatus: filterData?.employeeStatus?.join(","),
      }),
    });
  }

  const employeeStatusHandler = async (): Promise<void> => {
    try {
      await activateDeactivateEmployee({
        id: employeeObject?._id,
        status: !employeeObject?.isActive,
      }).unwrap();
      setOpenActivateModal(false);
      toast.success(
        employeeObject?.isActive ? "Account deactivated" : "Account activated"
      );
      setActivateUser(!activateUser);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const loginModalHandler = (original): void => {
    setEmployeeObject(original);
    setOpenLogin(!openLogin);
  };

  // const loginHandler = async (): Promise<void> => {
  //   setOpenLogin(!openLogin);
  // };

  const columns: Columns[] = [
    {
      accessorFn: (row) => `${row?.firstName} ${row?.lastName}`,
      id: "name",
      cell: ({ row: { original } }: any) => (
        <Box display="flex" alignItems="center" gap={2}>
          <GlobalAvatar
            imgUrl={original?.profileImg}
            firstName={original?.firstName}
            lastName={original?.lastName}
          />
          {`${original?.firstName} ${original?.lastName}`}
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.employeeTitle,
      id: "jobTitle",
      cell: (info) => info.getValue(),
      header: () => <span>Job Title</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.department,
      id: "department",
      cell: ({
        row: {
          original: { department },
        },
      }: any) => department?.departmentName,
      header: () => <span>Department</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row.manager,
      id: "manager",
      cell: ({
        row: {
          original: { manager },
        },
      }: any) => (
        <>
          {manager ? (
            <GlobalAvatar
              imgUrl={manager?.profileImg}
              firstName={manager?.firstName}
              lastName={manager?.lastName}
            />
          ) : (
            "--"
          )}
          {/* {original?.manager ? <Image style={{ width: "32px", height: "32px", objectFit: "cover" }} src={Person} alt="" /> : "--"} */}
        </>
      ),
      header: () => <span>Manager</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.userPermissions,
      id: "permissions",
      cell: ({
        row: {
          original: { userPermissions },
        },
      }: any) =>
        userPermissions?.length > 0 ? (
          <span>
            {userPermissions?.map((permission: string) => `${permission}, `)}
          </span>
        ) : (
          "--"
        ),
      header: () => <span>Permissions</span>,
      isSortable: false,
    },
    {
      accessorFn: (row) => row?.employeeStatus,
      id: "status",
      cell: ({
        row: {
          original: { employeeStatus },
        },
      }: any) => (
        <Box>
          <CustomChip
            variant={renderStatusChip[employeeStatus]}
            ChipProps={{ label: employeeStatus }}
          />
        </Box>
      ),
      header: () => <span>Status</span>,
    },
    {
      header: () => <span>Actions</span>,
      id: "actions",
      cell: ({ row: { original } }: any) => {
        const { employeeStatus, _id, isActive } = original;
        return (
          <Box display="inline-flex" justifyContent="center">
            <TableIconActions icon={<TableActionsIcon />}>
              <PermissionProtected permission={PEOPLE_PERMISSION.RESEND_INVITE}>
              {employeeStatus === "Invited" && (
                <MenuItem
                  onClick={() => {
                    resendInviteModalHandler(original);
                  }}
                >
                  Resend Invite
                </MenuItem>
              )}
              </PermissionProtected>
              <PermissionProtected
                permission={PEOPLE_PERMISSION.ACTIVATE_OR_DEACTIVATE}
              >
              <MenuItem
                onClick={() => {
                  activateHandle(original);
                }}
              >
                {isActive ? "Deactivate User" : "Activate User"}
              </MenuItem>
              </PermissionProtected>
              <PermissionProtected permission={PEOPLE_PERMISSION.VIEW}>
              {employeeStatus !== "Invited" && (
                <MenuItem
                  onClick={(): void => {
                    router.push(`/settings/employees/profile?id=${_id}`);
                  }}
                >
                  View Profile
                </MenuItem>
              )}
              </PermissionProtected>
              <PermissionProtected permission={PEOPLE_PERMISSION.EDIT}>
              <MenuItem
                onClick={() => {
                  router.push(`/settings/employees/edit-profile?id=${_id}`);
                }}
              >
                Edit Profile
              </MenuItem>
              </PermissionProtected>
              <PermissionProtected permission={PEOPLE_PERMISSION.RESET_PWD}>
              {employeeStatus === "Active" && (
                <MenuItem
                  onClick={() => {
                    resetPasswordModalHandle(original);
                  }}
                >
                  Reset Password
                </MenuItem>
              )}
              </PermissionProtected>
              {/* {employeeStatus !== "Deactivated" && (
                <MenuItem onClick={handleDeactivateUser}>
                  Deactivate User
                </MenuItem>
              )} */}
              <PermissionProtected permission={PEOPLE_PERMISSION.LOGIN_AS}>
              {employeeStatus !== "Invited" && !isLoggedInAs && (
                <MenuItem
                  onClick={() => {
                    loginModalHandler(original);
                  }}
                >
                  Log in as user
                </MenuItem>
              )}
              </PermissionProtected>
            </TableIconActions>
          </Box>
        );
      },
    },
  ];
  return {
    columns,
    handleOffset,
    deactivateUser,
    handleDeactivateUser,
    openResetPasswordModal,
    resetPasswordModalHandle,
    openLogin,
    loginHandle,
    loginModalHandler,
    openActivateModal,
    activateHandle,
    resendInviteModalHandler,
    resendInviteModal,
    resendInviteHandler,
    resetPasswordHandle,
    router,
    toggleDrawer,
    changeHandler,
    employeesData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    open,
    employeeStatusHandler,
    activateUser,
    isUserActivate,
    selectedFilter,
    setSelectedFilter,
    handleDownloadCSV,
    employeeObject,
    filterList,
    changeFilterHandler,
    searchValues,
    handleApplyFilter,
    handleClearAllFilter,
  };
}
