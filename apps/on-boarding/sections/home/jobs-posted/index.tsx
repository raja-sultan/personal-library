import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { JobPostedIcon } from "@assets/icons";
import { HomeCard } from "@components/custom-home-card/custom-home-card";

export function JobsPostedSection(): JSX.Element {
  return (
    <HomeCard>
      <Box mb={0.2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <JobPostedIcon height="5rem" width="5rem" />
          <Typography sx={{ ml: 1 }} variant="h6" color="text.primary">
            Jobs Posted
          </Typography>
        </Box>
        <Typography sx={{ my: 1 }} variant="h4" color="text.primary">
          76%
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">Last job posted on</Typography>
          <Chip label="23 Aug 2023" color="success" />
        </Box>
      </Box>
    </HomeCard>
  );
}
