import { Box } from "@mui/system";
import { SeeJobs } from "./see-jobs";
import { ResponsibleJobs } from "./responsible-jobs";
import { useSearchParams } from "next/navigation";
import { Button, Grid, Typography } from "@mui/material";
import StepperFormSkeleton from "../stepper-form-skeleton";
import { useGetHiringTeamQuery } from "@services/jobs/create-jobs/hiring-team/hiring-team-api";
import Link from "next/link";

export function HiringTeam({
  nextStepHandler,
  previousStepHandler,
}): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data, isLoading, isSuccess }: any = useGetHiringTeamQuery(
    {
      jobId,
    },
    { skip: jobId === null }
  );

  // if (isLoading) {
  //   return <StepperFormSkeleton />;
  // }

  return (
    <>
      <Box
        sx={{
          height: { xs: "70%", sm: "90%" },
          position: "relative",
          overflowY: "auto",
        }}
      >
        <Typography variant="h2">
          {isLoading && <StepperFormSkeleton />}
          {isSuccess && (
            <ResponsibleJobs hiringTeamData={data?.data?.hiringTeam} />
          )}
        </Typography>
        <SeeJobs />
      </Box>
      <Grid
        container
        alignItems="center"
        sx={{
          p: "0.5em",
          height: { xs: "30%", sm: "10%" },
          position: "relative",
        }}
        justifyContent="space-between"
      >
        <Grid
          item
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: "100%" }}
            onClick={previousStepHandler}
          >
            Back
          </Button>
        </Grid>
        <Grid
          item
          sx={{
            width: { xs: "100%", sm: "auto" },
            display: { xs: "flex" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Link href="/jobs">
            <Button
              variant="outlined"
              color="primary"
              onClick={nextStepHandler}
              sx={{
                m: { xs: "0.5em 0", sm: "0" },
                marginRight: { xs: "0", sm: "0.5em" },
              }}
            >
              Save & Finish Later
            </Button>
          </Link>

          <Button variant="contained" color="primary" onClick={nextStepHandler}>
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
