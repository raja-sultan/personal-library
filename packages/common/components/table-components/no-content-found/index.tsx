"use client";

import { Box } from "@mui/material";
import { NoContent } from "common/assets/common";

export function NoContentFound(): JSX.Element {
  return (
    <Box display="flex">
      <NoContent />
    </Box>
  );
}
