import { Box, Typography } from "@mui/material";
import { CustomBreadCrumbs } from "common";
import React from "react";

export function CareersPageIntegrationOptionsSec(): React.JSX.Element {
  const breadcrumbs = [
    { key: "1", value: "Configuration", link: "/configuration" },
    { key: "2", value: "Dev Center", link: "/configuration/dev-center" },
    { key: "3", value: "Careers Page Integration Options", link: "" },
  ];
  return (
    <Box>
      <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      <Typography variant="h6" sx={{ my: 2 }}>
        Careers Page Integration Options
      </Typography>
    </Box>
  );
}
