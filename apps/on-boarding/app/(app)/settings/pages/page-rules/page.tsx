"use client"
import { Box } from "@mui/system";
import { PageRules } from "@sections/settings/pages/page-rules";

function Pages(): JSX.Element {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <PageRules />
    </Box>
  );
}

export default Pages;
