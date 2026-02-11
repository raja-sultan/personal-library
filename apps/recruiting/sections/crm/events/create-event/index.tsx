import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { useGetSingleEventDetailQuery } from "@services/crm/events/crm-events-api";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateEventFormContainer } from "./create-event-form-container";

export function CreateEvent(): JSX.Element {
  const searchParams = useSearchParams();
  const {
    data: singleDetails,
    isLoading,
    isFetching,
  }: any = useGetSingleEventDetailQuery(
    {
      params: { event_id: searchParams.get("event_id") },
    },
    {
      skip: searchParams.get("event_id") === null,
    }
  );
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
      <Grid item sm={12} sx={{ p: "1em" }} container>
        {isLoading || isFetching ? (
          <Skeleton variant="rectangular" width="100%" height={60} />
        ) : (
          <CreateEventFormContainer singleDetails={singleDetails?.data} />
        )}
      </Grid>
    </Grid>
  );
}
