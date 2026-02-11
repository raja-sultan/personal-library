"use client";

import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { ThirdPartyTaskSystemSection } from "@sections/settings/3rd-party-task-system";

function ThirdPartyTaskSystem(): JSX.Element {
  return (
    // <Grid
    //   sx={{
    //     borderRadius: "10px",
    //     bgcolor: "background.paper",
    //     p: 3,
    //     rowGap: 3,
    //   }}
    //   container
    // >
      <Box>
        <ThirdPartyTaskSystemSection />
      </Box>
    
  );
}

export default ThirdPartyTaskSystem;
