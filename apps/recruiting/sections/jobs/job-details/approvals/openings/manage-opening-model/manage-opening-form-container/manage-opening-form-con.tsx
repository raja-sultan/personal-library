import { Grid } from "@mui/material";
import { ManageOpeningForm } from "./manage-opening-form/manage-opening-form";

export function ManageOpeningFormCon({ closeModel, openingId }): JSX.Element {

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
        <ManageOpeningForm openingId={openingId} closeModel={closeModel} />
      </Grid>
    </Grid>
  );
}
