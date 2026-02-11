import React from "react";
import { Typography, Box } from "@mui/material";

export function PipelineTaskCard(): JSX.Element {
  return (
    <Box>
      <Typography my={2} variant="body1" fontWeight={700}>
        Pipeline Task
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        p={1}
        alignItems="center"
      >
        <Typography variant="body2">No custom fields</Typography>
      </Box>
    </Box>
  );
}
