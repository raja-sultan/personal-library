import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import RowComponent from "./row-component";
import { useGetJobsActivityFeedQuery } from "@services/jobs/job-details/activity-feed/activity-feed-api";
import { useSearchParams } from "next/navigation";
import { IsFetching, NoContent } from "common";
import { JobDetailsHeader } from "../job-details-header";

export function JobsActivityFeed(): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data, isLoading, isError } = useGetJobsActivityFeedQuery({
    params: {
      jobId,
    },
  });
  if (isLoading) {
    return (
      <Box position="relative" height="50vh">
        <IsFetching isFetching />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <NoContent />
      </Box>
    );
  }

  return (
    <Box>
      <JobDetailsHeader mainTitle="Activity Feed" />
      <Paper variant="elevation" sx={{ mt: 1 }} elevation={1}>
        <Box p={1}>
          {data?.data.map((feed) => <RowComponent {...feed} key={feed._id} />)}
        </Box>
      </Paper>
    </Box>
  );
}
