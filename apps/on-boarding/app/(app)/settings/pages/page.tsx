"use client";

import { Box } from "@mui/system";
import { PagesSection } from "@sections/settings/pages";

function Pages(): JSX.Element {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <PagesSection />
    </Box>
  );
}

export default Pages;
