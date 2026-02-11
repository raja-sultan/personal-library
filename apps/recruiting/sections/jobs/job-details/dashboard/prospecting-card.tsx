import { Button, Typography, Box } from "@mui/material";
import React from "react";

export function ProspectingCard(prospects: any): JSX.Element {
  return (
    <Box>
      <Typography mb={1} variant="body1" fontWeight={700}>
        Prospecting
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        p={1}
        alignItems="center"
      >
        <Typography fontWeight={600} variant="subtitle2">
          Current Prospects
        </Typography>
        <Typography variant="body2" color="text.disabled">
          {prospects?.prospect?.prospectCount ?? 0}
        </Typography>
      </Box>
      <Box textAlign="end" mt={2}>
        <Button variant="contained" size="small">
          {" "}
          Find Prospects{" "}
        </Button>
      </Box>
    </Box>
  );
}
