"use client";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TellAsAboutYourselfADForm from "@sections/welome-experience/tell-us-about-yourself-ad-form";
import React from "react";

function TellUsAboutYourselfAddressDetails(): JSX.Element {
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
      <Typography variant="h3">Tell us about yourself</Typography>
      <Typography variant="h5" fontWeight={500}>
        Join your team by sharing information about yourself
      </Typography>
      <Box mt={2}>
        <Typography variant="h6" color="neutral.700">
          Address Details
        </Typography>
      </Box>
      <TellAsAboutYourselfADForm />
    </Box>
  );
}

export default TellUsAboutYourselfAddressDetails;
