"use client";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormLabel, DialogActions } from "@mui/material";
import { FormProvider, RHFTextField } from "common";
import { useDepartments } from "./use-departments";
import CustomModal from "@components/custom-modal";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import SetDepartmentModal from "./set-department-modal/set-department-modal";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.DEPARTMENTS;
export function Departments(): JSX.Element {
  const {
    mutationLoading,
    isSetDepartmentsModal,
    setIsSetDepartmentsModal,
    setIsDeleteDepartment,
    isDeleteDepartment,
    handleAddDepartment,
    isAddDepartment,
    handleSubmit,
    handleDeleteDepartment,
    headersData,
    handleAddHeadsDepartment,
    handleDeleteDepartmentsHead,
    methods,
    getDepartmentObj,
    actionType,
    setActionType,
    handleCloseDepartment,
    tableData,
    handleSearch,
  } = useDepartments();
  return (
    <>
      <CustomTableWithHeader
        primaryHeader
        primaryHeaderProps={{
          title: "Departments",
          description:
            "Add new departments, creating distinct functional units within the organization to streamline operations and allocate resources effectively.",
          actions: (
            <PermissionProtected permission={PERMISSION.ADD}>
            <Button
              variant="contained"
              onClick={() => {
                setActionType("add");
                handleCloseDepartment();
              }}
            >
              Add Department
            </Button>
            </PermissionProtected>
          ),
        }}
        secondaryHeader
        secondaryHeaderProps={{
          handleSearch,
        }}
        tableProps={tableData}
      />
      <SetDepartmentModal
        isLoading={mutationLoading}
        isOpen={isSetDepartmentsModal}
        handleClose={() => {
          setIsSetDepartmentsModal(!isSetDepartmentsModal);
        }}
        title={`${getDepartmentObj?.departmentName ?? "Set Department"} Heads`}
        onSubmit={handleAddHeadsDepartment}
        headersData={headersData}
        handleDelete={handleDeleteDepartmentsHead}
      />
      {isAddDepartment && (
        <CustomModal
          open={isAddDepartment}
          title={`${actionType === "add" ? "Add" : "View"} Department`}
          headerIcon=""
          message=""
          onClose={handleCloseDepartment}
          hideFooter
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(handleAddDepartment)}>
            <RHFTextField
              name="name"
              outerLabel="Name"
              type="text"
              placeholder="Enter name"
              sx={{ mb: 2 }}
              disabled={actionType === "view"}
            />
            <RHFTextField
              name="description"
              disabled={actionType === "view"}
              outerLabel={
                <Box>
                  <FormLabel>Description </FormLabel>
                  <FormLabel sx={{ color: "#98A2B3" }}>(Optional)</FormLabel>
                </Box>
              }
              type="text"
              placeholder="Enter a description..."
              sx={{ mb: 2 }}
              maxRows={4}
              minRows={4}
              multiline
            />
            <DialogActions>
              <Button variant="outlined" onClick={handleCloseDepartment}>
                Cancel
              </Button>
              {actionType === "add" && (
                <LoadingButton loading={mutationLoading} variant="contained" type="submit">
                  Add
                </LoadingButton>
              )}
            </DialogActions>
          </FormProvider>
        </CustomModal>
      )}

      <CustomModal
        isLoading={mutationLoading}
        title="Delete Department"
        open={isDeleteDepartment}
        onClose={() => {
          setIsDeleteDepartment(false);
        }}
        acceptButtonProps={{ onClick: handleDeleteDepartment }}
      />
    </>
  );
}
