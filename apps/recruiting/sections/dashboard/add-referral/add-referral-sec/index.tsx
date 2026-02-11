import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box, Button, Typography } from "@mui/material";
import { AddReferrals } from "@sections/jobs/job-details/referrals/add-referrals";
import { useRouter } from "next/navigation";
import React from "react";

export function AddReferralSec(): React.JSX.Element {
  const router = useRouter();

  return (
    <Box>
      <Button
        variant="outlined"
        disableRipple
        sx={{
          border: "none",
          color: "text.primary",
          "&:hover": {
            border: "none",
            backgroundColor: "transparent",
          },
        }}
        startIcon={<ArrowCircleLeftIcon />}
        onClick={() => {
          router.back();
        }}
      >
        <Typography variant="body2">Back To Dashboard</Typography>
      </Button>
      <Box sx={{ backgroundColor: "#ffffff", pr: 2 }}>
        <AddReferrals setShowAddReferrals={undefined} />
      </Box>
    </Box>
  );
}
