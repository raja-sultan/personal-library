import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Scoreboard } from "./scorecard";
import { Candidate } from "./candidate";
import { ApprovalNotification } from "./approval";
import { Notification } from "./notification";
import { useJobSection } from "./use-job-section";
import { FormProvider, RHFAutocompleteAsync } from "common";

export function JobSection(): React.JSX.Element {
  const { methods, getJobListQuery, job, data, NotificationsCountList } =
    useJobSection();

  const dataArray = [
    {
      name: "Scorecard Notifications",
      component: (
        <Scoreboard
          jobId={job?._id}
          stageName={data}
          NotificationsCountList={NotificationsCountList}
        />
      ),
    },
    {
      name: "Candidate Notifications",
      component: (
        <Candidate
          jobId={job?._id}
          NotificationsCountList={NotificationsCountList}
        />
      ),
    },
    {
      name: "Approval Notifications",
      component: (
        <ApprovalNotification
          jobId={job?._id}
          NotificationsCountList={NotificationsCountList}
        />
      ),
    },
    {
      name: "Other Notifications",
      component: (
        <Notification
          jobId={job?._id}
          NotificationsCountList={NotificationsCountList}
          stageName={data}
        />
      ),
    },
  ];
  return (
    <Stack rowGap={2}>
      <FormProvider methods={methods}>
        <Box
          sx={{
            width: { md: 400, xs: 200 },
            ml: "auto",
          }}
        >
          <RHFAutocompleteAsync
            name="selectJob"
            outerLabel="Select Job"
            placeholder="Select a Job"
            apiQuery={getJobListQuery}
            getOptionLabel={(option: any) =>
              `${option.jobName} (${option.office.location})`
            }
          />
        </Box>
      </FormProvider>
      {dataArray.map((items) => (
        <Paper
          key={items?.name}
          sx={{ p: 2, backgroundColor: "background.default" }}
        >
          <Typography variant="body1" fontWeight={700}>
            {items?.name}
          </Typography>
          {items?.component}
        </Paper>
      ))}
    </Stack>
  );
}
