import { Button, Grid, Box, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider } from "common";
import {
  AddUserFormData,
  AddUserFormValue,
  formSchemaModelTwo,
} from "./user-management.data";
import { useState } from "react";
import { useEditCompanyUserMutation } from "@services/user-management-api";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";

// const updateApiData: any = {};

export function EditCompanyUserForm({
  apiData,
}: {
  apiData: any;
}): JSX.Element {
  const {
    _id,
    allowedCompany,
    firstName,
    lastName,
    email,
    businessName,
    isActive,
  } = apiData;
  const [addUserModal, setAddUserModal] = useState(false);
  const [editCompanyUser, { isLoading }] = useEditCompanyUserMutation();

  //Start Logic To Convert Api Data into Format Required for Auto Sync/Async Dropdown
  const allowedCompanies = Object.values(allowedCompany).map(
    (item: any, index: number) => ({
      id: index + 1,
      name: item,
      value: item,
    })
  );

  const updateApiData: any = {
    allowedCompany: allowedCompanies,
    firstName,
    lastName,
    email,
    companyName: businessName,
    status: {
      id: isActive ? 1 : 2,
      name: isActive ? "Active" : "InActive",
      value: isActive ? "Active" : "InActive",
    },
  };
  //End Logic To Convert Api Data into Format Required for Auto Sync/Async Dropdown

  const methods = useForm({
    defaultValues: apiData ? updateApiData : AddUserFormValue,
    resolver: yupResolver(formSchemaModelTwo),
  });

  const { control, handleSubmit, reset } = methods;

  async function onSubmit(data: any): Promise<any> {
    //Start Prepare Payload for API
    const companies = data?.allowedCompany.map((item: any) => item.value);
    const payload = {
      allowedCompany: companies,
      companyName: data.companyName,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      isActive: data.status.value === "Active",
    };
    //End Prepare Payload for API

    try {
      const { message } = await editCompanyUser({
        params: {
          id: _id,
        },
        body: payload,
      }).unwrap();
      toast.success(message || "Edit Company User Successfully");
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
      reset();
    }
  }

  return (
    <>
      <MenuItem
        onClick={() => {
          setAddUserModal(true);
          reset();
        }}
      >
        Edit
      </MenuItem>
      <CustomModal
        onClose={() => {
          setAddUserModal(false);
        }}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Edit User"
        closeButtonProps={{
          onClick: () => {
            setAddUserModal(false);
          },
        }}
        isOpen={addUserModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {AddUserFormData.map((form: any) => (
              <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 1 }} item>
                <form.component control={control} {...form.RhfValue} />
              </Grid>
            ))}
            <Grid xs={12} item>
              <Box mt={1} display="flex">
                <Box
                  ml="auto"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <Button
                    onClick={() => {
                      setAddUserModal(false);
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      width: 50,
                      height: 35,
                    }}
                    type="submit"
                  >
                    Update
                  </LoadingButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}
