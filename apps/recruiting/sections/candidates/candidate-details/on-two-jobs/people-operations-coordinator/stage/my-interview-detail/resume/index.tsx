import { Box, Typography } from "@mui/material";
import React from "react";
import { awsBaseUrl } from "@root/config";

export function ResumeInterview({ candidateDetails }): JSX.Element {
  // console.log("🚀 ~ ResumeInterview ~ candidateDetails:", candidateDetails);
  //   console.log(
  //   "🚀 ~ file: index.tsx:17 ~ Application ~ data:",
  //   awsBaseUrl + candidateDetails?.data?.[0]?.resume
  // );
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Resume
      </Typography>

      <iframe
        title="Resume"
        height="400"
        src={`https://docs.google.com/gview?url=${
          awsBaseUrl + candidateDetails?.data?.[0]?.resume
        }&embedded=true`}
        frameBorder="0"
      />
    </Box>
  );
}
