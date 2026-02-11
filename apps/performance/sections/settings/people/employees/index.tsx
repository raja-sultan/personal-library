"use client";
import React from "react";
import { Button } from "@mui/material";
// import { EmployeeFilter } from "@components/employee-filter";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEmployees } from "./use-employees";
import CustomModal from "@components/custom-modal";
import { CheckedIcon } from "@assets/icons/checked-curcle-icon";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { FilterComponent } from "@components/drawer-filter-component";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.PEOPLE;

export function EmployeesSection(): JSX.Element {
  const {
    columns,
    handleOffset,
    deactivateUser,
    handleDeactivateUser,
    activateHandle,
    loginHandle,
    loginModalHandler,
    openActivateModal,
    openLogin,
    openResetPasswordModal,
    resetPasswordModalHandle,
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
    filterList,
    employeeStatusHandler,
    isUserActivate,
    handleDownloadCSV,
    employeeObject,
    handleApplyFilter,
    handleClearAllFilter,
  } = useEmployees();

  return (
    <>
      <CustomTableWithHeader
        primaryHeader
        primaryHeaderProps={{
          title: "Employees",
          description:
            "Manages employee accounts by adding or deactivating them, ensuring smooth access and security within the organization's systems.",
          actions: (
            <PermissionProtected permission={PERMISSION.ADD}>
            <Button
              variant="contained"
              onClick={() => {
                router.push("/settings/employees/add");
              }}
            >
              Add Employee
            </Button>
           </PermissionProtected>
          ),
        }}
        secondaryHeader
        secondaryHeaderProps={{
          handleSearch: changeHandler,
          actions: (
            <>
              <PermissionProtected permission={PERMISSION.VIEW}>
              <Button
                variant="outlined"
                startIcon={<DownloadCsvIcon />}
                onClick={handleDownloadCSV}
              >
                Download CSV
              </Button>
              </PermissionProtected>
              <Button variant="outlined" onClick={toggleDrawer} endIcon={<ChevronRightIcon />}>
                Filters
              </Button>
            </>
          ),
        }}
        tableProps={{
          data: employeesData?.data?.employees,
          columns,
          isLoading,
          isFetching,
          isError,
          isPagination: true,
          isSuccess,
          totalPages: employeesData?.data?.meta?.pages,
          currentPage: employeesData?.data?.meta?.page,
          onPageChange: (onPageData: number) => {
            handleOffset(onPageData);
          },
          onSortByChange: (onSortData: any) => {
            return onSortData;
          },
        }}
      />
      {open && (
        <FilterComponent
          open={open}
          onClose={toggleDrawer}
          data={filterList}
          handleApplyFilter={handleApplyFilter}
          handleClearAllFilters={handleClearAllFilter}
        />
      )}
      {/* Deactivate Modal */}
      {deactivateUser && (
        <CustomModal
          open={deactivateUser}
          onClose={handleDeactivateUser}
          title="Deactivate Account"
          message="Are you sure you want to deactivate this account?"
          acceptText="Deactivate"
        />
      )}

      {/* reset modal */}
      {openResetPasswordModal && (
        <CustomModal
          onAccept={resetPasswordHandle}
          open={openResetPasswordModal}
          title="Reset Password"
          acceptText="Reset"
          message="Are you sure you want to reset password for this user?"
          onClose={resetPasswordModalHandle}
        />
      )}

      {openLogin && (
        <CustomModal
          onAccept={loginHandle}
          open={openLogin}
          title={`Log in as ${employeeObject.firstName} ${employeeObject.lastName}?`}
          message={`You will be able to view Personnel Library as ${employeeObject.firstName} ${employeeObject.lastName} sees it, but you will not be able to take any actions on your behalf of him.`}
          acceptText="Log in"
          acceptButtonProps={{ color: "primary" }}
          headerIcon={<CheckedIcon />}
          onClose={loginModalHandler}
        />
      )}

      {openActivateModal && (
        <CustomModal
          onAccept={employeeStatusHandler}
          open={openActivateModal}
          title={isUserActivate ? "Deactivate Account" : "Activate account"}
          acceptText={isUserActivate ? "Deactivate" : "Activate"}
          message={
            isUserActivate
              ? "Are you sure you want to deactivate this account?"
              : "Are you sure you want to activate this account?"
          }
          onClose={activateHandle}
        />
      )}

      {/* Resend invite Modal */}
      {resendInviteModal && (
        <CustomModal
          onAccept={resendInviteHandler}
          open={resendInviteModal}
          title="Resend invite"
          acceptText="Confirm"
          message="Do you want to resend invitation to this user to help them join your account?"
          onClose={resendInviteModalHandler}
        />
      )}
    </>
  );
}
