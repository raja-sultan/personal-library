import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import { useLazyGetProductOwnerListQuery } from "@services/candidate/add-candidate/add-candidate-api";
import {
  useLazyGetJobStagesListQuery,
  useUpdateStageTransitionNotificationsMutation,
} from "@services/jobs/job-details/notifications/notifications-api";
import { CustomModal, FormProvider, RHFAutocompleteAsync } from "common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function AddNotificationModal({
  isOpen,
  closeModel,
  jobId,
  stageName,
}: any): JSX.Element {
  const getParticipantsList = useLazyGetProductOwnerListQuery();
  const getJobStagesList = useLazyGetJobStagesListQuery();
  const [updateNotifications, { isLoading }] =
    useUpdateStageTransitionNotificationsMutation();
  const methods = useForm({
    defaultValues: {
      stage: null,
      users: [],
    },
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = handleSubmit(async (data: any) => {
    const users = data?.users?.map((items: any) => {
      return items?._id.toString();
    });

    try {
      const res: any = await updateNotifications({
        body: {
          users,
        },
        jobId,
        stageId: data?.stage?._id,
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
      headerLabel="Add Notification"
      closeButtonProps={{ onClick: closeModel }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {stageName?.data?.interviewPlan ? (
          <Grid container>
            <Typography variant="body2">
              Select team members to email when a candidate transitions into a
              select stage
            </Typography>
            <Grid item xs={12} mt={1}>
              <RHFAutocompleteAsync
                name="stage"
                outerLabel="Stage"
                placeholder="Stage"
                apiQuery={getJobStagesList}
                externalParams={{ jobId }}
                getOptionLabel={(option: any) => option.stageName}
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <RHFAutocompleteAsync
                name="users"
                outerLabel="Users"
                placeholder="Users"
                apiQuery={getParticipantsList}
                getOptionLabel={(option: any) => option.userName}
                multiple
              />
            </Grid>

            <Grid item xs={12} mt={2} display="flex" justifyContent="flex-end">
              <Button variant="outlined" type="button">
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
        ) : (
          <Typography variant="body2" fontWeight={600}>
            No stages against this job
          </Typography>
        )}
      </FormProvider>
    </CustomModal>
  );
}
