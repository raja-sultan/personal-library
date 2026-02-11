import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEditPreview } from "./use-edit-preview";
import { FormProvider } from "common";

export function EditPreview(): JSX.Element {
  const { editPreviewData, methods, handleSubmit, onSubmit, reset } =
    useEditPreview();
  return (
    <Stack>
      <Typography variant="body2" fontWeight={600}>
        View an onboarding plan for new hires with the following criteria:
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container columnSpacing={1} rowGap={2}>
          {editPreviewData?.map((item) => (
            <Grid item xs={12} lg={2.5} md={item?.md} key={item?.id}>
              {item?.component && <item.component {...item.componentProps} />}
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            lg={2}
            md={4}
            textAlign={{ lg: "right", md: "center" }}
            my="auto"
          >
            <Button
              onClick={() => {
                reset();
              }}
              variant="text"
            >
              Reset filters
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Stack>
  );
}
