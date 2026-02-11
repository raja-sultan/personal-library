import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ViewEventsTable } from "./view-events-table/view-events-table";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ViewEvents(): JSX.Element {
  const router = useRouter();

  return (
    <Grid
      container
      direction="column"
      sx={{ backgroundColor: "background.paper", borderRadius: "0.5em" }}
    >
      <Grid item sm={12}>
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
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            router.back();
          }}
        >
          <Typography variant="body2">Back</Typography>
        </Button>
      </Grid>
      <Grid item sm={12} sx={{ p: "0 1em" }} container>
        <Grid item sm={6}>
          <Typography variant="h5">Manage Events</Typography>
        </Grid>
        <Grid
          item
          sm={6}
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", mr: "1.5em" }}>
            8 Credits Remaining
          </Typography>
          <Link href="/create-event">
            <Button variant="contained">Create Event</Button>
          </Link>
        </Grid>
        <Grid item sm={12} sx={{ mt: "2.4em" }}>
          <ViewEventsTable />
        </Grid>
      </Grid>
    </Grid>
  );
}
