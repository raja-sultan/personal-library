import { Grid } from "@mui/material";
import { JobApproval } from "./job-approval/job-approval";
import { OfferApproval } from "./offer-approval/offer-approval";

export function JobOfferApprovals(): JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid item lg={6}>
        <JobApproval />
      </Grid>
      <Grid item lg={6}>
        <OfferApproval />
      </Grid>
    </Grid>
  );
}
