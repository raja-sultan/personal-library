import React from "react";
import { Box, Grid } from "@mui/material";
import { SettingsSidebar } from "@sections/settings/sidebar";

function SettingsLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Grid container sx={{ py: 2 }} spacing={1.5}>
      <Grid item xs={12} xl={2} lg={3} md={3} width="100%">
        <SettingsSidebar sx={styles.common} />
      </Grid>
      <Grid item xs={12} xl={10} lg={9} md={9} width="100%">
        <Box sx={{ pl: "10px", ...styles.common }}>{children}</Box>
      </Grid>
    </Grid>
  );
}

export default SettingsLayout;

const styles = {
  common: {
    py: "5px",
    maxHeight: "calc(100vh - 230px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#cacaca",
      borderRadius: "10px",
    },
  },
};
