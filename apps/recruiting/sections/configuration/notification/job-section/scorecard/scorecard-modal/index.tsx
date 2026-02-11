import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import { useUpdateScorecardReminderNotificationsMutation } from "@services/jobs/job-details/notifications/notifications-api";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteSync,
  RHFCustomSelect,
  RHFRadioGroup,
} from "common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface HourObject {
  id: number;
  name: string;
  value: string;
}
export function ScoreCardModal({
  isOpen,
  closeModel,
  jobId,
}: any): JSX.Element {
  const [updateNotifications, { isLoading }] =
    useUpdateScorecardReminderNotificationsMutation();
  const methods = useForm({
    defaultValues: {
      configType: "custom",
      reminderTime: null,
      followUpReminder: [],
      followUpFrequency: null,
    },
  });

  const { watch, handleSubmit, reset } = methods;
  const customEmail = watch("configType");
  const hoursOfDay: HourObject[] = [];

  for (let i = 1; i <= 12; i++) {
    const hourAM = `${i}:00 AM`;
    hoursOfDay.push({ id: i, name: hourAM, value: hourAM });
  }

  for (let i = 1; i <= 12; i++) {
    const hourPM = `${i}:00 PM`;
    hoursOfDay.push({ id: i + 12, name: hourPM, value: hourPM });
  }

  const onSubmit = handleSubmit(async (data: any) => {
    const followUpReminders =
      JSON.stringify(data?.followUpReminder?.map((item) => item.value)) || [];

    try {
      const res: any = await updateNotifications({
        body:
          data?.configType === "custom"
            ? {
                firstReminders: data?.firstReminders,
                followupReminders: followUpReminders,
                followupFrequency: data?.followupFrequency,
                configType: data?.configType,
              }
            : {
                followupFrequency: "daily",
                configType: data?.configType,
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
      rootSx={{ width: { xs: "90%", sm: "50%" } }}
      onClose={closeModel}
      headerLabel="Scorecard Reminder"
      closeButtonProps={{ onClick: closeModel }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <RHFRadioGroup
              name="configType"
              headerLabel=""
              sx={{
                gap: 3,
              }}
              options={[
                { label: "Custom", value: "custom" },
                { label: "Default Email Reminder", value: "default" },
              ]}
            />
          </Grid>
          {customEmail === "custom" && (
            <Grid item xs={12} container mt={2}>
              <Grid item xs={12}>
                <Typography variant="body2" fontWeight={600}>
                  First Reminder
                </Typography>
                <RHFCustomSelect
                  name="firstReminders"
                  outerLabel="Time"
                  placeholder="Time"
                  options={[
                    {
                      id: 1,
                      label: "1 hour after interview",
                      value: "oneHourAfterInterview",
                    },
                    {
                      id: 2,
                      label: "3 hour after interview",
                      value: "threeHoursAfterInterview",
                    },
                    { id: 3, label: "End of day", value: "endOfDay" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Typography variant="body2" fontWeight={600}>
                  Follow-up Reminder
                </Typography>
                <RHFAutocompleteSync
                  multiple
                  name="followUpReminder"
                  outerLabel="Time"
                  placeholder="Time"
                  options={hoursOfDay}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Typography variant="body2" fontWeight={600}>
                  Follow-up Frequency
                </Typography>
                <RHFCustomSelect
                  name="followupFrequency"
                  outerLabel="Time"
                  placeholder="Time"
                  options={[
                    { id: 1, label: "Daily", value: "daily" },
                    { id: 2, label: "Every 2 Day", value: "everyTwoDays" },
                    { id: 3, label: "Every 3 Day", value: "everyThreeDays" },
                  ]}
                />
              </Grid>
            </Grid>
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
