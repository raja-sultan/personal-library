import React from "react";
import { Typography, Box } from "@mui/material";

function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
        boxShadow: theme.shadows[5],
        backgroundColor: "background.paper",
        py: 1.8,
      })}
    >
      <Typography component="span" variant="body2" fontWeight="500" color="neutral.600">
        Copyrights © {currentYear} All Rights Reserved by <strong>Personnel Library</strong>
      </Typography>
    </Box>
  );
}

export default Footer;
