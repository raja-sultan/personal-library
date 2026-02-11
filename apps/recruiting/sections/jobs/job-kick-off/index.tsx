import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { FormProvider, IsFetching } from "common";
import { BusinessGoals } from "./business-goals";
import { useJobKickOff } from "./use-job-kickoff";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";

export function JobKickOff({
  nextStepHandler,
  previousStepHandler,
  defaultValues: jobKickOff,
}): JSX.Element {
  const { jobKickOffFormData, onSubmit, isSubmitting, methods, theme } =
    useJobKickOff({
      nextStepHandler,
      jobKickOff,
    });

  return (
    <Box sx={{ height: "100%" }}>
      <IsFetching isFetching={isSubmitting} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          p: 2,
          height: "90%",
          position: "relative",
          overflowY: "scroll",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="body2">
          Send a job kickoff form to a higher manager for them to start
          brainstorming details about this job. This can also be created, edited
          and sent in Job Setup
        </Typography>
        <Typography variant="h4" sx={{ mt: 2, fontWeight: 600 }}>
          Email to Hiring Manager
        </Typography>
        <FormProvider methods={methods}>
          <Grid container spacing={3} mt={2}>
            {jobKickOffFormData?.map((item) => {
              const { component: Component, componentProps } = item;

              return (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <Component {...componentProps} />
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <BusinessGoals />
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
      <Box
        sx={{
          p: "0.5em",
          height: "10%",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button
            variant="outlined"
            type="button"
            onClick={previousStepHandler}
          >
            Back
          </Button>
        </Box>
        <Box>
          {/* <Button variant="outlined" type="button">
            Preview Form
          </Button> */}
          <Link href="/jobs">
            <Button
              variant="outlined"
              color="primary"
              onClick={onSubmit}
              sx={{
                m: { xs: "0.5em 0", sm: "0" },
                marginRight: { xs: "0", sm: "0.5em" },
              }}
            >
              Save & Finish Later
            </Button>
          </Link>
          <Button
            variant="outlined"
            type="button"
            onClick={nextStepHandler}
            sx={{ ml: 1 }}
          >
            Skip
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            sx={{ ml: 1 }}
            onClick={onSubmit}
            loading={isSubmitting}
          >
            Next
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}
