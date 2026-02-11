import { Box, Typography } from "@mui/material";
import feedback404img from "@assets/images/feedback.png";
import Image from "next/image";
import React from "react";

export function NoFeedbackRequest(): JSX.Element {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Image src={feedback404img} alt="feedback-Icon" />
      <Box>
        <Typography variant="h5" fontWeight={600} mb='14px'>No pending feedback requests</Typography>
        <Typography variant="subtitle1" fontWeight={400} mb='14px'>
          Curious how you did on your last deliverable, or what you can <br />{" "}
          do to get to your next promotion?
        </Typography>
        <Typography sx={{ cursor: "pointer" }} color="primary" fontWeight={600}>
          Request feedback from a colleague
        </Typography>
      </Box>
    </Box>
  );
}
