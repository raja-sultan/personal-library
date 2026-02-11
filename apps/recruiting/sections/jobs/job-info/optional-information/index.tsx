import { Button, Grid, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import { RHFEditor } from "common";

export function OptionalInformation({
  editorVisibilityChangeHand,
  jobInfoHolder,
}): JSX.Element {
  return (
    <Grid item container sm={12} sx={{ p: "0.5em", m: "2.5em 0" }}>
      <Grid item sm={12}>
        <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
          Optional Information For Interviewers
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#667085", fontWeight: "normal" }}
        >
          Provide additional background information on this job to be included
          in this job&apos;s interview kits.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#344054",
            m: "2.7em 0 1.2em 0",
            display: "flex",
            fontWeight: "600",
          }}
        >
          Team Responsibilities
          <InfoOutlinedIcon sx={{ ml: "0.2em" }} />
        </Typography>
      </Grid>
      <Grid item sm={12} container>
        {!jobInfoHolder?.visibilityOfTeamResEditor ? (
          <Grid item sm={12}>
            <Button
              variant="contained"
              sx={{ mb: "2.4em" }}
              endIcon={<AddIcon />}
              onClick={() => {
                editorVisibilityChangeHand("visibilityOfTeamResEditor");
              }}
            >
              Add a Description
            </Button>
          </Grid>
        ) : (
          ""
        )}
        <Grid item lg={8}>
          {jobInfoHolder?.visibilityOfTeamResEditor && (
            <RHFEditor name="teamResponsibilities" />
          )}
        </Grid>
      </Grid>
      <Grid item sm={12} container>
        <Grid item sm={12}>
          <Typography
            variant="body2"
            sx={{
              color: "#344054",
              m: "2.7em 0 0 0",
              display: "flex",
              fontWeight: "600",
            }}
          >
            How to sell this Job
            <InfoOutlinedIcon sx={{ ml: "0.2em" }} />
          </Typography>
          {!jobInfoHolder?.visibilityOfSellEditor ? (
            <Button
              color="primary"
              variant="contained"
              sx={{ m: "2.4em 0" }}
              endIcon={<AddIcon />}
              onClick={() => {
                editorVisibilityChangeHand("visibilityOfSellEditor");
              }}
            >
              Add a Description
            </Button>
          ) : (
            ""
          )}
        </Grid>
        <Grid item lg={8}>
          {jobInfoHolder?.visibilityOfSellEditor && (
            <RHFEditor name="howToSell" />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
