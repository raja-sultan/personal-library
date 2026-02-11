import { Box, Typography } from "@mui/material";
import React from "react";

function CommonProfileCard({ title, icon }): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
          borderRadius: "50px",
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
  );
}

export default CommonProfileCard;
