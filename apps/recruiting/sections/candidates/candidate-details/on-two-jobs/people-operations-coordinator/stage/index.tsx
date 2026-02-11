import { Box, Skeleton, Typography } from "@mui/material";
import { CustomAccordion } from "common";
import { MainStage } from "./main-stage";
import { useSearchParams } from "next/navigation";
import { useGetInterviewPlansDataQuery } from "@services/jobs/create-jobs/interview-plan/interview-plan-api";

export function StageComponent({ candidateDetails }: any): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const candidateID = searchParams.get("candidateID");

  const { data, isLoading, isFetching }: any = useGetInterviewPlansDataQuery({
    jobId,
    candidateID,
  });

  // console.log("data", data?.data[0]?.interviewPlan);

  if (isLoading || isFetching) {
    return (
      <Box p={2}>
        <Skeleton height={90} width="100%" />
        <Skeleton height={90} width="100%" />
      </Box>
    );
  }
  return (
    <>
      {" "}
      {!data?.data[0]?.interviewPlan ? (
        <Box sx={{ p: 2 }}>
          <Typography>NO Interviews found</Typography>
        </Box>
      ) : (
        data?.data.map((item) =>
          item.interviewPlan.map((items) => (
            <CustomAccordion
              inlineHeaderRequired
              title={items?.stageName}
              key={items?._id}
            >
              <MainStage
                interviews={items?.interviews}
                candidateDetails={candidateDetails}
                title={items?.stageName}
              />
            </CustomAccordion>
          ))
        )
      )}
    </>
  );
}
