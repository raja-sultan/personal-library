import React, { useState } from "react";
import { PlusFilledIcon } from "@assets/icons/plus-filled-icon";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { PlLogoIcon } from "common";
import { LogoModal } from "./logo-modal";

export function CompanyIntro(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const theme: any = useTheme();
  return (
    <Box
      sx={{
        borderRadius: "8px",
        backgroundColor:
          theme.palette.mode === "light" ? theme.palette.neutral[50] : "",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
        p: 0,
      }}
    >
      <Stack
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        gap={1.6}
        sx={{ "&>*": { flex: 1 } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <PlLogoIcon sx={{ width: "150px" }} />
          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="outlined"
            sx={{
              p: 1,
              minWidth: 0,
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              borderRadius: "50px",
            }}
          >
            <PlusFilledIcon />
          </Button>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ borderColor: "#cccecf", pl: 2 }}
          />
        </Box>

        <Box sx={{ minWidth: "20rem", textAlign: "start", pr: 0.5 }}>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            Orcalo Holdings
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            The small description about the Orcalo Holdings beholds here.
          </Typography>
        </Box>
      </Stack>
      <LogoModal open={open} setOpen={setOpen} />
    </Box>
  );
}
