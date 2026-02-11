import {
  FormProvider,
  RHFAutocompleteSync,
  RHFCustomSelect,
  RHFDatePicker,
} from "common";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useScheduleInterview } from "./use-schedule-interview";

export function ScheduleInterviewSection(): JSX.Element {
  const {
    router,
    // todayStr,
    transformedTimeSlots,
    handleSubmit,
    formSubmitHandler,
    method,
    dropdownArray,
    scheduleInterviewData,
    isLoading,
    isSuccess,
    selectedStartTime,
  }: any = useScheduleInterview();
  const theme = useTheme();
  return (
    <Paper variant="elevation" elevation={1} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormProvider
            methods={method}
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <Stack spacing={2} pt={1}>
              <Box>
                <Typography variant="h6">Schedule Interview</Typography>
                <Typography variant="body2">Interview type name</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Scheduling for Candidate</Typography>
                <Typography variant="body2">
                  Behavioral Phone Interview
                </Typography>
              </Box>
              <RHFDatePicker
                placeholder="Select"
                size="small"
                name="interviewDate"
                outerLabel="Date *"
              />
              <Box>
                <Typography variant="caption" fontWeight={600}>
                  Time *
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <RHFCustomSelect
                    size="small"
                    options={transformedTimeSlots}
                    placeholder="Select"
                    name="startTime"
                  />
                  <RHFCustomSelect
                    size="small"
                    options={transformedTimeSlots.filter(
                      (timeSlot) => timeSlot.value > selectedStartTime // Filter out times after selected start time
                    )}
                    placeholder="Select"
                    name="endTime"
                    disabled={!selectedStartTime}
                  />
                </Stack>
              </Box>

              <RHFAutocompleteSync
                multiple
                name="interviewers"
                outerLabel="Interviewers *"
                placeholder="Select"
                options={
                  dropdownArray?.length
                    ? dropdownArray?.map((ele) => ({
                        id: ele?._id,
                        name: ele?.userName,
                        value: ele?._id,
                      }))
                    : []
                }
              />
            </Stack>
          </FormProvider>
        </Grid>
        <Grid item xs={9}>
          {isLoading && (
            <Typography
              variant="h5"
              align="center"
              sx={{ py: 10 }}
              color={theme.palette.text.secondary}
            >
              Loading...{" "}
            </Typography>
          )}
          {isSuccess && (
            <FullCalendar
              headerToolbar={false}
              plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              dayHeaderContent={false}
              initialEvents={
                isSuccess && scheduleInterviewData?.length
                  ? scheduleInterviewData?.map((ele) => ({
                      id: ele?._id,
                      title: ele?.availability,
                      start: new Date(ele?.startTime).toISOString(),
                      end: new Date(ele?.endTime).toISOString(),
                    }))
                  : []
              }
              eventContent={(e) => (
                <Box
                  p="2px 10px"
                  width="200px"
                  display="flex"
                  gap={1}
                  overflow="hidden"
                  alignItems="center"
                  borderRadius="100vw"
                >
                  <Typography variant="subtitle1">{e.event.title}</Typography>
                </Box>
              )}
              height="550px"
            />
          )}
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="end" spacing={2} pt={4}>
        <Button
          variant="outlined"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit(formSubmitHandler)}
        >
          Schedule and Continue
        </Button>
      </Stack>
    </Paper>
  );
}
