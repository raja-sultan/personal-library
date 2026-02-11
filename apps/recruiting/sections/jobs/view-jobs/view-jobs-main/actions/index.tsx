import { Box, Button, Paper, Typography } from "@mui/material";
import { InterviewPlanSection } from "@sections/jobs/interview-plan";
import { ScoreCardSection } from "@sections/jobs/score-card";
import { CustomTabs } from "common";
import { useRouter } from "next/navigation";
import { ViewForm } from "../../view-form";
import { JobPostSetup } from "@sections/jobs/job-details";

export function ViewActionMain({ params }: any): JSX.Element {
  const router = useRouter();
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
      <Paper variant="elevation" elevation={1}>
        <Box py={1} px={2}>
          <Box>
            <Typography variant="h4">Edit Overall Jobs</Typography>
          </Box>
          <Box mt={1}>
            <CustomTabs
              maxWidth={720}
              tabsNameArray={[
                "Scorecards",
                "Stages/Interviews",
                "Job Posts",
                "Forms",
              ]}
              tabRootSx={{
                "&.MuiButtonBase-root": {
                  maxWidth: 600,
                  marginLeft: 2,
                },
              }}
            >
              <Box
                sx={{
                  height: "60vh",
                  "& ::-webkit-scrollbar": {
                    width: "9px",
                  },
                  "& ::-webkit-scrollbar-thumb": {
                    backgroundColor: "primary.main",
                    borderRadius: "50px",
                  },
                }}
              >
                <ScoreCardSection
                  nextStepHandler={undefined}
                  previousStepHandler={undefined}
                  editButtons={false}
                  title={false}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    router.push("/view-jobs");
                  }}
                >
                  Back
                </Button>
              </Box>
              <Box sx={scrollCss}>
                <InterviewPlanSection
                  showScroll
                  hideButton={false}
                  nextStepHandler={undefined}
                  previousStepHandler={undefined}
                />
              </Box>
              <Box sx={{ height: "60vh" }}>
                <JobPostSetup isHideColumn />
              </Box>
              <ViewForm route />
            </CustomTabs>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
