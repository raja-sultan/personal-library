import React, { useState } from "react";
import { Button, Grid, Box, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider } from "common";
import {
  AddFormData,
  AddFormDataValue,
  formSchemaModel,
} from "../company-user/user-management.data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditSystemAdminMutation } from "@services/user-management-api";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

export default function UpdateUserSystemAdminForm({
  apiData,
}: any): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const updateData: any = {};

  for (const keys in AddFormDataValue) {
    if (apiData[keys]) {
      updateData[keys] = apiData[keys];
    }
    if (apiData?.defaultRole) {
      updateData.defaultRole = {
        id: 1,
        name: apiData?.defaultRole,
        value: apiData?.defaultRole,
      };
    }
  }

  const methods = useForm({
    defaultValues: updateData,
    resolver: yupResolver(formSchemaModel),
  });

  const { control, handleSubmit } = methods;
  //API HANDLERS
  const [EditSystemAdmin, { isLoading }] = useEditSystemAdminMutation();
  async function onSubmit(data: any): Promise<any> {
    const submittedData = data;
    for (const keys in submittedData) {
      if (keys === "defaultRole") {
        submittedData[keys] = submittedData[keys].value;
      }
    }
    try {
      const { message } = await EditSystemAdmin({
        params: {
          userId: apiData._id,
        },
        body: {
          ...submittedData,
        },
      }).unwrap();
      toast.success(message || "user edit successfully");
    } catch (error) {
      toast.error(error.data.message || "error occur");
    }
  }
  return (
    <>
      <MenuItem
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Edit
      </MenuItem>
      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Edit Admin user"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {AddFormData.map((form: any) => (
              <Grid key={form.id} xs={12} sx={{ py: 1 }} item>
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
                      setOpenModal(false);
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
                      width: 70,
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
