import { useState } from "react";
import {
  CustomJobStepper,
  CustomChildRenderer,
  CustomBreadCrumbs,
} from "common";
import {
  EmailNotifications,
  JobInfoForm,
  JobKickOff,
  ScoreCardSection,
  InterviewPlanSection,
  JobPost,
  JobApproval,
  HiringTeam,
} from "@sections/jobs";
import { useGetSampleJobQuery } from "@services/jobs/create-jobs/sample-job";
import { useSearchParams } from "next/navigation";
import {
  Grid,
  Paper,
  Typography,
  CardContent,
  useTheme,
  Box,
} from "@mui/material";
import StepperFormSkeleton from "../stepper-form-skeleton";
import { useGetJobDetailsAPiQuery } from "@services/jobs/create-jobs/job-details-api";

const steps = [
  "Job Information",
  "Hiring Team",
  "Job Kickoff",
  "Scorecard",
  "Interview Plan",
  "Approvals",
  "Job Post",
  "Email Notification",
];

export function CustomJobStepperSection(): JSX.Element {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(0);

  const { data }: any = useGetSampleJobQuery(
    {},
    {
      skip: !searchParams.has("sample_job"),
    }
  );
  const _ = data;

  const jobId = searchParams.get("jobId");

  const { data: JobDetails, isLoading } = useGetJobDetailsAPiQuery(
    { jobId },
    { skip: jobId === null }
  );

  const breadcrumbs = [
    { key: "", value: "Create a Job", link: "" },
    { key: "", value: "Blank Job", link: "" },
  ];
  const nextStepHandler = (): void => {
    setActive(active < steps.length - 1 ? active + 1 : 0);
  };
  const previousStepHandler = (): void => {
    setActive(active > 0 ? active - 1 : 0);
  };

  const theme = useTheme();
  return (
    <Paper>
      <CardContent sx={{ position: "relative" }}>
        <Box sx={{ a: { color: "text.primary" } }}>
          <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
        </Box>
        <Typography variant="h4" sx={{ my: 1 }}>
          {active === 3 ? "Candidate Scorecard" : steps[active]}
        </Typography>
        <Grid
          item
          sm={12}
          container
          justifyContent="center"
          sx={{
            "& ::-webkit-scrollbar": {
              height: "5px !important",
            },
            "& ::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "6px",
            },
          }}
        >
          <Grid
            item
            lg={9}
            sx={{
              display: { xs: "flex", lg: "inline-block" },
              overflowX: { xs: "scroll", lg: "auto" },
            }}
          >
            <CustomJobStepper active={active} steps={steps} />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            height: "55vh",
            "& ::-webkit-scrollbar": {
              width: "9px",
            },
            "& ::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.main,
              borderRadius: "6px",
            },
          }}
        >
          <Grid
            item
            sm={12}
            sx={{
              height: "100%",
            }}
          >
            <CustomChildRenderer index={active}>
              <JobInfoForm nextStepHandler={nextStepHandler} />
              <HiringTeam
                nextStepHandler={nextStepHandler}
                previousStepHandler={previousStepHandler}
              />
              {!isLoading ? (
                <JobKickOff
                  nextStepHandler={nextStepHandler}
                  previousStepHandler={previousStepHandler}
                  defaultValues={JobDetails?.data}
                />
              ) : (
                <StepperFormSkeleton />
              )}
              <ScoreCardSection
                nextStepHandler={nextStepHandler}
                previousStepHandler={previousStepHandler}
                editButtons
                title={false}
              />
              <InterviewPlanSection
                hideButton={false}
                previousStepHandler={previousStepHandler}
                nextStepHandler={nextStepHandler}
              />
              <JobApproval
                nextStepHandler={nextStepHandler}
                previousStepHandler={previousStepHandler}
              />
              <JobPost
                nextStepHandler={nextStepHandler}
                previousStepHandler={previousStepHandler}
              />
              <EmailNotifications previousStepHandler={previousStepHandler} />
            </CustomChildRenderer>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  );
}
