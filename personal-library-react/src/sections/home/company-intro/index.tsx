import React from "react";
import { PlLogoIcon } from "common";
import { Box, Typography } from "@mui/material";
import { HomeCard } from "@components/custom-home-card/custom-home-card";

export function CompanyIntroSection(): JSX.Element {
  return (
    <HomeCard>
      <Box>
        <PlLogoIcon
          height="3rem"
          sx={{
            display: "block",
            //  margin: "auto",
            width: "auto",
            paddingTop: "10px",
          }}
        />
        <Typography sx={{ my: 2 }} variant="h6" color="text.primary">
          Orcalo Holdings
        </Typography>
        <Typography variant="body2" color="text.primary">
          The small description about the Orcalo Holdings beholds here.
        </Typography>
      </Box>
    </HomeCard>
  );
}
