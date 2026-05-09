import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { AddFormData, DefValue } from "./tell-us-about-yourself-ad.data";
import { LoadingButton } from "@mui/lab";
import { FormProvider } from "common";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function TellAsAboutYourselfADForm(): JSX.Element {
  const Router = useRouter();
  const methods = useForm({
    defaultValues: DefValue,
    // resolver: yupResolver(EditFormSchemaModel),
  });
  const onSubmit = (): void => {
    Router.push("/have-questions");
  };
  const { control, handleSubmit } = methods;
  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {AddFormData.map((form: any) => {
            return (
              <Grid
                key={form.id}
                xs={12}
                sm={form.grid}
                sx={{ py: 1, pr: 1 }}
                item
              >
                <form.component control={control} {...form.RhfValue} />
              </Grid>
            );
          })}
          <Grid xs={12} item>
            <Box mt={1} display="flex">
              <Box
                ml="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
                px={2}
              >
                <Button size="small" variant="outlined">
                  Skip
                </Button>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    height: 35,
                  }}
                  type="submit"
                >
                  Next
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
}

export default TellAsAboutYourselfADForm;
