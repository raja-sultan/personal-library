"use client";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import WelcomeNameFrom from "@sections/welome-experience/welcome-name";

import React from "react";

function WelcomeName(): JSX.Element {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt:15
      }}
    >
      <Box
        maxWidth={800}
        textAlign="start"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        gap={1}
      >
        <Typography variant="h3">Welcome to Personnel Library</Typography>
        <Typography variant="h6" color="neutral.500">
          Join your team by sharing information about yourself
        </Typography>
        <WelcomeNameFrom />
      </Box>
    </Stack>
  );
}

export default WelcomeName;
