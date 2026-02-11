import { Button, DialogActions, Grid } from "@mui/material";
import { FormProvider, RHFDatePicker, RHFTextField } from "common";
import CustomModal from "@components/custom-modal";
import { LoadingButton } from "@mui/lab";
import { useModal } from "./use-modal";

export function AddGrowthAreaModal({
  data,
  openModal,
  setOpenModal,
  skillId,
  planId,
}: any): JSX.Element {
  const { onSubmit, handleSubmit, methods } = useModal({
    data,
    setOpenModal,
    skillId,
    planId,
  });

  return (
    <CustomModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      message={false}
      title="Growth Area"
      headerIcon={false}
      hideFooter
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} marginBottom="4rem">
            <RHFTextField
              size="small"
              name="title"
              outerLabel="Title"
              placeholder="Enter name"
            />
          </Grid>

          <Grid item xs={12} marginBottom="4rem">
            <RHFTextField
              size="small"
              name="description"
              outerLabel="Description (Optional)"
              placeholder="Enter a description..."
              multiline
              rows={3}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} marginBottom="4rem">
            <RHFTextField
              size="small"
              name="growthPeriod"
              outerLabel="Growth Period"
              placeholder="0 month"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <RHFDatePicker size="small" name="dueDate" outerLabel="Due Date" />
          </Grid>

          <Grid item xs={12}>
            <DialogActions sx={{ mt: 2, gap: "10px", flexWrap: "wrap" }}>
              <Button variant="outlined" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <LoadingButton variant="contained" type="submit">
                Share
              </LoadingButton>
            </DialogActions>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}
