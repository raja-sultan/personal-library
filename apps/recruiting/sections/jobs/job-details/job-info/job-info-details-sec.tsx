import { Grid, Typography } from "@mui/material";
import { HeaderSubHeadingTypo } from "./header-sub-heading-typo";
import { DisplayHtml } from "common";

export function JobInfoDetailsSec({ jobInfo }) {
  return (
    <Grid item container lg={12} sx={{ margin: "0.4em" }}>
      <Grid item sm={12} sx={{ m: "0.8em 0 1.3em 0" }}>
        <Typography variant="h6">Job Status</Typography>
      </Grid>
      <Grid item sm={12} sx={{ mb: "1.3em" }}>
        <HeaderSubHeadingTypo
          header="Internal Job Name (appears in personnel library) *"
          subtitle={jobInfo?.jobName ?? "---"}
        />
      </Grid>
      <Grid item sm={12} sx={{ mb: "1.3em" }}>
        <HeaderSubHeadingTypo
          header="Department *"
          subtitle={jobInfo?.department.departmentName ?? "---"}
        />
      </Grid>
      <Grid item sm={12} sx={{ mb: "1.3em" }}>
        <HeaderSubHeadingTypo
          header="Office *"
          subtitle={jobInfo?.office.officeName ?? "---"}
        />
      </Grid>
      <Grid item sm={12} sx={{ mb: "1.3em" }}>
        <HeaderSubHeadingTypo header="Open Date" subtitle="03/07/2023" />
      </Grid>
      <Grid item sm={12} sx={{ mb: "1.3em" }}>
        <HeaderSubHeadingTypo
          header="Requisition ID"
          subtitle={jobInfo?.requisitionId ?? "---"}
        />
      </Grid>
      <Grid item sm={12} sx={{ mb: "1.3em" }}>
        <HeaderSubHeadingTypo
          header="Notes"
          subtitle={jobInfo?.note?.text ?? "---"}
        />
      </Grid>
      <Grid item sm={12} sx={{ mb: "1.3em" }}>
        <HeaderSubHeadingTypo
          header="Employment Type"
          subtitle={jobInfo?.employmentType ?? "---"}
        />
      </Grid>
      <Grid item sm={12} sx={{ mb: "1.3em" }}>
        <Typography variant="subtitle2">Team & Responsibilities</Typography>
        <DisplayHtml
          content={jobInfo?.infoForInterviewer?.teamResponsibility ?? ""}
        />
      </Grid>
      <Grid item container sm={12} sx={{ mb: "1.3em" }}>
        <Grid
          item
          lg={12}
          sx={{ border: "1px solid #00000014", p: 1, borderRadius: "0.7em" }}
        >
          <Typography variant="subtitle2">How To Sell This Job</Typography>
          <DisplayHtml
            content={jobInfo?.infoForInterviewer?.howToSellJob ?? ""}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
