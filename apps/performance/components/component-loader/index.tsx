import { Box, CircularProgress, type SxProps } from "@mui/material";
import React from "react";

export function ComponentLoader({
  height = 320,
  sx,
}: {
  height?: string | number;
  sx?: SxProps;
}): JSX.Element {
  return (
    <Box sx={{ height, display: "flex", alignItems: "center", justifyContent: "center", ...sx }}>
      <CircularProgress />
    </Box>
  );
}
