import React from "react";
import { Box, Typography } from "@mui/material";
import { AdministrativeAccessSection } from "./administrative-access";
import { CustomAccessSection } from "./custom-access";
import { DefaultAccessSection } from "./default-access";

export function PermissionsSection(): JSX.Element {
  return (
    <Box>
      <Typography variant="h5">Permissions</Typography>
      <Box sx={{ bgcolor: "background.paper", p: 0.5, borderRadius: 1, mt: 2 }}>
        <AdministrativeAccessSection />
      </Box>
      <Box sx={{ bgcolor: "background.paper", p: 0.5, borderRadius: 1, mt: 2 }}>
        <CustomAccessSection />
      </Box>
      <Box sx={{ bgcolor: "background.paper", p: 0.5, borderRadius: 1, mt: 2 }}>
        <DefaultAccessSection />
      </Box>
    </Box>
  );
}
