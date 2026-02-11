"use client";
import { Box, Button } from "@mui/material";
import React from "react";
// import { emailNotificationsData } from "./types";
import { styles } from "./styles";
import Link from "next/link";
import { ViewByJob } from "../job-details/job-setup/notifications/view-by-job";

export function EmailNotifications({ previousStepHandler }): JSX.Element {
  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={styles.mainsCardStyling}>
        <ViewByJob />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "0.5em",
          height: "10%",
          position: "relative",
        }}
      >
        <Box>
          <Button variant="outlined" onClick={previousStepHandler}>
            Back
          </Button>
        </Box>
        <Box>
          <Link href="/jobs">
            <Button variant="contained">Finish</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
