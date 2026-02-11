import { Card, Stack, Typography } from "@mui/material";
import { ApprovalNotification } from "@sections/configuration/notification/job-section/approval";
import { Candidate } from "@sections/configuration/notification/job-section/candidate";
import { Notification } from "@sections/configuration/notification/job-section/notification";
import { Scoreboard } from "@sections/configuration/notification/job-section/scorecard";
import {
  useGetNotificationCountQuery,
  useGetOverallJobQuery,
} from "@services/jobs/job-details/notifications/notifications-api";
import { useSearchParams } from "next/navigation";

export function ViewByJob(): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data: NotificationsCountList } = useGetNotificationCountQuery(
    {
      jobId,
    },
    { skip: !jobId }
  );
  const { data } = useGetOverallJobQuery(
    {
      jobId,
      stepName: "interviewPlan",
    },
    { skip: !jobId }
  );
  return (
    <Stack rowGap={2}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6">Scorecard Notifications</Typography>
        <Scoreboard
          jobId={jobId}
          NotificationsCountList={NotificationsCountList}
          stageName={data}
        />
      </Card>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6">Candidate Notifications</Typography>

        <Candidate
          jobId={jobId}
          NotificationsCountList={NotificationsCountList}
        />
      </Card>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6">Approval Notifications</Typography>

        <ApprovalNotification
          jobId={jobId}
          NotificationsCountList={NotificationsCountList}
        />
      </Card>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6">Other Notifications</Typography>

        <Notification
          jobId={jobId}
          NotificationsCountList={NotificationsCountList}
          stageName={data}
        />
      </Card>
    </Stack>
  );
}
