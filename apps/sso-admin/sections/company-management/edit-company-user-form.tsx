import { Button, Grid, Box, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider } from "common";
import {
  EditFormData,
  EditFormDataValue,
  EditFormSchemaModel,
  FilterArray,
} from "./company-management.data";
import { Edit } from "@assets/common";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useEditCompanyManagementMutation } from "@services/company-management-api";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";

export function EditCompanyUserForm({
  apiData,
}: {
  apiData?: any;
}): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const updateData: any = {};
  for (const keys in apiData) {
    updateData[keys] = apiData[keys];
    if (keys === "allowedCompany") {
      updateData[keys] = apiData[keys].map((item: any, index) => {
        return { id: index + 1, name: item, value: item };
      });
    }
    if (keys === "address") {
      updateData.companyAddress = `${apiData[keys].addressLine??""}`;
      updateData.state = apiData[keys].state??'';
      updateData.city = apiData[keys].city??"";
    }
    if (keys === "email") {
      updateData.workEmail = apiData[keys];
    }
  }

  const methods = useForm({
    defaultValues: apiData ? updateData : EditFormDataValue,
    resolver: yupResolver(EditFormSchemaModel),
  });
  const { control, handleSubmit } = methods;
  //API HANDLER
  const [editCompanyManagement, { isLoading }] =
    useEditCompanyManagementMutation();
    
  async function onSubmit(data: any): Promise<any> {
    const updateD = data;
    for (const dataKeys in data) {
      updateD[dataKeys] = data[dataKeys];
      if (dataKeys === "allowedCompany") {
        const updateArray: any = [];
        Object.values(updateD[dataKeys]).map((product: any) => {
          return updateArray.push(product.value);
        });
        updateD[dataKeys] = updateArray;
      }
    }
    const filterData: any = {};
    for (const key of FilterArray) {
      if (updateD[key] !== undefined) {
        filterData[key] = updateD[key];
        if (key === "businessName") {
          filterData.companyName = updateD[key];
        }
        if (key === "companySize") {
          filterData.companySize = updateD[key].value;
        }
      }
    }

    try {
      const { message } = await editCompanyManagement({
        params: {
          userId: updateD._id,
        },
        body: {
          ...filterData,
        },
      }).unwrap();
      toast.success(message || "Company User Edit successfully");
      setOpenModal(false);
    } catch (error) {
      toast.error(error.data.message || "error occur");
    }
  }
  return (
    <>
      <IconButton
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Edit sx={{ fontSize: "200px", color: "text.primary" }} />
      </IconButton>
      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Edit Company User"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {EditFormData.map((form: any) => (
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
