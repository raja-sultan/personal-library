import React, { useState } from "react";
import { Box, Grid, Skeleton, TextField, Typography } from "@mui/material";
import { OfficeAndDepartmentComp } from "./office-and-department";
import { NewOfficeModal } from "./office-and-department/new-office-modal";
import { NewDepartmentModal } from "./office-and-department/new-department-modal";
import toast from "react-hot-toast";
import {
  useDeleteOfficeMutation,
  useGetOfficesListQuery,
} from "@services/offices-and-departments/offices-api";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsListQuery,
} from "@services/offices-and-departments/departments-api";

export function OrganizationSec(): React.JSX.Element {
  const [createNewOffice, setCreateNewOffice] = useState<any>(false);
  const [createNewDepartment, setCreateNewDepartment] = useState<any>(false);

  const { data: officeData, isLoading: isOfficeLoadingGet } =
    useGetOfficesListQuery({});

  const { data: departmentData, isLoading: isDepartmentLoadingGet } =
    useGetDepartmentsListQuery({});

  const [deleteOffice, { isLoading: isOfficeLoadingDelete }] =
    useDeleteOfficeMutation();

  const [deleteDepartment, { isLoading: isDepartmentLoadingDelete }] =
    useDeleteDepartmentMutation();

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Organization
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Organization Name
      </Typography>
      <TextField
        disabled
        defaultValue="Omniva-Crop"
        variant="outlined"
        fullWidth
        sx={{
          maxWidth: 300,
          mb: 1,
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {isOfficeLoadingGet || isOfficeLoadingDelete ? (
            <Skeleton />
          ) : (
            <OfficeAndDepartmentComp
              addHandler={() => {
                setCreateNewOffice(true);
              }}
              updateHandler={(item: any) => {
                setCreateNewOffice({ open: true, item });
              }}
              deleteHandler={(id: any) => {
                deleteOffice({ id })
                  .unwrap()
                  .then(() => {
                    toast.success("Successfully deleted");
                  })
                  .catch((error) => {
                    toast.error(error.message);
                  });
              }}
              name="Offices"
              description="Create offices to better organize your company’s jobs"
              itemList={officeData?.data?.office ?? []}
              btnName="New Office"
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {isDepartmentLoadingGet || isDepartmentLoadingDelete ? (
            <Skeleton />
          ) : (
            <OfficeAndDepartmentComp
              addHandler={() => {
                setCreateNewDepartment(true);
              }}
              updateHandler={(item: any) => {
                setCreateNewDepartment({ open: true, item });
              }}
              deleteHandler={(id: any) => {
                deleteDepartment({ id })
                  .unwrap()
                  .then(() => {
                    toast.success("Successfully deleted");
                  })
                  .catch((error) => {
                    toast.error(error.message);
                  });
              }}
              name="Departments"
              description="Create departments to better organize your company’s jobs"
              itemList={departmentData?.data?.departments ?? []}
              btnName="New Department"
            />
          )}
        </Grid>
      </Grid>

      <NewDepartmentModal
        createNewDepartment={createNewDepartment}
        setCreateNewDepartment={setCreateNewDepartment}
      />
      <NewOfficeModal
        createNewOffice={createNewOffice}
        setCreateNewOffice={setCreateNewOffice}
      />
    </Box>
  );
}
