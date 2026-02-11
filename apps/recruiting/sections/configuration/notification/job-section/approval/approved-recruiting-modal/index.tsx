import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import { useLazyGetProductOwnerListQuery } from "@services/candidate/add-candidate/add-candidate-api";
import { useUpdateCandidateNotificationsMutation } from "@services/jobs/job-details/notifications/notifications-api";
import { CustomModal, FormProvider, RHFAutocompleteAsync } from "common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function ApprovedRecruitingModal({
  isOpen,
  closeModel,
  jobId,
}: any): JSX.Element {
  const getParticipantsList = useLazyGetProductOwnerListQuery();
  const [updateNotifications, { isLoading }] =
    useUpdateCandidateNotificationsMutation();
  const methods = useForm({
    defaultValues: {
      participants: [],
    },
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = handleSubmit(async (data: any) => {
    const users = data?.participants?.map((items: any) => {
      return items?._id.toString();
    });

    try {
      const res: any = await updateNotifications({
        body: {
          notificationFor: "startRecruiting",
          users,
        },
        jobId,
      }).unwrap();
      toast.success(res?.message ?? `Update Successfully!`);
      reset();
      closeModel();
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  });
  return (
    <CustomModal
      isOpen={isOpen}
      rootSx={{
        width: { xs: "90%", sm: "50%" },
        mt: 2,
        maxHeight: { xs: 500, sm: 600, lg: 700 },
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "6px",
        },
        pr: 2,
      }}
      onClose={closeModel}
      headerLabel="Approved to Start Recruiting"
      closeButtonProps={{ onClick: closeModel }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} mt={1}>
            <Typography variant="body2">
              For each job that us fully approved to start recruiting, emails
              will be sent to:
            </Typography>
            <RHFAutocompleteAsync
              name="participants"
              outerLabel="Participants"
              placeholder="Participants"
              apiQuery={getParticipantsList}
              getOptionLabel={(option: any) => option.userName}
              multiple
            />
          </Grid>

          <Grid item xs={12} mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" type="button" onClick={closeModel}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              sx={{ ml: 1 }}
              loading={isLoading}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}
