"use client";
import { MainIcon } from "@assets/icons";
import { Box, Stack } from "@mui/system";
import React from "react";

function WelcomeExperience(props): JSX.Element {
  const { children } = props;

  return (
    <Box>
      <Box px={3} py={2}>
        <MainIcon sx={{ fontSize: 250, height: 50 }} />
      </Box>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 8,
          px: 2,
        }}
      >
        {children}
      </Stack>
    </Box>
  );
}

export default WelcomeExperience;
