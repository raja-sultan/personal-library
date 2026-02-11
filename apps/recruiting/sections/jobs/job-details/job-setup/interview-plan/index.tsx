import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useGetJobDetailsAPiQuery } from "@services/jobs/create-jobs/job-details-api";
import { useSearchParams } from "next/navigation";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
import { InterviewPlanSection } from "@sections/jobs/interview-plan";
import { useLazyGetStagesListQuery } from "@services/jobs/job-details/job-setup/interview-plan/interview-plan-api";
import { MileStoneForm } from "./milestones/milestone-form";
import { CustomTabs } from "common";
import { FormByStage } from "./form-by-stage";
import { JobDetailsHeader } from "../../job-details-header";

export function JobsInterviewPlan(): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data, isLoading } = useGetJobDetailsAPiQuery(
    { jobId },
    { skip: jobId === null }
  );
  const stagesList = useLazyGetStagesListQuery();

  if (isLoading) {
    return <StepperFormSkeleton />;
  }
  const scrollCss = {
    height: "60vh",
    "& ::-webkit-scrollbar": {
      width: "9px",
    },
    "& ::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "50px",
    },
  };

  return (
    <Box>
      <JobDetailsHeader mainTitle="Interview Plan" />
      <Grid container>
        <Grid item xs={12} p={2} sx={{ backgroundColor: "background.paper" }}>
          <Typography
            variant="h5"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            Basic Information
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1}>
          <CustomTabs
            tabsNameArray={["Stages", "Milestones", "Forms By Stage"]}
          >
            <Box sx={scrollCss}>
              <InterviewPlanSection
                showScroll
                hideButton
                nextStepHandler={undefined}
                previousStepHandler={undefined}
              />
            </Box>
            <MileStoneForm
              jobDetails={data?.data}
              stagesList={stagesList}
              jobId={jobId}
            />
            <FormByStage />
          </CustomTabs>
        </Grid>
      </Grid>
    </Box>
  );
}
