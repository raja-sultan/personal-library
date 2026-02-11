import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { HomeCard } from "@components/custom-home-card/custom-home-card";

export function ProgressSection(): JSX.Element {
  return (
    <HomeCard>
      <Box sx={{ pb: 2 }}>
        <Typography variant="h5">Progress</Typography>
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Files Signed
        </Typography>
        <LinearProgress
          value={50}
          variant="determinate"
          classes={{ bar: "_bar" }}
          sx={{
            height: "12px",
            mb: "8px",
            borderRadius: "50px",
            "& ._bar": { borderRadius: "5px" },
          }}
        />
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Feedback Answered
        </Typography>
        <LinearProgress
          value={25}
          variant="determinate"
          classes={{ bar: "_bar" }}
          color="info"
          sx={{
            height: "12px",
            mb: "8px",
            borderRadius: "50px",
            "& ._bar": { borderRadius: "5px" },
          }}
        />
      </Box>
    </HomeCard>
  );
}
