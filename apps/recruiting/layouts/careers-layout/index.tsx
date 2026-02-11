import type { ReactNode } from "react";
import { Box } from "@mui/material";
import CareersFooter from "./footer";
import { CareersHeader } from "./header";

export function CareerLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <Box>
      <CareersHeader />
      {children}
      <CareersFooter />
    </Box>
  );
}
