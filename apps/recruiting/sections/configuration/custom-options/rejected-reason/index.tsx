import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import RejectedReasonTableOne from "./rejected-reason-table-one";
import RejectedReasonTableTwo from "./rejected-reason-table-two";
import { Box } from "@mui/system";
import RejectedReasonModel from "./rejected-reason-models";

function RejectedReason(): JSX.Element {
  return (
    <Grid container>
      <Grid xs={12} my={2} item display="flex" alignItems="center">
        <Typography variant="h5" color="initial">
          Manage Rejection Reasons
        </Typography>
        <Box ml="auto">
          <RejectedReasonModel
            modelTrigger={
              <Button
                variant="outlined"
                size="small"
                sx={{ color: "neutral.500", borderColor: "neutral.500" }}
                disableRipple
                disableElevation
                disableFocusRipple
                disableTouchRipple
              >
                Create New Rejection Reason
              </Button>
            }
          />
        </Box>
      </Grid>
      <Grid xs={12} mt={1} item>
        <RejectedReasonTableOne />
      </Grid>
      <Grid xs={12} mt={1} item>
        <RejectedReasonTableTwo />
      </Grid>
    </Grid>
  );
}

export default RejectedReason;
