"use client";
import { Box, Stack } from "@mui/system";
import { LogoSsoAdmin } from "common";
import { Footer } from "common/layouts/auth/footer";
import React from "react";
import Typography from "@mui/material/Typography";
import { WelcomeFlowerIcon } from "@assets/icons";
import Button from "@mui/material/Button";
import Link from "next/link";

function GetStartedMain(): JSX.Element {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <LogoSsoAdmin height="4.5rem" />
      <Box
        maxWidth={800}
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <WelcomeFlowerIcon sx={{ fontSize: 150 }} />
        <Typography variant="subtitle2">
          Over the next few pages we’ll introduce you to some of your co-workers
          gather a little more information about you and tell you about what you
          can expect next. You’ll receive a few reminders as you approach your
          start date to come back and fill in any missing information.
        </Typography>
        <Link href="/welcome-name">
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Link>
      </Box>

      <Box position="absolute" bottom={0}>
        <Footer />
      </Box>
    </Stack>
  );
}

export default GetStartedMain;
