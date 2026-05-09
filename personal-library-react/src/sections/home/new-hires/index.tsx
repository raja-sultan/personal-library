import React from "react";
import { HomeCard } from "../../../components/custom-home-card/custom-home-card";
import { Box, Typography } from "@mui/material";
import { NewHireIcon } from "@assets/icons/new-hire-icon";

export function NewHiresSection(): JSX.Element {
  return (
    <HomeCard>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <NewHireIcon height="5rem" width="5rem" />
        <Typography variant="h4" sx={{ pl: 2 }}>
          34
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ pt: 2, pb: 3 }}>
        New Hires
      </Typography>
    </HomeCard>
  );
}
