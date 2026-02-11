import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { PersonalizedModal } from "./personalized-modal";

export function MyDashboard(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Typography variant="body1">
        <HomeIcon sx={{ position: "relative", top: "4px" }} /> Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h5" sx={{ my: 1 }}>
          My Dashboard
        </Typography>
        <Box sx={{ my: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
          >
            <SettingsIcon sx={{ mr: 0.5 }} /> Personalize Dashboard
          </Button>
        </Box>
        {open && <PersonalizedModal open={open} setOpen={setOpen} />}
      </Box>
    </>
  );
}
