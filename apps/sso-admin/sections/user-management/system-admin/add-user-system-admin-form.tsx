import { Button, Grid, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider } from "common";
import {
  AddFormData,
  AddFormDataValue,
  formSchemaModel,
} from "../company-user/user-management.data";
import type { SetStateAction, Dispatch } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddSystemAdminMutation } from "@services/user-management-api";
import toast from "react-hot-toast";

export function AddUserSystemAdminForm({
  setOpen,
  submitLabel,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  submitLabel?: string;
}): JSX.Element {
  const methods = useForm({
    defaultValues: AddFormDataValue,
    resolver: yupResolver(formSchemaModel),
  });

  const { control, handleSubmit, reset } = methods;
  //API HANDLERS
  const [AddSystemAdmin] = useAddSystemAdminMutation();
  async function onSubmit(data: any): Promise<any> {
    const submittedData = data;
    for (const keys in submittedData) {
      if (keys === "defaultRole") {
        submittedData[keys] = submittedData[keys].value;
      }
    }

    try {
      const { message } = await AddSystemAdmin({
        body: {
          ...submittedData,
        },
      }).unwrap();
      toast.success(message || "user add successfully");
      setOpen(false);
      reset();
    } catch (error) {
      toast.error(error.data.message || "error occur");
      reset();
    }
  }

  return (
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
              <Button size="small" variant="outlined">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  width: 50,
                  height: 35,
                }}
                type="submit"
              >
                {submitLabel ? submitLabel : "Add"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
