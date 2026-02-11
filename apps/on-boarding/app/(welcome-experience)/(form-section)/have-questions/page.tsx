"use client";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import HaveQuestions from "@sections/welome-experience/have-questions";
import React from "react";

function HaveQuestion(): JSX.Element {
  return (
    <Box
      maxWidth={800}
      textAlign="start"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="start"
      gap={1}
    >
      <Typography variant="h3">Complete your Tasks</Typography>
      <Typography variant="h5" fontWeight={500} color="neutral.900">
        Upload your required documents here
      </Typography>
      <HaveQuestions />
    </Box>
  );
}

export default HaveQuestion;
