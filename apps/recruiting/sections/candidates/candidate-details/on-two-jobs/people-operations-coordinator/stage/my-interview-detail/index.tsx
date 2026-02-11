import {
  Box,
  Card,
  Grid,
  Typography,
  //   useTheme,
  Skeleton,
} from "@mui/material";
import { CustomTabsIcon } from "common";
import { InterviewPrep } from "./interview-prep";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { JobDetails } from "./job-details";
import { ResumeInterview } from "./resume";
import { PersonalInterviewDetail } from "./personal-interview-detail";
import { useGetApplicationCandidateQuery } from "@services/candidate/application-candidate/application-candidate-api";
import { useSearchParams } from "next/navigation";
import {
  useGetInterviewDetailsQuery,
  // useGetInterviewPlansDataQuery,
} from "@services/jobs/create-jobs/interview-plan/interview-plan-api";
import { useGetOpeningsApprovalsDetailsQuery } from "@services/jobs/job-details/approvals/opening-approvals-api";
import { useGetScoreCardDetailsQuery } from "@services/candidate/stages/interview-stage";
import { PreliminaryScoreCard } from "./scorecard";
import { useState } from "react";

export function MyInterviewDetail(): any {
  const searchParams = useSearchParams();
  const params = searchParams.get("candidateId");
  const stageName = searchParams.get("stageName");
  const interviewIds = searchParams.get("interviewId");
  const jobId = searchParams.get("jobId");
  const candidateId = searchParams.get("candidateId");
  const interviewId = searchParams.get("interviewId");
  const stageId = searchParams.get("stageId");

  const { data: candidateDetails, isSuccess } = useGetApplicationCandidateQuery(
    {
      candidateId: params,
    }
  );
  // console.log("🚀 ~ MyInterviewDetail ~ candidateDetails:", candidateDetails)

  const { data: jobPostDetails } = useGetOpeningsApprovalsDetailsQuery({
    jobId,
    stepName: "jobInfo",
  });

  console.log("🚀 ~ MyInterviewDetail ~ jobPostDetails:", jobPostDetails);

  const { data }: any = useGetInterviewDetailsQuery({
    interviewId: interviewIds,
  });
  // console.log("🚀 ~ MyInterviewDetail........... ~ data:", data)
  const interviewPrepDetails = data?.data?.[0];
  // console.log("🚀 ~ MyInterviewDetail ~ abc:", interviewPrepDetails);

  const { data: scoreCardDetails }: any = useGetScoreCardDetailsQuery({
    candidateId,
    jobId,
    interviewId,
    stageId,
  });
  const [value, setValue] = useState(0);
  return (
    <Box>
      <Card
        sx={{
          borderRadius: "10px",
          p: 2,
        }}
      >
        <Box sx={{ pb: 4 }}>
          <Box display="flex" flexDirection="column" gap={0.2}>
            {isSuccess ? (
              <Typography variant="h6">
                {stageName ?? "No Data found"}
              </Typography>
            ) : (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="10%"
                height={30}
                sx={{ borderRadius: 0.5 }}
              />
            )}
          </Box>
        </Box>

        <Grid container gap={5}>
          <Grid item xs={12} lg={8}>
            <Box>
              <CustomTabsIcon
                outerValue={value}
                setOuterValue={setValue}
                tabsNameArray={[
                  {
                    id: 1,
                    title: "Interview Prep",
                    icon: <InsertChartOutlinedTwoToneIcon />,
                  },
                  {
                    id: 2,
                    title: "Job Details",
                    icon: <AssignmentOutlinedIcon />,
                  },
                  {
                    id: 3,
                    title: "Resume",
                    icon: <DescriptionOutlinedIcon />,
                  },
                  {
                    id: 4,
                    title: "Scorecard",
                    icon: <ChecklistRoundedIcon />,
                  },
                ]}
              >
                <Box sx={{ p: 1 }}>
                  <InterviewPrep
                    interviewPrepDetails={interviewPrepDetails}
                    scoreCardDetails={scoreCardDetails}
                    setValue={setValue}
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <JobDetails
                    jobPostDetails={jobPostDetails}
                    interviewPrepDetails={interviewPrepDetails}
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <ResumeInterview candidateDetails={candidateDetails} />
                </Box>
                <Box sx={{ p: 1 }}>
                  {/* <ScoreCardInterview /> */}
                  <PreliminaryScoreCard />
                </Box>
              </CustomTabsIcon>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <PersonalInterviewDetail
              candidateDetails={candidateDetails}
              scoreCardDetails={scoreCardDetails}
              stageName={stageName}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
