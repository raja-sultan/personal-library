import { type SetStateAction, type Dispatch } from "react";
import { Box, Button, Grid } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
} from "common";
import { LoadingButton } from "@mui/lab";
import { UseEditEmailNotificationModal } from "./use-edit-email-modal";

export function EditEmailNotificationModal({
  openCategory,
  setOpenCategory, //   manageJobData,
}: {
  openCategory: boolean;
  setOpenCategory: Dispatch<SetStateAction<boolean>>;
  // manageJobData: any;
}): JSX.Element {
  const { handleSubmit, onSubmit, methods, handleCancel, isLoading } =
    UseEditEmailNotificationModal({
      setOpenCategory,
      //   manageJobData,
      //   openCategory,
    });

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setOpenCategory}
      rootSx={{
        maxWidth: { xs: 350, sm: 500 },
      }}
      headerLabel="Edit Email Notification"
      closeButtonProps={{
        onClick: () => {
          setOpenCategory(false);
        },
      }}
      isOpen={openCategory}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Box sx={{ mt: 2 }}>
              <RHFAutocompleteSync
                name="testSyncSelect"
                outerLabel="Email Types"
                placeholder="Sync autocomplete"
                options={[
                  { id: 1, name: "test", value: "test" },
                  { id: 2, name: "pest", value: "pest" },
                ]}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <RHFAutocompleteAsync
                multiple
                name="testAsyncSelectMulti"
                queryKey="id"
                outerLabel="User(s)"
                placeholder="Async autocomplete Multi"
                apiQuery={"apiQuery"}
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            Save
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
