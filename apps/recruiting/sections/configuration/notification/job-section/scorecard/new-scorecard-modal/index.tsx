import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";

import { useLazyGetProductOwnerListQuery } from "@services/candidate/add-candidate/add-candidate-api";
import { useUpdateNewScorecardNotificationsMutation } from "@services/jobs/job-details/notifications/notifications-api";
import { CustomModal, FormProvider, RHFAutocompleteAsync } from "common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function NewScoreCardModal({
  isOpen,
  closeModel,
  jobId,
  stageName,
}: any): JSX.Element {
  const getParticipantsList = useLazyGetProductOwnerListQuery();

  const [updateNotifications, { isLoading }] =
    useUpdateNewScorecardNotificationsMutation();
  const methods = useForm({
    defaultValues: {},
  });
  let stageFields: any;
  if (stageName?.data?.interviewPlan) {
    stageFields = stageName.data.interviewPlan.map((items) => ({
      id: items?._id,
      label: items?.stageName,
      componentProps: {
        name: `${items?._id}`,
        outerLabel: "Select Recipient",
        placeholder: "Recipient",
        apiQuery: getParticipantsList,
        getOptionLabel: (option: any) => option.userName,
        multiple: true,
      },
      component: RHFAutocompleteAsync,
    }));
  } else {
    // Handle the case where interviewPlan is not available
    stageFields = []; // Or any other appropriate handling
  }
  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    const notificationData: any = [];

    for (const stageId in data) {
      if (Object.prototype.hasOwnProperty.call(data, stageId)) {
        const users = data[stageId]?.map((user) => user._id);
        notificationData.push({ stageId, users });
      }
    }
    try {
      const res: any = await updateNotifications({
        body: { notificationData },
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
      headerLabel="New Scorecard"
      closeButtonProps={{ onClick: closeModel }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container>
          {stageFields?.length !== 0 ? (
            stageFields?.map((item) => (
              <Grid item xs={12} mt={1} key={item?._id}>
                <Typography variant="body2" fontWeight={600}>
                  {item?.label}
                </Typography>
                {item?.component && <item.component {...item.componentProps} />}
              </Grid>
            ))
          ) : (
            <Typography variant="body2" fontWeight={600}>
              No stages against this job
            </Typography>
          )}

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
