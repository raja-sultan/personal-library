import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Stack, Box, Typography, Card } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFDatePicker,
  RHFTextField,
} from "common";
import { useScheduleModal } from "./use-schedule-modal";

export function ScheduleModal({
  openScheduleModal,
  setOpenScheduleModal,
}): React.JSX.Element {
  const [openCalenderModal, setOpenCalenderModal] = useState<boolean>(false);

  const { methods, onSubmit, apiQuery, handleSubmit } = useScheduleModal({
    openScheduleModal,
    setOpenScheduleModal,
  });

  const scheduleCalenderHandler = (): void => {
    setOpenScheduleModal(!openScheduleModal);
    setOpenCalenderModal(true);
  };

  const scheduleCalenderArray = [
    {
      id: 1,
      dayLabel: "Sunday",
      checkName: "sundayCheckName",
      fromName: "sundayFromName",
      toName: "sundayToName",
    },
    {
      id: 2,
      dayLabel: "Monday",
      checkName: "mondayCheckName",
      fromName: "mondayFromName",
      toName: "mondayToName",
    },
    {
      id: 3,
      dayLabel: "Tuesday",
      checkName: "tuesdayCheckName",
      fromName: "tuesdayFromName",
      toName: "tuesdayToName",
    },
    {
      id: 4,
      dayLabel: "Wednesday",
      checkName: "wednesdayCheckName",
      fromName: "wednesdayFromName",
      toName: "wednesdayToName",
    },
    {
      id: 5,
      dayLabel: "Thursday",
      checkName: "thursdayCheckName",
      fromName: "thursdayFromName",
      toName: "thursdayToName",
    },
    {
      id: 6,
      dayLabel: "Friday",
      checkName: "fridayCheckName",
      fromName: "fridayFromName",
      toName: "fridayToName",
    },
    {
      id: 7,
      dayLabel: "Saturday",
      checkName: "saturdayCheckName",
      fromName: "saturdayFromName",
      toName: "saturdayToName",
    },
  ];

  return (
    <Box>
      {/* Modal 1 */}
      <CustomModal
        isOpen={openScheduleModal}
        onClose={() => {
          setOpenScheduleModal(false);
        }}
        headerLabel="What would you like the posts to say?"
        rootSx={{ width: { md: "40%", xs: "60%" } }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ marginY: 3 }}>
            <Typography
              variant="body2"
              component="h6"
              p={2}
              sx={{
                color: "error.main",
                fontSize: "16px",
                lineHeight: "30px",
                backgroundColor: "error.lightest",
              }}
            >
              Note: You can customize or delete individual Posts once they’re
              scheduled
            </Typography>
          </Card>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <RHFAutocompleteAsync
                multiple
                name="template"
                queryKey="search"
                outerLabel="Template"
                limitTags={3}
                // (Start) Remove this when integrating API
                getOptionId={(option: any) => option.id}
                isOptionEqualToValue={(option: any, newValue: any) =>
                  option.id === newValue.id
                }
                // (End) Remove this when integrating API
                apiQuery={apiQuery}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Card>
                <Typography
                  variant="body2"
                  component="h6"
                  p={2}
                  sx={{
                    color: "info.main",
                    backgroundColor: "info.lightest",
                  }}
                >
                  Candidates for jobs configured to comply with GDPR will
                  automatically be emailed GDPR information after being
                  imported.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <RHFTextField
                multiline
                minRows={3}
                name="description"
                outerLabel="Description"
                placeholder="Enter a feedback.."
              />
            </Grid>
          </Grid>
          <Stack
            direction={{ md: "row-reverse", xs: "column" }}
            rowGap={1}
            columnGap={1}
            marginTop="30px"
          >
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={scheduleCalenderHandler}
            >
              Schedule
            </LoadingButton>
            <Button variant="outlined">Cancel</Button>
          </Stack>
        </FormProvider>
      </CustomModal>
      {/* Modal 2 */}
      <CustomModal
        isOpen={openCalenderModal}
        onClose={() => {
          setOpenCalenderModal(false);
        }}
        headerLabel="What would you like the posts them?"
        rootSx={{
          width: {
            md: "40%",
            xs: "60%",
            // height: "100%",
            maxHeight: "630px",
            overflow: "auto",
          },
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ my: 3 }}>
            <RHFAutocompleteAsync
              multiple
              name="schedule"
              queryKey="id"
              outerLabel="Schedule"
              limitTags={3}
              // (Start) Remove this when integrating API
              getOptionId={(option: any) => option.id}
              isOptionEqualToValue={(option: any, newValue: any) =>
                option.id === newValue.id
              }
              // (End) Remove this when integrating API
              apiQuery={apiQuery}
            />
          </Box>

          {scheduleCalenderArray.map((calender: any) => (
            <Box key={calender?.id}>
              <ScheduleCalender
                dayLabel={calender.dayLabel}
                checkName={calender.checkName}
                fromName={calender.fromName}
                toName={calender.toName}
              />
            </Box>
          ))}

          <Stack
            direction={{ md: "row-reverse", xs: "column" }}
            rowGap={1}
            columnGap={1}
            marginTop="30px"
          >
            <LoadingButton type="submit" variant="contained">
              Next
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenCalenderModal(false);
              }}
            >
              Cancel
            </Button>
          </Stack>
        </FormProvider>
      </CustomModal>
    </Box>
  );
}

function ScheduleCalender({
  dayLabel,
  checkName,
  fromName,
  toName,
}: any): JSX.Element {
  return (
    <Box sx={{ my: 2 }}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1.6}
      >
        <Typography variant="subtitle2">{dayLabel}</Typography>
        <RHFCheckbox name={checkName} />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <RHFDatePicker name={fromName} label="From" />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFDatePicker name={toName} label="To" />
        </Grid>
      </Grid>
    </Box>
  );
}
