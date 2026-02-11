import CustomModal from "@components/custom-modal";
import { Button, DialogActions, Stack } from "@mui/material";
import {
  FormProvider,
  RHFAutocompleteSync,
  RHFTextField,
} from "@root/../../packages/common";
import { useGroupModal } from "./use-group-modal";

export function GroupModal({
  open,
  onClose,
  id,
 
}:any): JSX.Element {
  const { handleSubmit, methods, onSubmit, getCareerPlans } = useGroupModal({
    onClose,
    id,
  });

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      headerIcon={false}
      title="Group"
      message={false}
      hideFooter
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="2rem">
          <RHFTextField
            name="name"
            fullWidth
            size="small"
            placeholder="Enter name"
            outerLabel="Name"
          />
          <RHFAutocompleteSync
            multiple
            size="small"
            name="plans"
            outerLabel="Plans (Optional)"
            placeholder="Select"
            options={getCareerPlans}
          />
        </Stack>
        <DialogActions sx={{ mt: 1.5 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {id ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </FormProvider>
    </CustomModal>
  );
}
