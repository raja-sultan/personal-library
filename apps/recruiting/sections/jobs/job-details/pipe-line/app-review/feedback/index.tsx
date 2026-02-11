import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { NoContentFound } from "common";
import { useGetFeedbackDetailsQuery } from "@services/jobs/job-details/pipe-line/feedback/feed-back-api";
import { useSearchParams } from "next/navigation";

export function FeedBackComponent(): JSX.Element {
  const params = useSearchParams();
  const jobsId = params.get("jobId");
  const candidatesId = params.get("candidateId");

  //Get API for Feedback
  const { data, isLoading, isError } = useGetFeedbackDetailsQuery({
    jobId: jobsId,
    canidateId: candidatesId,
  });

  //Data Coming From Feedback API
  const feedBackDetails = data?.data;

  if (isLoading) {
    return <Skeleton animation="wave" sx={{ height: 100 }} />;
  }

  return (
    <>
      {feedBackDetails?.map((item, index) => (
        <Box key={item._id}>
          <Box sx={{ ...styles.mainWrapper, mt: index === 0 ? 1 : 2.5 }}>
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              {item?.leaveFeedback}
            </Typography>
            <Typography variant="subtitle1" sx={styles.commonStyling}>
              {dayjs(item?.createdAt).format("MM-DD-YYYY")}
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
            sx={{ ...styles.commonStyling, color: "primary.main" }}
          >
            {item?.emoji}
          </Typography>
        </Box>
      ))}
      {/* Checking if there is an error or if there is no data */}
      {isError || feedBackDetails.length === 0 ? (
        <Grid container justifyContent="center">
          <Grid item width={200}>
            <NoContentFound />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}

const styles = {
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commonStyling: {
    color: "text.secondary",
    fontWeight: 600,
  },
};
