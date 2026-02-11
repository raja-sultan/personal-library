import { Grid } from "@mui/material";
import { useContext } from "react";
import { ManageOpeningForm } from "./manage-opening-form/manage-opening-form";
import { ManageOpeningsContext } from "@sections/jobs/job-details/approvals/openings/manage-opening-model/manage-opening-context";

export function ManageOpeningFormCon({ closeModel }): JSX.Element {
  const { manageOpeningInfoCon } = useContext(ManageOpeningsContext);
  return (
    <Grid
      container
      sx={{
        height: "100%",
        position: "relative",
        overflow: "auto",
      }}
    >
      <Grid item sm={12}>
        <ManageOpeningForm
          openingId={manageOpeningInfoCon.openingId}
          closeModel={closeModel}
        />
      </Grid>
    </Grid>
  );
}
