import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { Button, Grid, Typography, TextField, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import type { IREMINDER, IREMINDERMODALPROPS } from "./calendar-types";
import "./calendar-style.scss";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import SquareIcon from "@mui/icons-material/Square";
import { CustomModal } from "common";
import {
  useGetCalendarRemindersQuery,
  usePostReminderMutation,
} from "@services/calendar-api";
import { useGetScheduleListQuery } from "@services/sso-admin-dashboard-api";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

export function MyCalendar(): JSX.Element {
  let schedules = [];
  let reminders = [];
  // date time filters
  const todayDate = dayjs().format("YYYY-MM-DD");
  // const todayTime: string|undefined = dayjs().format("HH:mm:ss");
  const [dateFilter, setDateFilter] = useState<any>({
    date: todayDate,
    time: undefined,
  });
  // const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const calendarRef = useRef<any>(null);
  // reminder modal data
  const [reminderModalIsOpen, setReminderModalIsOpen] =
    useState<boolean>(false);

  calendarRef.current?.getApi()?.gotoDate(dateFilter.date);

  const {
    data: remindersFromAPI,
    isLoading,
    isError: hasRemindersError,
  } = useGetCalendarRemindersQuery(dateFilter);

  const [postReminder, postingStatus] = usePostReminderMutation();

  const {
    data: schedulesFromAPI,
    isLoading: isSchedulesLoading,
    isError: hasSchedulesError,
  } = useGetScheduleListQuery({
    year: dayjs(dateFilter.date).format("YYYY"),
    month: dayjs(dateFilter.date).format("MM"),
  });

  reminders = remindersFromAPI?.data?.length
    ? remindersFromAPI?.data?.map((reminder) => ({
        ...reminder,
        className: "reminder",
      }))
    : [];

  schedules = schedulesFromAPI?.data?.length
    ? schedulesFromAPI?.data?.map((schedule) => ({
        title: `${schedule.firstName} ${schedule.lastName}`,
        start: schedule.demoDateAndTime,
        className: "demo",
      }))
    : [];
  async function postReminderHandler(data: IREMINDER): Promise<any> {
    try {
      const { message } = await postReminder(data).unwrap();
      toast.success(message || "Reminder Added Successfully");
      setReminderModalIsOpen(false);
    } catch (error) {
      toast.error(error.data.message);
    }
  }
  function getBackground(identifier: string | undefined): string {
    switch (identifier) {
      case "reminder":
        return "#ea5454";
      case "demo":
        return "#7a5af8";
      default:
        return "#ea5454";
    }
  }
  return (
    <>
      {isLoading || isSchedulesLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid
          container
          textAlign="center"
          position="relative"
          height="150vh"
          width="100%"
          boxShadow={1}
          p={4}
          sx={{
            "& ::-webkit-scrollbar": {
              width: "3px",
              backgroundColor: " #f5f5f5",
              borderRadius: "10px",
              height: "4px",
              cursor: "pointer",
            },

            "& ::-webkit-scrollbar-thumb": {
              backgroundColor: "#7a5af8",
              borderRadius: "10px",
              cursor: "pointer",
            },
          }}
        >
          {(hasRemindersError || hasSchedulesError) && (
            <Typography color="error" textAlign="center" width="100%">
              Couldn`t load data. Please try again!
            </Typography>
          )}
          <Grid className="filters" container>
            <Grid item>
              <Typography
                variant="h4"
                textAlign="start"
                fontWeight={600}
                mb={3}
              >
                Calendar
              </Typography>
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                px={4}
              >
                <Grid item sm={6} gap={2} display="flex">
                  <DateTimePicker
                    label="Date"
                    value={dayjs(dateFilter.date)}
                    closeOnSelect
                    views={["day", "year", "month"]}
                    openTo="month"
                    slotProps={{
                      textField: {
                        size: "small",
                      },
                    }}
                    onChange={(d) => {
                      const date = dayjs(d).format("YYYY-MM-DD");
                      setDateFilter((prev: any) => ({ ...prev, date }));
                    }}
                  />

                  <DateTimePicker
                    label="Time"
                    closeOnSelect
                    value={dateFilter.time ? dateFilter.time : null}
                    views={["hours", "minutes"]}
                    viewRenderers={{
                      day: null,
                      month: null,
                      year: null,
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: null,
                    }}
                    slotProps={{
                      textField: {
                        size: "small",
                      },
                    }}
                    onChange={(d: any) => {
                      const time = dayjs(d).format("HH:mm:ss");
                      setDateFilter((prev: any) => ({ ...prev, time }));
                    }}
                  />

                  {dateFilter.date !== dayjs().format("YYYY-MM-DD") ||
                  Boolean(dateFilter.time) ? (
                    <Button
                      onClick={() => {
                        setDateFilter({
                          date: todayDate,
                          time: undefined,
                        });
                      }}
                    >
                      Today
                    </Button>
                  ) : null}
                </Grid>
                <Grid item sm={6} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setReminderModalIsOpen(true);
                    }}
                  >
                    + Reminder
                  </Button>
                </Grid>
                <CalendarLegends />
              </Grid>
            </LocalizationProvider>
          </Grid>

          <FullCalendar
            dayMaxEvents={2}
            ref={calendarRef}
            dayHeaderContent={(data: any) => (
              <Box p={1}>{dayjs(data?.date).format("dddd")}</Box>
            )}
            eventContent={(e) => (
              <Box
                p="2px 10px"
                width="200px"
                display="flex"
                gap={1}
                overflow="hidden"
                alignItems="center"
                borderRadius="100vw"
                bgcolor={() => getBackground(e.event.classNames[0])}
              >
                <Typography variant="caption" fontWeight={400}>
                  {dayjs(e.event.start).format("hh A")}
                </Typography>
                <Typography variant="subtitle1">{e.event.title}</Typography>
              </Box>
            )}
            height="85%"
            headerToolbar={{
              start: "",
              center: "title",
              end: "",
            }}
            titleFormat={{ year: "numeric", month: "long" }}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[...reminders, ...schedules]}
            eventTimeFormat={{
              hour: "numeric",
              meridiem: true,
            }}
          />
        </Grid>
      )}

      {reminderModalIsOpen && (
        <ReminderModal
          open={reminderModalIsOpen}
          onClose={setReminderModalIsOpen}
          reminderData={postReminderHandler}
          postingStatus={postingStatus}
        />
      )}
    </>
  );
}

function ReminderModal(props: IREMINDERMODALPROPS): JSX.Element {
  const { open, onClose, reminderData, postingStatus } = props;
  const [reminder, setReminder] = useState<IREMINDER>({
    label: "",
    dateAndTime: dayjs(),
    error: undefined,
  });
  function onModalClose(): void {
    onClose(false);
    setReminder({
      label: "",
      dateAndTime: dayjs(),
      error: undefined,
    });
  }
  return (
    <CustomModal
      isOpen={open}
      onClose={onModalClose}
      headerLabel="Reminder"
      closeButtonProps={{
        onClick: () => {
          onModalClose();
        },
      }}
      rootSx={{ minWidth: 400, maxWidth: 700 }}
    >
      <Grid container gap={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="label"
            type="text"
            error={Boolean(reminder.error)}
            placeholder="Label"
            value={reminder.label}
            onChange={(e) => {
              setReminder((prev) => ({
                ...prev,
                label: e.target.value,
                error: e.target.value.trim() === "" ? "Required" : undefined,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time"
              disablePast
              value={reminder.dateAndTime}
              onChange={(e) => {
                setReminder((prev) => ({ ...prev, dateAndTime: e }));
              }}
              slotProps={{
                textField: { fullWidth: true, name: "dateTime" },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid container justifyContent="flex-end" gap={2}>
          <Button size="small" onClick={onModalClose} variant="outlined">
            Cancel
          </Button>
          <LoadingButton
            loading={postingStatus?.isLoading}
            size="small"
            variant="contained"
            color={postingStatus?.isError ? "error" : "primary"}
            onClick={() => {
              setReminder((prev) => ({
                ...prev,
                error: prev.label.trim() === "" ? "Required" : undefined,
              }));
              reminder.label.trim() !== "" && reminderData(reminder);
              setReminder({
                label: "",
                dateAndTime: dayjs(),
                error: undefined,
              });
            }}
          >
            {postingStatus?.isError ? "Try Again" : "Submit"}
          </LoadingButton>
        </Grid>
      </Grid>
    </CustomModal>
  );
}
function CalendarLegends(): JSX.Element {
  return (
    <Grid item xs={12} gap={4} mt={3} container>
      <Grid display="flex" alignItems="center" gap={1}>
        <SquareIcon sx={{ color: "#A5AFEE", fontSize: "15px" }} />
        Demo{" "}
      </Grid>
      <Grid display="flex" alignItems="center" gap={1}>
        <SquareIcon sx={{ color: "#EA5454", fontSize: "15px" }} />
        Reminder
      </Grid>
    </Grid>
  );
}
