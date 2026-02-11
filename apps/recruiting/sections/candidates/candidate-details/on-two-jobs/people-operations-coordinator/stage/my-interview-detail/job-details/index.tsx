import { Box, Button, Typography } from "@mui/material";
import { DisplayHtml } from "common";
import React from "react";
// import { jobDutiesData, requirementsData} from "./types";

export function JobDetails({
  jobPostDetails,
  interviewPrepDetails,
}): JSX.Element {
  // console.log("🚀 ~ JobDetails ~ interviewPrepDetails:", interviewPrepDetails)
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 0.5, fontWeight: 600 }}>
          Team and Responsibilities
        </Typography>
        {jobPostDetails?.data?.jobInfo?.infoForInterviewer
          ?.teamResponsibility ? (
          <Typography variant="subtitle2">
            {" "}
            <DisplayHtml
              content={
                jobPostDetails?.data?.jobInfo?.infoForInterviewer
                  ?.teamResponsibility
              }
            />
          </Typography>
        ) : (
          <Typography variant="subtitle2">No Data found</Typography>
        )}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 0.5, fontWeight: 600 }}>
          How to Sell this Job
        </Typography>
        {jobPostDetails?.data?.jobInfo?.infoForInterviewer?.howToSellJob ? (
          <Typography variant="subtitle2">
            <DisplayHtml
              content={
                jobPostDetails?.data?.jobInfo?.infoForInterviewer?.howToSellJob
              }
            />
          </Typography>
        ) : (
          <Typography variant="subtitle2">No Data found</Typography>
        )}
      </Box>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ my: 0.8, mr: 2, fontWeight: 600 }}>
            Primary Job Post
          </Typography>
          <Button sx={{ minWidth: 0, p: 0 }} onClick={() => {}}>
            View Live
          </Button>
        </Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {interviewPrepDetails?.jobPost?.postDescription
            ?.descriptionIntroduction ?? "No Data found"}
        </Typography>
        <Box sx={{ my: 1 }}>
          <Typography variant="subtitle2">
            {interviewPrepDetails?.jobPost?.postDescription?.body}
          </Typography>
        </Box>
        {/* <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Job Duties
          </Typography>
         
          <Box sx={{ mt: "-20px" }}>
            {" "}
            <ul>
              {jobDutiesData?.map((item) => (
                <li key={item.id}>
                  <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
                    {item.title}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}
